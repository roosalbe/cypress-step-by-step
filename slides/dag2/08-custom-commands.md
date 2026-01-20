# Custom Commands

## Wat zijn Custom Commands?

Herbruikbare functies die je aan Cypress toevoegt.

```typescript
// In plaats van dit overal te herhalen:
cy.get('[data-cy="username"]').type('student');
cy.get('[data-cy="password"]').type('cypress123');
cy.get('[data-cy="login-button"]').click();

// Maak een command:
cy.login('student', 'cypress123');
```

---

## Command Aanmaken

### cypress/support/commands.ts

```typescript
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login.html');
  cy.get('[data-cy="username"]').type(username);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="login-button"]').click();
  cy.url().should('include', '/dashboard');
});
```

### Gebruik in test:
```typescript
cy.login('student', 'cypress123');
```

---

## Type Declarations

### cypress/support/index.d.ts

```typescript
declare namespace Cypress {
  interface Chainable {
    /**
     * Login met username en password
     * @example cy.login('student', 'cypress123')
     */
    login(username: string, password: string): Chainable<void>;
  }
}
```

Dit geeft je:
- IntelliSense in je IDE
- Type checking
- Documentatie bij hover

---

## Command Types

### Parent Command (start een chain)
```typescript
Cypress.Commands.add('getByDataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// Gebruik:
cy.getByDataCy('login-button').click();
```

### Child Command (werkt op subject)
```typescript
Cypress.Commands.add(
  'shouldBeVisible',
  { prevSubject: 'element' },
  (subject) => {
    cy.wrap(subject).should('be.visible');
  }
);

// Gebruik:
cy.get('button').shouldBeVisible();
```

---

## Child Command met Options

```typescript
Cypress.Commands.add(
  'shouldContainText',
  { prevSubject: 'element' },
  (subject, text: string) => {
    cy.wrap(subject).should('contain.text', text);
  }
);

// Gebruik:
cy.get('[data-cy="title"]').shouldContainText('Welkom');
```

---

## Dual Command

Werkt met én zonder subject:

```typescript
Cypress.Commands.add(
  'highlight',
  { prevSubject: 'optional' },
  (subject) => {
    if (subject) {
      cy.wrap(subject).then($el => {
        $el.css('border', '2px solid red');
      });
    }
  }
);

// Gebruik:
cy.get('button').highlight();
```

---

## Praktische Commands

### Login via API (snel)
```typescript
Cypress.Commands.add('loginViaApi', (username: string) => {
  const users = {
    student: { id: 1, name: 'Student User', ... },
    admin: { id: 2, name: 'Admin User', ... }
  };

  cy.window().then((win) => {
    win.localStorage.setItem('currentUser', JSON.stringify(users[username]));
  });
});
```

### Add to Cart
```typescript
Cypress.Commands.add('addToCart', (productId: number, quantity = 1) => {
  cy.window().then((win) => {
    const cart = JSON.parse(win.localStorage.getItem('cart') || '[]');
    cart.push({ productId, quantity });
    win.localStorage.setItem('cart', JSON.stringify(cart));
  });
});
```

---

## Best Practices

1. **Duidelijke namen** - `cy.login()` niet `cy.doLogin()`
2. **Type declarations** - Altijd voor TypeScript
3. **JSDoc comments** - Documenteer parameters
4. **Niet te specifiek** - Maak commands herbruikbaar
5. **Return chainable** - Voor method chaining

---

## Volgende: Opdracht 13 & 14

Je gaat:
1. Een login command maken
2. Utility commands toevoegen
3. Type declarations schrijven
