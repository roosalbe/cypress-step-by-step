/**
 * OPDRACHT 12: API POST/PUT/DELETE Requests
 *
 * Doel: Leer data manipulatie via API calls
 *
 * In deze opdracht ga je:
 * 1. POST requests maken
 * 2. PUT requests voor updates
 * 3. Request body meesturen
 *
 * Bouwt voort op: Opdracht 11
 * Tijd: ~25 minuten
 */

const apiUrl = Cypress.env('apiUrl');

describe('Opdracht 12: API POST/PUT/DELETE Requests', () => {
  /**
   * TEST 12.1: POST request - Nieuwe user aanmaken
   *
   * TODO: Maak een POST request om een user aan te maken
   */
  const apiUrl = Cypress.env('apiUrl');

  it.only('should register a new user via POST', () => {
    const uniqueEmail = `testuser_${Date.now()}@test.nl`;

    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/register`,
      body: {
        name: 'Test User',
        email: uniqueEmail,
        password: 'test123'
      }
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('token');
      expect(response.body.user).to.have.property('email', uniqueEmail);
    });
  });

  /**
 * TEST 12.1: POST request - Login via de API
 *
 * TODO: Maak een POST request in te loggen via de API 
 */
  it.only('should login via API and get token', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/login`,
      body: {
        email: 'student@test.nl',
        password: 'cypress123'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('user');
      expect(response.body.user).to.have.property('email', 'student@test.nl');
    });
  });

  /**
 * TEST 12.3: POST request - Login via API and sla token op
 *
 * TODO: Maak een POST request in te loggen via de API en valideer inlog
 */
  it('should login via API and store token', () => {
    // Eerst een pagina bezoeken zodat window/localStorage beschikbaar is
    cy.visit('/');

    // Dan request uitvoeren
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/auth/login`,
      body: { email: 'student@test.nl', password: 'cypress123' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const { token, user } = response.body;

      // Token wordt toegevoegd aan de localstorage van de browser
      cy.window().then((win) => {
        // win.localStorage.setItem('token', token);
        // win.localStorage.setItem('user', JSON.stringify(user));
      });
    });

    // Verifieer dat we ingelogd zijn
    cy.visit('/dashboard');
    cy.get('[data-cy="welcome-message"]').should('be.visible');
  });

  it('should fail login with wrong credentials', () => {
    //TODO: Maak een request die controleert of er een foutmelding is
  });

  it('should add item to cart via API', () => {
    //TODO: First login to get token


    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');

      // 1. Get first productid by calling /products and filter for a product
      // 2. Add productId to cart by POST to /cart
      // TIP: dont forget to add the Authorisationtoken
      //       headers: {
      //   Authorization: `Bearer ${token}`
      // },

    });
  });

  /**
   * TEST 12.7: Error handling
   *
   * TODO: Test hoe je omgaat met API errors
   */
  it('should handle API errors gracefully', () => {
    // Request naar niet-bestaande endpoint
    cy.request({
      method: 'GET',
      url: '/api/nonexistent.json',
      failOnStatusCode: false // Belangrijk!
    }).then((response) => {
      // TODO: Check dat we een 404 krijgen
    });
  });


  /**
 * TEST 12.8: Beschrijf de onderstaande code
 *
 * TODO: Kijk naar onderstaande code en probeer via comments
 * te beschrijven wat de code doet.
 * 
 */
  it('should update cart quantity via API', () => {
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');

      cy.request('GET', `${apiUrl}/products`).then((productsResponse) => {
        const firstProduct = productsResponse.body.products[0];

        cy.request({
          method: 'POST',
          url: `${apiUrl}/cart`,
          headers: { Authorization: `Bearer ${token}` },
          body: { productId: firstProduct.id, quantity: 1 }
        }).then(() => {
          cy.request({
            method: 'GET',
            url: `${apiUrl}/cart`,
            headers: { Authorization: `Bearer ${token}` }
          }).then((cartResponse) => {
            expect(cartResponse.body.cart.items).to.have.length.greaterThan(0);
          });
        });
      });
    });
  });
});
