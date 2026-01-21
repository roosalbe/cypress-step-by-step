/**
 * Custom command: login
 * Logt in met de gegeven credentials via de UI
 *
 * @example cy.login('student@test.nl', 'cypress123')
 */
Cypress.Commands.add('login', (email: string, password: string) => {

});

/**
 * Custom command: logout
 * Logt uit door localStorage te clearen
 *
 * @example cy.logout()
 */
Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('token');
    win.localStorage.removeItem('user');
  });
  cy.visit('/');
});

/**
 * Custom command: getByDataCy
 * Haalt element op via data-cy attribuut
 *
 * @example cy.getByDataCy('login-button').click()
 */
Cypress.Commands.add('getByDataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});