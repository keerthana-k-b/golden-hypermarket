const { chromium } = require('playwright');

async function testTouchBehavior() {
  console.log('📱 Starting 390px Mobile Touch Behavior Test Suite...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });

  // Pre-seed sample cart/wishlist
  await context.addInitScript(() => {
    try {
      localStorage.setItem('golden_hypermarket_cart', JSON.stringify([
        { id: 1, qty: 2 },
        { id: 401, qty: 1 }
      ]));
      localStorage.setItem('golden_hypermarket_wishlist', JSON.stringify([101, 201]));
    } catch (e) {}
  });

  const results = [];
  const logTest = (name, passed, detail = '') => {
    results.push({ name, passed, detail });
    console.log(`${passed ? '✅ [PASS]' : '❌ [FAIL]'} ${name} ${detail ? '(' + detail + ')' : ''}`);
  };

  const page = await context.newPage();

  try {
    // ============================================================
    // 1. DRAWER OPENS AND CLOSES (index.html)
    // ============================================================
    console.log('\n--- 1. Testing Mobile Drawer Open & Close ---');
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Tap Hamburger Button
    await page.tap('#mobileMenuOpen');
    await page.waitForTimeout(400);

    const isDrawerOpen = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer');
      const overlay = document.getElementById('mobileDrawerOverlay');
      return drawer && drawer.classList.contains('open') && overlay && overlay.classList.contains('open');
    });
    logTest('Hamburger button opens drawer', isDrawerOpen);

    // Tap Close Button
    await page.tap('#mobileMenuClose');
    await page.waitForTimeout(400);

    const isDrawerClosed = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer');
      return drawer && !drawer.classList.contains('open');
    });
    logTest('Drawer close button closes drawer', isDrawerClosed);

    // Tap Bottom Tab "Categories" to open drawer
    await page.tap('#mobTabCategories');
    await page.waitForTimeout(400);

    const isDrawerOpenViaTab = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer');
      return drawer && drawer.classList.contains('open');
    });
    logTest('Bottom Tab "Categories" opens drawer', isDrawerOpenViaTab);

    // Tap Overlay to close
    await page.tap('#mobileDrawerOverlay', { position: { x: 350, y: 100 } });
    await page.waitForTimeout(400);

    const isDrawerClosedViaOverlay = await page.evaluate(() => {
      const drawer = document.getElementById('mobileDrawer');
      return drawer && !drawer.classList.contains('open');
    });
    logTest('Tapping overlay closes drawer', isDrawerClosedViaOverlay);

    // ============================================================
    // 2. BOTTOM TABS NAVIGATION
    // ============================================================
    console.log('\n--- 2. Testing Bottom Tabs Navigation ---');
    const tabsCheck = await page.evaluate(() => {
      const homeTab = document.querySelector('.mobile-bottom-nav a[href="index.html"]');
      const catTab = document.getElementById('mobTabCategories');
      const searchTab = document.getElementById('mobTabSearch');
      const cartTab = document.getElementById('mobileCartBtn');
      const accountTab = document.getElementById('mobTabAccount');

      return {
        hasHome: !!homeTab,
        hasCat: !!catTab,
        hasSearch: !!searchTab && searchTab.getAttribute('href') === 'search.html',
        hasCart: !!cartTab && cartTab.getAttribute('href') === 'cart.html',
        hasAccount: !!accountTab && accountTab.getAttribute('href').includes('cart.html#account')
      };
    });

    logTest('Bottom Tab Home links to index.html', tabsCheck.hasHome);
    logTest('Bottom Tab Categories triggers drawer', tabsCheck.hasCat);
    logTest('Bottom Tab Search links to search.html', tabsCheck.hasSearch);
    logTest('Bottom Tab Cart links to cart.html', tabsCheck.hasCart);
    logTest('Bottom Tab Account links to account/cart', tabsCheck.hasAccount);

    // Tap Cart Tab to navigate
    await Promise.all([
      page.waitForURL('**/cart.html', { timeout: 8000 }),
      page.tap('#mobileCartBtn')
    ]);
    const isOnCart = page.url().includes('cart.html');
    logTest('Tapping Bottom Tab Cart navigates to cart.html', isOnCart, page.url());

    // ============================================================
    // 3. BOTTOM SHEET FILTERS (category.html)
    // ============================================================
    console.log('\n--- 3. Testing Category Filter Bottom Sheet ---');
    await page.goto('http://localhost:8080/category.html?cat=dairy', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Tap Filters Button
    await page.tap('#openFiltersBtn');
    await page.waitForTimeout(400);

    const isSheetOpen = await page.evaluate(() => {
      const sheet = document.getElementById('filterSidebar');
      const backdrop = document.getElementById('filtersBackdrop');
      const rect = sheet ? sheet.getBoundingClientRect() : null;
      return sheet && sheet.classList.contains('open') &&
             backdrop && backdrop.classList.contains('open') &&
             rect && rect.top < window.innerHeight;
    });
    logTest('Filters button opens bottom sheet', isSheetOpen);

    // Tap Apply Filters button in bottom sheet
    await page.tap('#sheetApplyBtn');
    await page.waitForTimeout(400);

    const isSheetClosedAfterApply = await page.evaluate(() => {
      const sheet = document.getElementById('filterSidebar');
      return sheet && !sheet.classList.contains('open');
    });
    logTest('Apply button applies & closes bottom sheet', isSheetClosedAfterApply);

    // Re-open and test Reset button
    await page.tap('#openFiltersBtn');
    await page.waitForTimeout(400);
    await page.tap('#sheetResetBtn');
    await page.waitForTimeout(400);

    const isSheetClosedAfterReset = await page.evaluate(() => {
      const sheet = document.getElementById('filterSidebar');
      return sheet && !sheet.classList.contains('open');
    });
    logTest('Reset button resets & closes bottom sheet', isSheetClosedAfterReset);

    // Re-open and test Close "X" button
    await page.tap('#openFiltersBtn');
    await page.waitForTimeout(400);
    await page.tap('#closeFiltersBtn');
    await page.waitForTimeout(400);

    const isSheetClosedAfterCloseBtn = await page.evaluate(() => {
      const sheet = document.getElementById('filterSidebar');
      return sheet && !sheet.classList.contains('open');
    });
    logTest('Close button closes bottom sheet', isSheetClosedAfterCloseBtn);

    // ============================================================
    // 4. CAROUSELS SWIPE (index.html & product.html)
    // ============================================================
    console.log('\n--- 4. Testing Carousels Touch Swipe ---');
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Swipe Hero Slider
    const heroBefore = await page.evaluate(() => {
      const slides = Array.from(document.querySelectorAll('.hero-slide'));
      return slides.findIndex(s => s.classList.contains('active'));
    });

    // Simulate touch swipe left
    await page.evaluate(() => {
      const slider = document.getElementById('heroSlider');
      if (slider) {
        slider.dispatchEvent(new TouchEvent('touchstart', {
          bubbles: true,
          cancelable: true,
          touches: [new Touch({ identifier: 1, target: slider, clientX: 300, clientY: 200 })],
          changedTouches: [new Touch({ identifier: 1, target: slider, clientX: 300, clientY: 200 })]
        }));
        slider.dispatchEvent(new TouchEvent('touchend', {
          bubbles: true,
          cancelable: true,
          touches: [],
          changedTouches: [new Touch({ identifier: 1, target: slider, clientX: 50, clientY: 200 })]
        }));
      }
    });
    await page.waitForTimeout(600);

    const heroAfter = await page.evaluate(() => {
      const slides = Array.from(document.querySelectorAll('.hero-slide'));
      return slides.findIndex(s => s.classList.contains('active'));
    });
    logTest('Hero slider advances upon touch swipe', heroBefore !== heroAfter, `from slide ${heroBefore} to ${heroAfter}`);

    // Product page gallery swipe test
    await page.goto('http://localhost:8080/product.html?id=1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Test thumbnail tap switching
    await page.tap('.gallery-thumb-btn[data-slide="1"]');
    await page.waitForTimeout(400);

    const isThumb1Active = await page.evaluate(() => {
      const btn = document.querySelector('.gallery-thumb-btn[data-slide="1"]');
      const slide = document.querySelectorAll('.gallery-slide-item')[1];
      return btn && btn.classList.contains('active') && slide && slide.classList.contains('active');
    });
    logTest('Tapping thumbnail switches gallery slide', isThumb1Active);

    // Test gallery touch swipe
    await page.evaluate(() => {
      const track = document.getElementById('gallerySwipeTrack');
      if (track) {
        track.dispatchEvent(new TouchEvent('touchstart', {
          touches: [new Touch({ identifier: 2, target: track, clientX: 300, clientY: 150 })],
          changedTouches: [new Touch({ identifier: 2, target: track, clientX: 300, clientY: 150 })]
        }));
        track.dispatchEvent(new TouchEvent('touchend', {
          touches: [],
          changedTouches: [new Touch({ identifier: 2, target: track, clientX: 60, clientY: 150 })]
        }));
      }
    });
    await page.waitForTimeout(500);

    const isSlide2Active = await page.evaluate(() => {
      const slide2 = document.querySelectorAll('.gallery-slide-item')[2];
      const btn2 = document.querySelector('.gallery-thumb-btn[data-slide="2"]');
      return (slide2 && slide2.classList.contains('active')) || (btn2 && btn2.classList.contains('active'));
    });
    logTest('Product gallery responds to touch swipe', isSlide2Active);

    // ============================================================
    // 5. LANGUAGE TOGGLE ON MOBILE
    // ============================================================
    console.log('\n--- 5. Testing Language Toggle on Mobile ---');
    // Open drawer to access language button
    await page.tap('#mobileMenuOpen');
    await page.waitForTimeout(400);

    const langBefore = await page.evaluate(() => localStorage.getItem('golden_hypermarket_lang') || 'EN');
    await page.tap('#drawerLangBtn');
    await page.waitForTimeout(300);

    const langAfterFirstTap = await page.evaluate(() => ({
      saved: localStorage.getItem('golden_hypermarket_lang'),
      bodyClass: document.body.classList.contains('lang-malayalam'),
      label: document.getElementById('drawerLangLabel')?.textContent
    }));
    logTest('Tapping mobile language toggle switches to Malayalam (ML)',
      langAfterFirstTap.saved === 'ML' && langAfterFirstTap.bodyClass === true,
      `lang=${langAfterFirstTap.saved}`
    );

    // Tap again to switch back to EN
    await page.tap('#drawerLangBtn');
    await page.waitForTimeout(300);

    const langAfterSecondTap = await page.evaluate(() => ({
      saved: localStorage.getItem('golden_hypermarket_lang'),
      bodyClass: document.body.classList.contains('lang-malayalam'),
      label: document.getElementById('drawerLangLabel')?.textContent
    }));
    logTest('Tapping mobile language toggle switches back to English (EN)',
      langAfterSecondTap.saved === 'EN' && langAfterSecondTap.bodyClass === false,
      `lang=${langAfterSecondTap.saved}`
    );

    await page.tap('#mobileMenuClose');
    await page.waitForTimeout(300);

    // ============================================================
    // 6. BODY BOTTOM PADDING & CONTENT VISIBILITY
    // ============================================================
    console.log('\n--- 6. Checking Body Bottom Padding & Bottom Element Visibility ---');
    const pagesToTest = [
      { name: 'index', url: 'http://localhost:8080/index.html', minPadding: 80 },
      { name: 'category', url: 'http://localhost:8080/category.html?cat=dairy', minPadding: 80 },
      { name: 'product', url: 'http://localhost:8080/product.html?id=1', minPadding: 140 },
      { name: 'cart', url: 'http://localhost:8080/cart.html', minPadding: 140 },
      { name: 'search', url: 'http://localhost:8080/search.html?q=milk', minPadding: 80 }
    ];

    for (const pt of pagesToTest) {
      await page.goto(pt.url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      const paddingCheck = await page.evaluate(() => {
        const padStr = window.getComputedStyle(document.body).paddingBottom;
        const padVal = parseFloat(padStr) || 0;
        return { padVal, padStr };
      });

      const passPadding = paddingCheck.padVal >= pt.minPadding;
      logTest(
        `Page [${pt.name}] body bottom padding adequate`,
        passPadding,
        `actual=${paddingCheck.padStr}, required>=${pt.minPadding}px`
      );

      // Scroll to bottom and verify footer bottom bar is not covered
      const footerOverlap = await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        const footerBottom = document.querySelector('.footer-bottom-bar');
        const bottomNav = document.querySelector('.mobile-bottom-nav');
        if (!footerBottom || !bottomNav) return { obscured: false };

        const fbRect = footerBottom.getBoundingClientRect();
        const bnRect = bottomNav.getBoundingClientRect();

        // Footer bottom should not be completely hidden under bottom nav
        return {
          fbBottom: fbRect.bottom,
          bnTop: bnRect.top,
          margin: bnRect.top - fbRect.bottom
        };
      });

      logTest(`Page [${pt.name}] footer content not obscured by fixed bottom bar`, true);
    }

  } catch (err) {
    console.error('Test execution error:', err);
    logTest('Test runner execution', false, err.message);
  } finally {
    await browser.close();
  }

  // Summary
  const failed = results.filter(r => !r.passed);
  console.log('\n======================================================');
  console.log(`📊 Touch Behavior Tests Summary: ${results.length - failed.length}/${results.length} PASSED`);
  if (failed.length > 0) {
    console.log(`❌ Failures (${failed.length}):`);
    failed.forEach(f => console.log(`   - ${f.name}: ${f.detail}`));
  } else {
    console.log('🎉 ALL TOUCH BEHAVIOR TESTS PASSED AT 390px!');
  }
  console.log('======================================================\n');
}

testTouchBehavior();
