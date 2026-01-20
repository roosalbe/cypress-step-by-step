/**
 * OPDRACHT 3: Selector Strategieën
 *
 * Doel: Leer verschillende selector strategieën en best practices
 *
 * In deze opdracht ga je:
 * 1. Verschillende selectors vergelijken
 * 2. data-cy attributen gebruiken
 * 3. Elementen vinden binnen containers
 *
 * Bouwt voort op: Opdracht 2
 * Tijd: ~25 minuten
 */

describe('Opdracht 3: Selector Strategieën', () => {
  beforeEach(() => {
    cy.visit('/products.html');
  });

  /**
   * TEST 3.1: Selecteer met data-cy (best practice)
   *
   * TODO: Gebruik data-cy attributen om elementen te selecteren
   */
  it('should select elements using data-cy', () => {
    // TODO: Selecteer de pagina titel met data-cy
    // cy.get('[data-cy="page-title"]')...

    // TODO: Selecteer de zoekbalk met data-cy
    // cy.get('[data-cy="search-input"]')...

    // TODO: Selecteer de categorie filter met data-cy
    // cy.get('[data-cy="category-filter"]')...
  });

  /**
   * TEST 3.2: Selecteer meerdere elementen
   *
   * TODO: Werk met meerdere product cards
   */
  it('should work with multiple elements', () => {
    // TODO: Selecteer alle product cards en controleer dat er meer dan 5 zijn
    // cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 5)

    // TODO: Selecteer de eerste product card
    // cy.get('[data-cy="product-card"]').first()...

    // TODO: Selecteer de laatste product card
    // cy.get('[data-cy="product-card"]').last()...

    // TODO: Selecteer de 3e product card (index 2)
    // cy.get('[data-cy="product-card"]').eq(2)...
  });

  /**
   * TEST 3.3: Zoek binnen een container
   *
   * TODO: Gebruik .find() om binnen een element te zoeken
   */
  it('should find elements within containers', () => {
    // TODO: Zoek de product naam binnen de eerste product card
    // cy.get('[data-cy="product-card"]')
    //   .first()
    //   .find('[data-cy="product-name"]')
    //   .should('be.visible')

    // TODO: Zoek de prijs binnen de eerste product card
    // cy.get('[data-cy="product-card"]')
    //   .first()
    //   .find('[data-cy="product-price"]')
    //   .should('contain', '€')
  });

  /**
   * TEST 3.4: Combineer selectors
   *
   * TODO: Gebruik contains() met een selector
   */
  it('should combine selectors', () => {
    // TODO: Vind de product card die "Laptop" bevat
    // cy.contains('[data-cy="product-card"]', 'Laptop')
    //   .should('be.visible')

    // TODO: Vind de button in die specifieke card
    // cy.contains('[data-cy="product-card"]', 'Laptop')
    //   .find('[data-cy="add-to-cart"]')
    //   .should('exist')
  });

  /**
   * TEST 3.5: Filter elementen
   *
   * TODO: Gebruik .filter() om elementen te filteren
   */
  it('should filter elements', () => {
    // TODO: Filter product cards die "electronics" categorie hebben
    // Hint: Kijk naar de tekst in data-cy="product-category"
    // cy.get('[data-cy="product-card"]')
    //   .filter(':contains("electronics")')
    //   .should('have.length.greaterThan', 0)
  });

  /**
   * TEST 3.6: Parent/Child relaties
   *
   * TODO: Navigeer door de DOM structuur
   */
  it('should navigate DOM relationships', () => {
    // TODO: Vind het parent element van een product naam
    // cy.get('[data-cy="product-name"]')
    //   .first()
    //   .parent()
    //   .should('have.class', 'product-info')

    // TODO: Vind alle children van de filter sectie
    // cy.get('[data-cy="filters"]')
    //   .children()
    //   .should('have.length.greaterThan', 0)
  });

  /**
   * BONUS: Itereer over elementen
   *
   * TODO: Gebruik .each() om over elementen te itereren
   */
  it('should iterate over elements', () => {
    // TODO: Log de naam van elke product card
    // cy.get('[data-cy="product-card"]')
    //   .each(($card) => {
    //     cy.wrap($card)
    //       .find('[data-cy="product-name"]')
    //       .then(($name) => {
    //         cy.log($name.text())
    //       })
    //   })
  });
});
