/**
 * UITWERKING OPDRACHT 13: Custom Command - Login
 */

describe('Opdracht 13: Custom Command - Login', () => {
  it('should use existing login command', () => {
    cy.login('student@test.nl', 'cypress123');

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Student');
  });

  it('should use loginViaApi command', () => {
    cy.loginViaApi('student@test.nl', 'cypress123');

    cy.visit('/dashboard');
    cy.get('[data-cy="welcome-card"]').should('contain', 'Student');
  });

  it('should compare login speeds - API login', () => {
    const startFast = Date.now();
    cy.loginViaApi('student@test.nl', 'cypress123');
    cy.visit('/dashboard');
    cy.get('[data-cy="welcome-card"]').should('be.visible').then(() => {
      const fastTime = Date.now() - startFast;
      cy.log(`Fast login took: ${fastTime}ms`);
    });
  });

  it('should measure UI login speed', () => {
    const startUI = Date.now();
    cy.login('student@test.nl', 'cypress123');
    cy.get('[data-cy="welcome-card"]').should('be.visible').then(() => {
      const uiTime = Date.now() - startUI;
      cy.log(`UI login took: ${uiTime}ms`);
    });
  });

  it('should login as different users', () => {
    // Student
    cy.loginViaApi('student@test.nl', 'cypress123');
    cy.visit('/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Student');
    cy.logout();

    // Admin
    cy.loginViaApi('admin@test.nl', 'admin123');
    cy.visit('/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  describe('Protected pages', () => {
    beforeEach(() => {
      cy.loginViaApi('student@test.nl', 'cypress123');
    });

    it('should access dashboard', () => {
      cy.visit('/dashboard');
      cy.get('[data-cy="welcome-card"]').should('be.visible');
    });

    it('should access cart', () => {
      cy.visit('/cart');
      cy.get('[data-cy="cart-page"]').should('be.visible');
    });
  });
});
