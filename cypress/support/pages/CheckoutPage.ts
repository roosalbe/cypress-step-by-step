/**
 * CheckoutPage - Page Object voor de checkout pagina
 */

interface ShippingInfo {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phone?: string;
}

export class CheckoutPage {
  // Selectors
  private checkoutPage = '[data-cy="checkout-page"]';
  private checkoutForm = '[data-cy="checkout-form"]';
  private checkoutSummary = '[data-cy="checkout-summary"]';
  private checkoutTotal = '[data-cy="checkout-total"]';
  private nameInput = '[data-cy="checkout-name"]';
  private addressInput = '[data-cy="checkout-address"]';
  private postalCodeInput = '[data-cy="checkout-postalcode"]';
  private cityInput = '[data-cy="checkout-city"]';
  private phoneInput = '[data-cy="checkout-phone"]';
  private placeOrderButton = '[data-cy="place-order-button"]';
  private checkoutError = '[data-cy="checkout-error"]';
  private emptyCheckout = '[data-cy="empty-checkout"]';

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
   * Vul naam in
   */
  typeName(name: string): this {
    cy.get(this.nameInput).clear().type(name);
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
  typePostalCode(postalCode: string): this {
    cy.get(this.postalCodeInput).clear().type(postalCode);
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
   * Vul telefoon in
   */
  typePhone(phone: string): this {
    cy.get(this.phoneInput).clear().type(phone);
    return this;
  }

  /**
   * Vul het hele verzendformulier in
   */
  fillShippingInfo(info: ShippingInfo): this {
    this.typeName(info.name);
    this.typeAddress(info.address);
    this.typePostalCode(info.postalCode);
    this.typeCity(info.city);
    if (info.phone) {
      this.typePhone(info.phone);
    }
    return this;
  }

  /**
   * Klik op bestelling plaatsen
   */
  placeOrder(): this {
    cy.get(this.placeOrderButton).click();
    return this;
  }

  /**
   * Volledige checkout flow
   */
  completeCheckout(info: ShippingInfo): this {
    this.fillShippingInfo(info);
    this.placeOrder();
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
