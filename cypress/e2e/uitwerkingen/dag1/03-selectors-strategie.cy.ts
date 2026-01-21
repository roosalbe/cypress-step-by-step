/**
 * UITWERKING OPDRACHT 3: Selector Strategieën
 */

describe('Opdracht 3: Selector Strategieën', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should select elements using data-cy', () => {
    cy.get('[data-cy="page-title"]').should('be.visible');
    cy.get('[data-cy="search-input"]').should('be.visible');
    cy.get('[data-cy="category-filter"]').should('be.visible');
  });

  it('should work with multiple elements', () => {
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 5);

    cy.get('[data-cy="product-card"]').first().should('be.visible');

    cy.get('[data-cy="product-card"]').last().should('be.visible');

    cy.get('[data-cy="product-card"]').eq(2).should('be.visible');
  });

  it('should find elements within containers', () => {
    cy.get('[data-cy="product-card"]')
      .first()
      .find('[data-cy="product-name"]')
      .should('be.visible');

    cy.get('[data-cy="product-card"]')
      .first()
      .find('[data-cy="product-price"]')
      .should('contain', '€');
  });

  it('should combine selectors', () => {
    cy.contains('[data-cy="product-card"]', 'Laptop')
      .should('be.visible');

    cy.contains('[data-cy="product-card"]', 'Laptop')
      .find('[data-cy="add-to-cart-button"]')
      .should('exist');
  });

  it('should filter elements', () => {
    cy.get('[data-cy="product-card"]')
      .filter(':contains("electronics")')
      .should('have.length.greaterThan', 0);
  });

  it('should navigate DOM relationships', () => {
    // Check dat de productnaam in een card content container zit
    cy.get('[data-cy="product-name"]')
      .first()
      .parents('[data-cy="product-card"]')
      .should('exist');

    // Check dat de filters children heeft
    cy.get('[data-cy="product-filters"]')
      .find('input, select')
      .should('have.length.greaterThan', 0);
  });

  it('should iterate over elements', () => {
    cy.get('[data-cy="product-card"]')
      .each(($card) => {
        cy.wrap($card)
          .find('[data-cy="product-name"]')
          .then(($name) => {
            cy.log($name.text());
          });
      });
  });
});
