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
     * Custom command om uit te loggen
     * @example cy.logout()
     */
    logout(): Chainable<void>;

    /**
     * Custom command om element op te halen via data-cy attribuut
     * @param selector - De waarde van het data-cy attribuut
     * @example cy.getByDataCy('login-button')
     */
    getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
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
