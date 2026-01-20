/**
 * ProductsPage - Page Object voor de producten pagina
 */
export class ProductsPage {
  // Selectors
  private productsPage = '[data-cy="products-page"]';
  private productGrid = '[data-cy="product-grid"]';
  private productCards = '[data-cy="product-card"]';
  private productName = '[data-cy="product-name"]';
  private productPrice = '[data-cy="product-price"]';
  private productCategory = '[data-cy="product-category"]';
  private addToCartButton = '[data-cy="add-to-cart-button"]';
  private noProducts = '[data-cy="no-products"]';
  private productsCount = '[data-cy="products-count"]';
  // Filters
  private filters = '[data-cy="product-filters"]';
  private searchInput = '[data-cy="search-input"]';
  private categoryFilter = '[data-cy="category-filter"]';
  private sortFilter = '[data-cy="sort-filter"]';
  private inStockFilter = '[data-cy="in-stock-filter"]';
  private applyFilters = '[data-cy="apply-filters"]';
  private resetFilters = '[data-cy="reset-filters"]';

  /**
   * Navigeer naar de producten pagina
   */
  visit(): this {
    cy.visit('/products');
    return this;
  }

  /**
   * Controleer dat pagina zichtbaar is
   */
  shouldBeVisible(): this {
    cy.get(this.productsPage).should('be.visible');
    return this;
  }

  /**
   * Zoek naar producten
   */
  search(term: string): this {
    cy.get(this.searchInput).clear().type(term);
    cy.get(this.applyFilters).click();
    return this;
  }

  /**
   * Wis de zoekterm
   */
  clearSearch(): this {
    cy.get(this.searchInput).clear();
    cy.get(this.applyFilters).click();
    return this;
  }

  /**
   * Selecteer een categorie
   */
  selectCategory(category: string): this {
    cy.get(this.categoryFilter).select(category);
    cy.get(this.applyFilters).click();
    return this;
  }

  /**
   * Sorteer producten
   */
  sortBy(option: string): this {
    cy.get(this.sortFilter).select(option);
    cy.get(this.applyFilters).click();
    return this;
  }

  /**
   * Filter op voorraad
   */
  filterInStock(checked: boolean): this {
    if (checked) {
      cy.get(this.inStockFilter).check();
    } else {
      cy.get(this.inStockFilter).uncheck();
    }
    cy.get(this.applyFilters).click();
    return this;
  }

  /**
   * Reset alle filters
   */
  resetAllFilters(): this {
    cy.get(this.resetFilters).click();
    return this;
  }

  /**
   * Haal het aantal producten op
   */
  getProductCount(): Cypress.Chainable<number> {
    return cy.get(this.productCards).its('length');
  }

  /**
   * Voeg eerste product toe aan winkelwagen
   */
  addFirstProductToCart(): this {
    cy.get(this.productCards).first().find(this.addToCartButton).click();
    return this;
  }

  /**
   * Voeg product op index toe aan winkelwagen
   */
  addProductToCart(index: number): this {
    cy.get(this.productCards).eq(index).find(this.addToCartButton).click();
    return this;
  }

  /**
   * Klik op product om naar detail pagina te gaan
   */
  clickProduct(index: number): this {
    cy.get(this.productCards).eq(index).click();
    return this;
  }

  /**
   * Controleer aantal producten
   */
  shouldHaveProducts(count: number): this {
    cy.get(this.productCards).should('have.length', count);
    return this;
  }

  /**
   * Controleer dat er meer dan X producten zijn
   */
  shouldHaveProductsGreaterThan(count: number): this {
    cy.get(this.productCards).should('have.length.greaterThan', count);
    return this;
  }

  /**
   * Controleer dat er geen producten zijn
   */
  shouldHaveNoProducts(): this {
    cy.get(this.noProducts).should('be.visible');
    return this;
  }

  /**
   * Controleer dat product met naam zichtbaar is
   */
  shouldShowProduct(name: string): this {
    cy.contains(this.productCards, name).should('be.visible');
    return this;
  }

  /**
   * Get alle product cards
   */
  getProductCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.productCards);
  }

  /**
   * Get search input element
   */
  getSearchInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.searchInput);
  }

  /**
   * Get eerste product naam
   */
  getFirstProductName(): Cypress.Chainable<string> {
    return cy.get(this.productCards)
      .first()
      .find(this.productName)
      .invoke('text');
  }

  /**
   * Get eerste product prijs
   */
  getFirstProductPrice(): Cypress.Chainable<string> {
    return cy.get(this.productCards)
      .first()
      .find(this.productPrice)
      .invoke('text');
  }

  /**
   * Get products count tekst
   */
  getProductsCountText(): Cypress.Chainable<string> {
    return cy.get(this.productsCount).invoke('text');
  }
}
