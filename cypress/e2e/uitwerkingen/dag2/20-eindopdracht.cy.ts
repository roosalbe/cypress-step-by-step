/**
 * UITWERKING OPDRACHT 20: Eindopdracht - Complete E-Commerce Test Suite
 */

import { LoginPage } from '../../../support/pages/LoginPage';
import { ProductsPage } from '../../../support/pages/ProductsPage';
import { DashboardPage } from '../../../support/pages/DashboardPage';
import { CheckoutPage } from '../../../support/pages/CheckoutPage';

describe('Eindopdracht: Complete E-Commerce Test Suite', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const dashboardPage = new DashboardPage();
  const checkoutPage = new CheckoutPage();

  // ============================================
  // DEEL 1: User Authentication
  // ============================================
  describe('1. User Authentication', () => {
    it('should login successfully', () => {
      loginPage.visit();
      loginPage.login('student', 'cypress123');

      cy.url().should('include', '/dashboard');
      cy.get('[data-cy="user-info"]').should('contain', 'Student');
    });

    it('should show error for invalid login', () => {
      loginPage.visit();
      loginPage.login('invalid', 'wrongpassword');

      loginPage.shouldShowError();
      cy.url().should('include', '/login');
    });

    it('should logout successfully', () => {
      cy.login('student', 'cypress123');
      cy.get('[data-cy="logout-button"]').click();

      cy.url().should('not.include', '/dashboard');
      cy.get('[data-cy="user-info"]').should('not.exist');
    });
  });

  // ============================================
  // DEEL 2: Product Browsing
  // ============================================
  describe('2. Product Browsing', () => {
    beforeEach(() => {
      productsPage.visit();
    });

    it('should display products', () => {
      productsPage.shouldHaveProductsGreaterThan(0);
    });

    it('should search for products', () => {
      productsPage.search('Laptop');

      cy.get('[data-cy="product-card"]')
        .should('have.length.greaterThan', 0)
        .first()
        .should('contain', 'Laptop');
    });

    it('should filter by category', () => {
      productsPage.selectCategory('electronics');

      cy.get('[data-cy="product-card"]').each(($card) => {
        cy.wrap($card)
          .find('[data-cy="product-category"]')
          .invoke('text')
          .then((text) => {
            expect(text.toLowerCase()).to.include('electronics');
          });
      });
    });

    it('should sort products', () => {
      productsPage.sortBy('price-asc');

      cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
    });
  });

  // ============================================
  // DEEL 3: Shopping Cart
  // ============================================
  describe('3. Shopping Cart', () => {
    beforeEach(() => {
      cy.clearCart();
      cy.loginViaApi('student');
    });

    it('should add product to cart', () => {
      cy.visit('/products.html');
      cy.get('[data-cy="add-to-cart"]').first().click();

      cy.get('[data-cy="cart-count"]').should('contain', '1');
    });

    it('should update quantity', () => {
      cy.addToCart(1, 1);
      cy.visit('/cart.html');

      cy.get('[data-cy="increase-quantity"]').first().click();
      cy.get('[data-cy="item-quantity"]').first().should('contain', '2');
    });

    it('should remove product from cart', () => {
      cy.addToCart(1, 1);
      cy.visit('/cart.html');

      cy.get('[data-cy="remove-item"]').first().click();
      cy.get('[data-cy="empty-cart"]').should('be.visible');
    });

    it('should calculate total correctly', () => {
      cy.addToCart(1, 2);
      cy.visit('/cart.html');

      cy.get('[data-cy="cart-total"]').should('be.visible');
      cy.get('[data-cy="cart-item"]').should('have.length', 1);
    });
  });

  // ============================================
  // DEEL 4: Checkout Flow
  // ============================================
  describe('4. Checkout Flow', () => {
    beforeEach(() => {
      cy.clearCart();
      cy.loginViaApi('student');
      cy.addToCart(1, 1);
    });

    it('should fill checkout form', () => {
      checkoutPage.visit();

      checkoutPage.fillForm({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.nl',
        phone: '0612345678',
        address: 'Teststraat 123',
        postcode: '1234 AB',
        city: 'Amsterdam'
      });

      cy.get('[data-cy="firstName"]').should('have.value', 'John');
      cy.get('[data-cy="lastName"]').should('have.value', 'Doe');
    });

    it('should validate required fields', () => {
      checkoutPage.visit();

      cy.get('[data-cy="submit-order"]').click();

      // HTML5 validation should prevent submission
      cy.url().should('include', '/checkout');
    });
  });

  // ============================================
  // DEEL 5: Advanced Tests (Bonus)
  // ============================================
  describe('5. Advanced Tests (Bonus)', () => {
    it('should test multiple scenarios (data-driven)', () => {
      const scenarios = [
        { search: 'Laptop', expectResults: true },
        { search: 'Mouse', expectResults: true },
        { search: 'NonExistentProduct123', expectResults: false },
      ];

      scenarios.forEach((scenario) => {
        cy.visit('/products.html');
        cy.get('[data-cy="search-input"]').clear().type(scenario.search);
        cy.wait(500);

        if (scenario.expectResults) {
          cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
        } else {
          cy.get('[data-cy="product-card"]').should('have.length', 0);
        }
      });
    });

    it('should handle mocked API response', () => {
      cy.intercept('GET', '/api/products.json', {
        statusCode: 200,
        body: {
          products: [
            { id: 999, name: 'Mocked Product', price: 123.45, category: 'test', stock: 99 }
          ]
        }
      }).as('mockProducts');

      cy.visit('/products.html');
      cy.wait('@mockProducts');

      cy.contains('Mocked Product').should('be.visible');
      cy.get('[data-cy="product-card"]').should('have.length', 1);
    });

    it('should complete full user journey', () => {
      // Stap 1: Login
      cy.loginViaApi('student');

      // Stap 2: Browse producten
      cy.visit('/products.html');
      cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);

      // Stap 3: Zoek product
      cy.get('[data-cy="search-input"]').type('Laptop');
      cy.wait(500);

      // Stap 4: Voeg toe aan cart
      cy.get('[data-cy="add-to-cart"]').first().click();
      cy.get('[data-cy="cart-count"]').should('contain', '1');

      // Stap 5: Ga naar cart
      cy.visit('/cart.html');
      cy.get('[data-cy="cart-item"]').should('have.length', 1);

      // Stap 6: Ga naar checkout
      cy.get('[data-cy="checkout-button"]').click();
      cy.url().should('include', '/checkout');

      // Stap 7: Vul gegevens in
      cy.get('[data-cy="firstName"]').type('Test');
      cy.get('[data-cy="lastName"]').type('User');
      cy.get('[data-cy="email"]').type('test@example.com');
      cy.get('[data-cy="phone"]').type('0612345678');
      cy.get('[data-cy="address"]').type('Teststraat 1');
      cy.get('[data-cy="postcode"]').type('1234 AB');
      cy.get('[data-cy="city"]').type('Amsterdam');

      // Stap 8: Plaats bestelling
      cy.get('[data-cy="submit-order"]').click();

      // Verify order confirmation
      cy.get('[data-cy="order-confirmation"]').should('be.visible');
    });
  });

  // ============================================
  // DEEL 6: API Integration Tests
  // ============================================
  describe('6. API Integration Tests', () => {
    it('should validate API responses match UI', () => {
      cy.request('GET', '/api/products.json').then((response) => {
        const apiProducts = response.body.products;

        cy.visit('/products.html');

        cy.get('[data-cy="product-card"]')
          .should('have.length', apiProducts.length);
      });
    });

    it('should use fixtures for consistent test data', () => {
      cy.fixture('testdata.json').then((testData) => {
        cy.loginViaApi('student');
        cy.addToCart(1, 1);
        cy.visit('/checkout.html');

        const form = testData.checkoutForm;
        cy.get('[data-cy="firstName"]').type(form.firstName);
        cy.get('[data-cy="lastName"]').type(form.lastName);
        cy.get('[data-cy="email"]').type(form.email);

        cy.get('[data-cy="firstName"]').should('have.value', form.firstName);
      });
    });
  });
});
