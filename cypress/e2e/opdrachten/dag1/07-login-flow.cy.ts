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

// TODO: Import Page Objects


describe('Opdracht 7: Complete Login Flow', () => {
  // TODO: Declareer loginPage

  beforeEach(() => {
      // TODO: login
  });

  /**
   * TEST 7.1: Succesvolle login
   *
   * TODO: Test dat een gebruiker succesvol kan inloggen
   */
  it('should login successfully with valid credentials', () => {
    // TODO: Log in met de student account
    // TODO: Verify Login
    // TODO: Verify user info zichtbaar is in navbar
    // TODO: Verify welkomstbericht
  });

  /**
   * TEST 7.2: Login met admin account
   *
   * TODO: Test login met admin credentials
   */
  it('should login with admin account', () => {
    // TODO: Log in met admin account
    // TODO: Verify dat admin is ingelogd
  });

  /**
   * TEST 7.3: Ongeldige credentials
   *
   * TODO: Test dat een foutmelding getoond wordt bij foute gegevens
   */
  it('should show error for invalid credentials', () => {
    // TODO: Probeer in te loggen met foute credential
    // TODO: Verify dat error message zichtbaar is
    // TODO: Verify dat we nog steeds op login pagina zijn
  });

  /**
   * TEST 7.4: Leeg username
   *
   * TODO: Test dat login niet werkt met leeg username
   */
  it('should not allow login with empty username', () => {
    // TODO: Alleen password invullen
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
  it('should logout successfully', () => {
    // Eerst inloggen
    // TODO: Klik op logout
    // TODO: Verify redirect naar homepage
    // TODO: Verify dat user info niet meer zichtbaar is
  });

  /**
   * TEST 7.8: Remember me checkbox
   *
   * TODO: Test de remember me functionaliteit
   */
  it('should remember the user', () => {
    // TODO: Login met remember me aangevinkt
    // Verify dat we ingelogd zijn
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
