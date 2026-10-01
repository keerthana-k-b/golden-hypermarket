// Golden Hypermarket Pala - Unified Reusable Carousel Engine (js/carousel.js)
// Supports both slide-based carousels (Hero Slider) and scrollable card tracks (Products & Categories)
// Features: auto-rotate, smooth scrolling, loop-to-start, pause on hover/touch/focus, 2s resume cooldown,
// visibility detection, IntersectionObserver off-screen pausing, and prefers-reduced-motion support.

class Carousel {
  /**
   * @param {Object} config
   * @param {HTMLElement} config.container - Outer carousel container or section
   * @param {string} [config.type='track'] - 'slide' (active class) or 'track' (horizontal scroll)
   * @param {number} [config.interval=3500] - Autoplay step interval in ms
   * @param {number} [config.startDelay=0] - Initial delay in ms before starting rotation
   * @param {number} [config.resumeDelay=2000] - Delay in ms to resume autoplay after interaction ends
   * @param {HTMLElement} [config.track] - Scrollable track container (for 'track' type)
   * @param {HTMLElement} [config.prevBtn] - Previous arrow button
   * @param {HTMLElement} [config.nextBtn] - Next arrow button
   * @param {NodeList|Array} [config.dots] - Pagination dots (for 'slide' type)
   * @param {NodeList|Array} [config.slides] - Slide elements (for 'slide' type)
   */
  constructor(config) {
    this.container = config.container;
    if (!this.container) return;

    this.type = config.type || 'track';
    this.interval = config.interval || 3500;
    this.startDelay = config.startDelay || 0;
    this.resumeDelay = config.resumeDelay || 2000;

    this.track = config.track || (this.type === 'track' ? this.container : null);
    this.prevBtn = config.prevBtn || null;
    this.nextBtn = config.nextBtn || null;
    this.dots = config.dots ? Array.from(config.dots) : [];
    this.slides = config.slides ? Array.from(config.slides) : [];

    // State management
    this.currentIndex = 0;
    this.timer = null;
    this.startTimeout = null;
    this.cooldownTimer = null;

    this.isHovered = false;
    this.isInteracting = false;
    this.isFocused = false;
    this.isOffScreen = true; // Wait for IntersectionObserver to confirm on-screen
    this.isTabHidden = document.visibilityState === 'hidden';

    // Touch gesture tracking
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;

    // Reduced motion preference
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion = this.motionQuery.matches;

    this.init();
  }

  init() {
    this.bindControls();
    this.bindInteractions();
    this.bindVisibility();
    this.bindReducedMotion();
    this.setupIntersectionObserver();

    // Start rotation with initial staggered delay
    if (this.canAutoPlay()) {
      this.scheduleInitialStart();
    }
  }

  // Check if conditions allow autoplay to advance
  canAutoPlay() {
    return (
      !this.reducedMotion &&
      !this.isTabHidden &&
      !this.isOffScreen &&
      !this.isHovered &&
      !this.isInteracting &&
      !this.isFocused &&
      !this.cooldownTimer
    );
  }

  scheduleInitialStart() {
    this.clearAllTimers();
    this.startTimeout = setTimeout(() => {
      this.startTimeout = null;
      if (this.canAutoPlay()) {
        this.startTimer();
      }
    }, this.startDelay);
  }

  startTimer() {
    this.stopTimer();
    if (!this.canAutoPlay()) return;

    this.timer = setInterval(() => {
      if (this.canAutoPlay()) {
        this.next();
      } else {
        this.stopTimer();
      }
    }, this.interval);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.startTimeout) {
      clearTimeout(this.startTimeout);
      this.startTimeout = null;
    }
  }

  clearCooldown() {
    if (this.cooldownTimer) {
      clearTimeout(this.cooldownTimer);
      this.cooldownTimer = null;
    }
  }

  // Schedule autoplay resumption after interaction cooldown (default 2s)
  scheduleResume(delay = this.resumeDelay) {
    this.clearCooldown();
    this.stopTimer();

    this.cooldownTimer = setTimeout(() => {
      this.cooldownTimer = null;
      if (this.canAutoPlay()) {
        this.startTimer();
      }
    }, delay);
  }

  next() {
    if (this.type === 'slide') {
      this.showSlide(this.currentIndex + 1);
    } else {
      this.scrollTrack(1);
    }
  }

  prev() {
    if (this.type === 'slide') {
      this.showSlide(this.currentIndex - 1);
    } else {
      this.scrollTrack(-1);
    }
  }

  // ================= SLIDE LOGIC (HERO) ================= //
  showSlide(index) {
    if (!this.slides.length) return;

    if (index >= this.slides.length) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = this.slides.length - 1;
    } else {
      this.currentIndex = index;
    }

    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.currentIndex);
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
      dot.setAttribute('aria-selected', i === this.currentIndex ? 'true' : 'false');
    });
  }

  // ================= TRACK SCROLL LOGIC (PRODUCTS / CATEGORY) ================= //
  getCardStep() {
    if (!this.track) return 280;
    const card = this.track.querySelector('.product-card, .category-tile-card, .promo-tile-card') || this.track.firstElementChild;
    if (!card) return 280;

    const style = window.getComputedStyle(this.track);
    const gap = parseFloat(style.gap) || parseFloat(style.columnGap) || 16;
    return card.offsetWidth + gap;
  }

  scrollTrack(direction = 1) {
    if (!this.track) return;

    const maxScroll = this.track.scrollWidth - this.track.clientWidth;
    if (maxScroll <= 5) return; // Track fits completely in container, no scroll needed

    const step = this.getCardStep();

    if (direction > 0) {
      // Moving Forward: loop back to start if at or near the end
      if (this.track.scrollLeft >= maxScroll - 12) {
        this.track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const target = Math.min(this.track.scrollLeft + step, maxScroll);
        this.track.scrollTo({ left: target, behavior: 'smooth' });
      }
    } else {
      // Moving Backward: loop to end if at or near the beginning
      if (this.track.scrollLeft <= 12) {
        this.track.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        const target = Math.max(this.track.scrollLeft - step, 0);
        this.track.scrollTo({ left: target, behavior: 'smooth' });
      }
    }
  }

  // ================= BINDINGS & LISTENERS ================= //
  bindControls() {
    // Next arrow
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.next();
        this.scheduleResume();
      });
    }

    // Prev arrow
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prev();
        this.scheduleResume();
      });
    }

    // Dots (for slide carousels)
    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIndex = dot.hasAttribute('data-index')
          ? parseInt(dot.getAttribute('data-index'), 10)
          : idx;
        this.showSlide(targetIndex);
        this.scheduleResume();
      });
    });
  }

  bindInteractions() {
    const targetEl = this.container;
    if (!targetEl) return;

    // 1. Hover pause / resume (2s cooldown after mouse leave)
    targetEl.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.clearCooldown();
      this.stopTimer();
    });

    targetEl.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.scheduleResume();
    });

    // 2. Touch & Pointer drag gestures
    targetEl.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches.length) {
        this.touchStartX = e.changedTouches[0].clientX;
        this.touchStartY = e.changedTouches[0].clientY;
      }
      this.isInteracting = true;
      this.clearCooldown();
      this.stopTimer();
    }, { passive: true });

    targetEl.addEventListener('touchend', (e) => {
      this.isInteracting = false;
      if (e.changedTouches && e.changedTouches.length) {
        this.touchEndX = e.changedTouches[0].clientX;
        const diffX = this.touchStartX - this.touchEndX;
        const diffY = this.touchStartY - e.changedTouches[0].clientY;

        // For slide carousels, apply swipe threshold navigation
        if (this.type === 'slide' && Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      }
      this.scheduleResume();
    }, { passive: true });

    targetEl.addEventListener('touchcancel', () => {
      this.isInteracting = false;
      this.scheduleResume();
    }, { passive: true });

    // 3. Focus within pause (for keyboard accessibility)
    targetEl.addEventListener('focusin', () => {
      this.isFocused = true;
      this.clearCooldown();
      this.stopTimer();
    });

    targetEl.addEventListener('focusout', (e) => {
      // Check if focus moved completely outside container
      setTimeout(() => {
        if (!targetEl.contains(document.activeElement)) {
          this.isFocused = false;
          this.scheduleResume();
        }
      }, 50);
    });
  }

  bindVisibility() {
    document.addEventListener('visibilitychange', () => {
      this.isTabHidden = document.visibilityState === 'hidden';
      if (this.isTabHidden) {
        this.stopTimer();
      } else {
        if (this.canAutoPlay()) {
          this.scheduleResume(1000);
        }
      }
    });
  }

  bindReducedMotion() {
    if (this.motionQuery.addEventListener) {
      this.motionQuery.addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
        if (this.reducedMotion) {
          this.stopTimer();
          this.clearCooldown();
        } else {
          if (this.canAutoPlay()) {
            this.startTimer();
          }
        }
      });
    }
  }

  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isOffScreen = !entry.isIntersecting;
          if (entry.isIntersecting) {
            if (this.canAutoPlay()) {
              this.startTimer();
            }
          } else {
            this.stopTimer();
          }
        });
      }, {
        threshold: 0.15
      });

      observer.observe(this.container);
    } else {
      // Fallback for older browsers without IntersectionObserver
      this.isOffScreen = false;
    }
  }

  clearAllTimers() {
    this.stopTimer();
    this.clearCooldown();
  }
}

// Global registry & initialization helper
window.Carousel = Carousel;
window.CarouselRegistry = [];

window.initAllCarousels = function() {
  // Clear any existing instances
  if (window.CarouselRegistry && window.CarouselRegistry.length) {
    window.CarouselRegistry.forEach(c => c.clearAllTimers());
    window.CarouselRegistry = [];
  }

  // 1. Hero Slider (Rotates every 5s)
  const heroSliderEl = document.getElementById('heroSlider');
  if (heroSliderEl) {
    const heroCarousel = new Carousel({
      container: heroSliderEl,
      type: 'slide',
      interval: 5000,
      startDelay: 0,
      resumeDelay: 2000,
      slides: heroSliderEl.querySelectorAll('.hero-slide'),
      dots: document.querySelectorAll('.slider-dot'),
      prevBtn: document.getElementById('heroPrevBtn'),
      nextBtn: document.getElementById('heroNextBtn')
    });
    window.CarouselRegistry.push(heroCarousel);
  }

  // 2. Shop by Category / Promo Row (Rotates every 4s)
  const categoryTilesEl = document.getElementById('categoryTilesRow');
  if (categoryTilesEl) {
    const categoryCarousel = new Carousel({
      container: categoryTilesEl.closest('.category-tiles-section') || categoryTilesEl,
      track: categoryTilesEl,
      type: 'track',
      interval: 4000,
      startDelay: 600,
      resumeDelay: 2000,
      prevBtn: document.getElementById('catScrollPrev'),
      nextBtn: document.getElementById('catScrollNext')
    });
    window.CarouselRegistry.push(categoryCarousel);
  }

  // 3. Product Carousels (Rotates every 3.5s with staggered delays)
  const productTrackConfigs = [
    { trackId: 'weeklyDealsTrack', prevId: 'weeklyDealsPrev', nextId: 'weeklyDealsNext' },
    { trackId: 'freshProduceTrack', prevId: 'freshProducePrev', nextId: 'freshProduceNext' },
    { trackId: 'keralaStaplesTrack', prevId: 'keralaStaplesPrev', nextId: 'keralaStaplesNext' },
    { trackId: 'meatFishTrack', prevId: 'meatFishPrev', nextId: 'meatFishNext' },
    { trackId: 'dairyTrack', prevId: 'dairyPrev', nextId: 'dairyNext' },
    { trackId: 'bakeryTrack', prevId: 'bakeryPrev', nextId: 'bakeryNext' },
    { trackId: 'electronicsTrack', prevId: 'electronicsPrev', nextId: 'electronicsNext' },
    { trackId: 'householdTrack', prevId: 'householdPrev', nextId: 'householdNext' }
  ];

  productTrackConfigs.forEach((cfg, idx) => {
    const trackEl = document.getElementById(cfg.trackId);
    if (trackEl) {
      const sectionEl = trackEl.closest('.product-carousel-section') || trackEl;
      // Stagger each carousel slightly so they don't move together:
      // Base interval 3500ms, varied by (idx % 3) * 150ms, initial delay staggered by idx * 350ms
      const staggerDelay = idx * 350;
      const staggerInterval = 3500 + (idx % 3) * 150;

      const pCarousel = new Carousel({
        container: sectionEl,
        track: trackEl,
        type: 'track',
        interval: staggerInterval,
        startDelay: staggerDelay,
        resumeDelay: 2000,
        prevBtn: document.getElementById(cfg.prevId),
        nextBtn: document.getElementById(cfg.nextId)
      });
      window.CarouselRegistry.push(pCarousel);
    }
  });

  console.log(`Initialized ${window.CarouselRegistry.length} auto-rotating carousels via js/carousel.js`);
};
