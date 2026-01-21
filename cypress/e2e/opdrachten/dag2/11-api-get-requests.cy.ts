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
    // TODO: Maak een GET request naar '/api/products'
    // TODO: Controleer dat status 200 is
  });

  /**
   * TEST 11.2: Response body valideren
   *
   * TODO: Valideer de structuur van de response
   */
  it('should validate products response structure', () => {
    // TODO: Maak request en valideer body
    cy.request('GET', '/api/products').then((response) => {
      // TODO: Check dat response een products array (lijst met objecten) heeft
      // TODO: Check dat products een array (lijst met objecten) is
      // TODO: Check dat er producten zijn
    });
  });

  /**
   * TEST 11.3: Product eigenschappen valideren
   *
   * TODO: Valideer dat elk product de juiste properties heeft
   */
  it('should validate product properties', () => {
    cy.request('GET', '/api/products').then((response) => {
      const firstProduct = response.body.products[0];

      // TODO: Check dat product de juiste properties heeft
      // expect(firstProduct).to.have.property('id')
      // ..
      // ..
    });
  });

  /**
   * TEST 11.4: Users API request
   *
   * TODO: Haal users op en valideer
   */
  it('should fetch users from API', () => {
    // TODO: Maak GET request naar '/api/users'
    // TODO: Valideer dat er users zijn
  });

  /**
   * TEST 11.5: Orders API request
   *
   * TODO: Haal orders op en valideer
   */
  it('should fetch orders from API', () => {
    // TODO: Maak GET request naar '/api/orders'
    // TODO: Valideer response
  });

  /**
   * TEST 11.6: Specifiek product vinden
   *
   * TODO: Zoek een specifiek product in de response
   */
  it('should find a specific product', () => {
    cy.request('GET', '/api/products').then((response) => {
      // TODO: Vind het product met naam 'Laptop'
      // TODO: Valideer dat het product gevonden is
      // TODO: Valideer de prijs van het product
    });
  });

  /**
   * TEST 11.7: Chaining met its()
   *
   * TODO: Gebruik .its() voor cleaner assertions
   */
  it('should use its() for clean assertions', () => {
    // TODO: Gebruik chaining met its() om de status en body te valideren
    cy.request('GET', '/api/products')

    // TODO: Chain naar body.products.length
  });

  /**
   * TEST 11.8: Response headers valideren
   *
   * TODO: Controleer de response headers
   */
  it('should validate response headers', () => {
    cy.request('GET', '/api/products').then((response) => {
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
    cy.request('GET', '/api/products').then((response) => {
      const apiProductCount = response.body.products.length;

      // Ga naar products pagina
      cy.visit('/products');

      // TODO: Controleer dat UI hetzelfde aantal producten toont
      // cy.get('[data-cy="product-card"]') 
    });
  });
});
