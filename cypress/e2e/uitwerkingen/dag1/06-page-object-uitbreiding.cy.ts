/**
 * UITWERKING OPDRACHT 6: Page Object Model - Uitbreiding
 */

import { LoginPage } from '../../../support/pages/LoginPage';
import { ProductsPage } from '../../../support/pages/ProductsPage';
import { DashboardPage } from '../../../support/pages/DashboardPage';

describe('Opdracht 6: Page Object Model - Uitbreiding', () => {
  const loginPage = new LoginPage();
  const productsPage = new ProductsPage();
  const dashboardPage = new DashboardPage();

  it('should use ProductsPage', () => {
    productsPage.visit();

    productsPage.search('Laptop');

    productsPage.shouldHaveProductsGreaterThan(0);
  });

  it('should use method chaining', () => {
    productsPage
      .visit()
      .selectCategory('electronics')
      .sortBy('price-asc')
      .filterInStock(true);

    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should complete login flow with page objects', () => {
    loginPage.visit();
    loginPage.login('student', 'cypress123');

    cy.url().should('include', '/dashboard');

    dashboardPage.shouldShowWelcomeMessage('Student');
  });

  it('should filter products', () => {
    productsPage.visit();
    productsPage.selectCategory('electronics');

    cy.wait(500);
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });

  it('should search products', () => {
    productsPage.visit();
    productsPage.search('Mouse');

    cy.wait(500);
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should navigate through multiple pages', () => {
    // Login
    loginPage.visit();
    loginPage.login('student', 'cypress123');

    // Ga naar products
    productsPage.visit();

    // Zoek product
    productsPage.search('Laptop');

    // Verify
    productsPage.shouldHaveProductsGreaterThan(0);
  });
});
