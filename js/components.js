// Golden Hypermarket Pala - Shared Components (js/components.js)
// Injects uniform Header, Mega-Menu, Location Modal, Mobile Drawer, Bottom Nav, and Footer across all pages.

// Lucide SVG Icons Definitions (Replacing all emojis with clean crisp SVGs)
const LucideIcons = {
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  messageCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  shoppingCart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
  layoutGrid: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  flame: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>`,
  ticket: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
};

const SiteComponents = {
  currentPage: '',
  currentCategory: '',

  init(options = {}) {
    this.currentPage = options.page || this.detectPage();
    this.currentCategory = options.category || this.getParam('cat') || '';

    this.renderHeader();
    this.renderFooter();
    this.renderLocationModal();
    this.renderMobileNav();
    this.setupInteractions();
    
    // Set page class and sticky bar helper on body
    document.body.classList.add(`page-${this.currentPage}`);
    if (this.currentPage === 'product' || this.currentPage === 'cart') {
      document.body.classList.add('has-bottom-sticky-bar');
    }

    // Apply saved language state on load
    const savedLang = localStorage.getItem('golden_hypermarket_lang') || 'EN';
    document.body.classList.toggle('lang-malayalam', savedLang === 'ML');

    // Sync cart & wishlist badges
    if (window.CartManager) {
      window.CartManager.syncBadges();
    }
  },

  detectPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('category.html')) return 'category';
    if (path.includes('product.html')) return 'product';
    if (path.includes('cart.html')) return 'cart';
    if (path.includes('search.html')) return 'search';
    return 'home';
  },

  getParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  },

  // ===================================================
  // RENDER UNIFIED 3-ROW HEADER
  // ===================================================
  renderHeader() {
    let headerContainer = document.getElementById('site-header-container');
    if (!headerContainer) {
      // If index.html has static top-utility-bar or mainHeader, replace them with container
      const existingBar = document.querySelector('.top-utility-bar');
      const existingHdr = document.querySelector('.main-header');
      const existingNav = document.querySelector('.category-nav-bar');
      if (existingBar || existingHdr || existingNav) {
        headerContainer = document.createElement('div');
        headerContainer.id = 'site-header-container';
        if (existingBar) existingBar.parentNode.insertBefore(headerContainer, existingBar);
        else if (existingHdr) existingHdr.parentNode.insertBefore(headerContainer, existingHdr);
        if (existingBar) existingBar.remove();
        if (existingHdr) existingHdr.remove();
        if (existingNav) existingNav.remove();
      } else {
        return;
      }
    }

    const savedLocation = localStorage.getItem('golden_hypermarket_location') || 'Pala Town (686575)';
    const savedLang = localStorage.getItem('golden_hypermarket_lang') || 'EN';

    const categories = (typeof siteData !== 'undefined' && siteData.categories) ? siteData.categories : [
      { id: 'grocery', name: 'Grocery & Staples', nameMl: 'പലചരക്ക്' },
      { id: 'produce', name: 'Fresh Produce', nameMl: 'പച്ചക്കറികൾ' },
      { id: 'fruits', name: 'Fresh Fruits', nameMl: 'പഴങ്ങൾ' },
      { id: 'meat-fish', name: 'Meat & Fish', nameMl: 'ഇറച്ചി & മത്സ്യം' },
      { id: 'dairy', name: 'Dairy & Eggs', nameMl: 'പാൽ ഉൽപ്പന്നങ്ങൾ' },
      { id: 'bakery', name: 'Bakery & Snacks', nameMl: 'ബേക്കറി' },
      { id: 'household', name: 'Household', nameMl: 'ഹൗസ്‌ഹോൾഡ്' },
      { id: 'beverages', name: 'Beverages', nameMl: 'പാനീയങ്ങൾ' },
      { id: 'electronics', name: 'Electronics', nameMl: 'ഇലക്ട്രോണിക്സ്' },
      { id: 'fashion', name: 'Fashion', nameMl: 'ഫാഷൻ' }
    ];

    const currentCat = this.currentCategory;
    const currentQ = this.getParam('q') || '';

    headerContainer.innerHTML = `
      <div class="site-header-wrapper">
        
        <!-- ROW 1: TOP UTILITY BAR -->
        <aside class="hdr-utility-bar" aria-label="Store Quick Utilities">
          <div class="container">
            <div class="hdr-utility-inner">
              
              <!-- Left Utility Group -->
              <div class="hdr-utility-left">
                <!-- Delivery Location -->
                <div class="hdr-utility-item hdr-loc-trigger" id="locationSelector" role="button" tabindex="0" title="Select Delivery Location in Pala">
                  <span class="hdr-icon loc-pin-icon">${LucideIcons.mapPin}</span>
                  <span>Deliver to: <strong id="currentLocationText">${savedLocation}</strong></span>
                  <span class="hdr-icon">${LucideIcons.chevronDown}</span>
                </div>
                <div class="hdr-utility-divider"></div>
                <!-- Store Hours -->
                <div class="hdr-utility-item hdr-store-hours">
                  <span class="hours-dot"></span>
                  <span class="hdr-icon">${LucideIcons.clock}</span>
                  <span>Store Open: <strong>8:00 AM - 10:00 PM</strong></span>
                </div>
                <div class="hdr-utility-divider"></div>
                <!-- Express Chip -->
                <div class="hdr-utility-item hdr-express-chip">
                  <span class="hdr-icon">${LucideIcons.zap}</span>
                  <span>Express 2-Hr Delivery in Pala</span>
                </div>
              </div>

              <!-- Right Utility Group -->
              <div class="hdr-utility-right">
                <!-- Helpdesk -->
                <div class="hdr-utility-item hdr-helpdesk-link">
                  <a href="tel:+918606647777" title="Call Pala Store Helpdesk">
                    <span class="hdr-icon">${LucideIcons.phone}</span>
                    <span>Helpdesk: <strong>+91 86066 47777</strong></span>
                  </a>
                </div>
                <div class="hdr-utility-divider"></div>
                <!-- WhatsApp -->
                <div class="hdr-utility-item">
                  <a href="https://wa.me/918606647777" target="_blank" rel="noopener noreferrer" title="Order via WhatsApp">
                    <span class="hdr-icon hdr-whatsapp-color">${LucideIcons.messageCircle}</span>
                    <span>WhatsApp Order</span>
                  </a>
                </div>
                <div class="hdr-utility-divider"></div>
                <!-- Language Toggle -->
                <div class="hdr-utility-item">
                  <div class="hdr-lang-btn" id="langSwitchBtn" role="button" tabindex="0" title="Toggle Malayalam / English">
                    <span class="hdr-icon">${LucideIcons.globe}</span>
                    <span id="langLabel">${savedLang === 'ML' ? 'English' : 'മലയാളം'}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </aside>

        <!-- ROW 2: MAIN HEADER (Logo | Search Bar 640px in ONE Row | User Actions) -->
        <header class="hdr-main-row" id="mainHeader">
          <div class="container">
            <div class="hdr-main-inner">
              
              <!-- Mobile Hamburger Menu Button -->
              <button class="hdr-mobile-bars" id="mobileMenuOpen" aria-label="Open Navigation Menu">
                <span class="hdr-icon">${LucideIcons.menu}</span>
              </button>

              <!-- Logo (Left) -->
              <a href="index.html" class="hdr-brand-logo" aria-label="Golden Hypermarket Pala Home">
                <img src="assets/images/logo.png" alt="Golden Hypermarket Pala" class="hdr-logo-img">
                <div class="hdr-brand-text">
                  <span class="hdr-brand-title">GOLDEN <span class="highlight">HYPERMARKET</span></span>
                  <span class="hdr-brand-subtitle">SINCE 1964 • PALA, KERALA</span>
                </div>
              </a>

              <!-- Search Bar in ONE Row (Max Width 640px, Height 46px, Fully Rounded) -->
              <div class="hdr-search-container">
                <form class="hdr-search-form" id="headerSearchForm" action="search.html" method="GET">
                  <!-- Department Dropdown -->
                  <div class="hdr-search-dept-wrap">
                    <select name="cat" id="searchCategory" class="hdr-search-dept-select" aria-label="Select Category Department">
                      <option value="all" ${currentCat === 'all' || !currentCat ? 'selected' : ''}>All Departments</option>
                      ${categories.map(c => `
                        <option value="${c.id}" ${currentCat === c.id ? 'selected' : ''}>${c.name}</option>
                      `).join('')}
                    </select>
                    <span class="hdr-search-dept-arrow">${LucideIcons.chevronDown}</span>
                  </div>

                  <!-- Text Input -->
                  <div class="hdr-search-input-wrap">
                    <span class="hdr-search-icon-inside" aria-hidden="true">${LucideIcons.search}</span>
                    <input 
                      type="text" 
                      name="q"
                      id="mainSearchInput" 
                      class="hdr-search-input" 
                      placeholder="Search for Matta Rice, Coconut Oil, Fresh Fish, Spices..." 
                      autocomplete="off"
                      aria-label="Search Golden Hypermarket products"
                      value="${currentQ}"
                    >
                    <button type="button" class="hdr-search-clear" id="clearSearchBtn" aria-label="Clear Search Input">
                      ${LucideIcons.x}
                    </button>
                  </div>

                  <!-- Gold Search Button -->
                  <button type="submit" class="hdr-search-btn" id="searchSubmitBtn" aria-label="Search">
                    <span class="hdr-icon">${LucideIcons.search}</span>
                    <span>Search</span>
                  </button>
                </form>

                <!-- Live Search Dropdown Suggestions -->
                <div class="hdr-suggestions-dropdown is-hidden" id="searchSuggestions">
                  <div class="hdr-suggestions-header">
                    <span>Popular in Pala:</span>
                    <span class="hdr-sugg-tag" onclick="SiteComponents.quickSearch('Matta Rice')">Matta Rice</span>
                    <span class="hdr-sugg-tag" onclick="SiteComponents.quickSearch('Coconut Oil')">Coconut Oil</span>
                    <span class="hdr-sugg-tag" onclick="SiteComponents.quickSearch('Nendran')">Nendran Banana</span>
                  </div>
                  <div class="hdr-suggestions-list" id="suggestionsList"></div>
                </div>
              </div>

              <!-- User Actions (Right: Account, Wishlist, Cart) -->
              <div class="hdr-user-actions">
                <!-- Account -->
                <a href="cart.html#account" class="hdr-action-btn" id="userAccountBtn" title="My Account & Orders">
                  <div class="hdr-action-icon-box">
                    ${LucideIcons.user}
                  </div>
                  <div class="hdr-action-text hide-on-tablet">
                    <span class="hdr-action-sub">Welcome</span>
                    <span class="hdr-action-main">Account</span>
                  </div>
                </a>

                <!-- Wishlist -->
                <a href="cart.html#wishlist" class="hdr-action-btn" id="wishlistBtn" aria-label="View Wishlist" title="Saved Wishlist">
                  <div class="hdr-action-icon-box">
                    ${LucideIcons.heart}
                    <span class="hdr-action-badge wishlist-badge-count is-hidden">0</span>
                  </div>
                  <div class="hdr-action-text hide-on-tablet">
                    <span class="hdr-action-sub">Saved</span>
                    <span class="hdr-action-main">Wishlist</span>
                  </div>
                </a>

                <!-- Cart -->
                <a href="cart.html" class="hdr-action-btn" id="cartBtn" aria-label="View Shopping Cart" title="Go to Shopping Cart">
                  <div class="hdr-action-icon-box">
                    ${LucideIcons.shoppingCart}
                    <span class="hdr-action-badge cart-badge-count is-hidden">0</span>
                  </div>
                  <div class="hdr-action-text">
                    <span class="hdr-action-sub">My Cart</span>
                    <span class="hdr-action-main hdr-cart-total header-cart-total">₹0</span>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </header>

        <!-- ROW 3: ALL CATEGORIES BUTTON + NAV LINKS (WITH OVERFLOW SCROLL) + COUPON CHIP -->
        <nav class="hdr-category-bar" id="categoryNavBar" aria-label="Category Navigation">
          <div class="container">
            <div class="hdr-category-inner">
              
              <!-- All Categories Button + Dropdown -->
              <div class="hdr-all-cat-wrap" id="allCategoriesWrapper">
                <button class="hdr-all-cat-btn" id="allCategoriesBtn" aria-expanded="false" aria-controls="megaMenuDropdown">
                  <span class="hdr-icon">${LucideIcons.layoutGrid}</span>
                  <span>All Categories</span>
                  <span class="hdr-icon">${LucideIcons.chevronDown}</span>
                </button>

                <!-- Mega Menu Dropdown (2-Panel: Left Departments, Right Subcategories) -->
                <div class="hdr-mega-menu" id="megaMenuDropdown">
                  <!-- Left Column: Department List -->
                  <div class="hdr-mega-left-pane" id="megaLeftPane">
                    ${categories.map((c, idx) => `
                      <button type="button" class="hdr-mega-dept-btn ${idx === 0 ? 'active' : ''}" data-cat-id="${c.id}">
                        <span class="dept-left-label">
                          <i class="fa-solid ${c.icon || 'fa-store'} hdr-dept-icon"></i>
                          <span>${c.name}</span>
                        </span>
                        <span class="dept-arrow"><i class="fa-solid fa-chevron-right"></i></span>
                      </button>
                    `).join('')}
                  </div>

                  <!-- Right Column: Subcategories and Info Panel -->
                  <div class="hdr-mega-right-pane" id="megaRightPane">
                    <!-- Populated dynamically via JS -->
                  </div>
                </div>
              </div>

              <!-- Nav Links with Horizontal Scroll if it overflows -->
              <div class="hdr-nav-links-scroll" id="hdrNavScrollTrack">
                <a href="category.html?cat=grocery" class="hdr-nav-link ${currentCat === 'grocery' ? 'active' : ''}">Grocery</a>
                <a href="category.html?cat=produce" class="hdr-nav-link ${currentCat === 'produce' ? 'active' : ''}">Fresh Produce</a>
                <a href="category.html?cat=fruits" class="hdr-nav-link ${currentCat === 'fruits' ? 'active' : ''}">Fruits</a>
                <a href="category.html?cat=meat-fish" class="hdr-nav-link ${currentCat === 'meat-fish' ? 'active' : ''}">Meat & Fish</a>
                <a href="category.html?cat=dairy" class="hdr-nav-link ${currentCat === 'dairy' ? 'active' : ''}">Dairy & Eggs</a>
                <a href="category.html?cat=bakery" class="hdr-nav-link ${currentCat === 'bakery' ? 'active' : ''}">Bakery</a>
                <a href="category.html?cat=household" class="hdr-nav-link ${currentCat === 'household' ? 'active' : ''}">Household</a>
                <a href="category.html?cat=beverages" class="hdr-nav-link ${currentCat === 'beverages' ? 'active' : ''}">Beverages</a>
                <a href="category.html?cat=electronics" class="hdr-nav-link ${currentCat === 'electronics' ? 'active' : ''}">Electronics</a>
                <a href="category.html?cat=fashion" class="hdr-nav-link ${currentCat === 'fashion' ? 'active' : ''}">Fashion</a>
                <a href="category.html?cat=all&deals=1" class="hdr-nav-link hdr-deals-nav-link ${this.getParam('deals') === '1' ? 'active' : ''}">
                  <span class="hdr-icon">${LucideIcons.flame}</span>
                  <span>Weekend Deals</span>
                </a>
              </div>

              <!-- Coupon Chip (Right) -->
              <div class="hdr-coupon-chip">
                <span class="hdr-icon hdr-gold-bright-color">${LucideIcons.ticket}</span>
                <span class="hdr-coupon-tag">PALA SAVER</span>
                <span>Get <strong>₹100 OFF</strong> Code: <strong>PALA100</strong></span>
              </div>

            </div>
          </div>
        </nav>

      </div>
    `;
  },

  // ===================================================
  // RENDER FOOTER (Preserved intact)
  // ===================================================
  renderFooter() {
    const footerContainer = document.getElementById('site-footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
      <footer class="site-footer" id="mainFooter">
        <!-- Footer Newsletter Strip -->
        <div class="footer-newsletter-strip">
          <div class="container newsletter-container">
            <div class="newsletter-content">
              <div class="newsletter-icon">
                <i class="fa-solid fa-envelope-open-text"></i>
              </div>
              <div class="newsletter-text">
                <h3>Subscribe to Pala Weekly Specials</h3>
                <p>Get exclusive weekend discounts, festival offers, and fresh arrival alerts directly.</p>
              </div>
            </div>
            <form class="newsletter-form" id="newsletterForm" onsubmit="event.preventDefault(); CartManager.showToast('Thank you for subscribing! Weekend deals will be sent to your email.', 'success'); this.reset();">
              <input type="email" placeholder="Enter your email address" required aria-label="Email Address">
              <button type="submit" class="newsletter-submit-btn">
                <span>Subscribe</span>
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <!-- Main Footer Links Columns -->
        <div class="footer-links-section">
          <div class="container footer-grid">
            <!-- Col 1: Brand & About -->
            <div class="footer-col brand-col">
              <div class="footer-brand">
                <img src="assets/images/logo.png" alt="Golden Hypermarket" class="footer-logo">
                <div>
                  <h3>GOLDEN HYPERMARKET</h3>
                  <span>SINCE 1964 • PALA, KERALA</span>
                </div>
              </div>
              <p class="footer-about-text">
                Pala’s premier shopping destination for 60 years. Committed to delivering fresh farm produce, pure staples, fish, meat, electronics and household goods at the lowest prices.
              </p>
              <div class="footer-social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-btn"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-icon-btn"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-icon-btn"><i class="fa-brands fa-youtube"></i></a>
                <a href="https://wa.me/918606647777" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="social-icon-btn"><i class="fa-brands fa-whatsapp"></i></a>
              </div>
            </div>

            <!-- Col 2: Categories -->
            <div class="footer-col">
              <h4 class="footer-heading">Shop Categories</h4>
              <ul class="footer-link-list">
                <li><a href="category.html?cat=grocery">Grocery & Kerala Spices</a></li>
                <li><a href="category.html?cat=produce">Fresh Farm Vegetables</a></li>
                <li><a href="category.html?cat=fruits">High Range Fruits</a></li>
                <li><a href="category.html?cat=meat-fish">Fresh Marine Fish & Meat</a></li>
                <li><a href="category.html?cat=dairy">Dairy, Ghee & Bakery</a></li>
                <li><a href="category.html?cat=household">Household & Cleaning</a></li>
                <li><a href="category.html?cat=beverages">Kerala Tea & Beverages</a></li>
                <li><a href="category.html?cat=electronics">Home Appliances & Electronics</a></li>
              </ul>
            </div>

            <!-- Col 3: Customer Care -->
            <div class="footer-col">
              <h4 class="footer-heading">Customer Care</h4>
              <ul class="footer-link-list">
                <li><a href="https://wa.me/918606647777" target="_blank" rel="noopener noreferrer">Track Pala Delivery</a></li>
                <li><a href="index.html#storeInfo">Store Timings & Location</a></li>
                <li><a href="category.html?cat=all&deals=1">Weekend Deals Flyer</a></li>
                <li><a href="cart.html">View Shopping Cart</a></li>
                <li><a href="tel:+918606647777">Helpdesk: +91 86066 47777</a></li>
                <li><a href="tel:04822212345">Landline: 04822 212345</a></li>
                <li><a href="mailto:care@goldenhypermarketpala.com">Email: care@goldenhypermarketpala.com</a></li>
              </ul>
            </div>

            <!-- Col 4: Store Location & Quick Links -->
            <div class="footer-col" id="storeInfo">
              <h4 class="footer-heading">Pala Store Hub</h4>
              <div class="footer-contact-info">
                <p><i class="fa-solid fa-location-dot"></i> Opp. St. George's Church, Lalam Puthenpally, Pala, Kerala 686575</p>
                <p><i class="fa-solid fa-clock"></i> 8:00 AM – 10:00 PM (Daily)</p>
                <p><i class="fa-solid fa-envelope"></i> care@goldenhypermarketpala.com</p>
              </div>
              <div class="footer-delivery-tags">
                <span class="del-tag"><i class="fa-solid fa-truck-fast"></i> Pala 2-Hr Delivery</span>
                <span class="del-tag"><i class="fa-solid fa-shield-halved"></i> 100% Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright & Payment Methods Bar -->
        <div class="footer-bottom-bar">
          <div class="container footer-bottom-container">
            <p class="copyright-text">
              © 2026 <strong>Golden Hypermarket, Pala</strong>. All rights reserved. Serving Central Travancore since 1964.
            </p>
            <div class="payment-icons-row">
              <span class="pay-chip"><i class="fa-brands fa-google-pay"></i> GPay</span>
              <span class="pay-chip"><i class="fa-solid fa-mobile-screen-button"></i> PhonePe</span>
              <span class="pay-chip"><i class="fa-solid fa-wallet"></i> Paytm</span>
              <span class="pay-chip"><i class="fa-brands fa-cc-visa"></i> Visa</span>
              <span class="pay-chip"><i class="fa-brands fa-cc-mastercard"></i> Mastercard</span>
              <span class="pay-chip"><i class="fa-solid fa-money-bill-wave"></i> Cash on Delivery</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  // ===================================================
  // RENDER MOBILE BOTTOM NAV & DRAWER (With Lucide SVG Icons)
  // ===================================================
  renderMobileNav() {
    let existingNav = document.querySelector('.mobile-bottom-nav');
    if (existingNav) existingNav.remove();

    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('aria-label', 'Mobile Navigation Quick Bar');

    const p = this.currentPage;
    const isCartActive = p === 'cart';
    const isHomeActive = p === 'home';
    const isCatActive = p === 'category';
    const isSearchActive = p === 'search';
    const isAccountActive = window.location.hash === '#account';

    nav.innerHTML = `
      <a href="index.html" class="mob-tab-item ${isHomeActive ? 'active' : ''}" aria-label="Home">
        <span class="mob-tab-icon">${LucideIcons.home}</span>
        <span>Home</span>
      </a>
      <button type="button" class="mob-tab-item ${isCatActive ? 'active' : ''}" id="mobTabCategories" aria-label="Categories">
        <span class="mob-tab-icon">${LucideIcons.layoutGrid}</span>
        <span>Categories</span>
      </button>
      <a href="search.html" class="mob-tab-item ${isSearchActive ? 'active' : ''}" id="mobTabSearch" aria-label="Search">
        <span class="mob-tab-icon">${LucideIcons.search}</span>
        <span>Search</span>
      </a>
      <a href="cart.html" class="mob-tab-item ${isCartActive ? 'active' : ''}" id="mobileCartBtn" aria-label="Shopping Cart">
        <div class="mob-cart-icon">
          <span class="mob-tab-icon">${LucideIcons.shoppingCart}</span>
          <span class="badge-count cart-badge-count mob-badge is-hidden">0</span>
        </div>
        <span>Cart</span>
      </a>
      <a href="cart.html#account" class="mob-tab-item ${isAccountActive ? 'active' : ''}" id="mobTabAccount" aria-label="Account">
        <span class="mob-tab-icon">${LucideIcons.user}</span>
        <span>Account</span>
      </a>
    `;

    document.body.appendChild(nav);

    // Mobile Drawer
    let existingDrawer = document.getElementById('mobileDrawerOverlay');
    if (existingDrawer) existingDrawer.remove();
    let existingAside = document.getElementById('mobileDrawer');
    if (existingAside) existingAside.remove();

    const drawerOverlay = document.createElement('div');
    drawerOverlay.className = 'hdr-mobile-overlay';
    drawerOverlay.id = 'mobileDrawerOverlay';

    const drawer = document.createElement('aside');
    drawer.className = 'hdr-mobile-drawer';
    drawer.id = 'mobileDrawer';
    drawer.setAttribute('aria-label', 'Mobile Navigation Menu');

    const categories = (typeof siteData !== 'undefined' && siteData.categories) ? siteData.categories : [];
    const savedLang = localStorage.getItem('golden_hypermarket_lang') || 'EN';

    drawer.innerHTML = `
      <div class="hdr-drawer-header">
        <div class="hdr-drawer-logo-wrap">
          <img src="assets/images/logo.png" alt="Golden Hypermarket" class="hdr-drawer-logo">
          <div>
            <div class="hdr-drawer-title">GOLDEN HYPERMARKET</div>
            <div class="hdr-drawer-sub">SINCE 1964 • PALA, KERALA</div>
          </div>
        </div>
        <button class="hdr-drawer-close" id="mobileMenuClose" aria-label="Close Menu">
          ${LucideIcons.x}
        </button>
      </div>

      <div class="hdr-drawer-body">
        <!-- Delivery Location Trigger -->
        <div class="hdr-utility-item hdr-loc-trigger hdr-mob-loc-trigger" id="mobileLocationTrigger" role="button" tabindex="0">
          <span class="hdr-flex-gap-6">
            <span class="hdr-icon hdr-gold-color">${LucideIcons.mapPin}</span>
            <span>Pala & Surrounding Areas</span>
          </span>
          <span class="hdr-icon">${LucideIcons.chevronDown}</span>
        </div>

        <!-- Coupon Chip (Moved into Drawer) -->
        <div class="drawer-coupon-chip">
          <span class="coupon-tag">PALA SAVER</span>
          <span class="coupon-text">Get <strong>₹100 OFF</strong> Code: <strong>PALA100</strong></span>
        </div>

        <!-- Category Accordion Section -->
        <div class="hdr-drawer-section-title">Shop by Department</div>
        <div class="drawer-accordion" id="drawerAccordion">
          ${categories.map(c => `
            <div class="drawer-accordion-item" data-cat-id="${c.id}">
              <button class="drawer-accordion-header" type="button" aria-expanded="false">
                <div class="drawer-accordion-title-wrap">
                  <i class="fa-solid ${c.icon || 'fa-store'} drawer-dept-icon"></i>
                  <span>${c.name}</span>
                  ${c.nameMl ? `<span class="drawer-accordion-ml">(${c.nameMl})</span>` : ''}
                </div>
                <span class="drawer-chevron">${LucideIcons.chevronDown}</span>
              </button>
              <div class="drawer-accordion-content">
                <div class="drawer-sub-list">
                  ${(c.subcategories || []).map(sub => `
                    <a href="category.html?cat=${c.id}&sub=${encodeURIComponent(sub)}" class="drawer-sub-link">
                      <i class="fa-solid ${this.getSubcategoryIcon(sub)} drawer-sub-icon"></i>
                      <span>${sub}</span>
                    </a>
                  `).join('')}
                  <a href="category.html?cat=${c.id}" class="drawer-browse-all-btn">
                    <span>Browse All ${c.name}</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
          <div class="drawer-accordion-item">
            <a href="category.html?cat=all&deals=1" class="drawer-accordion-header drawer-deals-item-link">
              <div class="drawer-accordion-title-wrap">
                <span class="hdr-icon drawer-deals-flame">${LucideIcons.flame}</span>
                <span>Weekend Deals Flyer</span>
              </div>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- Drawer Footer: Language Toggle & Account Links -->
        <div class="drawer-footer-box">
          <button type="button" class="drawer-lang-btn" id="drawerLangBtn" aria-label="Toggle Language">
            <span class="hdr-icon">${LucideIcons.globe}</span>
            <span id="drawerLangLabel">${savedLang === 'ML' ? 'Switch to English' : 'മലയാളത്തിലേക്ക് മാറ്റുക (ML)'}</span>
          </button>
          <a href="cart.html#account" class="drawer-link-btn" id="drawerAccountBtn">
            <span class="hdr-icon">${LucideIcons.user}</span>
            <span>My Account & Orders</span>
          </a>
          <a href="cart.html#wishlist" class="drawer-link-btn" id="drawerWishlistBtn">
            <span class="hdr-icon">${LucideIcons.heart}</span>
            <span>My Saved Wishlist</span>
          </a>
          <a href="https://wa.me/918606647777" target="_blank" rel="noopener noreferrer" class="drawer-link-btn wa-link">
            <span class="hdr-icon">${LucideIcons.messageCircle}</span>
            <span>WhatsApp Order (+91 86066 47777)</span>
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(drawerOverlay);
    document.body.appendChild(drawer);
  },

  // ===================================================
  // RENDER LOCATION MODAL
  // ===================================================
  renderLocationModal() {
    let existingModal = document.getElementById('locationModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop is-hidden';
    modal.id = 'locationModal';

    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="hdr-flex-gap-8">
            <span class="hdr-icon hdr-gold-color">${LucideIcons.mapPin}</span>
            <span>Select Your Delivery Location</span>
          </h3>
          <button class="modal-close-btn" id="closeLocationModal">&times;</button>
        </div>
        <div class="modal-body">
          <p>Choose your delivery area in and around Pala, Kottayam:</p>
          <div class="location-chips">
            <button class="loc-chip active" data-loc="Pala Town (686575)">Pala Town</button>
            <button class="loc-chip" data-loc="Lalam Puthenpally (686575)">Lalam Puthenpally</button>
            <button class="loc-chip" data-loc="Mutholy (686573)">Mutholy</button>
            <button class="loc-chip" data-loc="Kadaplamattom (686570)">Kadaplamattom</button>
            <button class="loc-chip" data-loc="Ramapuram (686576)">Ramapuram</button>
            <button class="loc-chip" data-loc="Bharananganam (686578)">Bharananganam</button>
            <button class="loc-chip" data-loc="Meenachil (686577)">Meenachil</button>
            <button class="loc-chip" data-loc="Kidangoor (686572)">Kidangoor</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  getSubcategoryIcon(name) {
    const n = (name || '').toLowerCase();
    if (n.includes('rice') || n.includes('grain')) return 'fa-bowl-rice';
    if (n.includes('spice') || n.includes('masala') || n.includes('chilli')) return 'fa-pepper-hot';
    if (n.includes('oil') || n.includes('ghee')) return 'fa-bottle-droplet';
    if (n.includes('flour') || n.includes('podi') || n.includes('atta')) return 'fa-wheat-awn';
    if (n.includes('dal') || n.includes('pulse')) return 'fa-seedling';
    if (n.includes('sugar') || n.includes('jaggery')) return 'fa-cubes-stacked';
    if (n.includes('veg') || n.includes('greens') || n.includes('roots') || n.includes('cucumber') || n.includes('tuber') || n.includes('onion') || n.includes('potato') || n.includes('tomato')) return 'fa-carrot';
    if (n.includes('banana') || n.includes('fruit') || n.includes('apple') || n.includes('citrus') || n.includes('melon') || n.includes('nut') || n.includes('grape') || n.includes('berry')) return 'fa-apple-whole';
    if (n.includes('fish') || n.includes('marine') || n.includes('prawn') || n.includes('catch') || n.includes('sardine') || n.includes('mackerel')) return 'fa-fish';
    if (n.includes('meat') || n.includes('chicken') || n.includes('mutton') || n.includes('cutlet') || n.includes('curry cut') || n.includes('drumstick')) return 'fa-drumstick-bite';
    if (n.includes('milk') || n.includes('curd') || n.includes('dairy') || n.includes('yogurt')) return 'fa-glass-water';
    if (n.includes('butter') || n.includes('cheese') || n.includes('paneer')) return 'fa-cheese';
    if (n.includes('egg')) return 'fa-egg';
    if (n.includes('bread') || n.includes('bun') || n.includes('cake') || n.includes('cookie') || n.includes('rusk') || n.includes('chip') || n.includes('crisp') || n.includes('sweet') || n.includes('mixture') || n.includes('biscuit')) return 'fa-bread-slice';
    if (n.includes('clean') || n.includes('detergent') || n.includes('wash') || n.includes('paper') || n.includes('tissue') || n.includes('repellent') || n.includes('pooja') || n.includes('agarbathi')) return 'fa-spray-can-sparkles';
    if (n.includes('tea') || n.includes('coffee') || n.includes('juice') || n.includes('drink') || n.includes('water') || n.includes('beverage') || n.includes('squash')) return 'fa-mug-hot';
    if (n.includes('mixer') || n.includes('cooker') || n.includes('kettle') || n.includes('fan') || n.includes('iron') || n.includes('grooming') || n.includes('audio') || n.includes('trimmer') || n.includes('blender') || n.includes('earbud')) return 'fa-blender';
    if (n.includes('wear') || n.includes('cloth') || n.includes('saree') || n.includes('mundu') || n.includes('kurti') || n.includes('towel') || n.includes('linen') || n.includes('footwear') || n.includes('umbrella') || n.includes('shirt')) return 'fa-shirt';
    return 'fa-circle-chevron-right';
  },

  updateMegaRightPane(catId) {
    const categories = (typeof siteData !== 'undefined' && siteData.categories) ? siteData.categories : [];
    const cat = categories.find(c => c.id === catId) || categories[0];
    if (!cat) return;

    const rightPane = document.getElementById('megaRightPane');
    if (!rightPane) return;

    const subcats = cat.subcategories || [];

    rightPane.innerHTML = `
      <div>
        <div class="hdr-mega-right-header">
          <div class="hdr-mega-dept-heading">
            <i class="fa-solid ${cat.icon || 'fa-store'} hdr-gold-color"></i>
            <span>${cat.name}</span>
            ${cat.nameMl ? `<span class="hdr-mega-ml">(${cat.nameMl})</span>` : ''}
          </div>
          <p class="hdr-mega-dept-desc">${cat.description || 'Explore our freshest high quality items at Golden Hypermarket Pala.'}</p>
        </div>
        <div class="hdr-mega-sub-grid">
          ${subcats.map(sub => `
            <a href="category.html?cat=${cat.id}&sub=${encodeURIComponent(sub)}" class="hdr-mega-sub-link">
              <i class="fa-solid ${this.getSubcategoryIcon(sub)} hdr-mega-sub-icon"></i>
              <span>${sub}</span>
            </a>
          `).join('')}
        </div>
      </div>
      <a href="category.html?cat=${cat.id}" class="hdr-mega-browse-all-btn">
        <span>Browse All ${cat.name}</span>
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    `;
  },

  // ===================================================
  // SETUP HEADER INTERACTIONS
  // ===================================================
  setupInteractions() {
    // Sticky Header Scroll Behavior (Hide utility bar on scroll down past 80px, show on scroll up/top)
    if (!this._stickyScrollInitialized) {
      this._stickyScrollInitialized = true;
      let lastScrollY = window.scrollY;
      let isTicking = false;

      const updateStickyScroll = () => {
        const currentScrollY = window.scrollY;
        const headerContainer = document.getElementById('site-header-container');
        const headerWrapper = document.querySelector('.site-header-wrapper');
        const targets = [headerContainer, headerWrapper].filter(Boolean);

        if (!targets.length) {
          isTicking = false;
          return;
        }

        if (currentScrollY > 80) {
          targets.forEach(el => el.classList.add('header-scrolled'));

          if (currentScrollY > lastScrollY + 4) {
            // Scrolling down past 80px -> collapse utility bar
            targets.forEach(el => el.classList.add('hide-utility'));
          } else if (currentScrollY < lastScrollY - 4) {
            // Scrolling up -> reveal utility bar
            targets.forEach(el => el.classList.remove('hide-utility'));
          }
        } else {
          // At or near top (<= 80px) -> restore utility bar & remove shadow
          targets.forEach(el => el.classList.remove('header-scrolled', 'hide-utility'));
        }

        lastScrollY = currentScrollY;
        isTicking = false;
      };

      window.addEventListener('scroll', () => {
        if (!isTicking) {
          window.requestAnimationFrame(updateStickyScroll);
          isTicking = true;
        }
      }, { passive: true });

      updateStickyScroll();
    }

    // Mega Menu Left Pane Hover & Click Handlers
    const megaLeftPane = document.getElementById('megaLeftPane');
    if (megaLeftPane) {
      const deptButtons = megaLeftPane.querySelectorAll('.hdr-mega-dept-btn');
      
      const activateDept = (catId) => {
        deptButtons.forEach(b => {
          const isActive = b.getAttribute('data-cat-id') === catId;
          b.classList.toggle('active', isActive);
        });
        this.updateMegaRightPane(catId);
      };

      deptButtons.forEach(btn => {
        const catId = btn.getAttribute('data-cat-id');
        btn.addEventListener('mouseenter', () => activateDept(catId));
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          activateDept(catId);
        });
      });

      const initialCat = (this.currentCategory && this.currentCategory !== 'all') ? this.currentCategory : 'grocery';
      activateDept(initialCat);
    }

    // Mega Menu Dropdown Toggle
    const allCategoriesBtn = document.getElementById('allCategoriesBtn');
    const megaMenuDropdown = document.getElementById('megaMenuDropdown');
    if (allCategoriesBtn && megaMenuDropdown) {
      allCategoriesBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          openDrawer();
          return;
        }
        e.stopPropagation();
        const isOpen = megaMenuDropdown.classList.contains('show');
        megaMenuDropdown.classList.toggle('show');
        allCategoriesBtn.setAttribute('aria-expanded', !isOpen);
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('#allCategoriesWrapper')) {
          megaMenuDropdown.classList.remove('show');
          allCategoriesBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Mobile Drawer Toggle
    const mobileMenuOpen = document.getElementById('mobileMenuOpen');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');

    const openDrawer = () => {
      if (mobileDrawer && mobileDrawerOverlay) {
        mobileDrawer.classList.add('open');
        mobileDrawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeDrawer = () => {
      if (mobileDrawer && mobileDrawerOverlay) {
        mobileDrawer.classList.remove('open');
        mobileDrawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    if (mobileMenuOpen) mobileMenuOpen.addEventListener('click', openDrawer);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeDrawer);
    if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeDrawer);

    // Mobile Bottom Tab "Categories" opens Drawer
    const mobTabCategories = document.getElementById('mobTabCategories');
    if (mobTabCategories) {
      mobTabCategories.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    }

    // Mobile Bottom Tab "Search" focuses input on mobile
    const mobTabSearch = document.getElementById('mobTabSearch');
    if (mobTabSearch) {
      mobTabSearch.addEventListener('click', (e) => {
        const searchInput = document.getElementById('mainSearchInput');
        if (searchInput && window.innerWidth <= 768 && !window.location.pathname.includes('search.html')) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          searchInput.focus();
        }
      });
    }

    // Drawer Category Accordion Items
    const accordionHeaders = document.querySelectorAll('.drawer-accordion-header');
    accordionHeaders.forEach(hdr => {
      hdr.addEventListener('click', (e) => {
        const item = hdr.closest('.drawer-accordion-item');
        if (!item || !item.querySelector('.drawer-accordion-content')) return;
        const isCurrentlyExpanded = item.classList.contains('expanded');
        document.querySelectorAll('.drawer-accordion-item.expanded').forEach(other => {
          if (other !== item) {
            other.classList.remove('expanded');
            const otherBtn = other.querySelector('.drawer-accordion-header');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.toggle('expanded', !isCurrentlyExpanded);
        hdr.setAttribute('aria-expanded', !isCurrentlyExpanded);
      });
    });

    // Location Modal Toggle
    const locTrigger = document.getElementById('locationSelector');
    const mobileLocTrigger = document.getElementById('mobileLocationTrigger');
    const locModal = document.getElementById('locationModal');
    const closeLocBtn = document.getElementById('closeLocationModal');
    const locChips = document.querySelectorAll('.loc-chip');
    const locText = document.getElementById('currentLocationText');

    const openLocModal = () => {
      if (locModal) locModal.classList.remove('is-hidden');
      closeDrawer();
    };

    const closeLocModal = () => {
      if (locModal) locModal.classList.add('is-hidden');
    };

    if (locTrigger) locTrigger.addEventListener('click', openLocModal);
    if (mobileLocTrigger) mobileLocTrigger.addEventListener('click', openLocModal);
    if (closeLocBtn) closeLocBtn.addEventListener('click', closeLocModal);
    if (locModal) {
      locModal.addEventListener('click', (e) => {
        if (e.target === locModal) closeLocModal();
      });
    }

    locChips.forEach(chip => {
      chip.addEventListener('click', () => {
        locChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const loc = chip.getAttribute('data-loc');
        if (locText) locText.textContent = loc;
        localStorage.setItem('golden_hypermarket_location', loc);
        if (window.CartManager) {
          CartManager.showToast(`Delivery location updated to ${loc}`, 'success');
        }
        closeLocModal();
      });
    });

    // Language switcher toggle (Synchronized between Desktop and Mobile Drawer)
    const langBtn = document.getElementById('langSwitchBtn');
    const langLabel = document.getElementById('langLabel');
    const drawerLangBtn = document.getElementById('drawerLangBtn');
    const drawerLangLabel = document.getElementById('drawerLangLabel');

    const toggleLang = () => {
      const current = localStorage.getItem('golden_hypermarket_lang') || 'EN';
      const next = current === 'EN' ? 'ML' : 'EN';
      localStorage.setItem('golden_hypermarket_lang', next);
      if (langLabel) langLabel.textContent = next === 'ML' ? 'English' : 'മലയാളം';
      if (drawerLangLabel) drawerLangLabel.textContent = next === 'ML' ? 'Switch to English' : 'മലയാളത്തിലേക്ക് മാറ്റുക (ML)';
      if (window.CartManager) {
        CartManager.showToast(`Language switched to ${next === 'ML' ? 'Malayalam (മലയാളം)' : 'English'}`, 'info');
      }
      document.body.classList.toggle('lang-malayalam', next === 'ML');
    };

    if (langBtn) langBtn.addEventListener('click', toggleLang);
    if (drawerLangBtn) drawerLangBtn.addEventListener('click', toggleLang);

    // Search Autocomplete
    const searchInput = document.getElementById('mainSearchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const suggestionsList = document.getElementById('suggestionsList');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput && searchSuggestions && suggestionsList) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (clearSearchBtn) clearSearchBtn.classList.toggle('is-hidden', !val);

        if (val.length < 2) {
          searchSuggestions.classList.add('is-hidden');
          return;
        }

        if (typeof siteData !== 'undefined' && siteData.products) {
          const results = siteData.products.filter(p => 
            p.name.toLowerCase().includes(val) || 
            p.nameMl.includes(val) || 
            p.brand.toLowerCase().includes(val) ||
            p.category.toLowerCase().includes(val)
          ).slice(0, 6);

          if (results.length > 0) {
            suggestionsList.innerHTML = results.map(p => `
              <div class="hdr-sugg-item" onclick="window.location.href='product.html?id=${p.id}'">
                <img src="${p.image}" alt="${p.name}" class="hdr-sugg-thumb">
                <div class="hdr-sugg-info">
                  <div class="hdr-sugg-title">${p.name} <span class="hdr-sugg-ml-text">(${p.nameMl})</span></div>
                  <div class="hdr-sugg-price">₹${p.price} • <span class="hdr-sugg-weight-text">${p.weight}</span></div>
                </div>
              </div>
            `).join('');
            searchSuggestions.classList.remove('is-hidden');
          } else {
            suggestionsList.innerHTML = `<div class="hdr-sugg-empty-text">No items found matching "${val}"</div>`;
            searchSuggestions.classList.remove('is-hidden');
          }
        }
      });

      if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
          searchInput.value = '';
          clearSearchBtn.classList.add('is-hidden');
          searchSuggestions.classList.add('is-hidden');
          searchInput.focus();
        });
      }

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.hdr-search-container')) {
          searchSuggestions.classList.add('is-hidden');
        }
      });
    }

    // Sticky Header elevation shadow on scroll
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          mainHeader.classList.add('scrolled');
        } else {
          mainHeader.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Footer Accordion on mobile (<768px)
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
  },

  quickSearch(term) {
    window.location.href = `search.html?q=${encodeURIComponent(term)}`;
  }
};

// Auto-initialize components on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      SiteComponents.init();
    });
  } else {
    SiteComponents.init();
  }
}
