/**
 * OPDRACHT 6: Page Object Model - Uitbreiding
 *
 * Doel: Breid het Page Object Model uit met meerdere pages
 *
 * In deze opdracht ga je:
 * 1. Meerdere Page Objects maken
 * 2. Pages combineren in flows
 * 3. Method chaining implementeren
 *
 * Bouwt voort op: Opdracht 5
 * Tijd: ~25 minuten
 */

/**
 * STAP 1: Maak een ProductsPage class
 *
 * TODO: Maak een bestand: cypress/support/pages/ProductsPage.ts
 *
 * ```typescript
 * export class ProductsPage {
 *   private searchInput = '[data-cy="search-input"]';
 *   private categoryFilter = '[data-cy="category-filter"]';
 *   private sortSelect = '[data-cy="sort-select"]';
 *   private inStockFilter = '[data-cy="in-stock-filter"]';
 *   private productCards = '[data-cy="product-card"]';
 *   private addToCartButtons = '[data-cy="add-to-cart"]';
 *
 *   visit(): this {
 *     cy.visit('/products.html');
 *     return this;
 *   }
 *
 *   search(term: string): this {
 *     cy.get(this.searchInput).clear().type(term);
 *     return this;
 *   }
 *
 *   selectCategory(category: string): this {
 *     cy.get(this.categoryFilter).select(category);
 *     return this;
 *   }
 *
 *   sortBy(option: string): this {
 *     cy.get(this.sortSelect).select(option);
 *     return this;
 *   }
 *
 *   filterInStock(checked: boolean): this {
 *     if (checked) {
 *       cy.get(this.inStockFilter).check();
 *     } else {
 *       cy.get(this.inStockFilter).uncheck();
 *     }
 *     return this;
 *   }
 *
 *   getProductCount(): Cypress.Chainable<number> {
 *     return cy.get(this.productCards).its('length');
 *   }
 *
 *   addFirstProductToCart(): this {
 *     cy.get(this.addToCartButtons).first().click();
 *     return this;
 *   }
 *
 *   shouldHaveProducts(count: number): this {
 *     cy.get(this.productCards).should('have.length', count);
 *     return this;
 *   }
 *
 *   shouldHaveProductsGreaterThan(count: number): this {
 *     cy.get(this.productCards).should('have.length.greaterThan', count);
 *     return this;
 *   }
 * }
 * ```
 */

/**
 * STAP 2: Maak een DashboardPage class
 *
 * TODO: Maak een bestand: cypress/support/pages/DashboardPage.ts
 *
 * 
 * met de volgende functies 
 *  1. visit
 *  2. shouldShowWelcomeMessage
 *  3. shouldBeLoggedIn
 * 
 */

// TODO: Uncomment zodra je de Page Objects hebt gemaakt
// import { LoginPage } from '../../support/pages/LoginPage';
// import { ProductsPage } from '../../support/pages/ProductsPage';
// import { DashboardPage } from '../../support/pages/DashboardPage';

describe('Opdracht 6: Page Object Model - Uitbreiding', () => {
  // const loginPage = new LoginPage();
  // const productsPage = new ProductsPage();
  // const dashboardPage = new DashboardPage();

  /**
   * TEST 6.1: Gebruik ProductsPage
   *
   * TODO: Test de products pagina met Page Object
   */
  it('should use ProductsPage', () => {
    // TODO: Vervang met page object methodes
    cy.visit('/products.html');
    // productsPage.visit();

    cy.get('[data-cy="search-input"]').type('Laptop');
    // productsPage.search('Laptop');

    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
    // productsPage.shouldHaveProductsGreaterThan(0);
  });

  /**
   * TEST 6.2: Method chaining
   *
   * TODO: Gebruik method chaining voor vloeiende code
   */
  it('should use method chaining', () => {
    // TODO: Vervang met chained calls
    cy.visit('/products.html');
    cy.get('[data-cy="category-filter"]').select('electronics');
    cy.get('[data-cy="sort-select"]').select('price-asc');
    cy.get('[data-cy="in-stock-filter"]').check();

    // productsPage
    //   .visit()
    //   .selectCategory('electronics')
    //   .sortBy('price-asc')
    //   .filterInStock(true);

    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  /**
   * TEST 6.3: Complete login flow met Page Objects
   *
   * TODO: Combineer LoginPage en DashboardPage
   */
  it('should complete login flow with page objects', () => {
    // TODO: Vervang met page object methodes
    cy.visit('/login.html');
    // loginPage.visit();

    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();
    // loginPage.login('student', 'cypress123');

    cy.url().should('include', '/dashboard');

    cy.get('[data-cy="welcome-message"]').should('contain', 'Student');
    // dashboardPage.shouldShowWelcomeMessage('Student');
  });

  /**
   * TEST 6.4: Filter flow
   *
   * TODO: Test het filteren van producten
   */
  it('should filter products', () => {
    cy.visit('/products.html');
    // productsPage.visit();

    // TODO: Selecteer electronics categorie
    cy.get('[data-cy="category-filter"]').select('electronics');
    // productsPage.selectCategory('electronics');

    // TODO: Controleer dat producten geladen zijn
    // Wacht even voor de filter
    cy.wait(500);
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });

  /**
   * TEST 6.5: Search flow
   *
   * TODO: Test de zoekfunctionaliteit
   */
  it('should search products', () => {
    cy.visit('/products.html');
    // productsPage.visit();

    // TODO: Zoek naar "Mouse"
    cy.get('[data-cy="search-input"]').type('Mouse');
    // productsPage.search('Mouse');

    cy.wait(500);

    // TODO: Controleer dat er producten gevonden zijn
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  /**
   * TEST 6.6: Multi-page flow
   *
   * TODO: Test een flow over meerdere pagina's
   */
  it('should navigate through multiple pages', () => {
    // Login
    cy.visit('/login.html');
    // loginPage.visit();
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();
    // loginPage.login('student', 'cypress123');

    // Ga naar products
    cy.get('[data-cy="nav-products"]').click();
    // Of: productsPage.visit();

    // Zoek product
    cy.get('[data-cy="search-input"]').type('Laptop');
    // productsPage.search('Laptop');

    // Verify
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  /**
   * BONUS: Maak een CartPage
   *
   * TODO: Maak een CartPage class en test de cart flow
   *
   * Hint: De CartPage zou methodes moeten hebben voor:
   * - visit()
   * - shouldBeEmpty()
   * - shouldHaveItems(count)
   * - clearCart()
   * - checkout()
   */
});
