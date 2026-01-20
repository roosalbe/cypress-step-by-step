/**
 * OPDRACHT 19: CI/CD Configuratie
 *
 * Doel: Maak Cypress klaar voor CI/CD pipelines
 *
 * In deze opdracht ga je:
 * 1. Een GitHub Actions workflow maken
 * 2. CI-specifieke configuratie toepassen
 * 3. Test reports configureren
 *
 * Bouwt voort op: Opdracht 18
 * Tijd: ~25 minuten
 */

/**
 * STAP 1: Maak een GitHub Actions workflow
 *
 * TODO: Maak bestand .github/workflows/cypress.yml met:
 *
 * ```yaml
 * name: Cypress Tests
 *
 * on:
 *   push:
 *     branches: [main, develop]
 *   pull_request:
 *     branches: [main]
 *
 * jobs:
 *   cypress-run:
 *     runs-on: ubuntu-latest
 *
 *     steps:
 *       - name: Checkout
 *         uses: actions/checkout@v4
 *
 *       - name: Setup Node.js
 *         uses: actions/setup-node@v4
 *         with:
 *           node-version: '20'
 *           cache: 'npm'
 *
 *       - name: Install dependencies
 *         run: npm ci
 *
 *       - name: Cypress run
 *         uses: cypress-io/github-action@v6
 *         with:
 *           start: npm start
 *           wait-on: 'http://localhost:3000'
 *           browser: chrome
 *
 *       - name: Upload screenshots
 *         uses: actions/upload-artifact@v4
 *         if: failure()
 *         with:
 *           name: cypress-screenshots
 *           path: cypress/screenshots
 *
 *       - name: Upload videos
 *         uses: actions/upload-artifact@v4
 *         if: always()
 *         with:
 *           name: cypress-videos
 *           path: cypress/videos
 * ```
 */

describe('Opdracht 19: CI/CD Configuratie', () => {
  /**
   * TEST 19.1: Test die werkt in CI
   *
   * Deze test is specifiek ontworpen om betrouwbaar te werken in CI
   */
  it('should be CI-friendly (no flaky behavior)', () => {
    // Gebruik expliciete waits en assertions
    cy.visit('/products.html');

    // Wacht op element in plaats van hardcoded wait
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);

    // Gebruik data-cy selectors (stabiel)
    cy.get('[data-cy="search-input"]')
      .should('be.visible')
      .type('Laptop');

    // Wacht op resultaten met assertion
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });

  /**
   * TEST 19.2: Test met environment variable
   *
   * TODO: Gebruik env vars die in CI gezet kunnen worden
   */
  it('should use environment variables', () => {
    // In CI kun je env vars zetten via workflow
    const baseUrl = Cypress.config('baseUrl');
    const testUser = Cypress.env('testUser') || 'student';

    cy.log(`Base URL: ${baseUrl}`);
    cy.log(`Test user: ${testUser}`);

    // Test werkt met default of CI-specifieke waarden
    cy.visit('/');
    cy.get('[data-cy="hero-title"]').should('be.visible');
  });

  /**
   * TEST 19.3: Test met retry logic
   *
   * TODO: Schrijf een test die goed omgaat met retries
   */
  it('should handle retries gracefully', () => {
    // Deze test zou moeten slagen ook na retry
    // Geen hardcoded waits, geen state dependencies

    cy.loginViaApi('student');
    cy.visit('/dashboard.html');

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('contain', 'Welkom');
  });

  /**
   * TEST 19.4: Screenshot test
   *
   * TODO: Maak een screenshot voor visuele verificatie in CI
   */
  it('should take screenshot for CI artifacts', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="product-card"]').should('be.visible');

    // Screenshot voor CI artifacts
    cy.screenshot('products-page-loaded');
  });

  /**
   * TEST 19.5: Test isolation
   *
   * TODO: Zorg dat tests isolated zijn (belangrijk voor CI)
   */
  it('should be isolated from other tests', () => {
    // Clear state
    cy.clearLocalStorage();
    cy.clearCookies();

    // Test begint met schone staat
    cy.visit('/cart.html');

    // Verwacht lege cart (niet afhankelijk van andere tests)
    cy.get('[data-cy="empty-cart"]').should('be.visible');
  });

  /**
   * TEST 19.6: Performance check
   *
   * TODO: Basic performance check voor CI
   */
  it('should load page within acceptable time', () => {
    const startTime = Date.now();

    cy.visit('/products.html');

    cy.get('[data-cy="product-card"]').should('be.visible').then(() => {
      const loadTime = Date.now() - startTime;
      cy.log(`Page load time: ${loadTime}ms`);

      // Fail als pagina te traag is (10 seconden)
      expect(loadTime).to.be.lessThan(10000);
    });
  });

  /**
   * TEST 19.7: API health check
   *
   * TODO: Check dat API werkt (smoke test voor CI)
   */
  it('should have working API endpoints', () => {
    // Health check voor CI
    cy.request('GET', '/api/products.json')
      .its('status')
      .should('equal', 200);

    cy.request('GET', '/api/users.json')
      .its('status')
      .should('equal', 200);
  });

  /**
   * TEST 19.8: Browser compatibility check
   *
   * TODO: Check browser info (nuttig voor debugging in CI)
   */
  it('should log browser info for debugging', () => {
    cy.log(`Browser: ${Cypress.browser.name}`);
    cy.log(`Version: ${Cypress.browser.version}`);
    cy.log(`Is Headless: ${Cypress.browser.isHeadless}`);

    // Simple test dat werkt in alle browsers
    cy.visit('/');
    cy.get('[data-cy="navbar-brand"]').should('contain', 'Cypress Shop');
  });

  /**
   * SAMENVATTING CI/CD Best Practices:
   *
   * 1. Gebruik stabiele selectors (data-cy)
   * 2. Vermijd hardcoded waits
   * 3. Maak tests isolated (geen state dependencies)
   * 4. Gebruik environment variables
   * 5. Configureer retries
   * 6. Upload artifacts (screenshots, videos)
   * 7. Voeg smoke tests toe
   */
});

/**
 * NPM Scripts voor CI
 *
 * Voeg toe aan package.json:
 *
 * ```json
 * "scripts": {
 *   "test:ci": "cypress run --browser chrome",
 *   "test:ci:chrome": "cypress run --browser chrome",
 *   "test:ci:firefox": "cypress run --browser firefox",
 *   "test:ci:parallel": "cypress run --parallel --record",
 *   "test:smoke": "cypress run --spec 'cypress/e2e/**/19-*.cy.ts'"
 * }
 * ```
 */
