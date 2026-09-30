const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SHOTS_DIR = path.join(__dirname, 'shots');
if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

const VIEWPORTS = [
  { width: 320, height: 600, name: '320px' },
  { width: 375, height: 667, name: '375px' },
  { width: 390, height: 844, name: '390px' },
  { width: 414, height: 896, name: '414px' },
  { width: 768, height: 1024, name: '768px' },
  { width: 1024, height: 800, name: '1024px' }
];

const PAGES = [
  { name: 'index', url: 'http://localhost:8080/index.html' },
  { name: 'category', url: 'http://localhost:8080/category.html?cat=dairy' },
  { name: 'product', url: 'http://localhost:8080/product.html?id=1' },
  { name: 'cart', url: 'http://localhost:8080/cart.html' },
  { name: 'search', url: 'http://localhost:8080/search.html?q=milk' }
];

async function runMobileAudit() {
  console.log('🚀 Starting Mobile Responsiveness & Overflow Audit across 6 viewports...\n');
  
  const browser = await chromium.launch({ headless: true });
  const allProblems = [];

  for (const pageDef of PAGES) {
    console.log(`\n======================================================`);
    console.log(`📄 Testing Page: ${pageDef.name} (${pageDef.url})`);
    console.log(`======================================================`);

    for (const vp of VIEWPORTS) {
      const isMobile = vp.width <= 768;
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: isMobile,
        hasTouch: isMobile,
        userAgent: isMobile 
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
          : undefined
      });

      const page = await context.newPage();

      await context.addInitScript(() => {
        try {
          localStorage.setItem('golden_hypermarket_cart', JSON.stringify([
            { id: 1, qty: 2 },
            { id: 401, qty: 1 }
          ]));
          localStorage.setItem('golden_hypermarket_wishlist', JSON.stringify([101, 201]));
        } catch (e) {}
      });

      try {
        await page.goto(pageDef.url, { waitUntil: 'networkidle', timeout: 15000 });
      } catch (err) {
        // Fallback if networkidle times out
        await page.waitForLoadState('domcontentloaded');
      }

      // Small pause for any animations/slider positioning
      await page.waitForTimeout(600);

      // Take FULL-PAGE screenshot
      const shotFilename = `${pageDef.name}_${vp.width}.png`;
      const shotPath = path.join(SHOTS_DIR, shotFilename);
      await page.screenshot({ path: shotPath, fullPage: true });

      // Check overflow and find elements causing it
      const overflowInfo = await page.evaluate((vpWidth) => {
        const docElem = document.documentElement;
        const body = document.body;
        const scrollWidth = docElem.scrollWidth;
        const windowInnerWidth = window.innerWidth;
        const hasOverflow = scrollWidth > windowInnerWidth + 1; // +1 to avoid fractional subpixel false positives

        const offendingElements = [];

        if (hasOverflow) {
          // Walk elements to find which ones protrude outside the viewport
          const allEls = document.querySelectorAll('*');
          for (const el of allEls) {
            // Ignore script, style, head, meta, link, svg paths
            const tagName = el.tagName.toLowerCase();
            if (['script', 'style', 'head', 'meta', 'link', 'br', 'path', 'defs'].includes(tagName)) continue;

            const rect = el.getBoundingClientRect();
            // Check if element extends beyond the right edge of viewport
            if (rect.right > windowInnerWidth + 1.5 && rect.width > 0 && rect.height > 0) {
              // Calculate how many px it overflows
              const overflowPx = Math.round(rect.right - windowInnerWidth);
              
              // Build unique selector
              let selector = tagName;
              if (el.id) {
                selector += `#${el.id}`;
              } else if (el.classList.length > 0) {
                selector += `.${Array.from(el.classList).slice(0, 3).join('.')}`;
              }

              // Parent info
              const parentTag = el.parentElement ? el.parentElement.tagName.toLowerCase() : '';
              const parentClass = el.parentElement && el.parentElement.className ? `.${el.parentElement.className.toString().split(' ')[0]}` : '';

              offendingElements.push({
                selector: selector,
                tag: tagName,
                id: el.id || '',
                classes: el.className ? String(el.className) : '',
                parent: `${parentTag}${parentClass}`,
                width: Math.round(rect.width),
                right: Math.round(rect.right),
                overflowPx: overflowPx,
                textSnippet: (el.textContent || '').trim().slice(0, 45)
              });
            }
          }
        }

        return {
          scrollWidth,
          windowInnerWidth,
          hasOverflow,
          delta: scrollWidth - windowInnerWidth,
          offendingElements
        };
      }, vp.width);

      if (overflowInfo.hasOverflow) {
        console.log(`❌ [OVERFLOW] ${pageDef.name} @ ${vp.width}px: scrollWidth=${overflowInfo.scrollWidth}px > innerWidth=${overflowInfo.windowInnerWidth}px (overflow by +${overflowInfo.delta}px)`);
        
        // Deduplicate elements: filter to outermost offenders
        const topOffenders = overflowInfo.offendingElements
          .sort((a, b) => b.overflowPx - a.overflowPx)
          .slice(0, 8);

        topOffenders.forEach(o => {
          console.log(`   ↳ Element: <${o.selector}> width=${o.width}px, right=${o.right}px, overflow=+${o.overflowPx}px | text="${o.textSnippet}"`);
        });

        allProblems.push({
          page: pageDef.name,
          url: pageDef.url,
          viewport: vp.width,
          scrollWidth: overflowInfo.scrollWidth,
          innerWidth: overflowInfo.windowInnerWidth,
          delta: overflowInfo.delta,
          screenshot: shotFilename,
          offenders: topOffenders
        });
      } else {
        console.log(`✅ [PASS] ${pageDef.name} @ ${vp.width}px (scrollWidth=${overflowInfo.scrollWidth}px, innerWidth=${overflowInfo.windowInnerWidth}px)`);
      }

      await context.close();
    }
  }

  await browser.close();

  // Save report
  const reportPath = path.join(__dirname, 'mobile-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(allProblems, null, 2), 'utf-8');

  console.log('\n======================================================');
  console.log(`📊 AUDIT COMPLETE: ${allProblems.length} overflow issues found across 30 tested combinations.`);
  console.log(`📁 Screenshots saved to: ${SHOTS_DIR}`);
  console.log(`📄 JSON report saved to: ${reportPath}`);
  console.log('======================================================\n');

  return allProblems;
}

runMobileAudit().catch(err => {
  console.error('Fatal error during mobile audit:', err);
  process.exit(1);
});
