/**
 * OPDRACHT 17: Fixtures & Testdata
 *
 * Doel: Leer testdata beheren met fixtures
 *
 * In deze opdracht ga je:
 * 1. Fixtures laden en gebruiken
 * 2. Test data organiseren
 * 3. Fixtures gebruiken voor mocking
 *
 * Bouwt voort op: Opdracht 16
 * Tijd: ~25 minuten
 */

describe('Opdracht 17: Fixtures & Testdata', () => {
  /**
   * TEST 17.1: Laad een fixture
   *
   * TODO: Laad een fixture file en gebruik de data
   */
  it('should load fixture data', () => {
    // TODO: Laad de users fixture
    cy.fixture('users.json').then((data) => {
      // TODO: Log de data
      // cy.log('Users: ' + JSON.stringify(data));

      // TODO: Check dat data geladen is
      // expect(data.users).to.have.length.greaterThan(0);
    });
  });

  /**
   * TEST 17.2: Gebruik fixture met alias
   *
   * TODO: Gebruik as() om fixture beschikbaar te maken
   */
  it('should use fixture with alias', () => {
    // TODO: Laad fixture met alias
    cy.fixture('users.json').as('userData');

    // TODO: Gebruik de alias
    cy.get('@userData').then((data: unknown) => {
      const users = data as { users: Array<{ username: string }> };
      const firstUser = users.users[0];
      cy.log(`First user: ${firstUser.username}`);
    });
  });

  /**
   * TEST 17.3: Fixture voor mock response
   *
   * TODO: Gebruik fixture als mock data
   */
  it('should use fixture for mocking', () => {
    // TODO: Mock met fixture
    cy.intercept('GET', '/api/products.json', {
      fixture: 'products.json'
    }).as('products');

    cy.visit('/products.html');

    cy.wait('@products');

    // TODO: Verify products geladen zijn
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  /**
   * TEST 17.4: Fixture in beforeEach
   *
   * TODO: Laad fixture data voor alle tests
   */
  describe('Tests met fixture data', () => {
    // Declareer type voor testUsers
    interface User {
      username: string;
      password?: string;
      name: string;
      email: string;
    }

    let testUsers: User[];

    beforeEach(() => {
      // TODO: Laad fixture voor alle tests
      cy.fixture('users.json').then((data: { users: User[] }) => {
        testUsers = data.users;
      });
    });

    it('should have access to fixture data', () => {
      // TODO: Gebruik testUsers
      // expect(testUsers).to.have.length.greaterThan(0);
      // cy.log(`Testing with ${testUsers.length} users`);
    });

    it('should use user from fixture for login', () => {
      // TODO: Login met user uit fixture
      // const user = testUsers[0];
      // cy.login(user.username, 'cypress123');
    });
  });

  /**
   * TEST 17.5: Fixture voor form data
   *
   * TODO: Gebruik fixture voor formulier test data
   */
  it('should use fixture for form data', () => {
    cy.fixture('testdata.json').then((data) => {
      cy.loginViaApi('student');
      cy.addToCart(1, 1);
      cy.visit('/checkout.html');

      // TODO: Vul formulier met fixture data
      // cy.get('[data-cy="firstName"]').type(data.checkoutForm.firstName);
      // cy.get('[data-cy="lastName"]').type(data.checkoutForm.lastName);
      // cy.get('[data-cy="email"]').type(data.checkoutForm.email);
    });
  });

  /**
   * TEST 17.6: Dynamische fixture data
   *
   * TODO: Genereer test data dynamisch
   */
  it('should generate dynamic test data', () => {
    // Genereer unieke data
    const timestamp = Date.now();
    const testData = {
      username: `user_${timestamp}`,
      email: `test_${timestamp}@example.com`,
      orderId: Math.floor(Math.random() * 10000)
    };

    cy.log(`Generated user: ${testData.username}`);
    cy.log(`Generated email: ${testData.email}`);

    // TODO: Gebruik dynamische data in test
    cy.visit('/login.html');
    // Deze user bestaat niet, maar we kunnen de data wel gebruiken
  });

  /**
   * TEST 17.7: Environment variables als test data
   *
   * TODO: Gebruik Cypress.env() voor test data
   */
  it('should use environment variables', () => {
    // TODO: Haal credentials uit env
    const username = Cypress.env('testUser') || 'student';
    const password = Cypress.env('testPassword') || 'cypress123';

    cy.log(`Using user: ${username}`);

    // TODO: Login met env credentials
    cy.visit('/login.html');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/dashboard');
  });

  /**
   * TEST 17.8: Meerdere fixtures combineren
   *
   * TODO: Laad en combineer meerdere fixtures
   */
  it('should combine multiple fixtures', () => {
    // TODO: Laad meerdere fixtures
    cy.fixture('users.json').as('users');
    cy.fixture('products.json').as('products');

    // TODO: Combineer de data
    cy.get('@users').then((users) => {
      cy.get('@products').then((products) => {
        // Nu heb je toegang tot beide
        cy.log('Users and products loaded');
        // expect(users.users).to.exist;
        // expect(products.products).to.exist;
      });
    });
  });

  /**
   * BONUS: Maak een test data factory
   *
   * TODO: Maak een helper functie voor test data
   */
  it('should use test data factory pattern', () => {
    // Factory functie
    const createTestUser = (overrides = {}) => ({
      id: Date.now(),
      username: `test_${Date.now()}`,
      email: `test_${Date.now()}@test.nl`,
      name: 'Test User',
      ...overrides
    });

    // Genereer test users
    const user1 = createTestUser({ name: 'Custom User 1' });
    const user2 = createTestUser({ name: 'Custom User 2' });

    cy.log(`Created users: ${user1.username}, ${user2.username}`);

    expect(user1.name).to.equal('Custom User 1');
    expect(user2.name).to.equal('Custom User 2');
  });
});
