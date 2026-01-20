/**
 * UITWERKING OPDRACHT 2: Navigatie & Assertions
 */

describe('Opdracht 2: Navigatie & Assertions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to products page', () => {
    cy.get('[data-cy="nav-products"]').click();

    cy.url().should('include', '/products.html');

    cy.get('[data-cy="page-title"]')
      .should('be.visible')
      .and('contain', 'Producten');
  });

  it('should navigate via shop now button', () => {
    cy.get('[data-cy="shop-now-button"]').click();

    cy.url().should('include', '/products.html');
  });

  it('should navigate to login page', () => {
    cy.get('[data-cy="nav-login"]').click();

    cy.url().should('include', '/login.html');

    cy.get('[data-cy="login-form"]').should('be.visible');

    cy.get('[data-cy="username"]').should('exist');
    cy.get('[data-cy="password"]').should('exist');
  });

  it('should navigate using contains()', () => {
    cy.contains('Producten').click();

    cy.url().should('include', '/products.html');
  });

  it('should chain multiple assertions', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="search-input"]')
      .should('be.visible')
      .and('have.attr', 'placeholder')
      .and('contain', 'Zoek');
  });

  it('should navigate back', () => {
    cy.get('[data-cy="nav-products"]').click();
    cy.url().should('include', '/products.html');

    cy.go('back');

    cy.url().should('include', '/index.html');
  });

  it('should navigate to category', () => {
    cy.get('[data-cy="category-electronics"]').click();

    cy.url().should('include', 'category=electronics');
  });
});
