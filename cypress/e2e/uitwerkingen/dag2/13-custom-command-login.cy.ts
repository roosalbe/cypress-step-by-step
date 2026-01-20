/**
 * UITWERKING OPDRACHT 13: Custom Command - Login
 */

describe('Opdracht 13: Custom Command - Login', () => {
  it('should use existing login command', () => {
    cy.login('student', 'cypress123');

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Student');
  });

  it('should use loginViaApi command', () => {
    cy.loginViaApi('student');

    cy.visit('/dashboard.html');
    cy.get('[data-cy="welcome-message"]').should('contain', 'Student');
  });

  it('should use custom loginUI command', () => {
    // Gebruik het bestaande login command (equivalent aan loginUI)
    cy.login('student', 'cypress123');

    cy.url().should('include', '/dashboard');
  });

  it('should use custom loginFast command', () => {
    // Gebruik loginViaApi (equivalent aan loginFast)
    cy.loginViaApi('admin');

    cy.visit('/dashboard.html');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  it('should compare login speeds - API login', () => {
    const startFast = Date.now();
    cy.loginViaApi('student');
    cy.visit('/dashboard.html');
    cy.get('[data-cy="welcome-message"]').should('be.visible').then(() => {
      const fastTime = Date.now() - startFast;
      cy.log(`Fast login took: ${fastTime}ms`);
    });
  });

  it('should measure UI login speed', () => {
    const startUI = Date.now();
    cy.login('student', 'cypress123');
    cy.get('[data-cy="welcome-message"]').should('be.visible').then(() => {
      const uiTime = Date.now() - startUI;
      cy.log(`UI login took: ${uiTime}ms`);
    });
  });

  it('should login as different users', () => {
    // Student
    cy.loginViaApi('student');
    cy.visit('/dashboard.html');
    cy.get('[data-cy="user-info"]').should('contain', 'Student');
    cy.logout();

    // Admin
    cy.loginViaApi('admin');
    cy.visit('/dashboard.html');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  describe('Protected pages', () => {
    beforeEach(() => {
      cy.loginViaApi('student');
    });

    it('should access dashboard', () => {
      cy.visit('/dashboard.html');
      cy.get('[data-cy="welcome-message"]').should('be.visible');
    });

    it('should access checkout', () => {
      cy.addToCart(1, 1);
      cy.visit('/checkout.html');
      cy.get('[data-cy="checkout-form"]').should('be.visible');
    });
  });
});
