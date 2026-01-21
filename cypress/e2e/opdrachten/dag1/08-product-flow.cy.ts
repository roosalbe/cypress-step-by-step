/**
 * OPDRACHT 8: Product & Cart Flow
 *
 * Doel: Test de complete product browse en winkelwagen flow
 *
 * In deze opdracht ga je:
 * 1. Producten zoeken en filteren
 * 2. Producten toevoegen aan winkelwagen
 * 3. Winkelwagen beheren
 *
 * Bouwt voort op: Opdracht 7
 * Tijd: ~25 minuten
 */

describe('Opdracht 8: Product & Cart Flow', () => {
  beforeEach(() => {
    // Login
  });

  /**
   * TEST 8.1: Bekijk alle producten
   *
   * TODO: Controleer dat producten geladen worden
   */
  it('should display all products', () => {
    // TODO: Controleer dat er product cards zijn
    // TODO: Controleer dat elk product een naam en prijs heeft
  });

  /**
   * TEST 8.2: Zoek naar product
   *
   * TODO: Test de zoekfunctionaliteit
   */
  it('should search for products', () => {
    // TODO: Zoek naar "Laptop"
    // BONUS: Wacht op debounce
    // TODO: Controleer dat zoekresultaten "Laptop" bevatten
  });

  /**
   * TEST 8.3: Filter op categorie
   *
   * TODO: Test het categorie filter
   */
  it('should filter by category', () => {
    // TODO: Selecteer "electronics" categorie
    // TODO: Controleer dat alle producten "electronics" categorie hebben
  });

  /**
   * TEST 8.4: Sorteer producten
   *
   * TODO: Test de sorteer functionaliteit
   */
  it('should sort products by price', () => {
    cy.visit('/products.html');

    // TODO: Advanced: Sorteer op prijs (laag naar hoog)
    // TODO: Controleer dat producten gesorteerd zijn
    // Hint: Vergelijk de eerste en laatste prijs
  });

  /**
   * TEST 8.5: Voeg product toe aan winkelwagen
   *
   * TODO: Test het toevoegen van product aan cart
   */
  it('should add product to cart', () => {
    cy.visit('/products.html');

    // TODO: Klik op "In winkelwagen" bij eerste product
    // TODO: Controleer dat cart count bijgewerkt is
  });

  /**
   * TEST 8.6: Bekijk winkelwagen
   *
   * TODO: Ga naar de winkelwagen en controleer de inhoud
   */
  it('should view cart with added product', () => {
    // TODO: Voeg eerst een product toe
    // TODO: Controleer dat er items in de cart zijn
    // TODO: Controleer dat het totaalbedrag zichtbaar is
  });

  /**
   * TEST 8.7: Wijzig hoeveelheid in cart
   *
   * TODO: Test het wijzigen van quantity
   */
  it('should update product quantity in cart', () => {
    // TODO: Voeg eerst een product toe
    // TODO: Klik op de + button om quantity te verhogen
    // TODO: Controleer dat quantity nu 2 is
  });

  /**
   * TEST 8.8: Verwijder product uit cart
   *
   * TODO: Test het verwijderen van een product
   */
  it('should remove product from cart', () => {
    // TODO: Voeg eerst een product toe
    // TODO: Controleer dat item aanwezig is
    // TODO: Klik op verwijder button
    // TODO: Controleer dat cart leeg is
  });

  /**
   * TEST 8.9: Bekijk product detail
   *
   * TODO: Navigeer naar product detail pagina
   */
  it('should view product details', () => {
    // TODO: Klik op "Bekijk" bij eerste product
    // TODO: Controleer dat we op detail pagina zijn
    // TODO: Controleer dat product info zichtbaar is
  });

  /**
   * BONUS: Complete shopping flow
   *
   * TODO: Test de complete flow van zoeken tot checkout
   */
  it('should complete full shopping flow', () => {
    // 1. Ga naar producten
    // 2. Zoek product
    // 3. Voeg toe aan cart
    // 4. Ga naar cart
    // 5. Verify cart
    // 6. Ga naar checkout
    // 7. Verify checkout pagina
  });
});
