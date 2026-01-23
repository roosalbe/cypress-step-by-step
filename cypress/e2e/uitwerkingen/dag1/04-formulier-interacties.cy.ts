/**
 * UITWERKING OPDRACHT 4: Formulier Interacties
 */

describe('Opdracht 4: Formulier Interacties', () => {
  it('should type in search input', () => {
    cy.visit('/products');

    cy.get('[data-cy="search-input"]').type('Laptop');

    cy.get('[data-cy="search-input"]').should('have.value', 'Laptop');
  });

  it('should clear and type new text', () => {
    cy.visit('/products');

    cy.get('[data-cy="search-input"]').type('Test');

    cy.get('[data-cy="search-input"]').clear().type('Keyboard');

    cy.get('[data-cy="search-input"]').should('have.value', 'Keyboard');
  });

  it('should select from dropdown', () => {
    cy.visit('/products');

    cy.get('[data-cy="category-filter"]').select('electronics');

    cy.get('[data-cy="category-filter"]').should('have.value', 'electronics');
  });

  it('should check and uncheck checkbox', () => {
    cy.visit('/products');

    cy.get('[data-cy="in-stock-filter"]').check();

    cy.get('[data-cy="in-stock-filter"]').should('be.checked');

    cy.get('[data-cy="in-stock-filter"]').uncheck();

    cy.get('[data-cy="in-stock-filter"]').should('not.be.checked');
  });

  it('should fill login form', () => {
    cy.visit('/login');

    // Let op: het formulier gebruikt email adressen
    cy.get('[data-cy="username"]').type('student@test.nl');

    cy.get('[data-cy="password"]').type('cypress123');

    cy.get('[data-cy="remember-me"]').check();

    cy.get('[data-cy="username"]').should('have.value', 'student@test.nl');
    cy.get('[data-cy="password"]').should('have.value', 'cypress123');
    cy.get('[data-cy="remember-me"]').should('be.checked');
  });

  it('should submit login form', () => {
    cy.visit('/login');

    cy.get('[data-cy="username"]').type('student@test.nl');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');
  });

  it('should use special keys', () => {
    cy.visit('/login');

    cy.get('[data-cy="username"]').type('student@test.nl');
    cy.get('[data-cy="password"]').type('cypress123{enter}');
    cy.url().should('include', '/dashboard');
  });
});
