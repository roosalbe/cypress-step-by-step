/**
 * OPDRACHT 20: Eindopdracht
 *
 * Doel: Pas alle geleerde concepten toe in een complete test suite
 *
 * In deze opdracht ga je:
 * 1. Een complete e-commerce flow testen
 * 2. Alle technieken uit de cursus combineren
 * 3. Zelfstandig tests schrijven
 *
 * Bouwt voort op: Alle voorgaande opdrachten
 * Tijd: ~50 minuten
 */

/**
 * EINDOPDRACHT: Complete E-Commerce Test Suite
 *
 * Schrijf tests voor de volgende scenario's:
 *
 * 1. User Registration/Login Flow
 *    - Login met geldige credentials
 *    - Login met ongeldige credentials
 *    - Logout functionaliteit
 *
 * 2. Product Browsing
 *    - Bekijk alle producten
 *    - Filter op categorie
 *    - Zoek naar specifiek product
 *    - Sorteer producten
 *
 * 3. Shopping Cart
 *    - Voeg product toe
 *    - Wijzig hoeveelheid
 *    - Verwijder product
 *    - Bekijk totaalprijs
 *
 * 4. Checkout Flow
 *    - Vul verzendgegevens in
 *    - Valideer formulier
 *    - Plaats bestelling
 *
 * EISEN:
 * - Gebruik Page Objects waar mogelijk
 * - Gebruik custom commands
 * - Gebruik fixtures voor test data
 * - Gebruik cy.intercept() voor minstens 1 test
 * - Schrijf minstens 1 data-driven test
 * - Alle tests moeten slagen!
 */

// TODO: Import je Page Objects
// import { LoginPage } from '../../../support/pages/LoginPage';
// import { ProductsPage } from '../../../support/pages/ProductsPage';

describe('Eindopdracht: Complete E-Commerce Test Suite', () => {
  // TODO: Initialiseer Page Objects
  // const loginPage = new LoginPage();
  // const productsPage = new ProductsPage();

  // ============================================
  // DEEL 1: User Authentication
  // ============================================
  describe('1. User Authentication', () => {
    /**
     * TODO: Schrijf een test voor succesvolle login
     */
    it('should login successfully', () => {
      // JOUW CODE HIER
      // Tip: Gebruik cy.login() of loginPage.login()

      cy.visit('/login.html');
      // TODO: Implementeer login test
    });

    /**
     * TODO: Schrijf een test voor ongeldige login
     */
    it('should show error for invalid login', () => {
      // JOUW CODE HIER

      cy.visit('/login.html');
      // TODO: Implementeer invalid login test
    });

    /**
     * TODO: Schrijf een test voor logout
     */
    it('should logout successfully', () => {
      // JOUW CODE HIER

      // TODO: Login eerst, dan logout
    });
  });

  // ============================================
  // DEEL 2: Product Browsing
  // ============================================
  describe('2. Product Browsing', () => {
    beforeEach(() => {
      cy.visit('/products.html');
    });

    /**
     * TODO: Test dat producten geladen worden
     */
    it('should display products', () => {
      // JOUW CODE HIER

      // TODO: Check dat er producten zijn
    });

    /**
     * TODO: Test de zoekfunctie
     */
    it('should search for products', () => {
      // JOUW CODE HIER

      // TODO: Zoek naar een product en verify resultaten
    });

    /**
     * TODO: Test het categorie filter
     */
    it('should filter by category', () => {
      // JOUW CODE HIER

      // TODO: Filter op categorie en verify
    });

    /**
     * TODO: Test de sorteer functie
     */
    it('should sort products', () => {
      // JOUW CODE HIER

      // TODO: Sorteer en verify volgorde
    });
  });

  // ============================================
  // DEEL 3: Shopping Cart
  // ============================================
  describe('3. Shopping Cart', () => {
    beforeEach(() => {
      // Start met schone cart
      cy.clearCart();
      cy.loginViaApi('student');
    });

    /**
     * TODO: Test product toevoegen aan cart
     */
    it('should add product to cart', () => {
      // JOUW CODE HIER

      // TODO: Voeg product toe en verify
    });

    /**
     * TODO: Test hoeveelheid wijzigen
     */
    it('should update quantity', () => {
      // JOUW CODE HIER

      // Tip: Gebruik cy.addToCart() voor setup
    });

    /**
     * TODO: Test product verwijderen
     */
    it('should remove product from cart', () => {
      // JOUW CODE HIER
    });

    /**
     * TODO: Test totaalprijs berekening
     */
    it('should calculate total correctly', () => {
      // JOUW CODE HIER

      // Tip: Voeg meerdere producten toe en verify totaal
    });
  });

  // ============================================
  // DEEL 4: Checkout Flow
  // ============================================
  describe('4. Checkout Flow', () => {
    beforeEach(() => {
      cy.clearCart();
      cy.loginViaApi('student');
      cy.addToCart(1, 1);
    });

    /**
     * TODO: Test checkout formulier invullen
     */
    it('should fill checkout form', () => {
      cy.visit('/checkout.html');

      // JOUW CODE HIER

      // TODO: Vul alle velden in
      // Tip: Gebruik fixture data of cy.fillForm()
    });

    /**
     * TODO: Test formulier validatie
     */
    it('should validate required fields', () => {
      cy.visit('/checkout.html');

      // JOUW CODE HIER

      // TODO: Submit zonder velden en check errors
    });
  });

  // ============================================
  // DEEL 5: Advanced Tests (Bonus)
  // ============================================
  describe('5. Advanced Tests (Bonus)', () => {
    /**
     * BONUS: Schrijf een data-driven test
     */
    it('should test multiple scenarios (data-driven)', () => {
      const scenarios = [
        { search: 'Laptop', expectResults: true },
        { search: 'Mouse', expectResults: true },
      ];

      // JOUW CODE HIER

      // TODO: Loop door scenarios
    });

    /**
     * BONUS: Gebruik cy.intercept() om response te mocken
     */
    it('should handle mocked API response', () => {
      // JOUW CODE HIER

      // TODO: Mock een response en test de UI
    });

    /**
     * BONUS: Complete user journey
     */
    it('should complete full user journey', () => {
      // JOUW CODE HIER

      // TODO: Login -> Browse -> Add to Cart -> Checkout

      // Stap 1: Login
      cy.loginViaApi('student');

      // Stap 2: Browse producten
      cy.visit('/products.html');

      // Stap 3: Voeg toe aan cart
      // TODO

      // Stap 4: Ga naar cart
      // TODO

      // Stap 5: Ga naar checkout
      // TODO

      // Stap 6: Vul gegevens in
      // TODO

      // Stap 7: Plaats bestelling
      // TODO
    });
  });
});

/**
 * EVALUATIE CRITERIA:
 *
 * [ ] Alle tests slagen
 * [ ] Page Objects gebruikt waar zinvol
 * [ ] Custom commands gebruikt
 * [ ] Fixtures gebruikt voor test data
 * [ ] cy.intercept() minstens 1x gebruikt
 * [ ] Data-driven test aanwezig
 * [ ] Goede selector strategie (data-cy)
 * [ ] Geen hardcoded waits (cy.wait(ms))
 * [ ] Tests zijn isolated
 * [ ] Code is leesbaar en onderhoudbaar
 *
 * BONUS PUNTEN:
 * [ ] Complete user journey test
 * [ ] Error scenarios getest
 * [ ] Edge cases afgedekt
 * [ ] Goede documentatie/comments
 */
