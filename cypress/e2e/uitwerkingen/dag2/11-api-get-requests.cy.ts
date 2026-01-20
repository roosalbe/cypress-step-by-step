/**
 * UITWERKING OPDRACHT 11: API GET Requests
 */

describe('Opdracht 11: API GET Requests', () => {
  it('should fetch products from API', () => {
    cy.request('GET', '/api/products.json')
      .its('status')
      .should('equal', 200);
  });

  it('should validate products response structure', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      expect(response.body).to.have.property('products');
      expect(response.body.products).to.be.an('array');
      expect(response.body.products).to.have.length.greaterThan(0);
    });
  });

  it('should validate product properties', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      const firstProduct = response.body.products[0];

      expect(firstProduct).to.have.property('id');
      expect(firstProduct).to.have.property('name');
      expect(firstProduct).to.have.property('price');
      expect(firstProduct).to.have.property('category');
      expect(firstProduct).to.have.property('stock');
    });
  });

  it('should fetch users from API', () => {
    cy.request('GET', '/api/users.json')
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.users).to.have.length.greaterThan(0);
      });
  });

  it('should fetch orders from API', () => {
    cy.request('GET', '/api/orders.json')
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('orders');
        expect(response.body.orders).to.be.an('array');
      });
  });

  it('should find a specific product', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      const laptop = response.body.products.find(
        (p: { name: string }) => p.name.includes('Laptop')
      );

      expect(laptop).to.exist;
      expect(laptop.price).to.be.greaterThan(500);
    });
  });

  it('should use its() for clean assertions', () => {
    cy.request('GET', '/api/products.json')
      .its('status')
      .should('equal', 200);

    cy.request('GET', '/api/products.json')
      .its('body.products')
      .should('have.length.greaterThan', 0);
  });

  it('should validate response headers', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('should use API data in UI test', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      const apiProductCount = response.body.products.length;

      cy.visit('/products.html');

      cy.get('[data-cy="product-card"]')
        .should('have.length', apiProductCount);
    });
  });
});
