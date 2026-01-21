/**
 * OPDRACHT 14: Custom Commands - Utilities
 *
 * Doel: Maak herbruikbare utility commands
 *
 * In deze opdracht ga je:
 * 1. Helper commands maken
 * 2. Child commands maken
 * 3. Commands met parameters
 *
 * Bouwt voort op: Opdracht 13
 * Tijd: ~25 minuten
 */

/**
 * STAP 1: Voeg deze commands toe aan cypress/support/commands.ts
 *
 * ```typescript
 * // Opdracht 14: Get by data-cy shorthand
 * Cypress.Commands.add('dataCy', (value: string) => {
 *   return cy.get(`[data-cy="${value}"]`);
 * });
 *
 * // Opdracht 14: Fill form helper
 * Cypress.Commands.add('fillForm', (formData: Record<string, string>) => {
 *   Object.entries(formData).forEach(([field, value]) => {
 *     cy.get(`[data-cy="${field}"]`).clear().type(value);
 *   });
 * });
 *
 * // Opdracht 14: Assert visible and contains (child command)
 * Cypress.Commands.add(
 *   'shouldBeVisibleWithText',
 *   { prevSubject: 'element' },
 *   (subject, text: string) => {
 *     cy.wrap(subject)
 *       .should('be.visible')
 *       .and('contain.text', text);
 *   }
 * );
 *
 * // Opdracht 14: Wait for loading to complete
 * Cypress.Commands.add('waitForLoading', () => {
 *   cy.get('body').then(($body) => {
 *     if ($body.find('[data-cy="loading"]').length > 0) {
 *       cy.get('[data-cy="loading"]').should('not.exist');
 *     }
 *   });
 * });
 * ```
 */

/**
 * STAP 2: Voeg type declarations toe aan cypress/support/index.d.ts
 *
 * ```typescript
 * dataCy(value: string): Chainable<JQuery<HTMLElement>>;
 * fillForm(formData: Record<string, string>): Chainable<void>;
 * shouldBeVisibleWithText(text: string): Chainable<JQuery<HTMLElement>>;
 * waitForLoading(): Chainable<void>;
 * ```
 */

describe('Opdracht 14: Custom Commands - Utilities', () => {
  /**
   * TEST 14.1: Gebruik getByDataCy command
   *

   */
  it('should use getByDataCy command', () => {
    cy.visit('/products.html');

    // Gebruik cy.getByDataCy om te navigeren door de applicatie
  });

  /**
   * TEST 14.2: Test dataCy shorthand
   *
   * TODO: Test je eigen dataCy command
   */
  it('should use dataCy shorthand', () => {
    cy.visit('/products.html');

    // TODO: Uncomment als je het command hebt toegevoegd
    // cy.dataCy('page-title').should('contain', 'Producten');
    // cy.dataCy('search-input').type('Laptop');
  });

  /**
   * TEST 14.3: Test fillForm command
   *
   * TODO: Test het fillForm helper command
   */
  it('should use fillForm command', () => {
    cy.loginViaApi('student');
    cy.visit('/checkout.html');

    // TODO: Uncomment als je het command hebt toegevoegd
    // cy.fillForm({
    //   'firstName': 'John',
    //   'lastName': 'Doe',
    //   'email': 'john@test.nl',
    //   'phone': '0612345678',
    //   'address': 'Teststraat 123',
    //   'postcode': '1234 AB',
    //   'city': 'Amsterdam'
    // });
  });

  /**
   * TEST 14.4: Test shouldBeVisibleWithText child command
   *
   * TODO: Test het child command
   */
  it('should use shouldBeVisibleWithText command', () => {
    cy.visit('/products.html');

    // TODO: Uncomment als je het command hebt toegevoegd
    // cy.getByDataCy('page-title').shouldBeVisibleWithText('Producten');
  });

  /**
   * TEST 14.5: Test waitForLoading command
   *
   * TODO: Test het waitForLoading command
   */
  it('should use waitForLoading command', () => {
    cy.visit('/products.html');

    // TODO: Uncomment als je het command hebt toegevoegd
    // cy.waitForLoading();
  });

  /**
   * TEST 14.6: Combineer commands
   *
   * TODO: Combineer meerdere custom commands
   */
  it('should combine multiple commands', () => {
    // Login
    cy.loginViaApi('student');

    // Visit en wacht
    cy.visit('/products.html');
    // cy.waitForLoading();

    // Zoek met dataCy
    cy.getByDataCy('search-input').type('Laptop');

    // Verify met shouldBeVisibleWithText
    // cy.getByDataCy('product-card').first().shouldBeVisibleWithText('Laptop');
  });

  /**
   * TEST 14.7: Test addToCart command
   */
  it('should use addToCart command', () => {
    // cy.addToCart(1, 2);

    cy.visit('/cart.html');
    cy.getByDataCy('cart-item').should('have.length.greaterThan', 0);
    cy.getByDataCy('item-quantity').first().should('contain', '2');
  });

  /**
   * TEST 14.8: Test clearCart command
   *
   */
  it('should use clearCart command', () => {
    // Voeg eerst toe
    cy.addToCart(1, 1);

    // Clear
    cy.clearCart();

    cy.visit('/cart.html');
    cy.getByDataCy('empty-cart').should('be.visible');
  });

  /**
   * BONUS: Maak een selectProduct command
   *
   * TODO: Maak een command dat een product selecteert en toevoegt
   *
   * ```typescript
   * Cypress.Commands.add('selectProduct', (productName: string) => {

   * });
   * ```
   */
  it('should select and add product (bonus)', () => {
    cy.loginViaApi('student');

    // TODO: Uncomment als je het command hebt toegevoegd
    // cy.selectProduct('Laptop');
    // cy.getByDataCy('cart-count').should('contain', '1');
  });
});
