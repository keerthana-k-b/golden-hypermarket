const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const rootDir = path.join(__dirname, '..');

const mimeMap = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + reqPath);
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 8089;
const PAGES = [
  { name: 'index', path: '/index.html' },
  { name: 'category', path: '/category.html?cat=dairy' },
  { name: 'product', path: '/product.html?id=1' },
  { name: 'cart', path: '/cart.html' },
  { name: 'search', path: '/search.html?q=rice' }
];

const WIDTHS = [320, 390, 768, 1366];

server.listen(PORT, async () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  const browser = await chromium.launch();
  const auditResults = [];

  for (const width of WIDTHS) {
    console.log(`\n========================================`);
    console.log(`AUDITING VIEWPORT: ${width}px`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width, height: 800 },
      isMobile: width < 1024,
      hasTouch: width < 1024
    });

    // Seed mock cart & wishlist
    await context.addInitScript(() => {
      try {
        localStorage.setItem('golden_hypermarket_cart', JSON.stringify([
          { id: 1, qty: 2 },
          { id: 401, qty: 1 }
        ]));
        localStorage.setItem('golden_hypermarket_wishlist', JSON.stringify([101, 201]));
      } catch (e) {}
    });

    for (const p of PAGES) {
      const page = await context.newPage();
      const failedRequests = [];
      const faviconRequests = [];

      page.on('response', resp => {
        const url = resp.url();
        const status = resp.status();
        if (url.includes('/assets/favicon/')) {
          faviconRequests.push({ url, status });
        }
        if (status >= 400) {
          failedRequests.push({ url, status });
        }
      });

      try {
        await page.goto(`http://localhost:${PORT}${p.path}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(300);

        // 1. Check Horizontal Overflow
        const overflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasOverflow = scrollWidth > clientWidth;

          let offendingElements = [];
          if (hasOverflow) {
            const all = document.querySelectorAll('*');
            for (const el of all) {
              let parent = el.parentElement;
              let inScrollable = false;
              while (parent && parent !== document.body && parent !== document.documentElement) {
                const style = window.getComputedStyle(parent);
                if (style.overflowX === 'auto' || style.overflowX === 'scroll' || style.overflowX === 'hidden') {
                  inScrollable = true;
                  break;
                }
                parent = parent.parentElement;
              }
              if (inScrollable) continue;

              const r = el.getBoundingClientRect();
              if (r.right > clientWidth + 1) {
                offendingElements.push({
                  tag: el.tagName,
                  className: (el.className || '').toString().substring(0, 50),
                  id: el.id,
                  right: Math.round(r.right),
                  width: Math.round(r.width),
                  limit: clientWidth
                });
                if (offendingElements.length >= 5) break;
              }
            }
          }

          return {
            hasOverflow,
            scrollWidth,
            clientWidth,
            diff: scrollWidth - clientWidth,
            offenders: offendingElements
          };
        });

        // 2. Check Sticky Header
        // First check header position at scroll 0
        const headerTop0 = await page.evaluate(() => {
          const hdr = document.getElementById('site-header-container') || document.querySelector('.site-header-wrapper');
          if (!hdr) return null;
          const r = hdr.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, height: r.height };
        });

        // Scroll down 400px
        await page.evaluate(() => window.scrollTo(0, 400));
        await page.waitForTimeout(200);

        const headerTopScrolled = await page.evaluate(() => {
          const hdr = document.getElementById('site-header-container') || document.querySelector('.site-header-wrapper');
          if (!hdr) return null;
          const r = hdr.getBoundingClientRect();
          const stickyStyle = window.getComputedStyle(hdr).position;
          // Check if inner row or header is fixed/sticky at top
          return {
            top: r.top,
            bottom: r.bottom,
            height: r.height,
            stickyStyle,
            isAtTop: Math.abs(r.top) <= 2,
            isVisible: r.bottom > 0
          };
        });

        // 3. Check Favicon
        // Also explicitly check if favicon link tags exist and if favicon fetch succeeds
        const faviconCheck = await page.evaluate(async () => {
          const links = Array.from(document.querySelectorAll("link[rel*='icon'], link[rel='manifest']")).map(l => ({
            rel: l.rel,
            href: l.href
          }));
          return links;
        });

        // Explicitly test fetching favicon.ico and site.webmanifest from page context
        const faviconFetchStatus = await page.evaluate(async () => {
          try {
            const r1 = await fetch('assets/favicon/favicon.ico');
            const r2 = await fetch('assets/favicon/site.webmanifest');
            return {
              ico: r1.status,
              manifest: r2.status
            };
          } catch(e) {
            return { error: e.message };
          }
        });

        const faviconPass = (
          failedRequests.filter(r => r.url.includes('/assets/favicon/')).length === 0 &&
          faviconFetchStatus.ico === 200 &&
          faviconFetchStatus.manifest === 200
        );

        // 4. Check Carousel Autoplay (on index.html)
        let carouselResult = { tested: false, passed: true, detail: 'N/A' };
        if (p.name === 'index') {
          // Scroll back to top to ensure hero slider is in viewport
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(300);

          const initialHero = await page.evaluate(() => {
            const active = document.querySelector('.hero-slide.active');
            return active ? active.getAttribute('data-slide') : null;
          });

          // Wait 5.5s for hero carousel to transition (interval is 5s)
          await page.waitForTimeout(5600);

          const nextHero = await page.evaluate(() => {
            const active = document.querySelector('.hero-slide.active');
            return active ? active.getAttribute('data-slide') : null;
          });

          const heroAdvanced = initialHero !== null && nextHero !== null && initialHero !== nextHero;
          carouselResult = {
            tested: true,
            passed: heroAdvanced,
            detail: `Hero slide: ${initialHero} -> ${nextHero} (${heroAdvanced ? 'Advanced' : 'Did not advance'})`
          };
        }

        const overflowPass = !overflow.hasOverflow;
        const stickyPass = headerTopScrolled && headerTopScrolled.isAtTop && headerTopScrolled.isVisible;

        auditResults.push({
          page: p.name,
          width,
          overflow: {
            passed: overflowPass,
            diff: overflow.diff,
            offenders: overflow.offenders
          },
          sticky: {
            passed: stickyPass,
            detail: headerTopScrolled
          },
          favicon: {
            passed: faviconPass,
            detail: { failedRequests, faviconFetchStatus }
          },
          carousel: carouselResult
        });

        console.log(`[${p.name} @ ${width}px] Overflow: ${overflowPass ? 'PASS' : 'FAIL (diff: ' + overflow.diff + 'px)'} | Sticky: ${stickyPass ? 'PASS' : 'FAIL'} | Favicon: ${faviconPass ? 'PASS' : 'FAIL'} | Carousel: ${carouselResult.passed ? 'PASS' : 'FAIL'}`);

      } catch (err) {
        console.error(`Error on ${p.name} at ${width}px:`, err.message);
        auditResults.push({
          page: p.name,
          width,
          error: err.message
        });
      } finally {
        await page.close();
      }
    }
    await context.close();
  }

  await browser.close();
  server.close();

  fs.writeFileSync(path.join(__dirname, 'comprehensive-audit-result.json'), JSON.stringify(auditResults, null, 2));
  console.log('\nAudit complete! Results saved to test/comprehensive-audit-result.json');
});
