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


describe('Opdracht 13: Custom Command - Login', () => {
  /**
   * TEST 13.1: Gebruik bestaand login command
   *
   * Het login command bestaat al in commands.ts
   */
  it.only('should use existing login command', () => {
    cy.visit("/login");
    // Gebruik het bestaande custom command om in te loggen via de UI
    cy.login('student', 'cypress123');

    // Valideer dat je ingelogd ben
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="user-info"]').should('contain', 'Student');
  });

  /**
   * TEST 13.2: Gebruik loginViaApi command
   *
   * Dit command logt in via localStorage (sneller)
   */
  it('should use loginViaApi command', () => {
    // Maak een custom command om in te loggen via de API
    // Gebruik hiervoor de uitwerkingen uit de voorgaande opgave
    // Een command in de command.ts aanmaken is niet genoeg, Je moet ook in de index.d.ts
    // aangeven wat het command doet. 
    cy.loginViaApi('student');

    cy.visit('/dashboard.html');
    cy.get('[data-cy="welcome-message"]').should('contain', 'Student');
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
    // Login doormiddel van vesschillende users. TIP gebruik cy.logout() om snel uit te loggen.
    
  });

  /**
   * BONUS: Maak een loginWithRememberMe command
   *
   * TODO: Maak een command dat ook remember me aanvinkt
   *
   * Voeg toe aan commands.ts:
   * ```typescript
   * Cypress.Commands.add('loginWithRememberMe', (username: string, password: string) => {
   *
   * });
   * ```
   */
});
