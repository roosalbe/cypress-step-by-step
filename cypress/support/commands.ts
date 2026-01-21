// ***********************************************************
// Cypress Cursus - Custom Commands
//
// Dit bestand bevat custom commands die je kunt gebruiken in je tests.
// Studenten zullen hier tijdens de cursus hun eigen commands toevoegen.
// ***********************************************************

// Import type definitions
/// <reference types="cypress" />

/**
 * Custom command: login
 * Logt in met de gegeven credentials via de UI
 *
 * @example cy.login('student@test.nl', 'cypress123')
 */
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy="username"]').type(email);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="login-button"]').click();
  cy.url().should('include', '/dashboard');
  cy.get('[data-cy="welcome-card"]').should('be.visible');
});

/**
 * Custom command: loginViaApi
 * Logt in via de API en slaat de token op in localStorage
 *
 * @example cy.loginViaApi('student@test.nl', 'cypress123')
 */
Cypress.Commands.add('loginViaApi', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email, password },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const { token, user } = response.body;

    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user', JSON.stringify(user));
    });
  });
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
 * Custom command: addToCart
 * Voegt een product toe aan de winkelwagen via de API
 *
 * @example cy.addToCart('product-uuid', 2)
 */
Cypress.Commands.add('addToCart', (productId: string, quantity: number = 1) => {
  cy.window().then((win) => {
    const token = win.localStorage.getItem('token');

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/cart`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { productId, quantity },
    });
  });
});

/**
 * Custom command: clearCart
 * Maakt de winkelwagen leeg via de API
 *
 * @example cy.clearCart()
 */
Cypress.Commands.add('clearCart', () => {
  cy.window().then((win) => {
    const token = win.localStorage.getItem('token');

    if (token) {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/cart`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
      });
    }
  });
});

/**
 * Custom command: resetDatabase
 * Reset de database naar de seed data
 *
 * @example cy.resetDatabase()
 */
Cypress.Commands.add('resetDatabase', () => {
  cy.exec('cd demo-app/backend && npm run seed');
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

/**
 * Custom command: shouldBeVisible
 * Assert dat element zichtbaar is
 *
 * @example cy.getByDataCy('welcome-message').shouldBeVisible()
 */
Cypress.Commands.add(
  'shouldBeVisible',
  { prevSubject: 'element' },
  (subject) => {
    cy.wrap(subject).should('be.visible');
  }
);

/**
 * Custom command: shouldContainText
 * Assert dat element bepaalde tekst bevat
 *
 * @example cy.getByDataCy('price').shouldContainText('€')
 */
Cypress.Commands.add(
  'shouldContainText',
  { prevSubject: 'element' },
  (subject, text: string) => {
    cy.wrap(subject).should('contain.text', text);
  }
);

/**
 * Custom command: getProducts
 * Haalt producten op via de API
 *
 * @example cy.getProducts().then((products) => { ... })
 */
Cypress.Commands.add('getProducts', () => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/products`,
  }).then((response) => {
    return response.body.products;
  });
});

// ============================================================
// OPDRACHT SECTIE - Hieronder kunnen studenten commands toevoegen
// ============================================================

// TODO: Opdracht 13 - Voeg hier je custom login command toe

// TODO: Opdracht 14 - Voeg hier je utility commands toe
