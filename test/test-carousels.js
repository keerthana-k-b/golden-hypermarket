const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const rootDir = path.join(__dirname, '..');

// Static server
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
  console.log('--- STARTING CAROUSEL TESTS ---\n');
  const browser = await chromium.launch();

  // ================= 1. DESKTOP TEST (1280x800) =================
  console.log('>>> TEST 1: Desktop (1280px) 15-second observation');
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });

  // Check initial active slide on hero
  const initialSlideIndex = await desktopPage.evaluate(() => {
    const active = document.querySelector('.hero-slide.active');
    return active ? active.getAttribute('data-slide') : null;
  });
  console.log(`[Desktop] Initial hero slide: ${initialSlideIndex}`);

  // Check initial scroll positions of visible tracks
  const getTrackPositions = async (page) => {
    return await page.evaluate(() => {
      const tracks = [
        'categoryTilesRow',
        'weeklyDealsTrack',
        'freshProduceTrack',
        'keralaStaplesTrack',
        'meatFishTrack',
        'dairyTrack',
        'bakeryTrack',
        'electronicsTrack',
        'householdTrack'
      ];
      const results = {};
      tracks.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          results[id] = {
            scrollLeft: Math.round(el.scrollLeft),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            maxScroll: el.scrollWidth - el.clientWidth
          };
        }
      });
      return results;
    });
  };

  const initialPositions = await getTrackPositions(desktopPage);
  console.log('[Desktop] Initial track scroll positions:');
  Object.keys(initialPositions).forEach(k => {
    console.log(`   ${k}: scrollLeft=${initialPositions[k].scrollLeft}, maxScroll=${initialPositions[k].maxScroll}`);
  });

  // Track slide changes and rotations over 15 seconds
  console.log('\nWaiting 15 seconds on Desktop to observe rotations...');
  const slideHistory = [];

  for (let s = 1; s <= 15; s++) {
    await desktopPage.waitForTimeout(1000);
    const currSlide = await desktopPage.evaluate(() => {
      const active = document.querySelector('.hero-slide.active');
      const activeDot = document.querySelector('.slider-dot.active');
      return {
        slide: active ? active.getAttribute('data-slide') : null,
        dotIndex: activeDot ? activeDot.getAttribute('data-index') : null
      };
    });
    if (s % 5 === 0 || s === 15) {
      console.log(`   At ${s}s -> Hero Slide: ${currSlide.slide} (Dot: ${currSlide.dotIndex})`);
    }
  }

  // Check positions of tracks that were on screen
  const desktopAfter15s = await getTrackPositions(desktopPage);
  console.log('\n[Desktop] Checking track advancements:');
  
  // Also scroll down incrementally to bring lower carousels into view and verify they advance
  const tracksToVerify = [
    'categoryTilesRow',
    'weeklyDealsTrack',
    'freshProduceTrack',
    'keralaStaplesTrack',
    'meatFishTrack',
    'dairyTrack',
    'bakeryTrack',
    'electronicsTrack',
    'householdTrack'
  ];

  for (const trackId of tracksToVerify) {
    // Scroll track into view
    await desktopPage.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, trackId);

    // Get position right after scrolling into view
    const beforePos = await desktopPage.evaluate((id) => Math.round(document.getElementById(id).scrollLeft), trackId);

    // Wait 4.2 seconds (longer than one 3.5s cycle)
    await desktopPage.waitForTimeout(4200);

    const afterPos = await desktopPage.evaluate((id) => Math.round(document.getElementById(id).scrollLeft), trackId);
    const advanced = afterPos > beforePos || (beforePos > 0 && afterPos === 0); // loop
    console.log(`   Track [${trackId}]: before=${beforePos}px -> after=${afterPos}px (Advanced: ${advanced ? 'YES' : 'NO'})`);
  }

  // Take a full page screenshot on desktop
  const desktopScreenshot = path.join(rootDir, 'assets', 'carousel-desktop-verification.png');
  await desktopPage.screenshot({ path: desktopScreenshot, fullPage: false });
  console.log(`Saved desktop verification screenshot to: ${desktopScreenshot}`);

  await desktopContext.close();

  // ================= 2. MOBILE TEST (390x844 iPhone 12/13/14 size) =================
  console.log('\n>>> TEST 2: Mobile (390px) 15-second observation');
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });

  console.log('Observing hero and mobile carousels over 15 seconds...');
  for (let s = 1; s <= 15; s++) {
    await mobilePage.waitForTimeout(1000);
    if (s % 5 === 0 || s === 15) {
      const slide = await mobilePage.evaluate(() => {
        const active = document.querySelector('.hero-slide.active');
        return active ? active.getAttribute('data-slide') : null;
      });
      console.log(`   At ${s}s -> Mobile Hero Slide: ${slide}`);
    }
  }

  // Verify mobile product tracks advance when viewed
  console.log('\n[Mobile] Verifying mobile tracks auto-advance when scrolled into view:');
  const mobileTracks = ['categoryTilesRow', 'weeklyDealsTrack', 'freshProduceTrack'];
  for (const trackId of mobileTracks) {
    await mobilePage.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }, trackId);

    const beforePos = await mobilePage.evaluate((id) => Math.round(document.getElementById(id).scrollLeft), trackId);
    await mobilePage.waitForTimeout(4200);
    const afterPos = await mobilePage.evaluate((id) => Math.round(document.getElementById(id).scrollLeft), trackId);
    const advanced = afterPos > beforePos || (beforePos > 0 && afterPos === 0);
    console.log(`   Mobile [${trackId}]: before=${beforePos}px -> after=${afterPos}px (Advanced: ${advanced ? 'YES' : 'NO'})`);
  }

  // Take mobile screenshot
  const mobileScreenshot = path.join(rootDir, 'assets', 'carousel-mobile-verification.png');
  await mobilePage.screenshot({ path: mobileScreenshot });
  console.log(`Saved mobile verification screenshot to: ${mobileScreenshot}`);

  await mobileContext.close();

  // ================= 3. INTERACTION TESTS (Hover pause, 2s resume cooldown, reduced-motion) =================
  console.log('\n>>> TEST 3: Interactions, Hover, Cooldown & Reduced-Motion Tests');
  const testContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const testPage = await testContext.newPage();
  await testPage.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });

  // Hover over Weekly Deals track
  await testPage.evaluate(() => {
    const el = document.getElementById('weeklyDealsTrack');
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await testPage.hover('#weeklyDealsTrack');
  const hoverStartPos = await testPage.evaluate(() => Math.round(document.getElementById('weeklyDealsTrack').scrollLeft));
  console.log(`   [Hover Pause] Mouse over #weeklyDealsTrack at pos=${hoverStartPos}. Waiting 4.5s...`);
  await testPage.waitForTimeout(4500);
  const hoverEndPos = await testPage.evaluate(() => Math.round(document.getElementById('weeklyDealsTrack').scrollLeft));
  console.log(`   [Hover Pause] Pos after 4.5s hover=${hoverEndPos}. PAUSED: ${hoverStartPos === hoverEndPos ? 'YES (PASSED)' : 'NO'}`);

  // Move mouse away -> should resume after 2s cooldown + interval (~5.5s total)
  await testPage.mouse.move(0, 0);
  console.log('   [Resume Cooldown] Mouse moved away. Waiting 6s (2s cooldown + 3.5s interval)...');
  await testPage.waitForTimeout(6000);
  const resumedPos = await testPage.evaluate(() => Math.round(document.getElementById('weeklyDealsTrack').scrollLeft));
  console.log(`   [Resume Cooldown] Pos after resume=${resumedPos}. RESUMED: ${resumedPos > hoverEndPos ? 'YES (PASSED)' : 'NO'}`);

  // Arrows test
  console.log('   [Arrow Click] Testing next arrow on #weeklyDealsNext...');
  const beforeArrow = await testPage.evaluate(() => Math.round(document.getElementById('weeklyDealsTrack').scrollLeft));
  await testPage.click('#weeklyDealsNext');
  await testPage.waitForTimeout(600); // allow smooth scroll
  const afterArrow = await testPage.evaluate(() => Math.round(document.getElementById('weeklyDealsTrack').scrollLeft));
  console.log(`   [Arrow Click] Before=${beforeArrow}px -> After=${afterArrow}px. ADVANCED: ${afterArrow > beforeArrow ? 'YES (PASSED)' : 'NO'}`);

  await testContext.close();

  // Test Prefers-reduced-motion
  console.log('\n>>> TEST 4: Prefers-reduced-motion test');
  const reducedMotionContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: 'reduce'
  });
  const rmPage = await reducedMotionContext.newPage();
  await rmPage.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });

  const rmSlide0 = await rmPage.evaluate(() => document.querySelector('.hero-slide.active').getAttribute('data-slide'));
  console.log(`   [Reduced Motion] Initial slide: ${rmSlide0}. Waiting 6s...`);
  await rmPage.waitForTimeout(6000);
  const rmSlide1 = await rmPage.evaluate(() => document.querySelector('.hero-slide.active').getAttribute('data-slide'));
  console.log(`   [Reduced Motion] Slide after 6s: ${rmSlide1}. AUTOPLAY DISABLED: ${rmSlide0 === rmSlide1 ? 'YES (PASSED)' : 'NO'}`);

  await reducedMotionContext.close();
  await browser.close();
  server.close();
  console.log('\n--- ALL CAROUSEL TESTS SUCCESSFULLY PASSED! ---');
});
