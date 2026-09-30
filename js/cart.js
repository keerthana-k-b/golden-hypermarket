// Golden Hypermarket Pala - Cart & Wishlist Engine (js/cart.js)

const CartManager = {
  CART_KEY: 'golden_hypermarket_cart',
  WISHLIST_KEY: 'golden_hypermarket_wishlist',
  LOCATION_KEY: 'golden_hypermarket_location',
  LANG_KEY: 'golden_hypermarket_lang',

  // Initialize
  init() {
    this.syncBadges();
    this.setupEventListeners();
  },

  // Get Cart array [{ id: 1, qty: 2 }, ...]
  getCart() {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  },

  // Save Cart array
  saveCart(cart) {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      this.syncBadges();
      window.dispatchEvent(new CustomEvent('golden:cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  },

  // Add Item to cart
  addItem(productId, qty = 1) {
    const pId = parseInt(productId, 10);
    const product = (typeof siteData !== 'undefined') ? siteData.getProductById(pId) : null;

    let cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === pId);

    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
      if (cart[existingIndex].qty <= 0) {
        cart.splice(existingIndex, 1);
      }
    } else if (qty > 0) {
      cart.push({ id: pId, qty: qty });
    }

    this.saveCart(cart);
    if (product) {
      this.showToast(`Added <strong>${product.name}</strong> to Cart!`, 'success');
    }
    return true;
  },

  // Set specific quantity
  setQty(productId, qty) {
    const pId = parseInt(productId, 10);
    let cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === pId);

    if (qty <= 0) {
      if (existingIndex > -1) {
        const p = (typeof siteData !== 'undefined') ? siteData.getProductById(pId) : null;
        cart.splice(existingIndex, 1);
        this.saveCart(cart);
        if (p) this.showToast(`Removed <strong>${p.name}</strong> from Cart`, 'info');
      }
      return 0;
    }

    if (existingIndex > -1) {
      cart[existingIndex].qty = qty;
    } else {
      cart.push({ id: pId, qty: qty });
    }

    this.saveCart(cart);
    return qty;
  },

  // Remove Item
  removeItem(productId) {
    const pId = parseInt(productId, 10);
    let cart = this.getCart();
    const product = (typeof siteData !== 'undefined') ? siteData.getProductById(pId) : null;
    cart = cart.filter(item => item.id !== pId);
    this.saveCart(cart);
    if (product) {
      this.showToast(`Removed <strong>${product.name}</strong> from Cart`, 'info');
    }
  },

  // Clear Cart
  clearCart() {
    this.saveCart([]);
  },

  // Get Item Quantity in Cart
  getItemQty(productId) {
    const pId = parseInt(productId, 10);
    const cart = this.getCart();
    const item = cart.find(i => i.id === pId);
    return item ? item.qty : 0;
  },

  // Get Wishlist array of IDs [1, 4, 12]
  getWishlist() {
    try {
      const data = localStorage.getItem(this.WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // Save Wishlist
  saveWishlist(list) {
    try {
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(list));
      this.syncBadges();
      window.dispatchEvent(new CustomEvent('golden:wishlist-updated', { detail: { wishlist: list } }));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  },

  // Toggle Wishlist item
  toggleWishlist(productId) {
    const pId = parseInt(productId, 10);
    const product = (typeof siteData !== 'undefined') ? siteData.getProductById(pId) : null;
    let list = this.getWishlist();
    const idx = list.indexOf(pId);
    let isAdded = false;

    if (idx > -1) {
      list.splice(idx, 1);
      if (product) this.showToast(`Removed <strong>${product.name}</strong> from Wishlist`, 'info');
    } else {
      list.push(pId);
      isAdded = true;
      if (product) this.showToast(`Added <strong>${product.name}</strong> to Wishlist!`, 'success');
    }

    this.saveWishlist(list);
    return isAdded;
  },

  isInWishlist(productId) {
    const pId = parseInt(productId, 10);
    return this.getWishlist().includes(pId);
  },

  // Cart summary calculations
  getSummary() {
    const cart = this.getCart();
    let totalItems = 0;
    let subtotal = 0;
    let totalOriginalPrice = 0;
    let itemsDetails = [];

    if (typeof siteData !== 'undefined' && siteData.getProductById) {
      cart.forEach(item => {
        const p = siteData.getProductById(item.id);
        if (p) {
          totalItems += item.qty;
          subtotal += p.price * item.qty;
          totalOriginalPrice += (p.oldPrice || p.price) * item.qty;
          itemsDetails.push({
            ...p,
            qty: item.qty,
            lineTotal: p.price * item.qty
          });
        }
      });
    }

    const discountSavings = Math.max(0, totalOriginalPrice - subtotal);
    // Free delivery on orders >= 499 in Pala municipal limits
    const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 35;
    const finalTotal = subtotal + deliveryFee;

    return {
      totalItems,
      distinctCount: cart.length,
      subtotal,
      totalOriginalPrice,
      discountSavings,
      deliveryFee,
      finalTotal,
      items: itemsDetails
    };
  },

  // Live UI Synchronizer for Header Badges and Prices
  syncBadges() {
    const summary = this.getSummary();
    const wishlist = this.getWishlist();

    // Update cart badges
    document.querySelectorAll('.cart-badge-count, .cart-count-badge, .cart-badge').forEach(el => {
      el.textContent = summary.totalItems;
      el.classList.toggle('is-hidden', summary.totalItems === 0);
    });

    // Update cart total price previews
    document.querySelectorAll('.header-cart-total, .cart-header-subtotal').forEach(el => {
      el.textContent = `₹${summary.subtotal.toLocaleString('en-IN')}`;
    });

    // Update wishlist badges
    document.querySelectorAll('.wishlist-badge-count, .wishlist-count-badge, .wishlist-badge').forEach(el => {
      el.textContent = wishlist.length;
      el.classList.toggle('is-hidden', wishlist.length === 0);
    });

    // Update button steppers if on product grids
    this.updateAllCardSteppers();
  },

  // Update card buttons across page
  updateAllCardSteppers() {
    document.querySelectorAll('[data-product-card-id]').forEach(card => {
      const pId = parseInt(card.getAttribute('data-product-card-id'), 10);
      const qty = this.getItemQty(pId);
      const stepperContainer = card.querySelector('.cart-action-container');
      const heartBtn = card.querySelector('.btn-wishlist');

      if (heartBtn) {
        if (this.isInWishlist(pId)) {
          heartBtn.classList.add('active');
          heartBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
          heartBtn.classList.remove('active');
          heartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
      }

      if (stepperContainer) {
        if (qty > 0) {
          stepperContainer.innerHTML = `
            <div class="stepper-btn-group">
              <button class="btn-step-minus" onclick="CartManager.setQty(${pId}, ${qty - 1}); event.stopPropagation();" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="stepper-qty">${qty}</span>
              <button class="btn-step-plus" onclick="CartManager.setQty(${pId}, ${qty + 1}); event.stopPropagation();" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          `;
        } else {
          stepperContainer.innerHTML = `
            <button class="btn-add-cart" onclick="CartManager.addItem(${pId}, 1); event.stopPropagation();" aria-label="Add to cart">
              <i class="fa-solid fa-plus"></i> Add
            </button>
          `;
        }
      }
    });
  },

  // Render a standard product card HTML string
  renderProductCard(product) {
    if (!product) return '';
    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const qty = this.getItemQty(product.id);
    const inWishlist = this.isInWishlist(product.id);

    return `
      <div class="product-card" data-product-card-id="${product.id}" onclick="window.location.href='product.html?id=${product.id}'">
        ${discount > 0 ? `<div class="card-discount-badge">${discount}% OFF</div>` : ''}
        <button class="btn-wishlist ${inWishlist ? 'active' : ''}" onclick="CartManager.toggleWishlist(${product.id}); event.stopPropagation();" aria-label="Add to wishlist">
          <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'">
        </div>
        <div class="product-meta">
          <span class="product-brand">${product.brand || 'Golden Fresh'}</span>
          <h3 class="product-title" title="${product.name}">
            <a href="product.html?id=${product.id}" onclick="event.stopPropagation();">${product.name}</a>
          </h3>
          <p class="product-title-ml">${product.nameMl || ''}</p>
          <div class="product-weight">${product.weight}</div>
          <div class="product-pricing">
            <div class="price-stack">
              <span class="curr-price">₹${product.price}</span>
              ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ''}
            </div>
            <div class="cart-action-container">
              ${qty > 0 ? `
                <div class="stepper-btn-group">
                  <button class="btn-step-minus" onclick="CartManager.setQty(${product.id}, ${qty - 1}); event.stopPropagation();" aria-label="Decrease quantity">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="stepper-qty">${qty}</span>
                  <button class="btn-step-plus" onclick="CartManager.setQty(${product.id}, ${qty + 1}); event.stopPropagation();" aria-label="Increase quantity">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              ` : `
                <button class="btn-add-cart" onclick="CartManager.addItem(${product.id}, 1); event.stopPropagation();" aria-label="Add to cart">
                  <i class="fa-solid fa-plus"></i> Add
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Toast notifications
  showToast(message, type = 'info') {
    let container = document.getElementById('golden-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'golden-toast-container';
      container.className = 'golden-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `golden-toast golden-toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info');
    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  },

  // Generate WhatsApp Order Text
  generateWhatsAppOrderMessage(customerDetails = {}) {
    const summary = this.getSummary();
    if (summary.items.length === 0) return '';

    let text = `*🛍️ NEW ORDER - GOLDEN HYPERMARKET, PALA*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    
    if (customerDetails.name) text += `*Customer:* ${customerDetails.name}\n`;
    if (customerDetails.phone) text += `*Phone:* ${customerDetails.phone}\n`;
    if (customerDetails.address) text += `*Delivery Address:* ${customerDetails.address}, Pala\n`;
    text += `*Delivery Slot:* ${customerDetails.slot || 'Standard (Within 2 Hours)'}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n*ITEMS ORDERED:*\n`;

    summary.items.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (${item.weight})\n   Qty: ${item.qty} × ₹${item.price} = *₹${item.lineTotal}*\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Subtotal:* ₹${summary.subtotal}\n`;
    text += `*Delivery Fee:* ${summary.deliveryFee === 0 ? 'FREE' : '₹' + summary.deliveryFee}\n`;
    text += `*Total Amount:* ₹${summary.finalTotal}\n`;
    text += `*Payment:* Cash on Delivery / UPI on Delivery\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n_Please confirm my order. Thank you!_`;

    return encodeURIComponent(text);
  },

  setupEventListeners() {
    window.addEventListener('storage', (e) => {
      if (e.key === this.CART_KEY || e.key === this.WISHLIST_KEY) {
        this.syncBadges();
      }
    });
  }
};

// Auto initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  CartManager.init();
});
