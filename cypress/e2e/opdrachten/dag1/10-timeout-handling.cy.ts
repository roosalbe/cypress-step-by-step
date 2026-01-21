/**
 * OPDRACHT 10: Timeout Handling
 *
 * Doel: Leer timeouts configureren en wacht-strategieën toepassen
 *
 * In deze opdracht ga je:
 * 1. Timeouts configureren
 * 2. Wacht-strategieën leren
 * 3. Omgaan met trage elementen
 *
 * Bouwt voort op: Opdracht 9
 * Tijd: ~25 minuten
 */

describe('Opdracht 10: Timeout Handling', () => {
  /**
   * TEST 10.1: Default timeout gebruiken
   *
   * TODO: Begrijp hoe de default timeout werkt
   */
  it('should use default timeout', () => {
    cy.visit('/products.html');

    // Cypress wacht automatisch tot 4 seconden (default)
    // voor het element verschijnt
    cy.get('[data-cy="product-card"]').should('be.visible');
  });

  /**
   * TEST 10.2: Custom timeout per command
   *
   * TODO: Gebruik een langere timeout voor specifieke elementen
   */
  it('should use custom timeout for slow elements', () => {
    cy.visit('/products');

    // TODO: Voeg een langere timeout toe voor dit element
    // Gebruik: { timeout: 10000 } als tweede argument

    // TODO: Doe hetzelfde voor een assertion
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });

  /**
   * TEST 10.3: Wacht op URL change
   *
   * TODO: Wacht tot de URL verandert na navigatie
   */
  it('should wait for URL change', () => {
    cy.visit('/login');

    // Login
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    // TODO: Wacht tot URL dashboard bevat, voeg timeout toe van 10 seconden
    // Cypress retry automatisch tot timeout
    cy.url().should('include', '/dashboard');
  });

  /**
   * TEST 10.4: Wacht op element state
   *
   * TODO: Wacht tot element bepaalde state heeft
   */
  it('should wait for element state', () => {
    cy.visit('/products');

    // TODO: Wacht tot search input niet disabled is
    cy.get('[data-cy="search-input"]')
      .should(""); // To do wacht tot element enabled is

  });

  /**
   * TEST 10.5: Wacht op network request (PREVIEW voor Dag 2)
   *
   * TODO: Intercept een request en wacht tot deze klaar is
   */
  it('should wait for network request', () => {
    // Intercept de request
    cy.intercept('GET', '**/api/products.json').as('getProducts');

    cy.visit('/products');

    // Dit is een preview - we gaan dit uitgebreid behandelen in Dag 2
    cy.wait('@getProducts');
  });

  /**
   * TEST 10.6: Retry-ability begrijpen
   *
   * TODO: Begrijp welke commands retry-en en welke niet
   */
  it('should understand retry-ability', () => {
    cy.visit('/products');

    // RETRY: cy.get() + assertions retry automatisch
    cy.get('[data-cy="product-card"]')  // Retry tot gevonden
      .should('be.visible');             // Retry tot visible

    // GEEN RETRY: .then() callback retry niet
    cy.get('[data-cy="product-card"]')
      .first()
      .then(($card) => {
        // Code hier wordt NIET geretried, dit is gewoon javascript.
        // Als dit faalt, faalt de test direct
        expect($card).to.be.visible;
      });
  });

  /**
   * TEST 10.7: Conditioneel wachten
   *
   * TODO: Wacht alleen als nodig
   */
  it('should conditionally wait', () => {
    cy.visit('/products.html');

    // Check of loading indicator bestaat, zo ja, wacht tot die weg is
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="loading"]').length > 0) {
        // Loading exists, wait for it to disappear
        cy.get('[data-cy="loading"]').should('not.exist'); // Deze retried weer wel, ook al staat die binnen een .then
      }
    });

    // Nu zijn producten geladen
    cy.get('[data-cy="product-card"]').should('be.visible');
  });

  /**
   * TEST 10.8: Vermijd hardcoded waits
   *
   * TODO: Vervang cy.wait() met betere alternatieven
   */
  it('should avoid hardcoded waits', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="search-input"]').type('Laptop');

    // ❌ SLECHT: Hardcoded wait
    cy.wait(2000);

    // ✅ GOED: Wacht op conditie
    // TODO: wacht op laden producten via de UI
  });

  /**
   * TEST 10.9: Timeout voor visit
   *
   * TODO: Configureer timeout voor page load
   */
  it('should handle slow page load', () => {
    // TODO: Visit met custom pageLoadTimeout
    // Gebruik hier weer {Timeout: 30000}
    cy.visit('/products');

    cy.get('[data-cy="page-title"]').should('be.visible');
  });

  /**
   * BONUS: Simuleer trage response
   *
   * TODO: Test gedrag bij trage API (preview voor Dag 2)
   */
  it.only('should handle slow API response', () => {
    // Intercept en vertraag de response
    cy.intercept('GET', '**/api/products', (req) => {
      req.on('response', (res) => {
        // Vertraag response met 10 seconden
        res.setDelay(10000);
      });
    }).as('slowProducts');

    cy.visit('/products');

    // Voorbeeld dag 2: Wacht met langere timeout
    // cy.wait('@slowProducts', { timeout: 10000 });

    // TODO: Maak onderstaande werkend
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });
});

/**
 * SAMENVATTING TIMEOUT BEST PRACTICES:
 *
 * 1. Vertrouw op Cypress automatische retries
 * 2. Gebruik assertions die retry-en (.should())
 * 3. Vermijd cy.wait(ms) - gebruik cy.wait('@alias')
 * 4. Verhoog timeout alleen waar nodig
 * 5. Wacht op condities, niet op tijd
 * 6. Gebruik cy.intercept() voor network waits
 */
