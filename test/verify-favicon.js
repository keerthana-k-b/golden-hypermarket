const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const rootDir = path.join(__dirname, '..');

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }
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

server.listen(8080, async () => {
  console.log('Static server started on http://localhost:8080');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const pagesToTest = ['index.html', 'category.html', 'product.html', 'cart.html', 'search.html'];

  for (const p of pagesToTest) {
    await page.goto(`http://localhost:8080/${p}`, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('link[rel*="icon"], link[rel="manifest"], meta[name="theme-color"]')).map(el => ({
        tag: el.tagName,
        rel: el.getAttribute('rel'),
        name: el.getAttribute('name'),
        href: el.getAttribute('href'),
        content: el.getAttribute('content'),
        sizes: el.getAttribute('sizes')
      }));
    });
    console.log(`Page: ${p} | Title: "${title}" | Tags found: ${links.length}`);
    for (const l of links) {
      console.log(`   -> ${l.tag} ${l.rel || l.name}: ${l.href || l.content} ${l.sizes ? `(${l.sizes})` : ''}`);
    }
  }

  // Also test direct HTTP fetching for all favicon assets
  const assetsToTest = [
    '/assets/favicon/favicon.ico',
    '/assets/favicon/favicon-32x32.png',
    '/assets/favicon/favicon-16x16.png',
    '/assets/favicon/apple-touch-icon.png',
    '/assets/favicon/icon-192.png',
    '/assets/favicon/icon-512.png',
    '/assets/favicon/site.webmanifest'
  ];

  console.log('\nChecking asset availability via HTTP:');
  for (const asset of assetsToTest) {
    const resp = await page.goto(`http://localhost:8080${asset}`);
    console.log(`   [HTTP ${resp.status()}] ${asset} (content-type: ${resp.headers()['content-type']})`);
  }

  // Create a realistic browser tab visualization showing the tab bar with favicon and title
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });

  // Let's create an HTML mockup showing the actual browser window / tab bar with the favicon
  const tabPreviewHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background: #1e1e1e; padding: 24px; display: flex; justify-content: center; }
    .browser-window {
      width: 900px;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
    }
    .browser-header {
      background: #2b2a33;
      padding: 8px 12px 0 12px;
      user-select: none;
    }
    .window-controls {
      display: flex;
      gap: 8px;
      padding: 4px 6px 10px 4px;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
    }
    .dot-close { background: #ff5f56; }
    .dot-min { background: #ffbd2e; }
    .dot-max { background: #27c93f; }
    .tab-strip {
      display: flex;
      align-items: flex-end;
      gap: 6px;
    }
    .tab {
      background: #42414d;
      color: #fbfbfe;
      height: 36px;
      padding: 0 14px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      font-weight: 500;
      max-width: 280px;
      position: relative;
    }
    .tab.active {
      background: #1c1b22;
      color: #ffffff;
    }
    .tab-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .tab-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .tab-close {
      opacity: 0.6;
      font-size: 14px;
      margin-left: 4px;
      cursor: pointer;
    }
    .new-tab-btn {
      color: #9f9ea7;
      font-size: 18px;
      padding: 0 8px 6px 8px;
    }
    .navbar {
      background: #1c1b22;
      padding: 8px 12px 10px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .nav-buttons {
      display: flex;
      gap: 12px;
      color: #8f8e97;
      font-size: 14px;
    }
    .url-bar {
      flex: 1;
      background: #2b2a33;
      border-radius: 20px;
      height: 32px;
      display: flex;
      align-items: center;
      padding: 0 14px;
      color: #fbfbfe;
      font-size: 13px;
      gap: 8px;
    }
    .url-bar .lock {
      color: #27c93f;
      font-size: 12px;
    }
    .url-bar .domain {
      font-weight: 600;
      color: #fff;
    }
    .url-bar .path {
      color: #9f9ea7;
    }
    .page-preview {
      border-top: 1px solid #1c1b22;
      height: 480px;
      overflow: hidden;
      background: #f8fafc;
    }
    .page-preview iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .favicon-showcase {
      margin-top: 24px;
      padding: 20px;
      background: #2b2a33;
      border-radius: 8px;
      color: #ffffff;
    }
    .showcase-grid {
      display: flex;
      gap: 24px;
      align-items: flex-end;
      margin-top: 14px;
    }
    .showcase-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #ccc;
    }
    .showcase-item img {
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="browser-window">
    <div class="browser-header">
      <div class="window-controls">
        <span class="dot dot-close"></span>
        <span class="dot dot-min"></span>
        <span class="dot dot-max"></span>
      </div>
      <div class="tab-strip">
        <div class="tab active">
          <img src="http://localhost:8080/assets/favicon/favicon-16x16.png" class="tab-icon" alt="favicon">
          <span class="tab-title">Golden Hypermarket | Pala, Kerala - Since 1964</span>
          <span class="tab-close">×</span>
        </div>
        <div class="tab">
          <img src="http://localhost:8080/assets/favicon/favicon-16x16.png" class="tab-icon" alt="favicon">
          <span class="tab-title">Shop by Category</span>
          <span class="tab-close">×</span>
        </div>
        <div class="new-tab-btn">+</div>
      </div>
    </div>
    <div class="navbar">
      <div class="nav-buttons">
        <span>←</span>
        <span>→</span>
        <span>↻</span>
      </div>
      <div class="url-bar">
        <span class="lock">🔒</span>
        <span class="domain">goldenhypermarket.in</span><span class="path">/index.html</span>
      </div>
    </div>
    <div class="page-preview">
      <iframe src="http://localhost:8080/index.html"></iframe>
    </div>
    <div class="favicon-showcase">
      <div style="font-weight: 700; font-size: 14px; color: #f7c948;">GENERATED FAVICON & ICON SET IN /assets/favicon/</div>
      <div class="showcase-grid">
        <div class="showcase-item">
          <img src="http://localhost:8080/assets/favicon/favicon-16x16.png" width="16" height="16">
          <span>16x16</span>
        </div>
        <div class="showcase-item">
          <img src="http://localhost:8080/assets/favicon/favicon-32x32.png" width="32" height="32">
          <span>32x32</span>
        </div>
        <div class="showcase-item">
          <img src="http://localhost:8080/assets/favicon/apple-touch-icon.png" width="60" height="60">
          <span>180x180</span>
        </div>
        <div class="showcase-item">
          <img src="http://localhost:8080/assets/favicon/icon-192.png" width="72" height="72">
          <span>192x192</span>
        </div>
        <div class="showcase-item">
          <img src="http://localhost:8080/assets/favicon/icon-512.png" width="96" height="96">
          <span>512x512</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

  const previewPath = path.join(rootDir, 'assets', 'tab-preview.html');
  fs.writeFileSync(previewPath, tabPreviewHtml, 'utf-8');

  await page.goto('http://localhost:8080/assets/tab-preview.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const screenshotPath = path.join(rootDir, 'assets', 'browser-tab-screenshot.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved tab verification screenshot to: ${screenshotPath}`);

  await browser.close();
  server.close();
  console.log('All verifications complete!');
});
