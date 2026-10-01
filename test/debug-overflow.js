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
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end(); return; }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(8091, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 320, height: 800 } });
  await context.addInitScript(() => {
    try {
      localStorage.setItem('golden_hypermarket_cart', JSON.stringify([
        { id: 1, qty: 2 },
        { id: 401, qty: 1 }
      ]));
      localStorage.setItem('golden_hypermarket_wishlist', JSON.stringify([101, 201]));
    } catch(e) {}
  });
  const page = await context.newPage();

  const pagesToTest = [
    '/index.html',
    '/category.html?cat=dairy',
    '/product.html?id=1',
    '/cart.html',
    '/search.html?q=rice'
  ];
  for (const p of pagesToTest) {
    console.log(`\nTesting ${p} at 320px:`);
    await page.goto(`http://localhost:8091${p}`, { waitUntil: 'networkidle' });

    const causes = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const results = [];

      document.querySelectorAll('*').forEach(el => {
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

        if (!inScrollable) {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 0.5) {
            results.push({
              tag: el.tagName,
              id: el.id,
              class: (el.className || '').toString().substring(0, 60),
              right: Math.round(rect.right),
              width: Math.round(rect.width)
            });
          }
        }
      });

      return {
        docWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        causes: results.slice(0, 15)
      };
    });

    console.log(JSON.stringify(causes, null, 2));
  }

  await browser.close();
  server.close();
});
