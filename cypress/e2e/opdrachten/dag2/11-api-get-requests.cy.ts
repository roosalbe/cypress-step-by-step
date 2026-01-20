/**
 * OPDRACHT 11: API GET Requests
 *
 * Doel: Leer API calls maken en responses valideren
 *
 * In deze opdracht ga je:
 * 1. GET requests maken met cy.request()
 * 2. Response status codes valideren
 * 3. Response body valideren
 *
 * Bouwt voort op: Opdracht 10
 * Tijd: ~25 minuten
 */

describe('Opdracht 11: API GET Requests', () => {
  /**
   * TEST 11.1: Basis GET request
   *
   * TODO: Maak een GET request naar de products API
   */
  it('should fetch products from API', () => {
    // TODO: Maak een GET request naar '/api/products.json'
    // cy.request('GET', '/api/products.json')

    // TODO: Controleer dat status 200 is
    // .its('status')
    // .should('equal', 200)
  });

  /**
   * TEST 11.2: Response body valideren
   *
   * TODO: Valideer de structuur van de response
   */
  it('should validate products response structure', () => {
    // TODO: Maak request en valideer body
    cy.request('GET', '/api/products.json').then((response) => {
      // TODO: Check dat response een products array heeft
      // expect(response.body).to.have.property('products')

      // TODO: Check dat products een array is
      // expect(response.body.products).to.be.an('array')

      // TODO: Check dat er producten zijn
      // expect(response.body.products).to.have.length.greaterThan(0)
    });
  });

  /**
   * TEST 11.3: Product eigenschappen valideren
   *
   * TODO: Valideer dat elk product de juiste properties heeft
   */
  it('should validate product properties', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      const firstProduct = response.body.products[0];

      // TODO: Check dat product de juiste properties heeft
      // expect(firstProduct).to.have.property('id')
      // expect(firstProduct).to.have.property('name')
      // expect(firstProduct).to.have.property('price')
      // expect(firstProduct).to.have.property('category')
      // expect(firstProduct).to.have.property('stock')
    });
  });

  /**
   * TEST 11.4: Users API request
   *
   * TODO: Haal users op en valideer
   */
  it('should fetch users from API', () => {
    // TODO: Maak GET request naar '/api/users.json'
    // cy.request('GET', '/api/users.json')

    // TODO: Valideer dat er users zijn
    // .then((response) => {
    //   expect(response.body.users).to.have.length.greaterThan(0)
    // })
  });

  /**
   * TEST 11.5: Orders API request
   *
   * TODO: Haal orders op en valideer
   */
  it('should fetch orders from API', () => {
    // TODO: Maak GET request naar '/api/orders.json'

    // TODO: Valideer response
  });

  /**
   * TEST 11.6: Specifiek product vinden
   *
   * TODO: Zoek een specifiek product in de response
   */
  it('should find a specific product', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      // TODO: Vind het product met naam 'Laptop'
      // const laptop = response.body.products.find(
      //   (p: { name: string }) => p.name.includes('Laptop')
      // );

      // TODO: Valideer dat het product gevonden is
      // expect(laptop).to.exist

      // TODO: Valideer de prijs
      // expect(laptop.price).to.be.greaterThan(1000)
    });
  });

  /**
   * TEST 11.7: Chaining met its()
   *
   * TODO: Gebruik .its() voor cleaner assertions
   */
  it('should use its() for clean assertions', () => {
    // TODO: Gebruik chaining met its()
    cy.request('GET', '/api/products.json')
      .its('status')
      .should('equal', 200);

    // TODO: Chain naar body.products.length
    // cy.request('GET', '/api/products.json')
    //   .its('body.products')
    //   .should('have.length.greaterThan', 0)
  });

  /**
   * TEST 11.8: Response headers valideren
   *
   * TODO: Controleer de response headers
   */
  it('should validate response headers', () => {
    cy.request('GET', '/api/products.json').then((response) => {
      // TODO: Check content-type header
      // expect(response.headers['content-type']).to.include('application/json')
    });
  });

  /**
   * BONUS: API data gebruiken in UI test
   *
   * TODO: Haal data op via API en valideer in UI
   */
  it('should use API data in UI test', () => {
    // Haal eerst product count op via API
    cy.request('GET', '/api/products.json').then((response) => {
      const apiProductCount = response.body.products.length;

      // Ga naar products pagina
      cy.visit('/products.html');

      // TODO: Controleer dat UI hetzelfde aantal producten toont
      // cy.get('[data-cy="product-card"]')
      //   .should('have.length', apiProductCount)
    });
  });
});
