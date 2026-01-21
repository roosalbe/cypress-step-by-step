/**
 * OPDRACHT 12: API POST/PUT/DELETE Requests
 *
 * Doel: Leer data manipulatie via API calls
 *
 * In deze opdracht ga je:
 * 1. POST requests maken
 * 2. PUT requests voor updates
 * 3. DELETE requests
 * 4. Request body meesturen
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
  it('should register a new user via POST', () => {
    const uniqueEmail = `testuser_${Date.now()}@test.nl`;

    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/register`,
      body: {
        name: '',
        email: '',
        password: ''
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
    it('should login via API and get token', () => {
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
  it.only('should login via API and store token', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email: "student@test.nl", password: "cypress123" },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const { token, user } = response.body;

    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user', JSON.stringify(user));
    });
  });

    cy.visit("/")
  });

  /**
   * TEST 12.2: Simuleer POST met window.API
   *
   * TODO: Gebruik de gesimuleerde API in de demo app
   */
  it('should use simulated API for POST', () => {
    cy.visit('/');

    // De demo app heeft een window.API object
    cy.window().then((win) => {
      // TODO: Gebruik de gesimuleerde POST
      // @ts-ignore
      return win.API.post('users', {
        username: 'testuser',
        email: 'test@test.nl'
      });
    }).then((result) => {
      // TODO: Valideer het resultaat
      // expect(result).to.have.property('success', true)
      // expect(result.data).to.have.property('id')
    });
  });

  /**
   * TEST 12.3: PUT request - User updaten
   *
   * TODO: Maak een PUT request om een user te updaten
   */
  it('should update a user via PUT', () => {
    cy.visit('/');

    cy.window().then((win) => {
      // TODO: Gebruik de gesimuleerde PUT
      // @ts-ignore
      return win.API.put('users', 1, {
        name: 'Updated Name',
        email: 'updated@test.nl'
      });
    }).then((result) => {
      // TODO: Valideer dat update succesvol was
      // expect(result.success).to.be.true
      // expect(result.data.name).to.equal('Updated Name')
    });
  });

  /**
   * TEST 12.4: DELETE request
   *
   * TODO: Maak een DELETE request
   */
  it('should delete a user via DELETE', () => {
    cy.visit('/');

    cy.window().then((win) => {
      // TODO: Gebruik de gesimuleerde DELETE
      // @ts-ignore
      return win.API.delete('users', 1);
    }).then((result) => {
      // TODO: Valideer dat delete succesvol was
      // expect(result.success).to.be.true
      // expect(result.id).to.equal(1)
    });
  });

  /**
   * TEST 12.5: Request met headers
   *
   * TODO: Maak een request met custom headers
   */
  it('should send request with custom headers', () => {
    // TODO: Maak request met Authorization header
    cy.request({
      method: 'GET',
      url: '/api/users.json',
      headers: {
        'Authorization': 'Bearer fake-token-123',
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value'
      }
    }).then((response) => {
      // Request is succesvol (headers worden gestuurd maar niet gevalideerd door static JSON)
      expect(response.status).to.equal(200);
    });
  });

  /**
   * TEST 12.6: Login flow via API
   *
   * TODO: Simuleer een login via API en sla token op
   */
  it('should login via API and store token', () => {
    // Simuleer login response
    const mockLoginResponse = {
      success: true,
      token: 'jwt-token-123',
      user: { id: 1, username: 'student' }
    };

    // TODO: Sla token op in localStorage
    cy.window().then((win) => {
      // Simuleer wat je zou doen na een echte login API call
      win.localStorage.setItem('authToken', mockLoginResponse.token);
      win.localStorage.setItem('currentUser', JSON.stringify(mockLoginResponse.user));
    });

    // TODO: Verify dat data opgeslagen is
    // cy.window().its('localStorage.authToken').should('equal', 'jwt-token-123')
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
      // expect(response.status).to.equal(404)
    });
  });

  /**
   * TEST 12.8: Chained API calls
   *
   * TODO: Maak meerdere API calls achter elkaar
   */
  it('should chain multiple API calls', () => {
    // TODO: Haal eerst users op
    cy.request('GET', '/api/users.json')
      .its('body.users')
      .then((users) => {
        // TODO: Gebruik data van eerste call in tweede call
        const firstUser = users[0];
        cy.log(`First user: ${firstUser.username}`);

        // TODO: Haal nu orders op
        return cy.request('GET', '/api/orders.json');
      })
      .its('body.orders')
      .then((orders) => {
        // TODO: Valideer orders
        // expect(orders).to.have.length.greaterThan(0)
      });
  });

  /**
   * BONUS: Complete CRUD flow
   *
   * TODO: Simuleer een complete Create-Read-Update-Delete flow
   */
  it('should perform complete CRUD operations', () => {
    cy.visit('/');

    cy.window().then(async (win) => {
      // @ts-ignore
      const api = win.API;

      // CREATE
      const createResult = await api.post('products', {
        name: 'Test Product',
        price: 99.99
      });
      expect(createResult.success).to.be.true;
      const productId = createResult.data.id;

      // READ (via gewone request)
      // In echte app zou je hier GET /products/:id doen

      // UPDATE
      const updateResult = await api.put('products', productId, {
        name: 'Updated Product',
        price: 149.99
      });
      expect(updateResult.success).to.be.true;

      // DELETE
      const deleteResult = await api.delete('products', productId);
      expect(deleteResult.success).to.be.true;
    });
  });
});
