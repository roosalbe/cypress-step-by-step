/**
 * UITWERKING OPDRACHT 5: Page Object Model - Basis
 */

import { LoginPage } from '../../../support/pages/LoginPage';

describe('Opdracht 5: Page Object Model - Basis', () => {
  const loginPage = new LoginPage();

  it('should visit login page using page object', () => {
    loginPage.visit();

    cy.get('[data-cy="login-form"]').should('be.visible');
  });

  it('should login using individual methods', () => {
    loginPage.visit();

    loginPage.enterUsername('student@test.nl');
    loginPage.enterPassword('cypress123');
    loginPage.clickLogin();

    cy.url().should('include', '/dashboard');
  });

  it('should login using combined login method', () => {
    loginPage.visit();

    loginPage.login('student@test.nl', 'cypress123');

    cy.url().should('include', '/dashboard');
  });

  it('should show error for invalid credentials', () => {
    loginPage.visit();

    loginPage.login('wrong@test.nl', 'wrong');

    loginPage.shouldShowError();
  });

  it('should check remember me checkbox', () => {
    loginPage.visit();

    loginPage.enterUsername('student@test.nl');
    loginPage.enterPassword('cypress123');
    loginPage.checkRememberMe();

    cy.get('[data-cy="remember-me"]').should('be.checked');
  });
});
