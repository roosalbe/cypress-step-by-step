# Testdata Management

## Waarom Testdata Management?

- **Consistente tests** - Altijd dezelfde uitgangspositie
- **Herbruikbaar** - Data delen tussen tests
- **Onderhoudbaar** - Centrale plek voor data
- **Leesbaar** - Geen hardcoded waarden in tests

---

## Fixtures

### cypress/fixtures/users.json
```json
{
  "validUser": {
    "username": "student",
    "password": "cypress123"
  },
  "adminUser": {
    "username": "admin",
    "password": "admin123"
  }
}
```

### Gebruik in test:
```typescript
cy.fixture('users.json').then((users) => {
  cy.login(users.validUser.username, users.validUser.password);
});
```

---

## cy.fixture() Methodes

```typescript
// Laden in test
cy.fixture('users.json').then((data) => {
  // gebruik data
});

// Met alias
cy.fixture('users.json').as('userData');
cy.get('@userData').then((data) => {
  // gebruik data
});

// In beforeEach
let testData: UserData;
before(() => {
  cy.fixture('users.json').then((data) => {
    testData = data;
  });
});
```

---

## Fixture Types

### JSON (meest gebruikt)
```typescript
cy.fixture('products.json');
```

### TypeScript/JavaScript
```typescript
// cypress/fixtures/users.ts
export const users = {
  student: { username: 'student', password: 'cypress123' }
};

// In test
import { users } from '../fixtures/users';
```

### Afbeeldingen
```typescript
cy.fixture('logo.png', 'base64').then((img) => {
  // Gebruik base64 encoded image
});
```

---

## Data-Driven Testing

```typescript
// cypress/fixtures/loginScenarios.json
[
  { "username": "student", "password": "cypress123", "shouldPass": true },
  { "username": "admin", "password": "admin123", "shouldPass": true },
  { "username": "wrong", "password": "wrong", "shouldPass": false }
]
```

```typescript
describe('Login Tests', () => {
  // Laad scenarios
  const scenarios = require('../fixtures/loginScenarios.json');

  scenarios.forEach((scenario) => {
    it(`should ${scenario.shouldPass ? 'pass' : 'fail'} for ${scenario.username}`, () => {
      cy.visit('/login.html');
      cy.get('[data-cy="username"]').type(scenario.username);
      cy.get('[data-cy="password"]').type(scenario.password);
      cy.get('[data-cy="login-button"]').click();

      if (scenario.shouldPass) {
        cy.url().should('include', '/dashboard');
      } else {
        cy.get('[data-cy="login-error"]').should('be.visible');
      }
    });
  });
});
```

---

## Test Data Factories

```typescript
// cypress/support/factories/userFactory.ts
export function createUser(overrides = {}) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    username: `user_${Date.now()}`,
    email: `test_${Date.now()}@test.nl`,
    ...overrides
  };
}

// Gebruik in test
import { createUser } from '../support/factories/userFactory';

const newUser = createUser({ username: 'customName' });
```

---

## Environment Variables

### cypress.config.ts
```typescript
env: {
  testUser: 'student',
  testPassword: 'cypress123',
  apiUrl: 'http://localhost:3000/api'
}
```

### Gebruik
```typescript
const username = Cypress.env('testUser');
const apiUrl = Cypress.env('apiUrl');
```

### Command line override
```bash
npx cypress run --env testUser=admin
```

---

## Local Storage Setup

```typescript
beforeEach(() => {
  // Clear state
  cy.clearLocalStorage();

  // Of specifieke setup
  cy.window().then((win) => {
    win.localStorage.setItem('cart', JSON.stringify([]));
  });
});
```

---

## Database Seeding (via API)

```typescript
before(() => {
  // Reset database via API
  cy.request('POST', '/api/test/reset');

  // Seed test data
  cy.request('POST', '/api/test/seed', {
    users: [...],
    products: [...]
  });
});
```

---

## Best Practices

1. **Gebruik fixtures** voor statische test data
2. **Factories** voor dynamische data
3. **Environment variables** voor configuratie
4. **Clear state** in beforeEach
5. **Isoleer tests** - Geen afhankelijkheden

---

## Volgende: Opdracht 17 & 18

Je gaat:
1. Fixtures laden en gebruiken
2. Data-driven tests schrijven
3. Test data factories maken
