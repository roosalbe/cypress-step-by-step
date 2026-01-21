/**
 * UITWERKING OPDRACHT 1: Je Eerste Cypress Test
 */

describe('Opdracht 1: Eerste Test', () => {
  it('should visit the homepage', () => {
    cy.visit('/');

    cy.get('[data-cy="hero-title"]').should('be.visible');
  });

  it('should have the correct page title', () => {
    cy.visit('/');

    cy.title().should('contain', 'Cypress Shop');
  });

  it('should display the hero section', () => {
    cy.visit('/');

    cy.get('[data-cy="hero-title"]')
      .should('be.visible')
      .and('contain', 'Welkom');

    cy.get('[data-cy="hero-subtitle"]').should('be.visible');

    cy.get('[data-cy="shop-now-button"]').should('be.visible');
  });

  it('should have navigation links', () => {
    cy.visit('/');

    // Deze links zijn altijd zichtbaar
    cy.get('[data-cy="nav-home"]').should('exist');
    cy.get('[data-cy="nav-products"]').should('exist');
    cy.get('[data-cy="nav-login"]').should('exist');

    // Dashboard en cart zijn alleen zichtbaar als je ingelogd bent
    // cy.get('[data-cy="nav-dashboard"]').should('exist');
    // cy.get('[data-cy="nav-cart"]').should('exist');
  });

  it('should display the footer', () => {
    cy.visit('/');

    cy.get('[data-cy="footer-text"]')
      .scrollIntoView()
      .should('be.visible');
  });
});
