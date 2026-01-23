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

import { DashboardPage } from "@pages/DashboardPage";
import { LoginPage } from "@pages/LoginPage";

// TODO: Import Page Objects


describe('Opdracht 7: Complete Login Flow', () => {
  const loginPage = new LoginPage()
  const dashboard = new DashboardPage()

  beforeEach(() => {
    loginPage.visit();
  });

  /**
   * TEST 7.1: Succesvolle login
   *
   * TODO: Test dat een gebruiker succesvol kan inloggen
   */
  it.only('should login successfully with valid credentials', () => {
    // TODO: Log in met de student account
    loginPage.login("student@test.nl", "cypress123");
    // TODO: Verify Login
    loginPage.shouldBeOnLoginPage();
    // TODO: Verify user info zichtbaar is in navbar
    dashboard.shouldShowAccountInfo("Student", "student@test.nl", "user")
    // TODO: Verify welkomstbericht
    dashboard.shouldShowWelcomeMessage("Welkom terug, Student User!")
  });

  /**
   * TEST 7.2: Login met admin account
   *
   * TODO: Test login met admin credentials
   */
  it.only('should login with admin account', () => {
    loginPage.login("admin@test.nl", "admin123");
    // TODO: Verify Login
    loginPage.shouldBeOnLoginPage();
    // TODO: Verify user info zichtbaar is in navbar
    dashboard.shouldShowAccountInfo("Admin", "admin@test.nl", "admin")
    // TODO: Verify welkomstbericht
    dashboard.shouldShowWelcomeMessage("Welkom terug, Admin User!")
  });

  /**
   * TEST 7.3: Ongeldige credentials
   *
   * TODO: Test dat een foutmelding getoond wordt bij foute gegevens
   */
  it.only('should show error for invalid credentials', () => {
    // TODO: Probeer in te loggen met foute credential
    loginPage.enterUsername("admin@test.nl");
    loginPage.enterPassword("admin@test.nl");
    loginPage.clickLogin();
    // TODO: Verify dat error message zichtbaar is
    loginPage.shouldShowError();
  });

  /**
   * TEST 7.4: Leeg username
   *
   * TODO: Test dat login niet werkt met leeg username
   */
  it.only('should not allow login with empty username', () => {
    // TODO: Alleen password invullen
    loginPage
      .login(" ", "cypress123")
      .shouldBeOnLoginPage()
    // TODO: Verify dat we nog op login pagina zijn
  });

  /**
   * TEST 7.5: Leeg password
   *
   * TODO: Test dat login niet werkt met leeg password
   */
  it('should not allow login with empty password', () => {
    // TODO: Alleen username invullen
    // TODO: Verify dat we nog op login pagina zijn
  });

  /**
   * TEST 7.6: Login met Enter toets
   *
   * TODO: Test dat Enter toets het formulier submit
   */
  it('should login with Enter key', () => {
    // TODO: Type credentials en druk Enter
    // TODO: Verify succesvolle login
  });

  /**
   * TEST 7.7: Logout functionaliteit
   *
   * TODO: Test dat uitloggen werkt
   */
  it.only('should logout successfully', () => {
    // TODO: Probeer in te loggen met foute credential
    loginPage.enterUsername("admin@test.nl");
    loginPage.enterPassword("admin123");
    loginPage.clickLogin();
    // Eerst inloggen
    // TODO: Klik op logout
    dashboard.clickLogout();
    // TODO: Verify redirect naar homepage
    cy.url().should('not.include', '/dashboard');
    // TODO: Verify dat user info niet meer zichtbaar is
  });

  /**
   * TEST 7.8: Remember me checkbox
   *
   * TODO: Test de remember me functionaliteit
   */
  it.only('should remember the user', () => {
    // TODO: Login met remember me aangevinkt
    // Verify dat we ingelogd zijn
    loginPage
      .checkRememberMe()
      .login("student@test.nl", "cypress123")

    dashboard.shouldShowWelcomeCard();
  });

  /**
   * TEST 7.9: Protected route test
   *
   * TODO: Test dat dashboard niet toegankelijk is zonder login
   */
  it('should redirect to login when accessing protected route', () => {
    // TODO: Probeer direct naar dashboard te gaan
    // TODO: Verify redirect naar login
  });
});
