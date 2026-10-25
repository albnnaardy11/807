/**
 * 807 Streetwear & Sneakers Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Persistent Cart Counter Interaction
  let cartCount = parseInt(localStorage.getItem('807_cart_count') || '0', 10);
  const cartBadges = document.querySelectorAll('.nav-cart-badge, .mobile-drawer-cart-badge, .nav-cart-badge-text');
  cartBadges.forEach(b => {
    b.textContent = cartCount;
  });

  function incrementCart(amount = 1) {
    cartCount += amount;
    localStorage.setItem('807_cart_count', cartCount.toString());
    const badges = document.querySelectorAll('.nav-cart-badge, .mobile-drawer-cart-badge, .nav-cart-badge-text');
    badges.forEach((b) => {
      b.textContent = cartCount;
      b.classList.add('animate__animated', 'animate__rubberBand');
      setTimeout(() => {
        b.classList.remove('animate__animated', 'animate__rubberBand');
      }, 800);
    });
  }

  // 2. Club Newsletter Subscription Form
  const clubForm = document.querySelector('.club-signup-form');
  const clubInput = document.querySelector('.club-input-email');

  if (clubForm) {
    clubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = clubInput.value.trim();
      if (email && email.includes('@')) {
        showNotification('Welcome to KICKSPLUS Club! Check your inbox for your 15% OFF code. 🎉');
        clubInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // 3. Category Arrow Navigation interaction
  const arrowBtns = document.querySelectorAll('.slider-nav-arrows .arrow-btn');
  const categoryCards = document.querySelectorAll('.category-card');

  arrowBtns.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      arrowBtns.forEach((b) => b.classList.remove('active'));
      arrow.classList.add('active');

      categoryCards.forEach((card) => {
        card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        card.style.transform = 'scale(0.97)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 200);
      });
    });
  });

  // 4. Toast notification helper
  function showNotification(message) {
    let toast = document.getElementById('store-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'store-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '28px';
      toast.style.right = '28px';
      toast.style.backgroundColor = '#007A3D';
      toast.style.color = '#FFFFFF';
      toast.style.padding = '14px 24px';
      toast.style.borderRadius = '12px';
      toast.style.fontWeight = '700';
      toast.style.fontSize = '14px';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
      toast.style.zIndex = '9999';
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 2800);
  }

  // 5. Listing Page Size & Color Filter Interactions
  const sizeBtns = document.querySelectorAll('.btn-filter-size');
  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const colorSwatches = document.querySelectorAll('.color-swatch-btn');
  colorSwatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach((s) => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  // Price range slider label
  const priceSlider = document.querySelector('.price-range-slider');
  const priceLabelEnd = document.querySelector('.price-labels-row span:last-child');
  if (priceSlider && priceLabelEnd) {
    priceSlider.addEventListener('input', (e) => {
      priceLabelEnd.textContent = `$${e.target.value}`;
    });
  }

  // Pagination buttons
  const pageBtns = document.querySelectorAll('.btn-pagination');
  pageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!isNaN(btn.textContent.trim())) {
        pageBtns.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }
    });
  });

  // Refine tags remove
  const refinePills = document.querySelectorAll('.badge-refine-pill');
  refinePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.style.display = 'none';
      showNotification('Filter removed');
    });
  });

  // 6. Handle category query param on listing.html
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const filterParam = urlParams.get('filter');

  const listingTitle = document.querySelector('.listing-title');
  if (listingTitle && categoryParam) {
    if (categoryParam.toLowerCase() === 'basketball') {
      listingTitle.textContent = 'Basketball Shoes';
      document.title = 'Basketball Shoes | 807 Sneaker Store';
      
      // Update checkbox
      document.querySelectorAll('.filter-checkbox-item').forEach((item) => {
        const text = item.textContent.trim().toLowerCase();
        const input = item.querySelector('input');
        if (input) {
          input.checked = text.includes('basketball');
        }
      });
    } else if (categoryParam.toLowerCase() === 'lifestyle') {
      listingTitle.textContent = 'Life Style Shoes';
      document.title = 'Life Style Shoes | 807 Sneaker Store';
    }
  } else if (listingTitle && filterParam === 'new') {
    listingTitle.textContent = 'New Drops Collection';
    document.title = 'New Drops | 807 Sneaker Store';
  }

  // 7. Product Detail Page (product.html) Interactions
  const addCartBtn = document.querySelector('.btn-detail-add-cart');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      incrementCart(1);
      showNotification('Added to Bag! 🔥 <a href="cart.html" style="color:#FFA52F;text-decoration:underline;margin-left:8px;">View Bag</a>');
    });
  }

  const buyNowBtn = document.querySelector('.btn-detail-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      incrementCart(1);
      showNotification('Proceeding to Checkout... 🚀');
      setTimeout(() => {
        window.location.href = 'checkout.html';
      }, 500);
    });
  }

  const wishlistBtn = document.querySelector('.btn-detail-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      const heartIcon = wishlistBtn.querySelector('i');
      if (heartIcon.classList.contains('ri-heart-line')) {
        heartIcon.classList.remove('ri-heart-line');
        heartIcon.classList.add('ri-heart-fill');
        wishlistBtn.style.color = '#FF5A5F';
        showNotification('Saved to Wishlist! ❤️');
      } else {
        heartIcon.classList.remove('ri-heart-fill');
        heartIcon.classList.add('ri-heart-line');
        wishlistBtn.style.color = '#FFFFFF';
        showNotification('Removed from Wishlist');
      }
    });
  }

  const productSizeBtns = document.querySelectorAll('.product-size-btn');
  productSizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      productSizeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      showNotification(`Size ${btn.textContent.trim()} Selected`);
    });
  });

  const productColorBtns = document.querySelectorAll('.product-color-btn');
  const colorwayText = document.getElementById('productColorwayText');
  productColorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      productColorBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const colorName = btn.getAttribute('data-color') || 'Selected Color';
      if (colorwayText) {
        colorwayText.textContent = colorName;
      }
      showNotification(`Color: ${colorName}`);
    });
  });

  // Dynamic Product Page Query Params
  const prodNameParam = urlParams.get('name');
  const prodPriceParam = urlParams.get('price');
  const prodTitle = document.querySelector('.product-detail-title');
  const prodPrice = document.querySelector('.product-detail-price');

  if (prodTitle && prodNameParam) {
    prodTitle.textContent = decodeURIComponent(prodNameParam);
    document.title = `${decodeURIComponent(prodNameParam)} | 807 Sneaker Store`;
  }
  if (prodPrice && prodPriceParam) {
    prodPrice.textContent = `$${prodPriceParam}.00`;
  }

  // Sticky Bottom Quick-Buy Bar for Mobile on product.html
  const productMobileStickyBar = document.getElementById('productMobileStickyBar');
  const stickyAddCartBtn = document.getElementById('stickyAddCartBtn');
  const stickyBarTitle = document.getElementById('stickyBarTitle');
  const stickyBarPrice = document.getElementById('stickyBarPrice');

  if (stickyBarTitle && prodTitle) {
    stickyBarTitle.textContent = prodTitle.textContent.trim().split(' ').slice(0, 3).join(' ');
  }
  if (stickyBarPrice && prodPrice) {
    stickyBarPrice.textContent = prodPrice.textContent.trim();
  }

  if (productMobileStickyBar && addCartBtn) {
    window.addEventListener('scroll', () => {
      const rect = addCartBtn.getBoundingClientRect();
      if (rect.bottom < 0) {
        productMobileStickyBar.classList.add('visible');
      } else {
        productMobileStickyBar.classList.remove('visible');
      }
    }, { passive: true });
  }

  if (stickyAddCartBtn) {
    stickyAddCartBtn.addEventListener('click', () => {
      incrementCart(1);
      showNotification('Added to Bag! 🔥 <a href="cart.html" style="color:#FFA52F;text-decoration:underline;margin-left:8px;">View Bag</a>');
    });
  }

  // ==========================================
  // 8. CART / BAG PAGE (cart.html) INTERACTIONS
  // ==========================================
  const cartQtySelect = document.getElementById('cartQtySelect');
  const cartSizeSelect = document.getElementById('cartSizeSelect');
  const cartItemPriceDisplay = document.getElementById('cartItemPriceDisplay');
  const summaryItemCountLabel = document.getElementById('summaryItemCountLabel');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDelivery = document.getElementById('summaryDelivery');
  const summaryTotal = document.getElementById('summaryTotal');
  const cartItemRow = document.getElementById('cartItem1');
  const emptyCartNotice = document.getElementById('emptyCartNotice');
  const cartRemoveBtn = document.getElementById('cartRemoveBtn');
  const cartWishlistBtn = document.getElementById('cartWishlistBtn');
  const promoToggleBtn = document.getElementById('promoToggleBtn');
  const promoDrawer = document.getElementById('promoDrawer');
  const promoInput = document.getElementById('promoInput');
  const btnApplyPromo = document.getElementById('btnApplyPromo');

  const BASE_PRICE = 130.00;
  const CART_DELIVERY = 6.99;
  let appliedDiscount = 0;

  function updateCartTotals() {
    if (!cartQtySelect) return;
    const qty = parseInt(cartQtySelect.value, 10) || 1;
    const subtotal = BASE_PRICE * qty;
    const discountAmount = subtotal * appliedDiscount;
    const total = subtotal + CART_DELIVERY - discountAmount;

    if (cartItemPriceDisplay) {
      cartItemPriceDisplay.textContent = `$${subtotal.toFixed(2)}`;
    }
    if (summaryItemCountLabel) {
      summaryItemCountLabel.textContent = `${qty} ${qty > 1 ? 'ITEMS' : 'ITEM'}`;
    }
    if (summarySubtotal) {
      summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
    if (summaryDelivery) {
      summaryDelivery.textContent = `$${CART_DELIVERY.toFixed(2)}`;
    }
    if (summaryTotal) {
      summaryTotal.textContent = `$${total.toFixed(2)}`;
    }
  }

  if (cartQtySelect) {
    cartQtySelect.addEventListener('change', () => {
      updateCartTotals();
      const qty = cartQtySelect.value;
      localStorage.setItem('807_cart_count', qty);
      const badges = document.querySelectorAll('.nav-cart-badge');
      badges.forEach(b => b.textContent = qty);
      showNotification(`Quantity updated to ${qty}`);
    });
  }

  if (cartSizeSelect) {
    cartSizeSelect.addEventListener('change', () => {
      showNotification(`Size changed to ${cartSizeSelect.value}`);
    });
  }

  if (cartRemoveBtn) {
    cartRemoveBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove this item from your bag?')) {
        if (cartItemRow) cartItemRow.style.display = 'none';
        if (emptyCartNotice) emptyCartNotice.style.display = 'block';
        if (summaryItemCountLabel) summaryItemCountLabel.textContent = '0 ITEMS';
        if (summarySubtotal) summarySubtotal.textContent = '$0.00';
        if (summaryDelivery) summaryDelivery.textContent = '$0.00';
        if (summaryTotal) summaryTotal.textContent = '$0.00';
        localStorage.setItem('807_cart_count', '0');
        const badges = document.querySelectorAll('.nav-cart-badge');
        badges.forEach(b => b.textContent = '0');
        showNotification('Item removed from bag');
      }
    });
  }

  if (cartWishlistBtn) {
    cartWishlistBtn.addEventListener('click', () => {
      const heartIcon = cartWishlistBtn.querySelector('i');
      if (heartIcon.classList.contains('ri-heart-line')) {
        heartIcon.classList.remove('ri-heart-line');
        heartIcon.classList.add('ri-heart-fill');
        cartWishlistBtn.style.color = '#FF5A5F';
        showNotification('Saved to Wishlist! ❤️');
      } else {
        heartIcon.classList.remove('ri-heart-fill');
        heartIcon.classList.add('ri-heart-line');
        cartWishlistBtn.style.color = '#232321';
        showNotification('Removed from Wishlist');
      }
    });
  }

  if (promoToggleBtn && promoDrawer) {
    promoToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      promoDrawer.classList.toggle('active');
      if (promoDrawer.classList.contains('active') && promoInput) {
        promoInput.focus();
      }
    });
  }

  if (btnApplyPromo && promoInput) {
    btnApplyPromo.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'KICKS15' || code === '15OFF') {
        appliedDiscount = 0.15;
        updateCartTotals();
        showNotification('Promo code applied! 15% OFF 🎉');
        promoInput.disabled = true;
        btnApplyPromo.textContent = 'APPLIED';
        btnApplyPromo.style.backgroundColor = '#0B7143';
      } else if (code) {
        appliedDiscount = 0.10;
        updateCartTotals();
        showNotification(`Code "${code}" applied! 10% OFF 🎉`);
        promoInput.disabled = true;
        btnApplyPromo.textContent = 'APPLIED';
        btnApplyPromo.style.backgroundColor = '#0B7143';
      } else {
        alert('Please enter a valid promo code (Try: KICKS15)');
      }
    });
  }

  // Related products carousel buttons
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const carouselPills = document.querySelectorAll('.carousel-indicator-pill');
  let currentCarouselIndex = 0;

  function updateCarouselIndicator(index) {
    carouselPills.forEach((p, i) => {
      if (i === index) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      currentCarouselIndex = (currentCarouselIndex + 1) % (carouselPills.length || 4);
      updateCarouselIndicator(currentCarouselIndex);
      if (prevSlideBtn) prevSlideBtn.classList.add('active');
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      currentCarouselIndex = (currentCarouselIndex - 1 + (carouselPills.length || 4)) % (carouselPills.length || 4);
      updateCarouselIndicator(currentCarouselIndex);
    });
  }

  // ==========================================
  // 9. CHECKOUT PAGE (checkout.html) INTERACTIONS
  // ==========================================
  const deliveryOptionStandard = document.getElementById('deliveryOptionStandard');
  const deliveryOptionStore = document.getElementById('deliveryOptionStore');
  const checkoutDeliveryDisplay = document.getElementById('checkoutDeliveryDisplay');
  const checkoutTotalDisplay = document.getElementById('checkoutTotalDisplay');
  const checkoutForm = document.getElementById('checkoutForm');
  const orderModal = document.getElementById('orderModal');
  const receiptOrderNum = document.getElementById('receiptOrderNum');
  const receiptDeliveryType = document.getElementById('receiptDeliveryType');
  const receiptTotal = document.getElementById('receiptTotal');

  let selectedDeliveryFee = 6.00;
  let selectedDeliveryName = 'Standard Delivery';

  if (deliveryOptionStandard && deliveryOptionStore) {
    deliveryOptionStandard.addEventListener('click', () => {
      deliveryOptionStandard.classList.add('active');
      deliveryOptionStandard.style.backgroundColor = '#FFFFFF';
      deliveryOptionStandard.style.borderColor = '#232321';

      deliveryOptionStore.classList.remove('active');
      deliveryOptionStore.style.backgroundColor = '#ECEAE5';
      deliveryOptionStore.style.borderColor = '#D1D1CB';

      selectedDeliveryFee = 6.00;
      selectedDeliveryName = 'Standard Delivery';
      if (checkoutDeliveryDisplay) checkoutDeliveryDisplay.textContent = '$6.00';
      if (checkoutTotalDisplay) checkoutTotalDisplay.textContent = '$136.00';
    });

    deliveryOptionStore.addEventListener('click', () => {
      deliveryOptionStore.classList.add('active');
      deliveryOptionStore.style.backgroundColor = '#FFFFFF';
      deliveryOptionStore.style.borderColor = '#232321';

      deliveryOptionStandard.classList.remove('active');
      deliveryOptionStandard.style.backgroundColor = '#ECEAE5';
      deliveryOptionStandard.style.borderColor = '#D1D1CB';

      selectedDeliveryFee = 0.00;
      selectedDeliveryName = 'Collect in store';
      if (checkoutDeliveryDisplay) checkoutDeliveryDisplay.textContent = 'Free';
      if (checkoutTotalDisplay) checkoutTotalDisplay.textContent = '$130.00';
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const orderNum = `#807-${Math.floor(10000 + Math.random() * 90000)}`;
      const grandTotal = `$${(130.00 + selectedDeliveryFee).toFixed(2)}`;

      if (receiptOrderNum) receiptOrderNum.textContent = orderNum;
      if (receiptDeliveryType) receiptDeliveryType.textContent = selectedDeliveryName;
      if (receiptTotal) receiptTotal.textContent = grandTotal;

      if (orderModal) {
        orderModal.classList.add('active');
      }

      // Reset cart badge to 0
      localStorage.setItem('807_cart_count', '0');
      const badges = document.querySelectorAll('.nav-cart-badge');
      badges.forEach(b => b.textContent = '0');
    });
  }

  // ==========================================
  // 10. AUTH PAGES: LOGIN & REGISTER
  // ==========================================
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const forgotPassBtn = document.getElementById('forgotPassBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginEmail ? loginEmail.value.trim() : 'user@example.com';
      localStorage.setItem('807_user', JSON.stringify({ email, loggedIn: true }));
      showNotification(`Welcome back, ${email.split('@')[0]}! 🎉`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 700);
    });
  }

  if (forgotPassBtn) {
    forgotPassBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = prompt('Please enter your email to receive a password reset link:');
      if (email && email.includes('@')) {
        showNotification(`Password reset link sent to ${email} 📩`);
      }
    });
  }

  const registerForm = document.getElementById('registerForm');
  const regFirstName = document.getElementById('regFirstName');
  const regEmail = document.getElementById('regEmail');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = regFirstName ? regFirstName.value.trim() : 'Member';
      const email = regEmail ? regEmail.value.trim() : 'member@example.com';
      localStorage.setItem('807_user', JSON.stringify({ name, email, loggedIn: true, voucher: '15% OFF' }));
      showNotification(`Welcome to Kicks Club, ${name}! Your 15% OFF voucher is active. 🎉`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 800);
    });
  }

  // Social Login & Register Simulation
  const socialAuthBtns = document.querySelectorAll('.btn-social-auth');
  socialAuthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.getAttribute('title') || 'Social Provider';
      showNotification(`Connecting with ${provider}... ⚡`);
      setTimeout(() => {
        localStorage.setItem('807_user', JSON.stringify({ name: 'Verified Member', loggedIn: true }));
        showNotification(`Successfully authenticated with ${provider}! 🎉`);
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 700);
      }, 600);
    });
  });

  // Gender checkbox single selection logic on Register
  const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
  genderCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) {
        genderCheckboxes.forEach(other => {
          if (other !== cb) other.checked = false;
        });
      }
    });
  });

  // ==========================================
  // 11. MOBILE NAVIGATION & FILTER DRAWERS
  // ==========================================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

  function openMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      mobileNavDrawer.classList.add('active');
      mobileNavBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      mobileNavDrawer.classList.remove('active');
      mobileNavBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileNav);
  }
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileNav);
  }
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  // Close mobile drawer when clicking any link inside
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Mobile Filters Drawer for listing.html
  const mobileFilterToggleBtn = document.getElementById('mobileFilterToggleBtn');
  const filtersSidebarCol = document.getElementById('filtersSidebarCol');
  const mobileFilterCloseBtn = document.getElementById('mobileFilterCloseBtn');
  const mobileFilterBackdrop = document.getElementById('mobileFilterBackdrop');
  const btnApplyMobileFilters = document.getElementById('btnApplyMobileFilters');

  function openMobileFilters() {
    if (filtersSidebarCol && mobileFilterBackdrop) {
      filtersSidebarCol.classList.add('mobile-filter-open');
      mobileFilterBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileFilters() {
    if (filtersSidebarCol && mobileFilterBackdrop) {
      filtersSidebarCol.classList.remove('mobile-filter-open');
      mobileFilterBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileFilterToggleBtn) {
    mobileFilterToggleBtn.addEventListener('click', openMobileFilters);
  }
  if (mobileFilterCloseBtn) {
    mobileFilterCloseBtn.addEventListener('click', closeMobileFilters);
  }
  if (mobileFilterBackdrop) {
    mobileFilterBackdrop.addEventListener('click', closeMobileFilters);
  }
  if (btnApplyMobileFilters) {
    btnApplyMobileFilters.addEventListener('click', () => {
      closeMobileFilters();
      showNotification('Filters applied! Showing updated sneaker selection.');
    });
  }

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeMobileFilters();
    }
  });
});


