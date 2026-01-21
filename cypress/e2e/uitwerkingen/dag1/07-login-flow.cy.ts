/**
 * UITWERKING OPDRACHT 7: Complete Login Flow
 */

import { LoginPage } from '../../../support/pages/LoginPage';

describe('Opdracht 7: Complete Login Flow', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.login('student@test.nl', 'cypress123');

    cy.url().should('include', '/dashboard');

    // Controleer dat we ingelogd zijn - user naam in header
    cy.get('[data-cy="user-info"]')
      .should('be.visible')
      .and('contain', 'Student');

    // Dashboard welcome card
    cy.get('[data-cy="welcome-card"]')
      .should('contain', 'Welkom');
  });

  it('should login with admin account', () => {
    loginPage.login('admin@test.nl', 'admin123');

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  it('should show error for invalid credentials', () => {
    loginPage.login('wrong@test.nl', 'wrong-password');

    cy.get('[data-cy="login-error"]')
      .should('be.visible');

    cy.url().should('include', '/login');
  });

  it('should not allow login with empty email', () => {
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    // Form validation prevents submission
    cy.url().should('include', '/login');
  });

  it('should not allow login with empty password', () => {
    cy.get('[data-cy="username"]').type('student@test.nl');
    cy.get('[data-cy="login-button"]').click();

    // Form validation prevents submission
    cy.url().should('include', '/login');
  });

  it('should login with Enter key', () => {
    cy.get('[data-cy="username"]').type('student@test.nl');
    cy.get('[data-cy="password"]').type('cypress123{enter}');

    cy.url().should('include', '/dashboard');
  });

  it('should logout successfully', () => {
    loginPage.login('student@test.nl', 'cypress123');
    cy.url().should('include', '/dashboard');

    cy.get('[data-cy="logout-button"]').click();

    cy.url().should('not.include', '/dashboard');

    // Na uitloggen is de user naam niet meer zichtbaar
    cy.get('[data-cy="user-info"]').should('not.exist');
  });

  it('should remember the user', () => {
    cy.get('[data-cy="username"]').type('student@test.nl');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="remember-me"]').check();
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('be.visible');
  });

  it('should redirect to login when accessing protected route', () => {
    cy.visit('/dashboard');

    cy.url().should('include', '/login');
  });
});
