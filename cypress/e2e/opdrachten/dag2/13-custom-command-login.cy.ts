/**
 * OPDRACHT 13: Custom Command - Login
 *
 * Doel: Maak een herbruikbaar login command
 *
 * In deze opdracht ga je:
 * 1. Een login command maken in commands.ts
 * 2. Type declarations toevoegen
 * 3. Het command gebruiken in tests
 *
 * Bouwt voort op: Opdracht 12
 * Tijd: ~25 minuten
 */

/**
 * STAP 1: Voeg dit toe aan cypress/support/commands.ts
 *
 * Zoek de sectie "OPDRACHT SECTIE" en voeg daar toe:
 *
 * ```typescript
 * // Opdracht 13: Login command via UI
 * Cypress.Commands.add('loginUI', (username: string, password: string) => {
 *   cy.visit('/login.html');
 *   cy.get('[data-cy="username"]').type(username);
 *   cy.get('[data-cy="password"]').type(password);
 *   cy.get('[data-cy="login-button"]').click();
 *   cy.url().should('include', '/dashboard');
 * });
 *
 * // Opdracht 13: Login command via localStorage (snel)
 * Cypress.Commands.add('loginFast', (userType: 'student' | 'admin' | 'tester') => {
 *   const users = {
 *     student: { id: 1, username: 'student', name: 'Student User', email: 'student@test.nl' },
 *     admin: { id: 2, username: 'admin', name: 'Admin User', email: 'admin@test.nl', role: 'admin' },
 *     tester: { id: 3, username: 'tester', name: 'Test User', email: 'tester@test.nl' }
 *   };
 *
 *   cy.window().then((win) => {
 *     win.localStorage.setItem('currentUser', JSON.stringify(users[userType]));
 *   });
 * });
 * ```
 */

/**
 * STAP 2: Voeg dit toe aan cypress/support/index.d.ts
 *
 * Voeg toe binnen de Chainable interface:
 *
 * ```typescript
 * loginUI(username: string, password: string): Chainable<void>;
 * loginFast(userType: 'student' | 'admin' | 'tester'): Chainable<void>;
 * ```
 */

describe('Opdracht 13: Custom Command - Login', () => {
  /**
   * TEST 13.1: Gebruik bestaand login command
   *
   * Het login command bestaat al in commands.ts
   */
  it('should use existing login command', () => {
    // Dit command bestaat al
    cy.login('student', 'cypress123');

    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Student');
  });

  /**
   * TEST 13.2: Gebruik loginViaApi command
   *
   * Dit command logt in via localStorage (sneller)
   */
  it('should use loginViaApi command', () => {
    // Dit command bestaat al
    cy.loginViaApi('student');

    cy.visit('/dashboard.html');
    cy.get('[data-cy="welcome-message"]').should('contain', 'Student');
  });

  /**
   * TEST 13.3: Test je eigen loginUI command
   *
   * TODO: Test het loginUI command dat je hebt toegevoegd
   */
  it('should use custom loginUI command', () => {
    // TODO: Uncomment als je het command hebt toegevoegd
    // cy.loginUI('student', 'cypress123');

    // Tijdelijk: gebruik bestaand command
    cy.login('student', 'cypress123');

    cy.url().should('include', '/dashboard');
  });

  /**
   * TEST 13.4: Test je eigen loginFast command
   *
   * TODO: Test het loginFast command dat je hebt toegevoegd
   */
  it('should use custom loginFast command', () => {
    // TODO: Uncomment als je het command hebt toegevoegd
    // cy.loginFast('admin');

    // Tijdelijk: gebruik bestaand command
    cy.loginViaApi('admin');

    cy.visit('/dashboard.html');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  /**
   * TEST 13.5: Vergelijk snelheid UI vs API login
   *
   * TODO: Meet het verschil in snelheid
   */
  it('should compare login speeds', () => {
    // API login (snel)
    const startFast = Date.now();
    cy.loginViaApi('student');
    cy.visit('/dashboard.html');
    cy.get('[data-cy="welcome-message"]').should('be.visible').then(() => {
      const fastTime = Date.now() - startFast;
      cy.log(`Fast login took: ${fastTime}ms`);
    });
  });

  it('should measure UI login speed', () => {
    // UI login (langzamer)
    const startUI = Date.now();
    cy.login('student', 'cypress123');
    cy.get('[data-cy="welcome-message"]').should('be.visible').then(() => {
      const uiTime = Date.now() - startUI;
      cy.log(`UI login took: ${uiTime}ms`);
    });
  });

  /**
   * TEST 13.6: Login met verschillende gebruikers
   *
   * TODO: Test login met verschillende user types
   */
  it('should login as different users', () => {
    // Student
    cy.loginViaApi('student');
    cy.visit('/dashboard.html');
    cy.get('[data-cy="user-info"]').should('contain', 'Student');
    cy.logout();

    // Admin
    cy.loginViaApi('admin');
    cy.visit('/dashboard.html');
    cy.get('[data-cy="user-info"]').should('contain', 'Admin');
  });

  /**
   * TEST 13.7: Login command in beforeEach
   *
   * TODO: Gebruik login command in beforeEach hook
   */
  describe('Protected pages', () => {
    beforeEach(() => {
      // Login voor elke test
      cy.loginViaApi('student');
    });

    it('should access dashboard', () => {
      cy.visit('/dashboard.html');
      cy.get('[data-cy="welcome-message"]').should('be.visible');
    });

    it('should access checkout', () => {
      cy.addToCart(1, 1);
      cy.visit('/checkout.html');
      cy.get('[data-cy="checkout-form"]').should('be.visible');
    });
  });

  /**
   * BONUS: Maak een loginWithRememberMe command
   *
   * TODO: Maak een command dat ook remember me aanvinkt
   *
   * Voeg toe aan commands.ts:
   * ```typescript
   * Cypress.Commands.add('loginWithRememberMe', (username: string, password: string) => {
   *   cy.visit('/login.html');
   *   cy.get('[data-cy="username"]').type(username);
   *   cy.get('[data-cy="password"]').type(password);
   *   cy.get('[data-cy="remember-me"]').check();
   *   cy.get('[data-cy="login-button"]').click();
   *   cy.url().should('include', '/dashboard');
   * });
   * ```
   */
});
