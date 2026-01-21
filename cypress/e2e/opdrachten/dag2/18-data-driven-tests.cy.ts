/**
 * OPDRACHT 18: Data-Driven Tests
 *
 * Doel: Leer tests schrijven die met meerdere data sets werken
 *
 * In deze opdracht ga je:
 * 1. Dezelfde test met verschillende data uitvoeren
 * 2. Test scenarios uit fixtures laden
 * 3. Dynamische test generatie
 *
 * Bouwt voort op: Opdracht 17
 * Tijd: ~25 minuten
 */

describe('Opdracht 18: Data-Driven Tests', () => {
  /**
   * TEST 18.1: Test met array van data
   *
   * TODO: Voer dezelfde test uit met meerdere datasets
   */
  describe('Login with multiple users', () => {
    const loginScenarios = [
      { username: 'student', password: 'cypress123', shouldPass: true, description: 'valid student' },
      { username: 'admin', password: 'admin123', shouldPass: true, description: 'valid admin' },
      { username: 'wrong', password: 'wrong', shouldPass: false, description: 'invalid user' },
      { username: 'student', password: 'wrong', shouldPass: false, description: 'wrong password' },
    ];

    // TODO: Genereer tests voor elk scenario

  });

  /**
   * TEST 18.2: Product search tests
   *
   * TODO: Test zoekfunctie met meerdere termen
   */
  describe('Search with multiple terms', () => {
    const searchTerms = [
      { term: 'Laptop', expectResults: true },
      { term: 'Mouse', expectResults: true },
      { term: 'xyz123nonexistent', expectResults: false },
      { term: 'electronics', expectResults: true },
    ];

    searchTerms.forEach((search) => {
      it(`should search for "${search.term}"`, () => {
        cy.visit('/products.html');

        cy.get('[data-cy="search-input"]').type(search.term);
        cy.wait(500);

        if (search.expectResults) {
          // TODO: Check dat er resultaten zijn
        } else {
          // TODO: Check geen resultaten

        }
      });
    });
  });

  /**
   * TEST 18.3: Form validatie tests
   *
   * TODO: Test formulier validatie met verschillende inputs
   */
  describe('Form validation tests', () => {
    const formTests = [
      { field: 'email', value: 'invalid-email', shouldBeInvalid: true },
      { field: 'email', value: 'valid@email.com', shouldBeInvalid: false },
      { field: 'phone', value: '123', shouldBeInvalid: true },
      { field: 'phone', value: '0612345678', shouldBeInvalid: false },
    ];

    formTests.forEach((test) => {
      it(`should validate ${test.field} with value "${test.value}"`, () => {

      });
    });
  });

  /**
   * TEST 18.4: Category filter tests
   *
   * TODO: Test alle categorieën
   */
  describe('Category filter tests', () => {
    const categories = ['electronics', 'clothing', 'books', 'accessories', 'furniture'];

    categories.forEach((category) => {
      it(`should filter by category: ${category}`, () => {
        cy.visit('/products.html');

        cy.get('[data-cy="category-filter"]').select(category);
        cy.wait(500);

        // TODO: Check dat alle getoonde producten de juiste categorie hebben
        cy.get('[data-cy="product-card"]').each(($card) => {
          cy.wrap($card)
            .find('[data-cy="product-category"]')
            .should('contain', category);
        });
      });
    });
  });

  /**
   * TEST 18.5: Cart quantity tests
   *
   * TODO: Test verschillende hoeveelheden
   */
  describe('Cart quantity tests', () => {
    const quantities = [1, 2, 5, 10];

    quantities.forEach((qty) => {
      it(`should add ${qty} items to cart`, () => {
        // Clear Cart
        // Add to Cart
        // Assert
      });
    });
  });

  /**
   * TEST 18.6: Data uit fixture
   *
   * TODO: Laad test scenarios uit een fixture
   */
  describe('Tests from fixture data', () => {
    // In een echte situatie zou je dit doen:
    // const scenarios = require('../fixtures/testScenarios.json');

    // Voor nu gebruiken we inline data
    const scenarios = [
      { name: 'Scenario 1', action: 'search', value: 'Laptop' },
      { name: 'Scenario 2', action: 'filter', value: 'electronics' },
    ];

    scenarios.forEach((scenario) => {
      it(`should execute ${scenario.name}`, () => {
        cy.visit('/products.html');

        // TODO zorg dat beide scenarios werken
      });
    });
  });

});
