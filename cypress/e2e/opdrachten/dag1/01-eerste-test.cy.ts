/**
 * OPDRACHT 1: Je Eerste Cypress Test
 *
 * Doel: Leer de basis van Cypress tests schrijven
 *
 * In deze opdracht ga je:
 * 1. De demo-applicatie bezoeken
 * 2. Basis assertions schrijven
 * 3. De Cypress Test Runner leren kennen
 *
 * Tijd: ~25 minuten
 */

describe('Opdracht 1: Eerste Test', () => {
  /**
   * TEST 1.1: Bezoek de homepage
   *
   * TODO: Gebruik cy.visit() om naar de homepage te navigeren
   * De baseUrl is al geconfigureerd in cypress.config.ts
   *
   * Tip: cy.visit('/') of cy.visit('/index.html')
   */
  it.only('should visit the homepage', () => {
    // TODO: Bezoek de homepage

    // TODO: Controleer dat de pagina geladen is door te checken
    // dat de titel zichtbaar is.
  });

  /**
   * TEST 1.2: Controleer de pagina titel
   *
   * TODO: Controleer dat de browser title correct is
   *
   * Tip: Gebruik cy.title() en .should('contain', '...')
   */
  it('should have the correct page title', () => {
    // TODO: Check dat de titel "Cypress Shop" bevat
  });

  /**
   * TEST 1.3: Controleer de hero sectie
   *
   * TODO: Controleer dat de hero sectie correct weergegeven wordt
   */
  it('should display the hero section', () => {
    // TODO: Check dat de hero title zichtbaar is en "Welkom" bevat

    // TODO: Check dat de hero subtitle zichtbaar is

    // TODO: Check dat de "Bekijk Producten" button zichtbaar is
  });

  /**
   * TEST 1.4: Controleer de navigatie
   *
   * TODO: Controleer dat alle navigatie links aanwezig zijn
   */
  it('should have navigation links', () => {
    // TODO: Check dat de volgende navigatie links bestaan:
    // - nav-home
    // - nav-products
    // - nav-dashboard
    // - nav-cart
    // - nav-login
  });

  /**
   * BONUS: Controleer de footer
   *
   * TODO: Scroll naar de footer en controleer de tekst
   */
  it('should display the footer', () => {
    // TODO: Scroll naar footer en check dat footer-text zichtbaar is
    // Tip: cy.get(...).scrollIntoView()
  });
});
