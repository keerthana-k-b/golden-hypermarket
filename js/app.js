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

  // 1. Weekly Deals Carousel
  const weeklyDealsTrack = document.getElementById('weeklyDealsTrack');
  if (weeklyDealsTrack) {
    const deals = siteData.products.filter(p => p.isDeal).slice(0, 8);
    weeklyDealsTrack.innerHTML = deals.map(p => CartManager.renderProductCard(p)).join('');
  }

  // 2. Fresh Fruits & Vegetables Carousel
  const fruitsTrack = document.getElementById('freshProduceTrack');
  if (fruitsTrack) {
    const produceItems = siteData.products.filter(p => p.category === 'produce' || p.category === 'fruits').slice(0, 8);
    fruitsTrack.innerHTML = produceItems.map(p => CartManager.renderProductCard(p)).join('');
  }

  // 3. Kerala Special Staples Carousel
  const staplesTrack = document.getElementById('keralaStaplesTrack');
  if (staplesTrack) {
    const staplesItems = siteData.getProductsByCategory('grocery').slice(0, 8);
    staplesTrack.innerHTML = staplesItems.map(p => CartManager.renderProductCard(p)).join('');
  }

  // 4. Fresh Meat & Seafood Carousel
  const meatFishTrack = document.getElementById('meatFishTrack');
  if (meatFishTrack) {
    const meatItems = siteData.getProductsByCategory('meat-fish').slice(0, 8);
    meatFishTrack.innerHTML = meatItems.map(p => CartManager.renderProductCard(p)).join('');
  }

  // 5. Dairy, Butter & Farm Eggs Carousel
  const dairyTrack = document.getElementById('dairyTrack');
  if (dairyTrack) {
    const dairyItems = siteData.getProductsByCategory('dairy').slice(0, 8);
    dairyTrack.innerHTML = dairyItems.map(p => CartManager.renderProductCard(p)).join('');
  }

  // 6. Bakery & Traditional Snacks Carousel
  const bakeryTrack = document.getElementById('bakeryTrack');
  if (bakeryTrack) {
    const bakeryItems = siteData.getProductsByCategory('bakery').slice(0, 8);
    bakeryTrack.innerHTML = bakeryItems.map(p => CartManager.renderProductCard(p)).join('');
  }

  // 7. Kitchen Appliances & Electronics Carousel
  const electronicsTrack = document.getElementById('electronicsTrack');
  if (electronicsTrack) {
    const electronicsItems = siteData.getProductsByCategory('electronics').slice(0, 8);
    electronicsTrack.innerHTML = electronicsItems.map(p => CartManager.renderProductCard(p)).join('');
  }

  // 8. Household & Cleaning Essentials Carousel
  const householdTrack = document.getElementById('householdTrack');
  if (householdTrack) {
    const householdItems = siteData.getProductsByCategory('household').slice(0, 8);
    householdTrack.innerHTML = householdItems.map(p => CartManager.renderProductCard(p)).join('');
  }

  // Sync cart buttons
  CartManager.syncBadges();
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
