/**
 * UITWERKING OPDRACHT 19: CI/CD Configuratie
 */

describe('Opdracht 19: CI/CD Configuratie', () => {
  it('should be CI-friendly (no flaky behavior)', () => {
    cy.visit('/products');

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);

    cy.get('[data-cy="search-input"]')
      .should('be.visible')
      .type('Laptop');

    cy.get('[data-cy="apply-filters"]').click();

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });

  it('should use environment variables', () => {
    const baseUrl = Cypress.config('baseUrl');
    const testUser = Cypress.env('testUser') || 'student@test.nl';

    cy.log(`Base URL: ${baseUrl}`);
    cy.log(`Test user: ${testUser}`);

    cy.visit('/');
    cy.get('[data-cy="hero-title"]').should('be.visible');
  });

  it('should handle retries gracefully', () => {
    cy.loginViaApi('student@test.nl', 'cypress123');
    cy.visit('/dashboard');

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('contain', 'Welkom');
  });

  it('should take screenshot for CI artifacts', () => {
    cy.visit('/products');

    cy.get('[data-cy="product-card"]').should('be.visible');

    cy.screenshot('products-page-loaded');
  });

  it('should be isolated from other tests', () => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.visit('/cart');

    cy.get('[data-cy="empty-cart"]').should('be.visible');
  });

  it('should load page within acceptable time', () => {
    const startTime = Date.now();

    cy.visit('/products');

    cy.get('[data-cy="product-card"]').should('be.visible').then(() => {
      const loadTime = Date.now() - startTime;
      cy.log(`Page load time: ${loadTime}ms`);

      expect(loadTime).to.be.lessThan(10000);
    });
  });

  it('should have working API endpoints', () => {
    const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3001';

    cy.request('GET', `${apiUrl}/api/products`)
      .its('status')
      .should('equal', 200);

    cy.request('GET', `${apiUrl}/api/users`)
      .its('status')
      .should('equal', 200);
  });

  it('should log browser info for debugging', () => {
    cy.log(`Browser: ${Cypress.browser.name}`);
    cy.log(`Version: ${Cypress.browser.version}`);
    cy.log(`Is Headless: ${Cypress.browser.isHeadless}`);

    cy.visit('/');
    cy.get('[data-cy="navbar-brand"]').should('contain', 'Cypress Shop');
  });

  it('should complete smoke test', () => {
    const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3001';

    // Quick smoke test for CI
    cy.request('GET', `${apiUrl}/api/products`).its('status').should('equal', 200);

    cy.visit('/');
    cy.get('[data-cy="hero-title"]').should('be.visible');

    cy.visit('/products');
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);

    cy.visit('/login');
    cy.get('[data-cy="login-button"]').should('be.visible');
  });
});
