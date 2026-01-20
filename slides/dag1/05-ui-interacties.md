# UI Interacties & Flows

## Basis Interacties

```typescript
// Klikken
cy.get('button').click();
cy.get('button').dblclick();        // Double click
cy.get('button').rightclick();      // Right click

// Typen
cy.get('input').type('Hallo');
cy.get('input').type('{enter}');    // Speciale toetsen
cy.get('input').clear();            // Leegmaken
cy.get('input').clear().type('Nieuw');

// Selecteren
cy.get('select').select('optie');
cy.get('select').select(['opt1', 'opt2']); // Multi-select
```

---

## Speciale Toetsen

```typescript
cy.get('input').type('{enter}');      // Enter
cy.get('input').type('{esc}');        // Escape
cy.get('input').type('{tab}');        // Tab
cy.get('input').type('{backspace}');  // Backspace
cy.get('input').type('{del}');        // Delete

// Modificatie toetsen
cy.get('input').type('{ctrl+a}');     // Select all
cy.get('input').type('{shift+end}');  // Select to end

// Combinatie
cy.get('input').type('test{enter}');  // Type + Enter
```

---

## Checkboxes & Radio Buttons

```typescript
// Checkbox
cy.get('[data-cy="checkbox"]').check();
cy.get('[data-cy="checkbox"]').uncheck();
cy.get('[data-cy="checkbox"]').should('be.checked');

// Meerdere checkboxes
cy.get('[type="checkbox"]').check(['optie1', 'optie2']);

// Radio button
cy.get('[data-cy="radio-option"]').check();

// Force (voor verborgen elementen)
cy.get('[data-cy="checkbox"]').check({ force: true });
```

---

## Assertions

```typescript
// Visibility
cy.get('element').should('be.visible');
cy.get('element').should('not.exist');
cy.get('element').should('be.hidden');

// Text content
cy.get('h1').should('contain', 'Welkom');
cy.get('h1').should('have.text', 'Welkom');
cy.get('h1').should('not.contain', 'Error');

// Attributes
cy.get('input').should('have.value', 'test');
cy.get('input').should('have.attr', 'placeholder', 'Voer in');
cy.get('button').should('be.disabled');
cy.get('button').should('not.be.disabled');

// CSS
cy.get('element').should('have.class', 'active');
cy.get('element').should('have.css', 'color', 'rgb(0, 0, 255)');

// Length
cy.get('li').should('have.length', 5);
cy.get('li').should('have.length.greaterThan', 3);
```

---

## Chaining Assertions

```typescript
cy.get('[data-cy="product-card"]')
  .should('be.visible')
  .and('contain', 'Laptop')
  .and('have.class', 'product-card');

// Met find
cy.get('[data-cy="form"]')
  .find('[data-cy="submit"]')
  .should('be.visible')
  .click();
```

---

## URL & Location

```typescript
// URL assertions
cy.url().should('include', '/dashboard');
cy.url().should('eq', 'http://localhost:3000/login.html');

// Location
cy.location('pathname').should('eq', '/products.html');
cy.location('search').should('include', 'category=electronics');

// Hash
cy.location('hash').should('eq', '#section1');
```

---

## Wachten (Automatisch!)

Cypress wacht automatisch op:
- Elementen die verschijnen
- Animaties
- Network requests

```typescript
// Cypress wacht tot element visible is
cy.get('[data-cy="modal"]').should('be.visible');

// Expliciet wachten (vermijd als mogelijk)
cy.wait(1000);  // ❌ Vermijd hardcoded waits

// Wacht op network request
cy.intercept('GET', '/api/products').as('getProducts');
cy.wait('@getProducts');  // ✅ Wacht op specifieke request
```

---

## Complete Login Flow

```typescript
describe('Login Flow', () => {
  it('should login and navigate to dashboard', () => {
    // Bezoek login pagina
    cy.visit('/login.html');

    // Vul credentials in
    cy.get('[data-cy="username"]').type('student');
    cy.get('[data-cy="password"]').type('cypress123');

    // Klik login
    cy.get('[data-cy="login-button"]').click();

    // Verify redirect
    cy.url().should('include', '/dashboard');

    // Verify user info zichtbaar
    cy.get('[data-cy="user-info"]')
      .should('be.visible')
      .and('contain', 'Student');

    // Verify welkomstbericht
    cy.get('[data-cy="welcome-message"]')
      .should('contain', 'Welkom terug');
  });
});
```

---

## Shopping Flow

```typescript
describe('Shopping Flow', () => {
  beforeEach(() => {
    cy.loginViaApi('student');
  });

  it('should add product to cart', () => {
    cy.visit('/products.html');

    // Zoek product
    cy.get('[data-cy="search-input"]').type('Laptop');

    // Voeg toe aan cart
    cy.get('[data-cy="add-to-cart"]').first().click();

    // Verify cart count
    cy.get('[data-cy="cart-count"]')
      .should('be.visible')
      .and('contain', '1');
  });
});
```

---

## Volgende: Opdracht 7 & 8

Je gaat complete flows testen:
1. Login flow met validatie
2. Product browse en cart flow
