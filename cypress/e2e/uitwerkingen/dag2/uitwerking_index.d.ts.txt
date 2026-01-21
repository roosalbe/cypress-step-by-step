// ***********************************************************
// Cypress Cursus - Type Declarations
//
// Dit bestand bevat TypeScript type declarations voor custom commands.
// Hierdoor krijg je IntelliSense en type checking voor je commands.
// ***********************************************************

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command om in te loggen via de UI
     * @param email - E-mailadres
     * @param password - Wachtwoord
     * @example cy.login('student@test.nl', 'cypress123')
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Custom command om in te loggen via de API (sneller)
     * @param email - E-mailadres
     * @param password - Wachtwoord
     * @example cy.loginViaApi('student@test.nl', 'cypress123')
     */
    loginViaApi(email: string, password: string): Chainable<void>;

    /**
     * Custom command om uit te loggen
     * @example cy.logout()
     */
    logout(): Chainable<void>;

    /**
     * Custom command om product aan winkelwagen toe te voegen via API
     * @param productId - Product ID (UUID)
     * @param quantity - Aantal (default: 1)
     * @example cy.addToCart('uuid-here', 2)
     */
    addToCart(productId: string, quantity?: number): Chainable<void>;

    /**
     * Custom command om winkelwagen leeg te maken via API
     * @example cy.clearCart()
     */
    clearCart(): Chainable<void>;

    /**
     * Custom command om database te resetten naar seed data
     * @example cy.resetDatabase()
     */
    resetDatabase(): Chainable<void>;

    /**
     * Custom command om element op te halen via data-cy attribuut
     * @param selector - De waarde van het data-cy attribuut
     * @example cy.getByDataCy('login-button')
     */
    getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Assert dat element zichtbaar is
     * @example cy.getByDataCy('welcome').shouldBeVisible()
     */
    shouldBeVisible(): Chainable<JQuery<HTMLElement>>;

    /**
     * Assert dat element bepaalde tekst bevat
     * @param text - De tekst die element moet bevatten
     * @example cy.getByDataCy('price').shouldContainText('€')
     */
    shouldContainText(text: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command om producten op te halen via de API
     * @example cy.getProducts().then((products) => { ... })
     */
    getProducts(): Chainable<Product[]>;
  }
}

// Type definitions for fixtures
interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone?: string;
  };
  createdAt: string;
}

// Fixture types
interface UsersFixture {
  users: User[];
}

interface ProductsFixture {
  products: Product[];
}

interface OrdersFixture {
  orders: Order[];
}
