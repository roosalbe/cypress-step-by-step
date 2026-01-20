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
    loginPage.login('student', 'cypress123');

    cy.url().should('include', '/dashboard');

    cy.get('[data-cy="user-info"]')
      .should('be.visible')
      .and('contain', 'Student');

    cy.get('[data-cy="welcome-message"]')
      .should('contain', 'Welkom');
  });

  it('should login with admin account', () => {
    loginPage.login('admin', 'admin123');

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  it('should show error for invalid credentials', () => {
    loginPage.login('wrong-user', 'wrong-password');

    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain', 'Ongeldige');

    cy.url().should('include', '/login');
  });

  it('should not allow login with empty username', () => {
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/login');
  });

  it('should not allow login with empty password', () => {
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/login');
  });

  it('should login with Enter key', () => {
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123{enter}');

    cy.url().should('include', '/dashboard');
  });

  it('should logout successfully', () => {
    loginPage.login('student', 'cypress123');
    cy.url().should('include', '/dashboard');

    cy.get('[data-cy="logout-button"]').click();

    cy.url().should('not.include', '/dashboard');

    cy.get('[data-cy="user-info"]').should('not.be.visible');
  });

  it('should remember the user', () => {
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="remember-me"]').check();
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('be.visible');
  });

  it('should redirect to login when accessing protected route', () => {
    cy.visit('/dashboard.html');

    cy.url().should('include', '/login');
  });
});
