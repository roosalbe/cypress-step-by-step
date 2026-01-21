/**
 * CheckoutPage - Page Object voor de checkout pagina
 */

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  postcode: string;
  city: string;
}

export class CheckoutPage {
  // Selectors
  private checkoutPage = '[data-cy="checkout-page"]';
  private checkoutForm = '[data-cy="checkout-form"]';
  private checkoutSummary = '[data-cy="checkout-summary"]';
  private checkoutTotal = '[data-cy="checkout-total"]';
  private firstNameInput = '[data-cy="firstName"]';
  private lastNameInput = '[data-cy="lastName"]';
  private emailInput = '[data-cy="email"]';
  private phoneInput = '[data-cy="phone"]';
  private addressInput = '[data-cy="address"]';
  private postcodeInput = '[data-cy="postcode"]';
  private cityInput = '[data-cy="city"]';
  private submitOrderButton = '[data-cy="submit-order"]';
  private checkoutError = '[data-cy="checkout-error"]';
  private emptyCheckout = '[data-cy="empty-checkout"]';
  private orderConfirmation = '[data-cy="order-confirmation"]';

  /**
   * Navigeer naar de checkout pagina
   */
  visit(): this {
    cy.visit('/checkout');
    return this;
  }

  /**
   * Controleer dat pagina zichtbaar is
   */
  shouldBeVisible(): this {
    cy.get(this.checkoutPage).should('be.visible');
    return this;
  }

  /**
   * Vul voornaam in
   */
  typeFirstName(firstName: string): this {
    cy.get(this.firstNameInput).clear().type(firstName);
    return this;
  }

  /**
   * Vul achternaam in
   */
  typeLastName(lastName: string): this {
    cy.get(this.lastNameInput).clear().type(lastName);
    return this;
  }

  /**
   * Vul email in
   */
  typeEmail(email: string): this {
    cy.get(this.emailInput).clear().type(email);
    return this;
  }

  /**
   * Vul telefoon in
   */
  typePhone(phone: string): this {
    cy.get(this.phoneInput).clear().type(phone);
    return this;
  }

  /**
   * Vul adres in
   */
  typeAddress(address: string): this {
    cy.get(this.addressInput).clear().type(address);
    return this;
  }

  /**
   * Vul postcode in
   */
  typePostcode(postcode: string): this {
    cy.get(this.postcodeInput).clear().type(postcode);
    return this;
  }

  /**
   * Vul stad in
   */
  typeCity(city: string): this {
    cy.get(this.cityInput).clear().type(city);
    return this;
  }

  /**
   * Vul het hele checkout formulier in
   */
  fillForm(data: CheckoutFormData): this {
    this.typeFirstName(data.firstName);
    this.typeLastName(data.lastName);
    this.typeEmail(data.email);
    if (data.phone) {
      this.typePhone(data.phone);
    }
    this.typeAddress(data.address);
    this.typePostcode(data.postcode);
    this.typeCity(data.city);
    return this;
  }

  /**
   * Klik op bestelling plaatsen
   */
  submitOrder(): this {
    cy.get(this.submitOrderButton).click();
    return this;
  }

  /**
   * Alias voor submitOrder
   */
  placeOrder(): this {
    return this.submitOrder();
  }

  /**
   * Volledige checkout flow
   */
  completeCheckout(data: CheckoutFormData): this {
    this.fillForm(data);
    this.submitOrder();
    return this;
  }

  /**
   * Controleer dat checkout formulier zichtbaar is
   */
  shouldShowForm(): this {
    cy.get(this.checkoutForm).should('be.visible');
    return this;
  }

  /**
   * Controleer dat checkout leeg is
   */
  shouldShowEmptyCheckout(): this {
    cy.get(this.emptyCheckout).should('be.visible');
    return this;
  }

  /**
   * Controleer dat order bevestiging zichtbaar is
   */
  shouldShowOrderConfirmation(): this {
    cy.get(this.orderConfirmation).should('be.visible');
    return this;
  }

  /**
   * Controleer dat error bericht zichtbaar is
   */
  shouldShowError(text?: string): this {
    const assertion = cy.get(this.checkoutError).should('be.visible');
    if (text) {
      assertion.and('contain', text);
    }
    return this;
  }

  /**
   * Controleer order totaal
   */
  shouldHaveTotal(total: string): this {
    cy.get(this.checkoutTotal).should('contain', total);
    return this;
  }

  /**
   * Controleer dat we op de checkout pagina zijn
   */
  shouldBeOnCheckout(): this {
    cy.url().should('include', '/checkout');
    return this;
  }

  /**
   * Get het order totaal element
   */
  getOrderTotal(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.checkoutTotal);
  }

  /**
   * Get het checkout formulier element
   */
  getForm(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.checkoutForm);
  }

  /**
   * Get checkout summary element
   */
  getSummary(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.checkoutSummary);
  }
}
