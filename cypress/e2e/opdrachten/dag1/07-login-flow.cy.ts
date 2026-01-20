/**
 * OPDRACHT 7: Complete Login Flow
 *
 * Doel: Test de complete login functionaliteit
 *
 * In deze opdracht ga je:
 * 1. Succesvolle login testen
 * 2. Foutmeldingen testen
 * 3. Edge cases afhandelen
 *
 * Bouwt voort op: Opdracht 6
 * Tijd: ~25 minuten
 */

// TODO: Uncomment zodra je de Page Objects hebt
// import { LoginPage } from '../../support/pages/LoginPage';

describe('Opdracht 7: Complete Login Flow', () => {
  // const loginPage = new LoginPage();

  beforeEach(() => {
    cy.visit('/login.html');
    // loginPage.visit();
  });

  /**
   * TEST 7.1: Succesvolle login
   *
   * TODO: Test dat een gebruiker succesvol kan inloggen
   */
  it('should login successfully with valid credentials', () => {
    // TODO: Log in met de student account
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();
    // loginPage.login('student', 'cypress123');

    // TODO: Verify redirect naar dashboard
    cy.url().should('include', '/dashboard');

    // TODO: Verify user info zichtbaar is in navbar
    cy.get('[data-cy="user-info"]')
      .should('be.visible')
      .and('contain', 'Student');

    // TODO: Verify welkomstbericht
    cy.get('[data-cy="welcome-message"]')
      .should('contain', 'Welkom');
  });

  /**
   * TEST 7.2: Login met admin account
   *
   * TODO: Test login met admin credentials
   */
  it('should login with admin account', () => {
    // TODO: Log in met admin account
    cy.get('[data-cy="username"]').type('admin');
    cy.get('[data-cy="password"]').type('admin123');
    cy.get('[data-cy="login-button"]').click();

    // TODO: Verify dat admin is ingelogd
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  /**
   * TEST 7.3: Ongeldige credentials
   *
   * TODO: Test dat een foutmelding getoond wordt bij foute gegevens
   */
  it('should show error for invalid credentials', () => {
    // TODO: Probeer in te loggen met foute credentials
    cy.get('[data-cy="username"]').type('wrong-user');
    cy.get('[data-cy="password"]').type('wrong-password');
    cy.get('[data-cy="login-button"]').click();

    // TODO: Verify dat error message zichtbaar is
    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('contain', 'Ongeldige');

    // TODO: Verify dat we nog steeds op login pagina zijn
    cy.url().should('include', '/login');
  });

  /**
   * TEST 7.4: Leeg username
   *
   * TODO: Test dat login niet werkt met leeg username
   */
  it('should not allow login with empty username', () => {
    // TODO: Alleen password invullen
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();

    // TODO: Verify dat we nog op login pagina zijn
    cy.url().should('include', '/login');
  });

  /**
   * TEST 7.5: Leeg password
   *
   * TODO: Test dat login niet werkt met leeg password
   */
  it('should not allow login with empty password', () => {
    // TODO: Alleen username invullen
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="login-button"]').click();

    // TODO: Verify dat we nog op login pagina zijn
    cy.url().should('include', '/login');
  });

  /**
   * TEST 7.6: Login met Enter toets
   *
   * TODO: Test dat Enter toets het formulier submit
   */
  it('should login with Enter key', () => {
    // TODO: Type credentials en druk Enter
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123{enter}');

    // TODO: Verify succesvolle login
    cy.url().should('include', '/dashboard');
  });

  /**
   * TEST 7.7: Logout functionaliteit
   *
   * TODO: Test dat uitloggen werkt
   */
  it('should logout successfully', () => {
    // Eerst inloggen
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/dashboard');

    // TODO: Klik op logout
    cy.get('[data-cy="logout-button"]').click();

    // TODO: Verify redirect naar homepage
    cy.url().should('include', '/index.html').or('eq', 'http://localhost:3000/');

    // TODO: Verify dat user info niet meer zichtbaar is
    cy.get('[data-cy="user-info"]').should('not.be.visible');
  });

  /**
   * TEST 7.8: Remember me checkbox
   *
   * TODO: Test de remember me functionaliteit
   */
  it('should remember the user', () => {
    // TODO: Login met remember me aangevinkt
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="remember-me"]').check();
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');

    // Verify dat we ingelogd zijn
    cy.get('[data-cy="user-info"]').should('be.visible');
  });

  /**
   * BONUS: Protected route test
   *
   * TODO: Test dat dashboard niet toegankelijk is zonder login
   */
  it('should redirect to login when accessing protected route', () => {
    // TODO: Probeer direct naar dashboard te gaan
    cy.visit('/dashboard.html');

    // TODO: Verify redirect naar login
    cy.url().should('include', '/login');
  });
});
