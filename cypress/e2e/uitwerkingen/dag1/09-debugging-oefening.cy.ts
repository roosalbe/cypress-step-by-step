/**
 * UITWERKING OPDRACHT 9: Debugging Oefeningen
 */

describe('Opdracht 9: Debugging Oefeningen', () => {
  beforeEach(() => {
    cy.visit('/products.html');
  });

  it('should use cy.log for debugging', () => {
    cy.log('Start: Zoeken naar producten');

    cy.get('[data-cy="search-input"]').type('Laptop');

    cy.log('Zoekopdracht ingevoerd: Laptop');

    cy.wait(500);

    cy.get('[data-cy="product-card"]').then(($cards) => {
      cy.log(`Gevonden: ${$cards.length} producten`);
    });
  });

  it('should use console.log for debugging', () => {
    cy.get('[data-cy="product-card"]').first().then(($card) => {
      console.log('Product card HTML:', $card.html());

      const productName = $card.find('[data-cy="product-name"]').text();
      console.log('Product naam:', productName);
    });
  });

  it('should use debug() to inspect state', () => {
    cy.get('[data-cy="product-card"]')
      .first()
      // .debug() // Uncomment om te debuggen
      .find('[data-cy="product-name"]')
      .should('be.visible');
  });

  it('should take screenshots', () => {
    cy.screenshot('products-initial');

    cy.get('[data-cy="category-filter"]').select('electronics');
    cy.wait(500);

    cy.screenshot('products-filtered');

    cy.get('[data-cy="product-card"]').first().screenshot('first-product');
  });

  it('should find and fix failing selector', () => {
    cy.get('[data-cy="search-input"]').type('test');
    cy.get('[data-cy="product-card"]').should('exist');
  });

  it('should handle timing issues', () => {
    cy.get('[data-cy="search-input"]').type('Laptop');

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0)
      .first()
      .should('contain', 'Laptop');
  });

  it('should log network requests', () => {
    cy.intercept('*', (req) => {
      console.log('Request:', req.method, req.url);
    });

    cy.visit('/products.html');
  });

  it('should use then() to inspect values', () => {
    cy.get('[data-cy="product-card"]')
      .its('length')
      .then((count) => {
        cy.log(`Aantal producten: ${count}`);
        expect(count).to.be.greaterThan(0);
      });

    cy.get('[data-cy="product-price"]')
      .first()
      .invoke('text')
      .then((priceText) => {
        cy.log(`Eerste prijs: ${priceText}`);
        const price = parseFloat(priceText.replace('€', '').replace('.', '').replace(',', '.'));
        expect(price).to.be.greaterThan(0);
      });
  });

  it('should fix multiple issues in this test', () => {
    cy.visit('/products.html');

    cy.get('[data-cy="search-input"]').type('Mouse');

    cy.wait(500);

    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);
  });
});
