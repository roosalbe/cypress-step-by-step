/**
 * OPDRACHT 8: Product & Cart Flow
 *
 * Doel: Test de complete product browse en winkelwagen flow
 *
 * In deze opdracht ga je:
 * 1. Producten zoeken en filteren
 * 2. Producten toevoegen aan winkelwagen
 * 3. Winkelwagen beheren
 *
 * Bouwt voort op: Opdracht 7
 * Tijd: ~25 minuten
 */

describe('Opdracht 8: Product & Cart Flow', () => {
  beforeEach(() => {
    // Login via localStorage (sneller dan UI)
    cy.loginViaApi('student');
  });

  /**
   * TEST 8.1: Bekijk alle producten
   *
   * TODO: Controleer dat producten geladen worden
   */
  it('should display all products', () => {
    cy.visit('/products.html');

    // TODO: Controleer dat er product cards zijn
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0);

    // TODO: Controleer dat elk product een naam en prijs heeft
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="product-name"]').should('be.visible');
      cy.get('[data-cy="product-price"]').should('be.visible');
    });
  });

  /**
   * TEST 8.2: Zoek naar product
   *
   * TODO: Test de zoekfunctionaliteit
   */
  it('should search for products', () => {
    cy.visit('/products.html');

    // TODO: Zoek naar "Laptop"
    cy.get('[data-cy="search-input"]').type('Laptop');

    // Wacht op debounce
    cy.wait(500);

    // TODO: Controleer dat zoekresultaten "Laptop" bevatten
    cy.get('[data-cy="product-card"]')
      .should('have.length.greaterThan', 0)
      .first()
      .should('contain', 'Laptop');
  });

  /**
   * TEST 8.3: Filter op categorie
   *
   * TODO: Test het categorie filter
   */
  it('should filter by category', () => {
    cy.visit('/products.html');

    // TODO: Selecteer "electronics" categorie
    cy.get('[data-cy="category-filter"]').select('electronics');

    cy.wait(500);

    // TODO: Controleer dat alle producten "electronics" categorie hebben
    cy.get('[data-cy="product-card"]').each(($card) => {
      cy.wrap($card)
        .find('[data-cy="product-category"]')
        .should('contain', 'electronics');
    });
  });

  /**
   * TEST 8.4: Sorteer producten
   *
   * TODO: Test de sorteer functionaliteit
   */
  it('should sort products by price', () => {
    cy.visit('/products.html');

    // TODO: Sorteer op prijs (laag naar hoog)
    cy.get('[data-cy="sort-select"]').select('price-asc');

    cy.wait(500);

    // TODO: Controleer dat producten gesorteerd zijn
    // Hint: Vergelijk de eerste en laatste prijs
    cy.get('[data-cy="product-price"]').first().invoke('text').then((firstPrice) => {
      cy.get('[data-cy="product-price"]').last().invoke('text').then((lastPrice) => {
        // Parse prijzen en vergelijk
        const first = parseFloat(firstPrice.replace('€', '').replace(',', '.'));
        const last = parseFloat(lastPrice.replace('€', '').replace(',', '.'));
        expect(first).to.be.at.most(last);
      });
    });
  });

  /**
   * TEST 8.5: Voeg product toe aan winkelwagen
   *
   * TODO: Test het toevoegen van product aan cart
   */
  it('should add product to cart', () => {
    cy.visit('/products.html');

    // TODO: Klik op "In winkelwagen" bij eerste product
    cy.get('[data-cy="add-to-cart"]').first().click();

    // TODO: Controleer dat cart count bijgewerkt is
    cy.get('[data-cy="cart-count"]')
      .should('be.visible')
      .and('contain', '1');
  });

  /**
   * TEST 8.6: Bekijk winkelwagen
   *
   * TODO: Ga naar de winkelwagen en controleer de inhoud
   */
  it('should view cart with added product', () => {
    // Voeg eerst een product toe via localStorage
    cy.addToCart(1, 1); // Product ID 1

    cy.visit('/cart.html');

    // TODO: Controleer dat er items in de cart zijn
    cy.get('[data-cy="cart-item"]').should('have.length.greaterThan', 0);

    // TODO: Controleer dat het totaalbedrag zichtbaar is
    cy.get('[data-cy="cart-total"]').should('be.visible');
  });

  /**
   * TEST 8.7: Wijzig hoeveelheid in cart
   *
   * TODO: Test het wijzigen van quantity
   */
  it('should update product quantity in cart', () => {
    cy.addToCart(1, 1);
    cy.visit('/cart.html');

    // TODO: Klik op de + button om quantity te verhogen
    cy.get('[data-cy="increase-quantity"]').first().click();

    // TODO: Controleer dat quantity nu 2 is
    cy.get('[data-cy="item-quantity"]').first().should('contain', '2');
  });

  /**
   * TEST 8.8: Verwijder product uit cart
   *
   * TODO: Test het verwijderen van een product
   */
  it('should remove product from cart', () => {
    cy.addToCart(1, 1);
    cy.visit('/cart.html');

    // Controleer dat item aanwezig is
    cy.get('[data-cy="cart-item"]').should('have.length', 1);

    // TODO: Klik op verwijder button
    cy.get('[data-cy="remove-item"]').first().click();

    // TODO: Controleer dat cart leeg is
    cy.get('[data-cy="empty-cart"]').should('be.visible');
  });

  /**
   * TEST 8.9: Bekijk product detail
   *
   * TODO: Navigeer naar product detail pagina
   */
  it('should view product details', () => {
    cy.visit('/products.html');

    // TODO: Klik op "Bekijk" bij eerste product
    cy.get('[data-cy="view-product"]').first().click();

    // TODO: Controleer dat we op detail pagina zijn
    cy.url().should('include', '/product-detail.html');

    // TODO: Controleer dat product info zichtbaar is
    cy.get('[data-cy="product-name"]').should('be.visible');
    cy.get('[data-cy="product-price"]').should('be.visible');
    cy.get('[data-cy="product-description"]').should('be.visible');
  });

  /**
   * BONUS: Complete shopping flow
   *
   * TODO: Test de complete flow van zoeken tot checkout
   */
  it('should complete full shopping flow', () => {
    // 1. Ga naar producten
    cy.visit('/products.html');

    // 2. Zoek product
    cy.get('[data-cy="search-input"]').type('Mouse');
    cy.wait(500);

    // 3. Voeg toe aan cart
    cy.get('[data-cy="add-to-cart"]').first().click();

    // 4. Ga naar cart
    cy.get('[data-cy="nav-cart"]').click();

    // 5. Verify cart
    cy.get('[data-cy="cart-item"]').should('have.length.greaterThan', 0);

    // 6. Ga naar checkout
    cy.get('[data-cy="checkout-button"]').click();

    // 7. Verify checkout pagina
    cy.url().should('include', '/checkout.html');
    cy.get('[data-cy="checkout-form"]').should('be.visible');
  });
});
