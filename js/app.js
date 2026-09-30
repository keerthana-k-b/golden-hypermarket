// Golden Hypermarket Pala - Main Interactive Controller (js/app.js)

document.addEventListener('DOMContentLoaded', () => {
  if (window.SiteComponents) {
    SiteComponents.init({ page: 'home' });
  }
  initHeroSlider();
  initStickyHeader();
  initCategoryCarouselScroll();
  initCarouselsFromData();
  initHeaderSearchForm();
});

/* ================= HERO SLIDER LOGIC ================= */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const sliderWrapper = document.getElementById('heroSlider');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 5500;

  function showSlide(index) {
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(index);
      startAutoplay();
    });
  });

  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoplay);
    sliderWrapper.addEventListener('mouseleave', startAutoplay);
  }

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (sliderWrapper) {
    sliderWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        showSlide(currentSlide + 1);
        startAutoplay();
      } else if (touchEndX - touchStartX > 50) {
        showSlide(currentSlide - 1);
        startAutoplay();
      }
    }, { passive: true });
  }

  startAutoplay();
}

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

/* ================= CATEGORY CAROUSEL SCROLL LOGIC ================= */
function initCategoryCarouselScroll() {
  const container = document.getElementById('categoryTilesRow');
  const prevBtn = document.getElementById('catScrollPrev');
  const nextBtn = document.getElementById('catScrollNext');

  if (!container) return;
  const scrollAmount = 320;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

  // Setup carousel arrows for all 8 carousels
  setupTrackArrowNav('weeklyDealsPrev', 'weeklyDealsNext', 'weeklyDealsTrack');
  setupTrackArrowNav('freshProducePrev', 'freshProduceNext', 'freshProduceTrack');
  setupTrackArrowNav('keralaStaplesPrev', 'keralaStaplesNext', 'keralaStaplesTrack');
  setupTrackArrowNav('meatFishPrev', 'meatFishNext', 'meatFishTrack');
  setupTrackArrowNav('dairyPrev', 'dairyNext', 'dairyTrack');
  setupTrackArrowNav('bakeryPrev', 'bakeryNext', 'bakeryTrack');
  setupTrackArrowNav('electronicsPrev', 'electronicsNext', 'electronicsTrack');
  setupTrackArrowNav('householdPrev', 'householdNext', 'householdTrack');

  // Sync cart buttons
  CartManager.syncBadges();
}

function setupTrackArrowNav(prevId, nextId, trackId) {
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const track = document.getElementById(trackId);

  if (!track) return;
  const step = 280;

  if (prev) {
    prev.addEventListener('click', () => {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      track.scrollBy({ left: step, behavior: 'smooth' });
    });
  }
}
