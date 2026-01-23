/**
 * LoginPage - Page Object voor de login pagina
 */
export class LoginPage {
  // Selectors - using data-cy attributes expected by tests
  private emailInput = '[data-cy="username"]';
  private passwordInput = '[data-cy="password"]';
  private loginButton = '[data-cy="login-button"]';
  private loginError = '[data-cy="login-error"]';
  private registerLink = '[data-cy="register-link"]';
  private loginForm = '[data-cy="login-form"]';
  private rememberMe = '[data-cy="remember-me"]';

  /**
   * Navigeer naar de login pagina
   */
  visit() {
    cy.visit('/login');
    return this
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
  login(email: string, password: string) {
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

  /**
   * Alias voor typeEmail - voor backwards compatibility met tests
   */
  enterUsername(email: string): this {
    return this.typeEmail(email);
  }

  /**
   * Alias voor typePassword - voor backwards compatibility met tests
   */
  enterPassword(password: string): this {
    return this.typePassword(password);
  }

  /**
   * Check de "Onthoud mij" checkbox
   */
  checkRememberMe(): this {
    cy.get(this.rememberMe).check();
    return this;
  }

  /**
   * Uncheck de "Onthoud mij" checkbox
   */
  uncheckRememberMe(): this {
    cy.get(this.rememberMe).uncheck();
    return this;
  }
}
