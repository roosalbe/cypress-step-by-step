/**
 * DashboardPage - Page Object voor de dashboard pagina
 */
export class DashboardPage {
  // Selectors
  private dashboardPage = '[data-cy="dashboard-page"]';
  private welcomeCard = '[data-cy="welcome-card"]';
  private cartCard = '[data-cy="cart-card"]';
  private cartCount = '[data-cy="cart-count"]';
  private ordersCard = '[data-cy="orders-card"]';
  private productsCard = '[data-cy="products-card"]';
  private accountInfo = '[data-cy="account-info"]';
  private accountName = '[data-cy="account-name"]';
  private accountEmail = '[data-cy="account-email"]';
  private accountRole = '[data-cy="account-role"]';
  private logoutButton = '[data-cy="logout-button"]';

  /**
   * Navigeer naar de dashboard pagina
   */
  visit(): this {
    cy.visit('/dashboard');
    return this;
  }

  /**
   * Controleer dat de dashboard pagina zichtbaar is
   */
  shouldBeVisible(): this {
    cy.get(this.dashboardPage).should('be.visible');
    return this;
  }

  /**
   * Controleer dat welkomstkaart zichtbaar is
   */
  shouldShowWelcomeCard(): this {
    cy.get(this.welcomeCard).should('be.visible');
    return this;
  }

  /**
   * Controleer dat welkomstbericht specifieke naam bevat
   */
  shouldShowWelcomeMessageWithName(name: string): this {
    cy.get(this.welcomeCard)
      .should('be.visible')
      .and('contain', name);
    return this;
  }

  /**
   * Alias voor shouldShowWelcomeMessageWithName - voor backwards compatibility
   */
  shouldShowWelcomeMessage(name: string): this {
    return this.shouldShowWelcomeMessageWithName(name);
  }

  /**
   * Controleer dat we op de dashboard pagina zijn
   */
  shouldBeOnDashboard(): this {
    cy.url().should('include', '/dashboard');
    return this;
  }

  /**
   * Haal het winkelwagen aantal op
   */
  getCartCount(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.cartCount);
  }

  /**
   * Controleer het winkelwagen aantal
   */
  shouldHaveCartCount(count: number): this {
    cy.get(this.cartCount).should('contain', count.toString());
    return this;
  }

  /**
   * Klik op de winkelwagen kaart
   */
  clickCartCard(): this {
    cy.get(this.cartCard).find('a, button').click();
    return this;
  }

  /**
   * Klik op de bestellingen kaart
   */
  clickOrdersCard(): this {
    cy.get(this.ordersCard).find('a, button').click();
    return this;
  }

  /**
   * Klik op de producten kaart
   */
  clickProductsCard(): this {
    cy.get(this.productsCard).find('a, button').click();
    return this;
  }

  /**
   * Klik op logout button (in header)
   */
  clickLogout(): this {
    cy.get(this.logoutButton).click();
    return this;
  }

  /**
   * Controleer account informatie
   */
  shouldShowAccountInfo(name: string, email: string, role: string): this {
    cy.get(this.accountName).should('contain', name);
    cy.get(this.accountEmail).should('contain', email);
    cy.get(this.accountRole).should('contain', role);
    return this;
  }

  /**
   * Get welcome card element
   */
  getWelcomeCard(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.welcomeCard);
  }

  /**
   * Get account info element
   */
  getAccountInfo(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.accountInfo);
  }
}
