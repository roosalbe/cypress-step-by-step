/**
 * UITWERKING OPDRACHT 8: Product & Cart Flow
 */

describe('Opdracht 8: Product & Cart Flow', () => {
  beforeEach(() => {
    cy.loginViaApi('student');
  });

  it('should display all products', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);

    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="product-name"]').should('be.visible');
      cy.get('[data-cy="product-price"]').should('be.visible');
    });
  });

  it('should search for products', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="search-input"]').type('Laptop');

    cy.wait(500);

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0)
      .first()
      .should('contain', 'Laptop');
  });

  it('should filter by category', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="category-filter"]').select('electronics');

    cy.wait(500);

    cy.get('[data-cy="product-card"]').each(($card) => {
      cy.wrap($card)
        .find('[data-cy="product-category"]')
        .should('contain', 'electronics');
    });
  });

  it('should sort products by price', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="sort-select"]').select('price-asc');

    cy.wait(500);

    cy.get('[data-cy="product-price"]').first().invoke('text').then((firstPrice) => {
      cy.get('[data-cy="product-price"]').last().invoke('text').then((lastPrice) => {
        const first = parseFloat(firstPrice.replace('€', '').replace('.', '').replace(',', '.'));
        const last = parseFloat(lastPrice.replace('€', '').replace('.', '').replace(',', '.'));
        expect(first).to.be.at.most(last);
      });
    });
  });

  it('should add product to cart', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="add-to-cart"]').first().click();

    cy.get('[data-cy="cart-count"]')
      .should('be.visible')
      .and('contain', '1');
  });

  it('should view cart with added product', () => {
    cy.addToCart(1, 1);

    cy.visit('/cart.html');

    cy.get('[data-cy="cart-item"]').should('have.length.greaterThan', 0);

    cy.get('[data-cy="cart-total"]').should('be.visible');
  });

  it('should update product quantity in cart', () => {
    cy.addToCart(1, 1);
    cy.visit('/cart.html');

    cy.get('[data-cy="increase-quantity"]').first().click();

    cy.get('[data-cy="item-quantity"]').first().should('contain', '2');
  });

  it('should remove product from cart', () => {
    cy.addToCart(1, 1);
    cy.visit('/cart.html');

    cy.get('[data-cy="cart-item"]').should('have.length', 1);

    cy.get('[data-cy="remove-item"]').first().click();

    cy.get('[data-cy="empty-cart"]').should('be.visible');
  });

  it('should view product details', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="view-product"]').first().click();

    cy.url().should('include', '/product-detail.html');

    cy.get('[data-cy="product-name"]').should('be.visible');
    cy.get('[data-cy="product-price"]').should('be.visible');
    cy.get('[data-cy="product-description"]').should('be.visible');
  });

  it('should complete full shopping flow', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="search-input"]').type('Mouse');
    cy.wait(500);

    cy.get('[data-cy="add-to-cart"]').first().click();

    cy.get('[data-cy="nav-cart"]').click();

    cy.get('[data-cy="cart-item"]').should('have.length.greaterThan', 0);

    cy.get('[data-cy="checkout-button"]').click();

    cy.url().should('include', '/checkout.html');
    cy.get('[data-cy="checkout-form"]').should('be.visible');
  });
});
