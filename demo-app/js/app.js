/**
 * Cypress Cursus Demo App - Main JavaScript
 * Deze applicatie dient als test-target voor de Cypress cursus
 */

// ============================================
// State Management
// ============================================
const AppState = {
  currentUser: null,
  cart: [],
  products: [],
  orders: [],

  init() {
    this.loadFromStorage();
    this.updateUI();
  },

  loadFromStorage() {
    const user = localStorage.getItem('currentUser');
    const cart = localStorage.getItem('cart');

    if (user) {
      this.currentUser = JSON.parse(user);
    }
    if (cart) {
      this.cart = JSON.parse(cart);
    }
  },

  saveToStorage() {
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  },

  updateUI() {
    this.updateNavigation();
    this.updateCartCount();
  },

  updateNavigation() {
    const userInfo = document.querySelector('[data-cy="user-info"]');
    const loginLink = document.querySelector('[data-cy="nav-login"]');
    const logoutBtn = document.querySelector('[data-cy="logout-button"]');

    if (userInfo) {
      if (this.currentUser) {
        userInfo.textContent = `Welkom, ${this.currentUser.name}`;
        userInfo.classList.remove('hidden');
      } else {
        userInfo.classList.add('hidden');
      }
    }

    if (loginLink) {
      loginLink.classList.toggle('hidden', !!this.currentUser);
    }

    if (logoutBtn) {
      logoutBtn.classList.toggle('hidden', !this.currentUser);
    }
  },

  updateCartCount() {
    const cartCount = document.querySelector('[data-cy="cart-count"]');
    if (cartCount) {
      const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = count;
      cartCount.classList.toggle('hidden', count === 0);
    }
  }
};

// ============================================
// Authentication
// ============================================
const Auth = {
  users: [
    { id: 1, username: 'student', password: 'cypress123', name: 'Student User', email: 'student@test.nl' },
    { id: 2, username: 'admin', password: 'admin123', name: 'Admin User', email: 'admin@test.nl', role: 'admin' },
    { id: 3, username: 'tester', password: 'test123', name: 'Test User', email: 'tester@test.nl' }
  ],

  login(username, password) {
    return new Promise((resolve, reject) => {
      // Simuleer network delay
      setTimeout(() => {
        const user = this.users.find(u => u.username === username && u.password === password);

        if (user) {
          const { password: _, ...safeUser } = user;
          AppState.currentUser = safeUser;
          AppState.saveToStorage();
          AppState.updateUI();
          resolve(safeUser);
        } else {
          reject(new Error('Ongeldige gebruikersnaam of wachtwoord'));
        }
      }, 500);
    });
  },

  logout() {
    AppState.currentUser = null;
    AppState.saveToStorage();
    AppState.updateUI();
    window.location.href = 'index.html';
  },

  isLoggedIn() {
    return !!AppState.currentUser;
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
      return false;
    }
    return true;
  }
};

// ============================================
// Products
// ============================================
const Products = {
  data: [
    { id: 1, name: 'Laptop Pro 15"', price: 1299.99, category: 'electronics', stock: 15, image: 'laptop.jpg', description: 'Krachtige laptop voor professionals met 16GB RAM en 512GB SSD.' },
    { id: 2, name: 'Wireless Mouse', price: 49.99, category: 'electronics', stock: 50, image: 'mouse.jpg', description: 'Ergonomische draadloze muis met lange batterijduur.' },
    { id: 3, name: 'USB-C Hub', price: 79.99, category: 'electronics', stock: 30, image: 'hub.jpg', description: '7-in-1 USB-C hub met HDMI, USB-A en SD kaartlezer.' },
    { id: 4, name: 'Mechanical Keyboard', price: 129.99, category: 'electronics', stock: 25, image: 'keyboard.jpg', description: 'RGB mechanisch toetsenbord met Cherry MX switches.' },
    { id: 5, name: 'Monitor 27"', price: 349.99, category: 'electronics', stock: 10, image: 'monitor.jpg', description: '4K IPS monitor met USB-C aansluiting.' },
    { id: 6, name: 'Webcam HD', price: 89.99, category: 'electronics', stock: 40, image: 'webcam.jpg', description: '1080p webcam met ingebouwde microfoon.' },
    { id: 7, name: 'Cypress T-Shirt', price: 24.99, category: 'clothing', stock: 100, image: 'tshirt.jpg', description: 'Comfortabel katoenen t-shirt met Cypress logo.' },
    { id: 8, name: 'Developer Hoodie', price: 59.99, category: 'clothing', stock: 45, image: 'hoodie.jpg', description: 'Warme hoodie voor developers, "It works on my machine".' },
    { id: 9, name: 'Testing Book', price: 39.99, category: 'books', stock: 60, image: 'book.jpg', description: 'Uitgebreide gids voor testautomatisering.' },
    { id: 10, name: 'Cypress Stickers', price: 9.99, category: 'accessories', stock: 200, image: 'stickers.jpg', description: 'Set van 10 Cypress stickers voor je laptop.' },
    { id: 11, name: 'Standing Desk', price: 499.99, category: 'furniture', stock: 5, image: 'desk.jpg', description: 'Elektrisch verstelbaar sta-bureau.' },
    { id: 12, name: 'Ergonomic Chair', price: 299.99, category: 'furniture', stock: 8, image: 'chair.jpg', description: 'Ergonomische bureaustoel met lumbaalsteun.' },
    { id: 13, name: 'Headphones', price: 199.99, category: 'electronics', stock: 0, image: 'headphones.jpg', description: 'Noise-cancelling koptelefoon - UITVERKOCHT' },
    { id: 14, name: 'Coffee Mug', price: 14.99, category: 'accessories', stock: 150, image: 'mug.jpg', description: '"First, solve the problem. Then, write the code." mok.' },
    { id: 15, name: 'Desk Lamp', price: 44.99, category: 'accessories', stock: 35, image: 'lamp.jpg', description: 'LED bureaulamp met verstelbare helderheid.' }
  ],

  getAll() {
    return this.data;
  },

  getById(id) {
    return this.data.find(p => p.id === parseInt(id));
  },

  getByCategory(category) {
    if (!category || category === 'all') return this.data;
    return this.data.filter(p => p.category === category);
  },

  search(query) {
    const q = query.toLowerCase();
    return this.data.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  },

  getCategories() {
    return [...new Set(this.data.map(p => p.category))];
  },

  filter(options = {}) {
    let results = this.data;

    if (options.category && options.category !== 'all') {
      results = results.filter(p => p.category === options.category);
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (options.inStock) {
      results = results.filter(p => p.stock > 0);
    }

    if (options.minPrice !== undefined) {
      results = results.filter(p => p.price >= options.minPrice);
    }

    if (options.maxPrice !== undefined) {
      results = results.filter(p => p.price <= options.maxPrice);
    }

    if (options.sort) {
      switch (options.sort) {
        case 'price-asc':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    return results;
  }
};

// ============================================
// Cart
// ============================================
const Cart = {
  add(productId, quantity = 1) {
    const product = Products.getById(productId);
    if (!product) return false;
    if (product.stock < quantity) return false;

    const existingItem = AppState.cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      AppState.cart.push({
        productId,
        name: product.name,
        price: product.price,
        quantity
      });
    }

    AppState.saveToStorage();
    AppState.updateCartCount();
    return true;
  },

  remove(productId) {
    AppState.cart = AppState.cart.filter(item => item.productId !== productId);
    AppState.saveToStorage();
    AppState.updateCartCount();
  },

  updateQuantity(productId, quantity) {
    const item = AppState.cart.find(item => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.remove(productId);
      } else {
        item.quantity = quantity;
        AppState.saveToStorage();
        AppState.updateCartCount();
      }
    }
  },

  clear() {
    AppState.cart = [];
    AppState.saveToStorage();
    AppState.updateCartCount();
  },

  getItems() {
    return AppState.cart;
  },

  getTotal() {
    return AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getItemCount() {
    return AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
};

// ============================================
// Orders
// ============================================
const Orders = {
  create(orderData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!AppState.currentUser) {
          reject(new Error('Je moet ingelogd zijn om te bestellen'));
          return;
        }

        if (AppState.cart.length === 0) {
          reject(new Error('Je winkelwagen is leeg'));
          return;
        }

        const order = {
          id: Date.now(),
          userId: AppState.currentUser.id,
          items: [...AppState.cart],
          total: Cart.getTotal(),
          shipping: orderData,
          status: 'pending',
          createdAt: new Date().toISOString()
        };

        // Simuleer order opslaan
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Leeg de winkelwagen
        Cart.clear();

        resolve(order);
      }, 1000);
    });
  },

  getByUser() {
    if (!AppState.currentUser) return [];
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.filter(o => o.userId === AppState.currentUser.id);
  }
};

// ============================================
// UI Helpers
// ============================================
const UI = {
  showAlert(message, type = 'info', container = null) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.setAttribute('data-cy', 'alert-message');
    alert.textContent = message;

    const target = container || document.querySelector('.container');
    if (target) {
      target.insertBefore(alert, target.firstChild);
      setTimeout(() => alert.remove(), 5000);
    }
  },

  showLoading(show = true) {
    let overlay = document.querySelector('.loading-overlay');

    if (show) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.setAttribute('data-cy', 'loading');
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
      }
    } else if (overlay) {
      overlay.remove();
    }
  },

  formatPrice(price) {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  },

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  },

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  },

  validateForm(formElement) {
    let isValid = true;
    const inputs = formElement.querySelectorAll('[required]');

    inputs.forEach(input => {
      const feedback = input.parentElement.querySelector('.invalid-feedback');

      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        if (feedback) feedback.style.display = 'block';
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (feedback) feedback.style.display = 'none';
      }

      // Email validatie
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          if (feedback) {
            feedback.textContent = 'Voer een geldig e-mailadres in';
            feedback.style.display = 'block';
          }
          isValid = false;
        }
      }

      // Telefoon validatie
      if (input.dataset.validate === 'phone' && input.value) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(input.value)) {
          input.classList.add('is-invalid');
          if (feedback) {
            feedback.textContent = 'Voer een geldig telefoonnummer in';
            feedback.style.display = 'block';
          }
          isValid = false;
        }
      }

      // Postcode validatie (Nederlands)
      if (input.dataset.validate === 'postcode' && input.value) {
        const postcodeRegex = /^[1-9][0-9]{3}\s?[A-Za-z]{2}$/;
        if (!postcodeRegex.test(input.value)) {
          input.classList.add('is-invalid');
          if (feedback) {
            feedback.textContent = 'Voer een geldige postcode in (bijv. 1234 AB)';
            feedback.style.display = 'block';
          }
          isValid = false;
        }
      }
    });

    return isValid;
  }
};

// ============================================
// Page-specific Initializers
// ============================================
const PageHandlers = {
  // Login Page
  initLoginPage() {
    const form = document.querySelector('[data-cy="login-form"]');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.querySelector('[data-cy="username"]').value;
      const password = document.querySelector('[data-cy="password"]').value;
      const errorDiv = document.querySelector('[data-cy="login-error"]');

      if (errorDiv) errorDiv.classList.add('hidden');

      try {
        UI.showLoading(true);
        await Auth.login(username, password);

        // Redirect naar oorspronkelijke pagina of dashboard
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect') || 'dashboard.html';
        window.location.href = redirect;
      } catch (error) {
        if (errorDiv) {
          errorDiv.textContent = error.message;
          errorDiv.classList.remove('hidden');
        }
      } finally {
        UI.showLoading(false);
      }
    });
  },

  // Products Page
  initProductsPage() {
    const grid = document.querySelector('[data-cy="product-grid"]');
    if (!grid) return;

    const renderProducts = (products) => {
      if (products.length === 0) {
        grid.innerHTML = '<p data-cy="no-products">Geen producten gevonden</p>';
        return;
      }

      grid.innerHTML = products.map(product => `
        <div class="product-card" data-cy="product-card" data-product-id="${product.id}">
          <div class="product-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
            ${product.name.charAt(0)}
          </div>
          <div class="product-info">
            <div class="product-category" data-cy="product-category">${product.category}</div>
            <h3 class="product-name" data-cy="product-name">${product.name}</h3>
            <p class="product-price" data-cy="product-price">${UI.formatPrice(product.price)}</p>
            <p class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}" data-cy="product-stock">
              ${product.stock > 0 ? `${product.stock} op voorraad` : 'Uitverkocht'}
            </p>
            <div class="mt-2">
              <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm" data-cy="view-product">Bekijk</a>
              ${product.stock > 0 ? `
                <button class="btn btn-primary btn-sm" data-cy="add-to-cart" data-product-id="${product.id}">
                  In winkelwagen
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('');

      // Add to cart handlers
      grid.querySelectorAll('[data-cy="add-to-cart"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.dataset.productId);
          if (Cart.add(productId)) {
            UI.showAlert('Product toegevoegd aan winkelwagen', 'success');
          } else {
            UI.showAlert('Kon product niet toevoegen', 'error');
          }
        });
      });
    };

    // Initial render
    renderProducts(Products.getAll());

    // Category filter
    const categoryFilter = document.querySelector('[data-cy="category-filter"]');
    if (categoryFilter) {
      Products.getCategories().forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categoryFilter.appendChild(option);
      });

      categoryFilter.addEventListener('change', applyFilters);
    }

    // Search
    const searchInput = document.querySelector('[data-cy="search-input"]');
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyFilters, 300);
      });
    }

    // Sort
    const sortSelect = document.querySelector('[data-cy="sort-select"]');
    if (sortSelect) {
      sortSelect.addEventListener('change', applyFilters);
    }

    // In stock filter
    const inStockCheckbox = document.querySelector('[data-cy="in-stock-filter"]');
    if (inStockCheckbox) {
      inStockCheckbox.addEventListener('change', applyFilters);
    }

    function applyFilters() {
      const options = {
        category: categoryFilter?.value,
        search: searchInput?.value,
        sort: sortSelect?.value,
        inStock: inStockCheckbox?.checked
      };
      renderProducts(Products.filter(options));
    }
  },

  // Product Detail Page
  initProductDetailPage() {
    const container = document.querySelector('[data-cy="product-detail"]');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = Products.getById(productId);

    if (!product) {
      container.innerHTML = '<div class="alert alert-error" data-cy="product-not-found">Product niet gevonden</div>';
      return;
    }

    container.innerHTML = `
      <div class="row">
        <div class="col-50">
          <div class="product-image" style="height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 6rem; border-radius: 8px;">
            ${product.name.charAt(0)}
          </div>
        </div>
        <div class="col-50">
          <span class="badge badge-primary" data-cy="product-category">${product.category}</span>
          <h1 data-cy="product-name">${product.name}</h1>
          <p class="product-price" style="font-size: 2rem;" data-cy="product-price">${UI.formatPrice(product.price)}</p>
          <p data-cy="product-description">${product.description}</p>
          <p class="product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}" data-cy="product-stock">
            ${product.stock > 0 ? `${product.stock} op voorraad` : 'Uitverkocht'}
          </p>

          ${product.stock > 0 ? `
            <div class="form-group mt-3">
              <label class="form-label">Aantal:</label>
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="cart-item-quantity">
                  <button class="quantity-btn" data-cy="quantity-decrease">-</button>
                  <span class="quantity-value" data-cy="quantity-value">1</span>
                  <button class="quantity-btn" data-cy="quantity-increase">+</button>
                </div>
                <button class="btn btn-primary btn-lg" data-cy="add-to-cart">
                  In winkelwagen
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Quantity controls
    let quantity = 1;
    const quantityValue = container.querySelector('[data-cy="quantity-value"]');

    container.querySelector('[data-cy="quantity-decrease"]')?.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
      }
    });

    container.querySelector('[data-cy="quantity-increase"]')?.addEventListener('click', () => {
      if (quantity < product.stock) {
        quantity++;
        quantityValue.textContent = quantity;
      }
    });

    container.querySelector('[data-cy="add-to-cart"]')?.addEventListener('click', () => {
      if (Cart.add(product.id, quantity)) {
        UI.showAlert(`${quantity}x ${product.name} toegevoegd aan winkelwagen`, 'success');
      }
    });
  },

  // Cart Page
  initCartPage() {
    const container = document.querySelector('[data-cy="cart-container"]');
    if (!container) return;

    const renderCart = () => {
      const items = Cart.getItems();

      if (items.length === 0) {
        container.innerHTML = `
          <div class="card">
            <p data-cy="empty-cart">Je winkelwagen is leeg</p>
            <a href="products.html" class="btn btn-primary mt-2">Bekijk producten</a>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="card">
          <div class="card-header">Winkelwagen (${Cart.getItemCount()} items)</div>
          <div data-cy="cart-items">
            ${items.map(item => `
              <div class="cart-item" data-cy="cart-item" data-product-id="${item.productId}">
                <div class="cart-item-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                  ${item.name.charAt(0)}
                </div>
                <div class="cart-item-info">
                  <div class="cart-item-name" data-cy="item-name">${item.name}</div>
                  <div class="cart-item-price" data-cy="item-price">${UI.formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-quantity">
                  <button class="quantity-btn" data-cy="decrease-quantity" data-product-id="${item.productId}">-</button>
                  <span class="quantity-value" data-cy="item-quantity">${item.quantity}</span>
                  <button class="quantity-btn" data-cy="increase-quantity" data-product-id="${item.productId}">+</button>
                </div>
                <div>
                  <strong data-cy="item-total">${UI.formatPrice(item.price * item.quantity)}</strong>
                </div>
                <button class="btn btn-danger btn-sm" data-cy="remove-item" data-product-id="${item.productId}">
                  Verwijder
                </button>
              </div>
            `).join('')}
          </div>
          <div class="cart-summary">
            <div class="cart-total">
              <span>Totaal:</span>
              <span data-cy="cart-total">${UI.formatPrice(Cart.getTotal())}</span>
            </div>
            <a href="checkout.html" class="btn btn-success btn-block" data-cy="checkout-button">
              Afrekenen
            </a>
          </div>
        </div>
      `;

      // Event handlers
      container.querySelectorAll('[data-cy="decrease-quantity"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const productId = parseInt(btn.dataset.productId);
          const item = items.find(i => i.productId === productId);
          if (item) {
            Cart.updateQuantity(productId, item.quantity - 1);
            renderCart();
          }
        });
      });

      container.querySelectorAll('[data-cy="increase-quantity"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const productId = parseInt(btn.dataset.productId);
          const item = items.find(i => i.productId === productId);
          if (item) {
            Cart.updateQuantity(productId, item.quantity + 1);
            renderCart();
          }
        });
      });

      container.querySelectorAll('[data-cy="remove-item"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const productId = parseInt(btn.dataset.productId);
          Cart.remove(productId);
          renderCart();
        });
      });
    };

    renderCart();
  },

  // Checkout Page
  initCheckoutPage() {
    if (!Auth.requireAuth()) return;

    const form = document.querySelector('[data-cy="checkout-form"]');
    if (!form) return;

    // Show cart summary
    const summaryContainer = document.querySelector('[data-cy="order-summary"]');
    if (summaryContainer) {
      const items = Cart.getItems();
      summaryContainer.innerHTML = `
        <h3>Bestelling</h3>
        ${items.map(item => `
          <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;">
            <span>${item.quantity}x ${item.name}</span>
            <span>${UI.formatPrice(item.price * item.quantity)}</span>
          </div>
        `).join('')}
        <hr>
        <div style="display: flex; justify-content: space-between; font-weight: bold;">
          <span>Totaal:</span>
          <span data-cy="checkout-total">${UI.formatPrice(Cart.getTotal())}</span>
        </div>
      `;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!UI.validateForm(form)) {
        UI.showAlert('Vul alle verplichte velden correct in', 'error');
        return;
      }

      const formData = new FormData(form);
      const orderData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        postcode: formData.get('postcode'),
        notes: formData.get('notes')
      };

      try {
        UI.showLoading(true);
        const order = await Orders.create(orderData);

        // Redirect naar bevestigingspagina
        localStorage.setItem('lastOrder', JSON.stringify(order));
        window.location.href = 'index.html?order=success';
      } catch (error) {
        UI.showAlert(error.message, 'error');
      } finally {
        UI.showLoading(false);
      }
    });
  },

  // Dashboard Page
  initDashboardPage() {
    if (!Auth.requireAuth()) return;

    const welcomeMessage = document.querySelector('[data-cy="welcome-message"]');
    if (welcomeMessage && AppState.currentUser) {
      welcomeMessage.textContent = `Welkom terug, ${AppState.currentUser.name}!`;
    }

    // Load user orders
    const ordersContainer = document.querySelector('[data-cy="recent-orders"]');
    if (ordersContainer) {
      const orders = Orders.getByUser();

      if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>Je hebt nog geen bestellingen geplaatst.</p>';
      } else {
        ordersContainer.innerHTML = `
          <table class="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Datum</th>
                <th>Items</th>
                <th>Totaal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(order => `
                <tr data-cy="order-row">
                  <td data-cy="order-id">${order.id}</td>
                  <td data-cy="order-date">${new Date(order.createdAt).toLocaleDateString('nl-NL')}</td>
                  <td data-cy="order-items">${order.items.length}</td>
                  <td data-cy="order-total">${UI.formatPrice(order.total)}</td>
                  <td><span class="badge badge-warning" data-cy="order-status">${order.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    }

    // Stats
    const stats = {
      orders: Orders.getByUser().length,
      cartItems: Cart.getItemCount(),
      totalSpent: Orders.getByUser().reduce((sum, o) => sum + o.total, 0)
    };

    const statOrders = document.querySelector('[data-cy="stat-orders"]');
    const statCart = document.querySelector('[data-cy="stat-cart"]');
    const statSpent = document.querySelector('[data-cy="stat-spent"]');

    if (statOrders) statOrders.textContent = stats.orders;
    if (statCart) statCart.textContent = stats.cartItems;
    if (statSpent) statSpent.textContent = UI.formatPrice(stats.totalSpent);
  }
};

// ============================================
// Global Event Handlers
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize app state
  AppState.init();

  // Logout button
  document.querySelector('[data-cy="logout-button"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    Auth.logout();
  });

  // Initialize page-specific handlers based on current page
  const pathname = window.location.pathname;
  const page = pathname.split('/').pop() || 'index.html';

  console.log('Current page:', page, 'Pathname:', pathname);

  // Direct element checks (fallback for page detection issues)
  if (document.querySelector('[data-cy="product-grid"]') && page !== 'product-detail.html') {
    PageHandlers.initProductsPage();
  }
  if (document.querySelector('[data-cy="product-detail"]')) {
    PageHandlers.initProductDetailPage();
  }
  if (document.querySelector('[data-cy="cart-container"]')) {
    PageHandlers.initCartPage();
  }
  if (document.querySelector('[data-cy="checkout-form"]')) {
    PageHandlers.initCheckoutPage();
  }
  if (document.querySelector('[data-cy="welcome-message"]')) {
    PageHandlers.initDashboardPage();
  }
  if (document.querySelector('[data-cy="login-form"]')) {
    PageHandlers.initLoginPage();
  }

  switch (page) {
    case 'login.html':
      PageHandlers.initLoginPage();
      break;
    case 'products.html':
      PageHandlers.initProductsPage();
      break;
    case 'product-detail.html':
      PageHandlers.initProductDetailPage();
      break;
    case 'cart.html':
      PageHandlers.initCartPage();
      break;
    case 'checkout.html':
      PageHandlers.initCheckoutPage();
      break;
    case 'dashboard.html':
      PageHandlers.initDashboardPage();
      break;
  }

  // Check for order success message
  const params = new URLSearchParams(window.location.search);
  if (params.get('order') === 'success') {
    UI.showAlert('Je bestelling is succesvol geplaatst!', 'success');
    window.history.replaceState({}, '', window.location.pathname);
  }
});

// ============================================
// API Simulation (for cy.intercept exercises)
// ============================================
window.API = {
  baseUrl: 'api',

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}/${endpoint}.json`);
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },

  // Simulated POST/PUT/DELETE (for API testing exercises)
  async post(endpoint, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: { id: Date.now(), ...data } });
      }, 300);
    });
  },

  async put(endpoint, id, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: { id, ...data } });
      }, 300);
    });
  },

  async delete(endpoint, id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id });
      }, 300);
    });
  }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AppState, Auth, Products, Cart, Orders, UI };
}
