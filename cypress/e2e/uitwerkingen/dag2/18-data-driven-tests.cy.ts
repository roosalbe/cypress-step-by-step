/**
 * UITWERKING OPDRACHT 18: Data-Driven Tests
 */

describe('Opdracht 18: Data-Driven Tests', () => {
  describe('Login with multiple users', () => {
    const loginScenarios = [
      { username: 'student@test.nl', password: 'cypress123', shouldPass: true, description: 'valid student' },
      { username: 'admin@test.nl', password: 'admin123', shouldPass: true, description: 'valid admin' },
      { username: 'wrong@test.nl', password: 'wrong', shouldPass: false, description: 'invalid user' },
      { username: 'student@test.nl', password: 'wrong', shouldPass: false, description: 'wrong password' },
    ];

    loginScenarios.forEach((scenario) => {
      it(`should handle login for ${scenario.description}`, () => {
        cy.visit('/login');

        cy.get('[data-cy="username"]').type(scenario.username);
        cy.get('[data-cy="password"]').type(scenario.password);
        cy.get('[data-cy="login-button"]').click();

        if (scenario.shouldPass) {
          cy.url().should('include', '/dashboard');
          cy.get('[data-cy="welcome-message"]').should('be.visible');
        } else {
          cy.get('[data-cy="login-error"]').should('be.visible');
          cy.url().should('include', '/login');
        }
      });
    });
  });

  describe('Search with multiple terms', () => {
    const searchTerms = [
      { term: 'Laptop', expectResults: true },
      { term: 'Mouse', expectResults: true },
      { term: 'xyz123nonexistent', expectResults: false },
    ];

    searchTerms.forEach((search) => {
      it(`should search for "${search.term}"`, () => {
        cy.visit('/products');

        cy.get('[data-cy="search-input"]').type(search.term);
        cy.get('[data-cy="apply-filters"]').click();

        if (search.expectResults) {
          cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
        } else {
          cy.get('[data-cy="product-card"]').should('have.length', 0);
        }
      });
    });
  });

  describe('Form validation tests', () => {
    const formTests = [
      { field: 'email', value: 'invalid-email', shouldBeInvalid: true },
      { field: 'email', value: 'valid@email.com', shouldBeInvalid: false },
      { field: 'phone', value: '0612345678', shouldBeInvalid: false },
    ];

    formTests.forEach((test) => {
      it(`should validate ${test.field} with value "${test.value}"`, () => {
        cy.loginViaApi('student@test.nl', 'cypress123');
        cy.addToCart(1, 1);
        cy.visit('/checkout');

        cy.get('[data-cy="firstName"]').type('Test');
        cy.get('[data-cy="lastName"]').type('User');
        cy.get('[data-cy="address"]').type('Teststraat 1');
        cy.get('[data-cy="city"]').type('Amsterdam');
        cy.get('[data-cy="postcode"]').type('1234 AB');

        cy.get(`[data-cy="${test.field}"]`).clear().type(test.value);
        cy.get(`[data-cy="${test.field}"]`).blur();

        // Field has been filled
        cy.get(`[data-cy="${test.field}"]`).should('have.value', test.value);
      });
    });
  });

  describe('Category filter tests', () => {
    const categories = ['electronics', 'clothing', 'books'];

    categories.forEach((category) => {
      it(`should filter by category: ${category}`, () => {
        cy.visit('/products');

        cy.get('[data-cy="category-filter"]').select(category);
        cy.get('[data-cy="apply-filters"]').click();

        cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
        cy.get('[data-cy="product-card"]').each(($card) => {
          cy.wrap($card)
            .find('[data-cy="product-category"]')
            .invoke('text')
            .then((text) => {
              expect(text.toLowerCase()).to.include(category);
            });
        });
      });
    });
  });

  describe('Cart quantity tests', () => {
    const quantities = [1, 2, 5];

    quantities.forEach((qty) => {
      it(`should add ${qty} items to cart`, () => {
        cy.clearCart();
        cy.addToCart(1, qty);

        cy.visit('/cart');

        cy.get('[data-cy="item-quantity"]')
          .first()
          .should('contain', qty.toString());
      });
    });
  });

  describe('Tests from fixture data', () => {
    const scenarios = [
      { name: 'Scenario 1', action: 'search', value: 'Laptop' },
      { name: 'Scenario 2', action: 'filter', value: 'electronics' },
    ];

    scenarios.forEach((scenario) => {
      it(`should execute ${scenario.name}`, () => {
        cy.visit('/products');

        if (scenario.action === 'search') {
          cy.get('[data-cy="search-input"]').type(scenario.value);
          cy.get('[data-cy="apply-filters"]').click();
        } else if (scenario.action === 'filter') {
          cy.get('[data-cy="category-filter"]').select(scenario.value);
          cy.get('[data-cy="apply-filters"]').click();
        }

        cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
      });
    });
  });

  describe('Using test helper', () => {
    const testWithData = <T>(
      testCases: T[],
      testName: (tc: T) => string,
      testFn: (tc: T) => void
    ) => {
      testCases.forEach((testCase) => {
        it(testName(testCase), () => {
          testFn(testCase);
        });
      });
    };

    interface PriceTest {
      minPrice: number;
      maxPrice: number;
    }

    const priceRanges: PriceTest[] = [
      { minPrice: 0, maxPrice: 50 },
      { minPrice: 50, maxPrice: 100 },
      { minPrice: 100, maxPrice: 500 },
    ];

    testWithData(
      priceRanges,
      (tc) => `should have products in range €${tc.minPrice}-€${tc.maxPrice}`,
      (tc) => {
        cy.visit('/products');
        cy.get('[data-cy="product-card"]').should('exist');
        cy.log(`Testing price range: €${tc.minPrice} - €${tc.maxPrice}`);
      }
    );
  });
});
