/**
 * OPDRACHT 15: cy.intercept() Basics
 *
 * Doel: Leer network requests intercepten en observeren
 *
 * In deze opdracht ga je:
 * 1. Requests intercepten
 * 2. Wachten op requests doormiddel van aliasen
 * 3. Request/response data bekijken
 *
 * Bouwt voort op: Opdracht 14
 * Tijd: ~25 minuten
 */

describe('Opdracht 15: cy.intercept() Basics', () => {
  /**
   * TEST 15.1: Basis intercept
   *
   * TODO: Intercept een GET request
   */
  it.only('should intercept a GET request', () => {
    cy.intercept('GET', '**/api/products*').as('getProducts');
    cy.visit('/products');
    cy.wait('@getProducts').its("response.statusCode").should("equal", 304);
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  /**
   * TEST 15.2: Intercept met wildcard
   *
   * TODO: Intercept alle API requests
   */
  it('should intercept with wildcard', () => {
    // TODO: Intercept alle /api/* requests

    cy.visit('/products');

    // TODO: Wacht op een API call
  });

  /**
   * TEST 15.3: Bekijk response data
   *
   * TODO: Inspecteer de response van een request
   */
  it('should inspect response data', () => {
    cy.intercept('GET', '/api/products').as('getProducts');

    cy.visit('/products');

    // TODO: Wacht en bekijk response
    cy.wait('@getProducts').then((interception) => {
      // TODO: Log status code

      // TODO: Check response body
    });
  });

  /**
   * TEST 15.4: Bekijk request data
   *
   * TODO: Inspecteer de request van een form submission
   */
  it('should inspect request data', () => {
    // Intercept login request
    cy.intercept('GET', '/api/users').as('getUsers');

    cy.visit('/login');

    // Trigger de page load die users laadt
    cy.wait('@getUsers').then((interception) => {
      // TODO: Log request URL
      // cy.log('URL: ' + interception.request.url);

      // TODO: Log request headers
      // cy.log('Headers: ' + JSON.stringify(interception.request.headers));
    });
  });

  /**
   * TEST 15.5: Meerdere intercepts
   *
   * TODO: Intercept meerdere verschillende requests
   */
  it('should handle multiple intercepts', () => {
    // TODO: Intercept products en users
    cy.intercept('GET', '/api/products').as('products');
    cy.intercept('GET', '/api/users').as('users');

    // Visit page die beide laadt
    cy.visit('/');

    // TODO: Wacht op beide (of een van beide)
    // Niet alle pagina's laden beide, dus we checken alleen products
    // cy.wait('@products');
  });

  /**
   * TEST 15.6: Intercept met regex
   *
   * TODO: Gebruik regex voor flexibele matching
   */
  it('should intercept with regex', () => {
    // TODO: Intercept alle  requests
    // cy.intercept('GET', /\$/).as('jsonRequest');

    cy.visit('/products');

    // TODO: Wacht op de request
    // cy.wait('@jsonRequest');
  });

  /**
   * TEST 15.7: Spy op request count
   *
   * TODO: Tel hoeveel requests er gemaakt worden
   */
  it('should count requests', () => {
    let requestCount = 0;

    // Intercept en tel
    cy.intercept('GET', '/api/*', () => {
      requestCount++;
    }).as('apiRequests');

    cy.visit('/products');

    // Wacht even voor alle requests
    cy.wait(1000).then(() => {
      cy.log(`Aantal API requests: ${requestCount}`);
    });
  });

  /**
   * TEST 15.8: Wacht op specifieke response
   *
   * TODO: Wacht tot response aan conditie voldoet
   */
  it('should wait for specific response', () => {
    cy.intercept('GET', '/api/products').as('getProducts');

    cy.visit('/products');

    // TODO: Wacht en valideer response
    cy.wait('@getProducts')
      .its('response.statusCode')
      .should('equal', 200);
  });

  /**
   * BONUS: Log alle requests
   *
   * TODO: Maak een debug helper die alle requests logt
   */
  it('should log all network requests', () => {
    // Intercept ALLES
    cy.intercept('*', (req) => {
      // Skip static assets
      if (!req.url.includes('.js') && !req.url.includes('.css')) {
        console.log(`[${req.method}] ${req.url}`);
      }
    });

    cy.visit('/products');

    // Check console in browser DevTools
    cy.get('[data-cy="product-card"]').should('exist');
  });
});
