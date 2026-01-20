/**
 * LoginPage - Page Object voor de login pagina
 */
export class LoginPage {
  // Selectors
  private emailInput = '[data-cy="email-input"]';
  private passwordInput = '[data-cy="password-input"]';
  private loginButton = '[data-cy="login-button"]';
  private loginError = '[data-cy="login-error"]';
  private registerLink = '[data-cy="register-link"]';
  private loginForm = '[data-cy="login-form"]';

  /**
   * Navigeer naar de login pagina
   */
  visit(): this {
    cy.visit('/login');
    return this;
  }

  /**
   * Vul het e-mailadres in
   */
  typeEmail(email: string): this {
    cy.get(this.emailInput).clear().type(email);
    return this;
  }

  /**
   * Vul het wachtwoord in
   */
  typePassword(password: string): this {
    cy.get(this.passwordInput).clear().type(password);
    return this;
  }

  /**
   * Klik op de login button
   */
  clickLogin(): this {
    cy.get(this.loginButton).click();
    return this;
  }

  /**
   * Volledige login flow
   */
  login(email: string, password: string): this {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  /**
   * Klik op de registreer link
   */
  clickRegisterLink(): this {
    cy.get(this.registerLink).click();
    return this;
  }

  /**
   * Controleer dat error bericht zichtbaar is
   */
  shouldShowError(): this {
    cy.get(this.loginError).should('be.visible');
    return this;
  }

  /**
   * Controleer dat error bericht specifieke tekst bevat
   */
  shouldShowErrorWithText(text: string): this {
    cy.get(this.loginError)
      .should('be.visible')
      .and('contain', text);
    return this;
  }

  /**
   * Controleer dat we op de login pagina zijn
   */
  shouldBeOnLoginPage(): this {
    cy.url().should('include', '/login');
    return this;
  }

  /**
   * Controleer dat login formulier zichtbaar is
   */
  shouldShowForm(): this {
    cy.get(this.loginForm).should('be.visible');
    return this;
  }

  /**
   * Controleer dat login button zichtbaar is
   */
  shouldHaveLoginButton(): this {
    cy.get(this.loginButton).should('be.visible');
    return this;
  }

  /**
   * Get email input element
   */
  getEmailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.emailInput);
  }

  /**
   * Get password input element
   */
  getPasswordInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.passwordInput);
  }
}
