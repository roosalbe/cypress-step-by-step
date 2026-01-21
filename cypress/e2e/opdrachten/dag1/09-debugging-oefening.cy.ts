/**
 * OPDRACHT 9: Debugging Oefeningen
 *
 * Doel: Leer debugging tools en technieken gebruiken
 *
 * In deze opdracht ga je:
 * 1. Debug commands gebruiken
 * 2. Console output bekijken
 * 3. Screenshots maken
 * 4. Problemen oplossen in falende tests
 *
 * Bouwt voort op: Opdracht 8
 * Tijd: ~25 minuten
 */

describe('Opdracht 9: Debugging Oefeningen', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  /**
   * TEST 9.1: Gebruik cy.log()
   *
   * TODO: Voeg logging toe om de test flow te volgen
   */
  it('should use cy.log for debugging', () => {
    // TODO: Log het begin van de test
    cy.get('[data-cy="search-input"]').type('Laptop');
    // TODO: Log na het typen
    // TODO: Log het aantal gevonden producten
    
    cy.get('[data-cy="product-card"]').then(($cards) => {
      
    });
  });

  /**
   * TEST 9.2: Gebruik console.log()
   *
   * TODO: Log informatie naar de browser console
   */
  it('should use console.log for debugging', () => {

    cy.get('[data-cy="product-card"]').first().then(($card) => {
      // TODO: Log de HTML van de card naar console
      // TODO: Log de tekst van de product naam

      const productName = $card.find('[data-cy="product-name"]').text();
    });

  });

  /**
   * TEST 9.3: Gebruik .debug()
   *
   * TODO: Pauzeer de test met debug() om de state te inspecteren
   *
   * LET OP: Uncomment .debug() alleen als je wilt pauzeren!
   */
  it.only('should use debug() to inspect state', () => {
    cy.get('[data-cy="product-card"]')
      .first()
      // .debug() // TODO: Uncomment om te debuggen
      .find('[data-cy="product-name"]')
      .should('be.visible');
  });

  /**
   * TEST 9.4: Maak screenshots
   *
   * TODO: Maak screenshots op belangrijke momenten
   * 
   * TIP *.screenshot()
   */
  it('should take screenshots', () => {
    // TODO: Maak screenshot van initiele staat
    // cy.screenshot('products-initial');

    // Filter producten
    cy.get('[data-cy="category-filter"]').select('electronics');
    cy.wait(500);

    // TODO: Maak screenshot na filteren
    // TODO: Maak screenshot van specifiek element
  });

  /**
   * TEST 9.5: Debug een falende selector
   *
   * Deze test faalt expres! Debug en fix hem.
   */
  it('should find and fix failing selector', () => {
    // TODO: Fix deze input
    cy.get('[data-cy="zoek-invoer"]').type('test'); // FOUT!

    // TODO: Fix deze assert
    cy.get('[data-cy="product-kaart"]').should('exist'); 
  });

  /**
   * TEST 9.6: Debug timing issues
   *
   * TODO: Los timing problemen op
   */
  it('should handle timing issues', () => {
    // Type in search
    cy.get('[data-cy="search-input"]').type('Laptop');

    // PROBLEEM: Test faalt soms omdat filter nog niet toegepast is
    // OPLOSSING: Wacht op resultaten

    // TODO: Voeg juiste wait strategie toe
    // Optie 1: cy.wait(500) - niet ideaal
    // Optie 2: Wacht tot producten gefilterd zijn
  });

  /**
   * TEST 9.7: Inspect network requests
   *
   * TODO: Log network requests voor debugging
   */
  it('should log network requests', () => {
    // TODO: Intercept alle requests en log ze
    cy.intercept('*', (req) => {
      // request method, and request url
    });

    cy.visit('/products');

    // De console toont nu alle requests
  });

  /**
   * TEST 9.8: Debug met .then()
   *
   * TODO: Gebruik .then() om waarden te inspecteren
   */
  it('should use then() to inspect values', () => {
    cy.get('[data-cy="product-card"]')
      .its('length')
      .then((count) => {
        // TODO: Log het aantal producten
        // cy.log(`Aantal producten: ${count}`);
        // TODO: Assert op basis van de waarde
      });

    cy.get('[data-cy="product-price"]')
      .first()
      .invoke('text')
      .then((priceText) => {
        // TODO: Log de prijs
        // cy.log(`Eerste prijs: ${priceText}`);

        // TODO: Parse en valideer de prijs
        const price = parseFloat(priceText.replace('€', '').replace('.', '').replace(',', '.'));
        expect(price).to.be.greaterThan(0);
      });
  });

  /**
   * BONUS: Fix deze buggy test
   *
   * Deze test heeft meerdere problemen. Vind en fix ze alle!
   */
  it('should fix multiple issues in this test', () => {
    cy.visit('/producten.html');
    cy.get('[data-cy="search"]').type('Mouse');
    cy.get('[data-cy="product-card"]')
      .should('have.length', 100); 
  });
});
