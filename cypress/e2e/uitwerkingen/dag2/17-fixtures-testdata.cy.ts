/**
 * UITWERKING OPDRACHT 17: Fixtures & Testdata
 */

describe('Opdracht 17: Fixtures & Testdata', () => {
  it('should load fixture data', () => {
    cy.fixture('users.json').then((data) => {
      cy.log('Users: ' + JSON.stringify(data.users.map((u: { username: string }) => u.username)));
      expect(data.users).to.have.length.greaterThan(0);
    });
  });

  it('should use fixture with alias', () => {
    cy.fixture('users.json').as('userData');

    cy.get('@userData').then((data: unknown) => {
      const users = data as { users: Array<{ username: string }> };
      const firstUser = users.users[0];
      cy.log(`First user: ${firstUser.username}`);
      expect(firstUser.username).to.exist;
    });
  });

  it('should use fixture for mocking', () => {
    cy.intercept('GET', '/api/products.json', {
      fixture: 'products.json'
    }).as('products');

    cy.visit('/products.html');

    cy.wait('@products');

    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  describe('Tests met fixture data', () => {
    interface User {
      username: string;
      password?: string;
      name: string;
      email: string;
    }

    let testUsers: User[];

    beforeEach(() => {
      cy.fixture('users.json').then((data: { users: User[] }) => {
        testUsers = data.users;
      });
    });

    it('should have access to fixture data', () => {
      expect(testUsers).to.have.length.greaterThan(0);
      cy.log(`Testing with ${testUsers.length} users`);
    });

    it('should use user from fixture for login', () => {
      const user = testUsers[0];
      cy.login(user.username, 'cypress123');
      cy.url().should('include', '/dashboard');
    });
  });

  it('should use fixture for form data', () => {
    cy.fixture('testdata.json').then((data) => {
      cy.loginViaApi('student');
      cy.addToCart(1, 1);
      cy.visit('/checkout.html');

      cy.get('[data-cy="firstName"]').type(data.checkoutForm.firstName);
      cy.get('[data-cy="lastName"]').type(data.checkoutForm.lastName);
      cy.get('[data-cy="email"]').type(data.checkoutForm.email);
      cy.get('[data-cy="phone"]').type(data.checkoutForm.phone);
      cy.get('[data-cy="address"]').type(data.checkoutForm.address);
      cy.get('[data-cy="postcode"]').type(data.checkoutForm.postcode);
      cy.get('[data-cy="city"]').type(data.checkoutForm.city);

      cy.get('[data-cy="firstName"]').should('have.value', data.checkoutForm.firstName);
    });
  });

  it('should generate dynamic test data', () => {
    const timestamp = Date.now();
    const testData = {
      username: `user_${timestamp}`,
      email: `test_${timestamp}@example.com`,
      orderId: Math.floor(Math.random() * 10000)
    };

    cy.log(`Generated user: ${testData.username}`);
    cy.log(`Generated email: ${testData.email}`);

    expect(testData.username).to.include('user_');
    expect(testData.email).to.include('@example.com');
  });

  it('should use environment variables', () => {
    const username = Cypress.env('testUser') || 'student';
    const password = Cypress.env('testPassword') || 'cypress123';

    cy.log(`Using user: ${username}`);

    cy.visit('/login.html');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');
  });

  it('should combine multiple fixtures', () => {
    cy.fixture('users.json').as('users');
    cy.fixture('products.json').as('products');

    cy.get('@users').then((users: unknown) => {
      cy.get('@products').then((products: unknown) => {
        const usersData = users as { users: Array<unknown> };
        const productsData = products as { products: Array<unknown> };

        cy.log('Users and products loaded');
        expect(usersData.users).to.exist;
        expect(productsData.products).to.exist;
      });
    });
  });

  it('should use test data factory pattern', () => {
    const createTestUser = (overrides = {}) => ({
      id: Date.now(),
      username: `test_${Date.now()}`,
      email: `test_${Date.now()}@test.nl`,
      name: 'Test User',
      ...overrides
    });

    const user1 = createTestUser({ name: 'Custom User 1' });
    const user2 = createTestUser({ name: 'Custom User 2' });

    cy.log(`Created users: ${user1.username}, ${user2.username}`);

    expect(user1.name).to.equal('Custom User 1');
    expect(user2.name).to.equal('Custom User 2');
    expect(user1.id).to.not.equal(user2.id);
  });
});
