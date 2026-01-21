/**
 * OPDRACHT 5: Page Object Model - Basis
 *
 * Doel: Maak je eerste Page Object class
 *
 * In deze opdracht ga je:
 * 1. Een LoginPage class maken
 * 2. Selectors organiseren
 * 3. Herbruikbare methodes schrijven
 *
 * Bouwt voort op: Opdracht 4
 * Tijd: ~25 minuten
 */

import { LoginPage } from "@pages/LoginPage";

/**
 * STAP 1: Maak de LoginPage class
 *
 * TODO: Maak een bestand: cypress/support/pages/LoginPage.ts
 * met de volgende structuur:
 *
 * ```typescript
 * export class LoginPage {
 *   // Selectors
 *   private usernameInput = '[data-cy="username"]';
 *   private passwordInput = '[data-cy="password"]';
 *   private loginButton = '[data-cy="login-button"]';
 *   private errorMessage = '[data-cy="login-error"]';
 *   private rememberMeCheckbox = '[data-cy="remember-me"]';
 *
 *   // Methodes
 *   visit(): void {
 *     cy.visit('/login.html');
 *   }
 *
 *   enterUsername(username: string): void {
 *     cy.get(this.usernameInput).type(username);
 *   }
 *
 *   enterPassword(password: string): void {
 *     cy.get(this.passwordInput).type(password);
 *   }
 *
 *   clickLogin(): void {
 *     cy.get(this.loginButton).click();
 *   }
 *
 *   checkRememberMe(): void {
 *     cy.get(this.rememberMeCheckbox).check();
 *   }
 *
 *   // Gecombineerde actie
 *   login(username: string, password: string): void {
 *     this.enterUsername(username);
 *     this.enterPassword(password);
 *     this.clickLogin();
 *   }
 *
 *   // Assertions (helper methodes)
 *   shouldShowError(): void {
 *     cy.get(this.errorMessage).should('be.visible');
 *   }
 *
 *   shouldNotShowError(): void {
 *     cy.get(this.errorMessage).should('not.be.visible');
 *   }
 * }
 * ```
 */

// TODO: Uncomment de import zodra je de LoginPage hebt gemaakt
// import { LoginPage } from '../../support/pages/LoginPage';

describe('Opdracht 5: Page Object Model - Basis', () => {
  // TODO: Uncomment deze regel zodra je de LoginPage hebt gemaakt
  // const loginPage = new LoginPage();

  /**
   * TEST 5.1: Bezoek login pagina via Page Object
   *
   * TODO: Gebruik de visit() methode van LoginPage
   */
  it('should visit login page using page object', () => {
    // TODO: Vervang directe cy.visit() met page object methode
    cy.visit('/login.html');

    // Verify de pagina is geladen
    cy.get('[data-cy="login-form"]').should('be.visible');
  });

  /**
   * TEST 5.2: Login via Page Object methodes
   *
   * TODO: Vervang de scripts voor een Page Object aanroep
   */
  it('should login using individual methods', () => {
    cy.visit('/login.html');

    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');
  });

  /**
   * TEST 5.3: Login via gecombineerde methode
   *
   * TODO: Gebruik de login() helper methode
   */
  it('should login using combined login method', () => {
    cy.visit('/login.html');

    // TODO: Vervang met de login() methode doormiddel van chaining
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');
  });

  /**
   * TEST 5.4: Test ongeldige login
   *
   * TODO: Test dat error message getoond wordt bij foute credentials
   */
  it('should show error for invalid credentials', () => {
    cy.visit('/login.html');

    // TODO: Login met foute credentials
    cy.get('[data-cy="username"]').type('wrong');
    cy.get('[data-cy="password"]').type('wrong');
    cy.get('[data-cy="login-button"]').click();

    // TODO: Gebruik de shouldShowError() methode
    cy.get('[data-cy="login-error"]').should('be.visible');
  });

  /**
   * TEST 5.5: Test remember me checkbox
   *
   * TODO: Test de remember me functionaliteit
   */
  it('should check remember me checkbox', () => {
    cy.visit('/login.html');

    // TODO: Vul credentials in
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');

    // TODO: Check remember me met page object methode
    cy.get('[data-cy="remember-me"]').check();
    cy.get('[data-cy="remember-me"]').should('be.checked');
  });

  /**
   * BONUS: Vergelijk code met en zonder Page Object
   *
   * Kijk naar het verschil in leesbaarheid:
   *
   * ZONDER Page Object:
   * ```typescript
   * cy.visit('/login.html');
   * cy.get('[data-cy="username"]').type('student');
   * cy.get('[data-cy="password"]').type('cypress123');
   * cy.get('[data-cy="login-button"]').click();
   * ```
   *
   * MET Page Object:
   * ```typescript
   * loginPage.visit();
   * loginPage.login('student', 'cypress123');
   * ```
   *
   * Welke is makkelijker te lezen en onderhouden?
   */
});
