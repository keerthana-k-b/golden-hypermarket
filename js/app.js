// Golden Hypermarket Pala - Main Interactive Controller (js/app.js)

document.addEventListener('DOMContentLoaded', () => {
  if (window.SiteComponents) {
    SiteComponents.init({ page: 'home' });
  }

  initStickyHeader();
  initCarouselsFromData(); // Renders product cards into DOM tracks

  // Initialize unified carousel system (Hero, Category, and all Product carousels)
  if (window.initAllCarousels) {
    window.initAllCarousels();
  }

  initHeaderSearchForm();
  initFooterAccordion();
});

/* ================= STICKY HEADER ELEVATION ================= */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ================= HEADER SEARCH FORM SUBMIT ================= */
function initHeaderSearchForm() {
  const form = document.getElementById('headerSearchForm') || document.querySelector('.header-search-wrapper');
  const searchInput = document.getElementById('mainSearchInput');
  const searchCat = document.getElementById('searchCategory');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');

  const doSearch = () => {
    if (!searchInput) return;
    const q = encodeURIComponent(searchInput.value.trim());
    const cat = searchCat ? encodeURIComponent(searchCat.value) : 'all';
    window.location.href = `search.html?q=${q}&cat=${cat}`;
  };

  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      doSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
    });
  }
}

/* ================= POPULATE 8 PRODUCT CAROUSELS ================= */
function initCarouselsFromData() {
  if (typeof siteData === 'undefined') return;

  // 1. Fresh Fruits & Vegetables Carousel (Top 6 best images)
  const fruitsTrack = document.getElementById('freshProduceTrack');
  if (fruitsTrack) {
    const produceIds = [204, 205, 207, 101, 104, 109];
    const produceItems = produceIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    fruitsTrack.innerHTML = produceItems.map(p => SiteComponents.renderProductCard(p)).join('');
  }

  // 2. Fresh Meat & Seafood Carousel (Top 6 best images)
  const meatFishTrack = document.getElementById('meatFishTrack');
  if (meatFishTrack) {
    const meatIds = [301, 302, 303, 304, 307, 308];
    const meatItems = meatIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    meatFishTrack.innerHTML = meatItems.map(p => SiteComponents.renderProductCard(p)).join('');
  }

  // 3. Dairy, Butter & Farm Eggs Carousel (Top 6 best images)
  const dairyTrack = document.getElementById('dairyTrack');
  if (dairyTrack) {
    const dairyIds = [404, 405, 402, 408, 403, 401];
    const dairyItems = dairyIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    dairyTrack.innerHTML = dairyItems.map(p => SiteComponents.renderProductCard(p)).join('');
  }

  // 4. Household & Cleaning Essentials Carousel (Top 6 best images)
  const householdTrack = document.getElementById('householdTrack');
  if (householdTrack) {
    const householdIds = [601, 602, 603, 604, 605, 606];
    const householdItems = householdIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    householdTrack.innerHTML = householdItems.map(p => SiteComponents.renderProductCard(p)).join('');
  }

  // 5. Weekly Deals Carousel (Top 6 best deals)
  const weeklyDealsTrack = document.getElementById('weeklyDealsTrack');
  if (weeklyDealsTrack) {
    const dealIds = [1, 2, 3, 4, 5, 204];
    const deals = dealIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    weeklyDealsTrack.innerHTML = deals.map(p => SiteComponents.renderProductCard(p)).join('');
  }

  // 6. Kerala Special Staples Carousel (Top 6 best images)
  const staplesTrack = document.getElementById('keralaStaplesTrack');
  if (staplesTrack) {
    const staplesIds = [1, 2, 3, 4, 5, 7];
    const staplesItems = staplesIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    staplesTrack.innerHTML = staplesItems.map(p => SiteComponents.renderProductCard(p)).join('');
  }

  // 7. Bakery & Traditional Snacks Carousel (Top 6 best images)
  const bakeryTrack = document.getElementById('bakeryTrack');
  if (bakeryTrack) {
    const bakeryIds = [501, 504, 507, 508, 502, 503];
    const bakeryItems = bakeryIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    bakeryTrack.innerHTML = bakeryItems.map(p => SiteComponents.renderProductCard(p)).join('');
  }

  // 8. Kitchen Appliances & Electronics Carousel (Top 6 best images)
  const electronicsTrack = document.getElementById('electronicsTrack');
  if (electronicsTrack) {
    const electronicsIds = [801, 802, 804, 807, 806, 805];
    const electronicsItems = electronicsIds.map(id => siteData.products.find(p => p.id === id)).filter(Boolean);
    electronicsTrack.innerHTML = electronicsItems.map(p => SiteComponents.renderProductCard(p)).join('');
  }
}

/* ================= FOOTER ACCORDION FOR MOBILE ================= */
function initFooterAccordion() {
  document.querySelectorAll('.footer-heading').forEach(heading => {
    heading.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const col = heading.closest('.footer-col');
        if (col && !col.classList.contains('brand-col')) {
          col.classList.toggle('open');
        }
      }
    });
  });
}
