/**
 * UITWERKING OPDRACHT 16: cy.intercept() - Mocking
 */

describe('Opdracht 16: cy.intercept() - Mocking', () => {
  it('should mock with static data', () => {
    cy.intercept('GET', '**/api/products*', {
      statusCode: 200,
      body: [
        {
          "id": "4770c539-96ff-4673-88a1-7d4c4a03d8b5",
          "name": "Mock Product 1",
          "description": "KMock description for product 1",
          "price": 2345,
          "category": "electronics",
          "stock": 1,
          "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
        }
      ]
    }).as('mockProducts');

    cy.visit('/products');

    cy.wait('@mockProducts');

    // cy.get('[data-cy="product-card"]').should('have.length', 2);
    // cy.contains('Mock Product 1').should('be.visible');
  });

  it('should mock with fixture', () => {
    cy.intercept('GET', '**/api/products*', {
      fixture: 'products.json'
    }).as('fixtureProducts');

    cy.visit('/products');

    cy.wait('@fixtureProducts');
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should handle empty response', () => {
    cy.intercept('GET', '**/api/products*', {
      statusCode: 200,
      body: []
    }).as('emptyProducts');

    cy.visit('/products');

    cy.wait('@emptyProducts');

    cy.get('[data-cy="no-products"]').should('be.visible');
  });

  it('should handle 404 error', () => {
    cy.intercept('GET', '**/api/products*', {
      statusCode: 404,
      body: {
        error: 'Products not found'
      }
    }).as('notFound');

    cy.visit('/products');

    cy.wait('@notFound');
    // App should handle 404 gracefully
  });

  it('should handle 500 error', () => {
    cy.intercept('GET', '**/api/products*', {
      statusCode: 500,
      body: {
        error: 'Internal server error'
      }
    }).as('serverError');

    cy.visit('/products');

    cy.wait('@serverError');
    // App should handle 500 gracefully
  });

  it('should handle slow response', () => {
    cy.intercept('GET', '**/api/products*', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Slow Product', price: 99.99, category: 'test', stock: 10 }
      ],
      delay: 2000
    }).as('slowProducts');

    cy.visit('/products');

    // Optionally check loading state if it exists
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="loading"]').length > 0) {
        cy.get('[data-cy="loading"]').should('be.visible');
      }
    });

    cy.wait('@slowProducts');

    cy.get('[data-cy="product-card"]').should('be.visible');
  });

  it('should handle network error', () => {
    cy.intercept('GET', '**/api/products*', {
      forceNetworkError: true
    }).as('networkError');

    cy.visit('/products');

    // App should handle network errors gracefully
    // Could show an error message or retry
  });

  it('should modify real response', () => {
    cy.intercept('GET', '**/api/products*', (req) => {
      req.continue((res) => {
        if (res.body && Array.isArray(res.body)) {
          res.body = res.body.slice(0, 3);
        }
        res.send();
      });
    }).as('modifiedProducts');

    cy.visit('/products');

    cy.wait('@modifiedProducts');

    cy.get('[data-cy="product-card"]').should('have.length', 3);
  });

  it('should conditionally mock based on request', () => {
    cy.intercept('GET', '**/api/products*', (req) => {
      if (req.url.includes('category=electronics')) {
        req.reply({
          statusCode: 200,
          body: [
            { id: 1, name: 'Mocked Electronics', price: 999.99, category: 'electronics', stock: 5 }
          ]
        });
      } else {
        req.continue();
      }
    });

    cy.visit('/products');
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });
});
