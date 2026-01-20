/**
 * UITWERKING OPDRACHT 15: cy.intercept() Basics
 */

describe('Opdracht 15: cy.intercept() Basics', () => {
  it('should intercept a GET request', () => {
    cy.intercept('GET', '/api/products.json').as('getProducts');

    cy.visit('/products.html');

    cy.wait('@getProducts');

    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should intercept with wildcard', () => {
    cy.intercept('GET', '/api/*').as('apiCall');

    cy.visit('/products.html');

    cy.wait('@apiCall');
  });

  it('should inspect response data', () => {
    cy.intercept('GET', '/api/products.json').as('getProducts');

    cy.visit('/products.html');

    cy.wait('@getProducts').then((interception) => {
      cy.log('Status: ' + interception.response?.statusCode);
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body).to.have.property('products');
    });
  });

  it('should inspect request data', () => {
    cy.intercept('GET', '/api/users.json').as('getUsers');

    cy.visit('/login.html');

    cy.wait('@getUsers').then((interception) => {
      cy.log('URL: ' + interception.request.url);
      cy.log('Headers: ' + JSON.stringify(interception.request.headers));
      expect(interception.request.url).to.include('/api/users.json');
    });
  });

  it('should handle multiple intercepts', () => {
    cy.intercept('GET', '/api/products.json').as('products');
    cy.intercept('GET', '/api/users.json').as('users');

    cy.visit('/products.html');

    cy.wait('@products');
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should intercept with regex', () => {
    cy.intercept('GET', /\.json$/).as('jsonRequest');

    cy.visit('/products.html');

    cy.wait('@jsonRequest');
  });

  it('should count requests', () => {
    let requestCount = 0;

    cy.intercept('GET', '/api/*', () => {
      requestCount++;
    }).as('apiRequests');

    cy.visit('/products.html');

    cy.wait(1000).then(() => {
      cy.log(`Aantal API requests: ${requestCount}`);
      expect(requestCount).to.be.greaterThan(0);
    });
  });

  it('should wait for specific response', () => {
    cy.intercept('GET', '/api/products.json').as('getProducts');

    cy.visit('/products.html');

    cy.wait('@getProducts')
      .its('response.statusCode')
      .should('equal', 200);
  });

  it('should log all network requests', () => {
    cy.intercept('*', (req) => {
      if (!req.url.includes('.js') && !req.url.includes('.css')) {
        console.log(`[${req.method}] ${req.url}`);
      }
    });

    cy.visit('/products.html');

    cy.get('[data-cy="product-card"]').should('exist');
  });
});
