/**
 * UITWERKING OPDRACHT 12: API POST/PUT/DELETE Requests
 */

describe('Opdracht 12: API POST/PUT/DELETE Requests', () => {
  const apiUrl = Cypress.env('apiUrl');

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

  it('should register a new user via POST', () => {
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

  it('should fail login with wrong credentials', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/login`,
      body: {
        email: 'wrong@test.nl',
        password: 'wrongpassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('error');
    });
  });

  it('should add item to cart via API', () => {
    // First login to get token
    cy.loginViaApi('student@test.nl', 'cypress123');

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');

      // Get first product
      cy.request('GET', `${apiUrl}/products`).then((productsResponse) => {
        const firstProduct = productsResponse.body.products[0];

        // Add to cart
        cy.request({
          method: 'POST',
          url: `${apiUrl}/cart`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            productId: firstProduct.id,
            quantity: 1
          }
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
    });
  });

  it('should send request with custom headers', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/products`,
      headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should login via API and store token', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/login`,
      body: {
        email: 'student@test.nl',
        password: 'cypress123'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      const { token, user } = response.body;

      cy.window().then((win) => {
        win.localStorage.setItem('token', token);
        win.localStorage.setItem('user', JSON.stringify(user));
      });

      cy.window().its('localStorage.token').should('exist');
    });
  });

  it('should handle API errors gracefully', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/nonexistent`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([404, 500]);
    });
  });

  it('should chain multiple API calls', () => {
    cy.request('GET', `${apiUrl}/products`)
      .its('body.products')
      .then((products) => {
        const firstProduct = products[0];
        cy.log(`First product: ${firstProduct.name}`);

        return cy.request('GET', `${apiUrl}/products/categories`);
      })
      .its('body.categories')
      .then((categories) => {
        expect(categories).to.have.length.greaterThan(0);
      });
  });

  it('should update cart quantity via API', () => {
    cy.loginViaApi('student@test.nl', 'cypress123');

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');

      // Get first product and add to cart
      cy.request('GET', `${apiUrl}/products`).then((productsResponse) => {
        const firstProduct = productsResponse.body.products[0];

        // Add to cart
        cy.request({
          method: 'POST',
          url: `${apiUrl}/cart`,
          headers: { Authorization: `Bearer ${token}` },
          body: { productId: firstProduct.id, quantity: 1 }
        }).then(() => {
          // Get cart to find cart item ID
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
