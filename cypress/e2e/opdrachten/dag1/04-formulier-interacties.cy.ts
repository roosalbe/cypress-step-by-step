/**
 * OPDRACHT 4: Formulier Interacties
 *
 * Doel: Leer werken met formulieren, inputs en user interactions
 *
 * In deze opdracht ga je:
 * 1. Tekst invoeren in input velden
 * 2. Selectboxen en checkboxen gebruiken
 * 3. Formulieren submitten
 *
 * Bouwt voort op: Opdracht 3
 * Tijd: ~25 minuten
 */

describe('Opdracht 4: Formulier Interacties', () => {
  /**
   * TEST 4.1: Type in een input veld
   *
   * TODO: Voer tekst in de zoekbalk in
   */
  it('should type in search input', () => {
    cy.visit('/products.html');

    // TODO: Type "Laptop" in de zoekbalk
    // cy.get('[data-cy="search-input"]').type('Laptop')

    // TODO: Controleer dat de input nu "Laptop" als value heeft
    // cy.get('[data-cy="search-input"]').should('have.value', 'Laptop')
  });

  /**
   * TEST 4.2: Clear en type
   *
   * TODO: Maak een input leeg en type nieuwe tekst
   */
  it('should clear and type new text', () => {
    cy.visit('/products.html');

    // TODO: Type eerst "Test" in de zoekbalk
    // cy.get('[data-cy="search-input"]').type('Test')

    // TODO: Clear de input en type "Keyboard"
    // cy.get('[data-cy="search-input"]').clear().type('Keyboard')

    // TODO: Controleer de nieuwe waarde
    // cy.get('[data-cy="search-input"]').should('have.value', 'Keyboard')
  });

  /**
   * TEST 4.3: Werken met select dropdown
   *
   * TODO: Selecteer een optie uit een dropdown
   */
  it('should select from dropdown', () => {
    cy.visit('/products.html');

    // TODO: Selecteer "electronics" uit de category filter
    // cy.get('[data-cy="category-filter"]').select('electronics')

    // TODO: Controleer dat de juiste optie geselecteerd is
    // cy.get('[data-cy="category-filter"]').should('have.value', 'electronics')
  });

  /**
   * TEST 4.4: Werken met checkbox
   *
   * TODO: Check en uncheck een checkbox
   */
  it('should check and uncheck checkbox', () => {
    cy.visit('/products.html');

    // TODO: Check de "Alleen op voorraad" checkbox
    // cy.get('[data-cy="in-stock-filter"]').check()

    // TODO: Controleer dat de checkbox checked is
    // cy.get('[data-cy="in-stock-filter"]').should('be.checked')

    // TODO: Uncheck de checkbox
    // cy.get('[data-cy="in-stock-filter"]').uncheck()

    // TODO: Controleer dat de checkbox niet meer checked is
    // cy.get('[data-cy="in-stock-filter"]').should('not.be.checked')
  });

  /**
   * TEST 4.5: Login formulier invullen
   *
   * TODO: Vul het login formulier in
   */
  it('should fill login form', () => {
    cy.visit('/login.html');

    // TODO: Vul de username in
    // cy.get('[data-cy="username"]').type('student')

    // TODO: Vul het wachtwoord in
    // cy.get('[data-cy="password"]').type('cypress123')

    // TODO: Check de "Remember me" checkbox
    // cy.get('[data-cy="remember-me"]').check()

    // TODO: Controleer dat alle velden correct zijn ingevuld
    // cy.get('[data-cy="username"]').should('have.value', 'student')
    // cy.get('[data-cy="password"]').should('have.value', 'cypress123')
    // cy.get('[data-cy="remember-me"]').should('be.checked')
  });

  /**
   * TEST 4.6: Submit een formulier
   *
   * TODO: Submit het login formulier en controleer het resultaat
   */
  it('should submit login form', () => {
    cy.visit('/login.html');

    // TODO: Vul credentials in en klik op de login button
    // cy.get('[data-cy="username"]').type('student')
    // cy.get('[data-cy="password"]').type('cypress123')
    // cy.get('[data-cy="login-button"]').click()

    // TODO: Controleer dat je doorgestuurd wordt naar dashboard
    // cy.url().should('include', '/dashboard')
  });

  /**
   * TEST 4.7: Speciale toetsen gebruiken
   *
   * TODO: Gebruik speciale toetsen in je input
   */
  it('should use special keys', () => {
    cy.visit('/login.html');

    // TODO: Type username en druk op Tab om naar password te gaan
    // cy.get('[data-cy="username"]').type('student{tab}')

    // TODO: Type password en druk op Enter om te submitten
    // cy.get('[data-cy="password"]').type('cypress123{enter}')

    // TODO: Controleer de navigatie
    // cy.url().should('include', '/dashboard')
  });

  /**
   * BONUS: Newsletter formulier
   *
   * TODO: Test het nieuwsbrief formulier op de homepage
   */
  it('should submit newsletter form', () => {
    cy.visit('/');

    // TODO: Vul een email adres in
    // cy.get('[data-cy="newsletter-email"]').type('test@test.nl')

    // TODO: Klik op aanmelden
    // cy.get('[data-cy="newsletter-submit"]').click()

    // TODO: Controleer dat de success message verschijnt
    // cy.get('[data-cy="newsletter-success"]').should('be.visible')
  });
});
