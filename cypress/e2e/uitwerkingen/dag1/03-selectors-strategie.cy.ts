/**
 * UITWERKING OPDRACHT 3: Selector Strategieën
 */

describe('Opdracht 3: Selector Strategieën', () => {
  beforeEach(() => {
    cy.visit('/products.html');
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
      .find('[data-cy="add-to-cart"]')
      .should('exist');
  });

  it('should filter elements', () => {
    cy.get('[data-cy="product-card"]')
      .filter(':contains("electronics")')
      .should('have.length.greaterThan', 0);
  });

  it('should navigate DOM relationships', () => {
    cy.get('[data-cy="product-name"]')
      .first()
      .parent()
      .should('have.class', 'product-info');

    cy.get('[data-cy="filters"]')
      .children()
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
