/**
 * OPDRACHT 16: cy.intercept() - Mocking
 *
 * Doel: Leer responses mocken en edge cases testen
 *
 * In deze opdracht ga je:
 * 1. Responses mocken met statische data
 * 2. Fixtures gebruiken voor mock data
 * 3. Error responses simuleren
 * 4. Trage responses simuleren
 *
 * Bouwt voort op: Opdracht 15
 * Tijd: ~25 minuten
 */

describe('Opdracht 16: cy.intercept() - Mocking', () => {
  /**
   * TEST 16.1: Mock met statische data
   *
   * TODO: Vervang de echte response met mock data
   */
  it('should mock with static data', () => {
    // TODO: Mock de products response
    cy.intercept('GET', '/api/products.json', {
      statusCode: 200,
      body: {
        products: [
          { id: 1, name: 'Mock Product 1', price: 99.99, category: 'test', stock: 10 },
          { id: 2, name: 'Mock Product 2', price: 149.99, category: 'test', stock: 5 }
        ]
      }
    }).as('mockProducts');

    cy.visit('/products.html');

    cy.wait('@mockProducts');

    // TODO: Verify dat mock data getoond wordt
    // cy.get('[data-cy="product-card"]').should('have.length', 2)
    // cy.contains('Mock Product 1').should('be.visible')
  });

  /**
   * TEST 16.2: Mock met fixture
   *
   * TODO: Gebruik een fixture file voor mock data
   */
  it('should mock with fixture', () => {
    // TODO: Mock met fixture
    // cy.intercept('GET', '/api/products.json', {
    //   fixture: 'products.json'
    // }).as('fixtureProducts');

    cy.visit('/products.html');

    // TODO: Verify products geladen zijn
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  /**
   * TEST 16.3: Mock lege response
   *
   * TODO: Test hoe de UI omgaat met lege data
   */
  it('should handle empty response', () => {
    // TODO: Mock lege products array
    cy.intercept('GET', '/api/products.json', {
      statusCode: 200,
      body: {
        products: []
      }
    }).as('emptyProducts');

    cy.visit('/products.html');

    cy.wait('@emptyProducts');

    // TODO: Verify dat "geen producten" bericht getoond wordt
    // cy.get('[data-cy="no-products"]').should('be.visible')
  });

  /**
   * TEST 16.4: Mock 404 error
   *
   * TODO: Simuleer een 404 Not Found error
   */
  it('should handle 404 error', () => {
    // TODO: Mock 404 response
    // cy.intercept('GET', '/api/products.json', {
    //   statusCode: 404,
    //   body: {
    //     error: 'Products not found'
    //   }
    // }).as('notFound');

    cy.visit('/products.html');

    // TODO: Check error handling in UI
    // (De demo app toont mogelijk geen specifieke error)
  });

  /**
   * TEST 16.5: Mock 500 server error
   *
   * TODO: Simuleer een server error
   */
  it('should handle 500 error', () => {
    // TODO: Mock 500 response
    // cy.intercept('GET', '/api/products.json', {
    //   statusCode: 500,
    //   body: {
    //     error: 'Internal server error'
    //   }
    // }).as('serverError');

    cy.visit('/products.html');

    // TODO: Check error handling
  });

  /**
   * TEST 16.6: Mock trage response
   *
   * TODO: Simuleer een trage server
   */
  it('should handle slow response', () => {
    // TODO: Mock met delay
    cy.intercept('GET', '/api/products.json', {
      statusCode: 200,
      body: {
        products: [
          { id: 1, name: 'Slow Product', price: 99.99, category: 'test', stock: 10 }
        ]
      },
      delay: 2000 // 2 seconden vertraging
    }).as('slowProducts');

    cy.visit('/products.html');

    // TODO: Check dat loading state getoond wordt (indien aanwezig)
    // cy.get('[data-cy="loading"]').should('be.visible');

    // Wacht op response
    cy.wait('@slowProducts');

    // TODO: Check dat products nu zichtbaar zijn
    // cy.get('[data-cy="product-card"]').should('be.visible');
  });

  /**
   * TEST 16.7: Mock network error
   *
   * TODO: Simuleer een network failure
   */
  it('should handle network error', () => {
    // TODO: Mock network error
    // cy.intercept('GET', '/api/products.json', {
    //   forceNetworkError: true
    // }).as('networkError');

    cy.visit('/products.html');

    // App zou graceful moeten omgaan met network errors
  });

  /**
   * TEST 16.8: Modificeer echte response
   *
   * TODO: Pas de echte response aan
   */
  it('should modify real response', () => {
    // TODO: Intercept en modificeer
    cy.intercept('GET', '/api/products.json', (req) => {
      req.continue((res) => {
        // Pas response aan
        if (res.body && res.body.products) {
          // Houd alleen eerste 3 producten
          res.body.products = res.body.products.slice(0, 3);
        }
        res.send();
      });
    }).as('modifiedProducts');

    cy.visit('/products.html');

    cy.wait('@modifiedProducts');

    // TODO: Check dat er maar 3 producten zijn
    // cy.get('[data-cy="product-card"]').should('have.length', 3);
  });

  /**
   * BONUS: Conditionele mock
   *
   * TODO: Mock alleen onder bepaalde condities
   */
  it('should conditionally mock based on request', () => {
    cy.intercept('GET', '/api/products.json', (req) => {
      // Check query params of headers
      if (req.url.includes('category=electronics')) {
        req.reply({
          statusCode: 200,
          body: {
            products: [
              { id: 1, name: 'Mocked Electronics', price: 999.99, category: 'electronics', stock: 5 }
            ]
          }
        });
      } else {
        // Laat echte request door
        req.continue();
      }
    });

    cy.visit('/products.html?category=electronics');

    // De mock wordt alleen toegepast voor electronics
  });
});
