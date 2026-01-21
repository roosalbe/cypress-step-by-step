/**
 * UITWERKING OPDRACHT 10: Timeout Handling
 */

describe('Opdracht 10: Timeout Handling', () => {
  it('should use default timeout', () => {
    cy.visit('/products');

    cy.get('[data-cy="product-card"]').should('be.visible');
  });

  it('should use custom timeout for slow elements', () => {
    cy.visit('/products');

    cy.get('[data-cy="product-card"]', { timeout: 10000 })
      .should('be.visible');

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });

  it('should wait for URL change', () => {
    cy.visit('/login');

    cy.get('[data-cy="username"]').type('student@test.nl');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard', { timeout: 10000 });
  });

  it('should wait for element state', () => {
    cy.visit('/products');

    cy.get('[data-cy="search-input"]')
      .should('not.be.disabled');

    cy.get('[data-cy="search-input"]').type('Laptop');
    cy.get('[data-cy="apply-filters"]').click();

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });

  it('should wait for network request', () => {
    cy.intercept('GET', '**/api/products*').as('getProducts');

    cy.visit('/products');

    cy.wait('@getProducts');
  });

  it('should understand retry-ability', () => {
    cy.visit('/products');

    cy.get('[data-cy="product-card"]')
      .should('be.visible');

    cy.get('[data-cy="product-card"]')
      .first()
      .then(($card) => {
        expect($card).to.be.visible;
      });
  });

  it('should conditionally wait', () => {
    cy.visit('/products');

    cy.get('body').then(($body) => {
      if ($body.find('[data-cy="loading"]').length > 0) {
        cy.get('[data-cy="loading"]').should('not.exist');
      }
    });

    cy.get('[data-cy="product-card"]').should('be.visible');
  });

  it('should avoid hardcoded waits', () => {
    cy.visit('/products');

    cy.get('[data-cy="search-input"]').type('Laptop');
    cy.get('[data-cy="apply-filters"]').click();

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0)
      .first()
      .should('contain', 'Laptop');
  });

  it('should handle slow page load', () => {
    cy.visit('/products', { timeout: 30000 });

    cy.get('[data-cy="page-title"]').should('be.visible');
  });

  it('should handle slow API response', () => {
    cy.intercept('GET', '**/api/products*', (req) => {
      req.on('response', (res) => {
        res.setDelay(2000);
      });
    }).as('slowProducts');

    cy.visit('/products');

    cy.get('[data-cy="product-card"]', { timeout: 15000 })
      .should('have.length.greaterThan', 0);
  });
});
