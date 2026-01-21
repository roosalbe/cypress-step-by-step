/**
 * UITWERKING OPDRACHT 11: API GET Requests
 */

describe('Opdracht 11: API GET Requests', () => {
  const apiUrl = Cypress.env('apiUrl');

  it('should fetch products from API', () => {
    cy.request('GET', `${apiUrl}/products`)
      .its('status')
      .should('equal', 200);
  });

  it('should validate products response structure', () => {
    cy.request('GET', `${apiUrl}/products`).then((response) => {
      expect(response.body).to.have.property('products');
      expect(response.body.products).to.be.an('array');
      expect(response.body.products).to.have.length.greaterThan(0);
    });
  });

  it('should validate product properties', () => {
    cy.request('GET', `${apiUrl}/products`).then((response) => {
      const firstProduct = response.body.products[0];

      expect(firstProduct).to.have.property('id');
      expect(firstProduct).to.have.property('name');
      expect(firstProduct).to.have.property('price');
      expect(firstProduct).to.have.property('category');
      expect(firstProduct).to.have.property('stock');
    });
  });

  it('should fetch categories from API', () => {
    cy.request('GET', `${apiUrl}/products/categories`)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.categories).to.be.an('array');
        expect(response.body.categories).to.have.length.greaterThan(0);
      });
  });

  it('should filter products by category', () => {
    cy.request('GET', `${apiUrl}/products?category=electronics`)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.products).to.have.length.greaterThan(0);
        response.body.products.forEach((product: { category: string }) => {
          expect(product.category).to.equal('electronics');
        });
      });
  });

  it('should find a specific product', () => {
    cy.request('GET', `${apiUrl}/products`).then((response) => {
      const laptop = response.body.products.find(
        (p: { name: string }) => p.name.includes('Laptop')
      );

      expect(laptop).to.exist;
      expect(laptop.price).to.be.greaterThan(500);
    });
  });

  it('should use its() for clean assertions', () => {
    cy.request('GET', `${apiUrl}/products`)
      .its('status')
      .should('equal', 200);

    cy.request('GET', `${apiUrl}/products`)
      .its('body.products')
      .should('have.length.greaterThan', 0);
  });

  it('should validate response headers', () => {
    cy.request('GET', `${apiUrl}/products`).then((response) => {
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('should use API data in UI test', () => {
    cy.request('GET', `${apiUrl}/products`).then((response) => {
      const apiProductCount = response.body.products.length;

      cy.visit('/products');

      cy.get('[data-cy="product-card"]')
        .should('have.length', apiProductCount);
    });
  });
});
