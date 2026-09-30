const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SHOTS_DIR = path.join(__dirname, 'shots');
if (!fs.existsSync(SHOTS_DIR)) {
  fs.mkdirSync(SHOTS_DIR, { recursive: true });
}

const PAGES = [
  { name: 'index', url: 'http://localhost:8080/index.html' },
  { name: 'category', url: 'http://localhost:8080/category.html?cat=dairy' },
  { name: 'product', url: 'http://localhost:8080/product.html?id=1' },
  { name: 'cart', url: 'http://localhost:8080/cart.html' }
];

const VIEWPORTS = [
  { name: 'desktop', width: 1366, height: 768, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true }
];

async function runStickyHeaderAudit() {
  console.log('📌 Starting Sticky Header & Scroll Behavior Audit (1366px & 390px)...\n');

  const browser = await chromium.launch({ headless: true });
  const results = [];

  const logTest = (pageName, vpName, desc, passed, detail = '') => {
    results.push({ page: pageName, vp: vpName, desc, passed, detail });
    console.log(`${passed ? '✅ [PASS]' : '❌ [FAIL]'} [${pageName} @ ${vpName}] ${desc} ${detail ? '(' + detail + ')' : ''}`);
  };

  for (const vp of VIEWPORTS) {
    console.log(`\n======================================================`);
    console.log(`🖥️  Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`======================================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      userAgent: vp.isMobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
        : undefined
    });

    // Seed cart data for cart tests
    await context.addInitScript(() => {
      try {
        localStorage.setItem('golden_hypermarket_cart', JSON.stringify([
          { id: 1, qty: 2 },
          { id: 401, qty: 1 }
        ]));
        localStorage.setItem('golden_hypermarket_wishlist', JSON.stringify([101, 201]));
      } catch (e) {}
    });

    for (const pDef of PAGES) {
      const page = await context.newPage();
      try {
        await page.goto(pDef.url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(400);

        // 1. Initial State at Top (scrollY = 0)
        const topCheck = await page.evaluate(() => {
          const hdr = document.getElementById('site-header-container') || document.querySelector('.site-header-wrapper');
          const utilBar = document.querySelector('.hdr-utility-bar');
          const rect = hdr ? hdr.getBoundingClientRect() : null;
          return {
            isAtTop: rect ? Math.abs(rect.top) <= 2 : false,
            utilHeight: utilBar ? utilBar.offsetHeight : 0,
            hasHideUtility: hdr ? hdr.classList.contains('hide-utility') : false,
            hasShadow: hdr ? hdr.classList.contains('header-scrolled') : false
          };
        });

        logTest(pDef.name, vp.name, 'Header sits at top at scrollY=0', topCheck.isAtTop);

        // 2. Scroll down to mid-scroll (e.g., 500px down)
        await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
        await page.waitForTimeout(300);

        // Take mid-scroll screenshot (viewport only, capturing visible sticky header and page content mid-scroll)
        const midShotPath = path.join(SHOTS_DIR, `midscroll_${pDef.name}_${vp.width}.png`);
        await page.screenshot({ path: midShotPath, fullPage: false });

        const midCheck = await page.evaluate(() => {
          const hdr = document.getElementById('site-header-container') || document.querySelector('.site-header-wrapper');
          const wrapper = document.querySelector('.site-header-wrapper');
          const utilBar = document.querySelector('.hdr-utility-bar');
          const mainRow = document.querySelector('.hdr-main-row');
          const navRow = document.querySelector('.hdr-category-bar');
          const bottomNav = document.querySelector('.mobile-bottom-nav');
          const rect = hdr ? hdr.getBoundingClientRect() : null;
          const utilRect = utilBar ? utilBar.getBoundingClientRect() : null;

          return {
            isStickyAtTop: rect ? Math.abs(rect.top) <= 2 : false,
            utilCollapsed: utilRect ? utilRect.height <= 2 : true,
            hasHideUtility: hdr && (hdr.classList.contains('hide-utility') || (wrapper && wrapper.classList.contains('hide-utility'))),
            hasShadow: hdr && (hdr.classList.contains('header-scrolled') || (wrapper && wrapper.classList.contains('header-scrolled'))),
            mainRowVisible: mainRow ? mainRow.offsetHeight > 0 : false,
            navRowVisible: navRow ? navRow.offsetHeight > 0 : false,
            bottomNavFixed: bottomNav ? Math.abs(bottomNav.getBoundingClientRect().bottom - window.innerHeight) <= 2 : false
          };
        });

        logTest(pDef.name, vp.name, 'Header remains sticky at top during mid-scroll', midCheck.isStickyAtTop);
        logTest(pDef.name, vp.name, 'Utility bar collapses on scroll down past 80px', midCheck.utilCollapsed || midCheck.hasHideUtility, `collapsed=${midCheck.utilCollapsed}`);
        logTest(pDef.name, vp.name, 'Soft shadow applied on scroll', midCheck.hasShadow);
        logTest(pDef.name, vp.name, 'Main header and nav remain visible mid-scroll', midCheck.mainRowVisible);

        if (vp.isMobile) {
          logTest(pDef.name, vp.name, 'Bottom tab bar remains fixed at bottom', midCheck.bottomNavFixed);
        }

        // 3. Scroll up slightly (e.g. from 500 to 350) to test utility bar reveal
        await page.evaluate(() => window.scrollTo({ top: 350, behavior: 'instant' }));
        await page.waitForTimeout(300);

        const scrollUpCheck = await page.evaluate(() => {
          const hdr = document.getElementById('site-header-container') || document.querySelector('.site-header-wrapper');
          const wrapper = document.querySelector('.site-header-wrapper');
          return !(hdr && (hdr.classList.contains('hide-utility') || (wrapper && wrapper.classList.contains('hide-utility'))));
        });

        logTest(pDef.name, vp.name, 'Utility bar reveals again on scroll up', scrollUpCheck);

        // 4. Scroll to bottom
        await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
        await page.waitForTimeout(300);

        const bottomCheck = await page.evaluate(() => {
          const hdr = document.getElementById('site-header-container') || document.querySelector('.site-header-wrapper');
          const rect = hdr ? hdr.getBoundingClientRect() : null;
          const hasOverflow = document.documentElement.scrollWidth > window.innerWidth;
          return {
            isStickyAtTop: rect ? Math.abs(rect.top) <= 2 : false,
            noOverflow: !hasOverflow
          };
        });

        logTest(pDef.name, vp.name, 'Header remains sticky at bottom of page', bottomCheck.isStickyAtTop);
        logTest(pDef.name, vp.name, 'Zero horizontal overflow at bottom', bottomCheck.noOverflow);

      } catch (err) {
        console.error(`Error on ${pDef.name} @ ${vp.name}:`, err);
        logTest(pDef.name, vp.name, 'Page execution', false, err.message);
      } finally {
        await page.close();
      }
    }

    await context.close();
  }

  await browser.close();

  // Summary
  const failed = results.filter(r => !r.passed);
  console.log('\n======================================================');
  console.log(`📊 Sticky Header Audit Summary: ${results.length - failed.length}/${results.length} PASSED`);
  if (failed.length > 0) {
    console.log(`❌ Failures (${failed.length}):`);
    failed.forEach(f => console.log(`   - [${f.page} @ ${f.vp}] ${f.desc}: ${f.detail}`));
  } else {
    console.log('🎉 ALL STICKY HEADER & SCROLL TESTS PASSED (1366px & 390px)!');
  }
  console.log('======================================================\n');
}

runStickyHeaderAudit();
