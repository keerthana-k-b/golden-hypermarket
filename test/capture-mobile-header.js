const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const rootDir = path.join(__dirname, '..');

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath);
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end(); return; }
  const ext = path.extname(filePath);
  const mimeMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.webmanifest': 'application/manifest+json'
  };
  res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(8083, async () => {
  const browser = await chromium.launch();
  const widths = [360, 390, 414];

  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    await page.goto('http://localhost:8083/index.html', { waitUntil: 'networkidle' });

    // Set first chip active to showcase the filled green state
    await page.evaluate(() => {
      const active = document.querySelector('.hdr-nav-link.active');
      if (!active) {
        const first = document.querySelector('.hdr-nav-link');
        if (first) first.classList.add('active');
      }
    });

    const outPath = path.join(rootDir, 'assets', `mobile-header-${width}px.png`);
    // Capture header with slight bottom context so chips and their drop shadow are completely visible
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width, height: 245 } });
    console.log(`Saved screenshot for ${width}px to ${outPath}`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('All mobile header captures done!');
});
