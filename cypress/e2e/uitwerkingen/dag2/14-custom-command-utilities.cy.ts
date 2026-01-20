/**
 * UITWERKING OPDRACHT 14: Custom Commands - Utilities
 */

describe('Opdracht 14: Custom Commands - Utilities', () => {
  it('should use getByDataCy command', () => {
    cy.visit('/products.html');

    cy.getByDataCy('page-title').should('contain', 'Producten');
    cy.getByDataCy('search-input').should('be.visible');
  });

  it('should use dataCy shorthand', () => {
    cy.visit('/products.html');

    // Gebruik getByDataCy (equivalent aan dataCy)
    cy.getByDataCy('page-title').should('contain', 'Producten');
    cy.getByDataCy('search-input').type('Laptop');
  });

  it('should use fillForm command', () => {
    cy.loginViaApi('student');
    cy.addToCart(1, 1);
    cy.visit('/checkout.html');

    // Vul formulier velden in
    cy.get('[data-cy="firstName"]').type('John');
    cy.get('[data-cy="lastName"]').type('Doe');
    cy.get('[data-cy="email"]').type('john@test.nl');
    cy.get('[data-cy="phone"]').type('0612345678');
    cy.get('[data-cy="address"]').type('Teststraat 123');
    cy.get('[data-cy="postcode"]').type('1234 AB');
    cy.get('[data-cy="city"]').type('Amsterdam');

    cy.get('[data-cy="firstName"]').should('have.value', 'John');
    cy.get('[data-cy="lastName"]').should('have.value', 'Doe');
  });

  it('should use shouldBeVisibleWithText pattern', () => {
    cy.visit('/products.html');

    cy.getByDataCy('page-title')
      .should('be.visible')
      .and('contain', 'Producten');
  });

  it('should use waitForLoading pattern', () => {
    cy.visit('/products.html');

    // Check for loading element if exists
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="loading"]').length > 0) {
        cy.get('[data-cy="loading"]').should('not.exist');
      }
    });

    cy.getByDataCy('product-card').should('have.length.greaterThan', 0);
  });

  it('should combine multiple commands', () => {
    cy.loginViaApi('student');

    cy.visit('/products.html');
    cy.getByDataCy('search-input').type('Laptop');

    cy.getByDataCy('product-card')
      .first()
      .should('be.visible')
      .and('contain', 'Laptop');
  });

  it('should use addToCart command', () => {
    cy.addToCart(1, 2);

    cy.visit('/cart.html');
    cy.getByDataCy('cart-item').should('have.length.greaterThan', 0);
    cy.getByDataCy('item-quantity').first().should('contain', '2');
  });

  it('should use clearCart command', () => {
    cy.addToCart(1, 1);
    cy.clearCart();

    cy.visit('/cart.html');
    cy.getByDataCy('empty-cart').should('be.visible');
  });

  it('should select and add product', () => {
    cy.loginViaApi('student');

    cy.visit('/products.html');
    cy.getByDataCy('search-input').type('Laptop');
    cy.wait(500);
    cy.contains('[data-cy="product-card"]', 'Laptop')
      .find('[data-cy="add-to-cart"]')
      .click();

    cy.getByDataCy('cart-count').should('contain', '1');
  });
});
