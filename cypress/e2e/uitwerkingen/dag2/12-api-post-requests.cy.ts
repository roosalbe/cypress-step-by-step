/**
 * UITWERKING OPDRACHT 12: API POST/PUT/DELETE Requests
 */

describe('Opdracht 12: API POST/PUT/DELETE Requests', () => {
  it('should create a new user via POST', () => {
    cy.request({
      method: 'POST',
      url: '/api/users.json',
      body: {
        username: 'newuser',
        email: 'newuser@test.nl',
        name: 'New User'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Response status: ' + response.status);
      // Static JSON files return 200 for GET
    });
  });

  it('should use simulated API for POST', () => {
    cy.visit('/');

    cy.window().then((win) => {
      // @ts-ignore
      return win.API.post('users', {
        username: 'testuser',
        email: 'test@test.nl'
      });
    }).then((result) => {
      expect(result).to.have.property('success', true);
      expect(result.data).to.have.property('id');
    });
  });

  it('should update a user via PUT', () => {
    cy.visit('/');

    cy.window().then((win) => {
      // @ts-ignore
      return win.API.put('users', 1, {
        name: 'Updated Name',
        email: 'updated@test.nl'
      });
    }).then((result) => {
      expect(result.success).to.be.true;
      expect(result.data.name).to.equal('Updated Name');
    });
  });

  it('should delete a user via DELETE', () => {
    cy.visit('/');

    cy.window().then((win) => {
      // @ts-ignore
      return win.API.delete('users', 1);
    }).then((result) => {
      expect(result.success).to.be.true;
      expect(result.id).to.equal(1);
    });
  });

  it('should send request with custom headers', () => {
    cy.request({
      method: 'GET',
      url: '/api/users.json',
      headers: {
        'Authorization': 'Bearer fake-token-123',
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should login via API and store token', () => {
    const mockLoginResponse = {
      success: true,
      token: 'jwt-token-123',
      user: { id: 1, username: 'student' }
    };

    cy.window().then((win) => {
      win.localStorage.setItem('authToken', mockLoginResponse.token);
      win.localStorage.setItem('currentUser', JSON.stringify(mockLoginResponse.user));
    });

    cy.window().its('localStorage.authToken').should('equal', 'jwt-token-123');
  });

  it('should handle API errors gracefully', () => {
    cy.request({
      method: 'GET',
      url: '/api/nonexistent.json',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it('should chain multiple API calls', () => {
    cy.request('GET', '/api/users.json')
      .its('body.users')
      .then((users) => {
        const firstUser = users[0];
        cy.log(`First user: ${firstUser.username}`);

        return cy.request('GET', '/api/orders.json');
      })
      .its('body.orders')
      .then((orders) => {
        expect(orders).to.have.length.greaterThan(0);
      });
  });

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
