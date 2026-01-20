/**
 * OPDRACHT 2: Navigatie & Assertions
 *
 * Doel: Leer navigeren tussen pagina's en assertions gebruiken
 *
 * In deze opdracht ga je:
 * 1. Navigeren via links
 * 2. URL assertions gebruiken
 * 3. Verschillende assertion types leren
 *
 * Tijd: ~25 minuten
 */

describe('Opdracht 2: Navigatie & Assertions', () => {
  /**
   * Opdracht 2.0: De applicatie op een generieke manier opstarten voor elke test
   * 
   * TODO: Maak gebruikt van BeforeEach
   */

  /**
   * TEST 2.1: Navigeer naar Products pagina
   *
   * TODO: Klik op de Products link en controleer de navigatie
   */
  it('should navigate to products page', () => {
    // TODO: Klik op de "Producten" link in de navigatie

    // TODO: Controleer dat de URL nu "/products.html" bevat

    // TODO: Controleer dat de pagina titel "Producten" zichtbaar is
  });

  /**
   * TEST 2.2: Navigeer via de hero button
   *
   * TODO: Klik op de "Bekijk Producten" button in de hero sectie
   */
  it('should navigate via shop now button', () => {
    // TODO: Klik op de shop-now-button

    // TODO: Controleer dat je op de products pagina bent
  });

  /**
   * TEST 2.3: Navigeer naar Login pagina
   *
   * TODO: Ga naar de login pagina en controleer de elementen
   */
  it('should navigate to login page', () => {
    // TODO: Klik op de login link

    // TODO: Controleer de URL

    // TODO: Controleer dat het login formulier zichtbaar is

    // TODO: Controleer dat username en password velden bestaan
  });

  /**
   * TEST 2.4: Gebruik contains() voor navigatie
   *
   * TODO: Navigeer met cy.contains()
   */
  it('should navigate using contains()', () => {
    // TODO: Gebruik cy.contains om op "Producten" te klikken

    // TODO: Controleer dat je op de juiste pagina bent
  });

  /**
   * TEST 2.5: Meerdere assertions combineren
   *
   * TODO: Gebruik .and() om meerdere assertions te chainen
   */
  it('should chain multiple assertions', () => {
    cy.visit('/products.html');

    // TODO: Controleer dat de search input:
    // - Zichtbaar is
    // - Een placeholder heeft
    // - Leeg is (geen value)
    //
    // TIP: Gebruik: .should(...).and(...).and(...)
  });

  /**
   * TEST 2.6: Terug navigeren
   *
   * TODO: Gebruik cy.go() om terug te navigeren
   */
  it('should navigate back', () => {
    // Ga naar products
    cy.get('[data-cy="nav-products"]').click();
    cy.url().should('include', '/products.html');

    // TODO: Ga terug naar de homepage met cy.go('back')

    // TODO: Controleer dat je weer op de homepage bent
  });

  /**
   * BONUS: Navigeer naar categorie via link
   *
   * TODO: Klik op een categorie link en controleer de filter
   */
  it('should navigate to category', () => {
    // TODO: Klik op de "Electronics" categorie link

    // TODO: Controleer dat de URL een query parameter heeft
  });
});
