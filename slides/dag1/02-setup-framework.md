# Setup Testautomatiseringsframework

## Project Structuur

```
project/
├── cypress/
│   ├── e2e/              # Test bestanden
│   ├── fixtures/         # Test data (JSON)
│   ├── support/          # Custom commands & setup
│   │   ├── commands.ts
│   │   └── e2e.ts
│   └── downloads/        # Gedownloade bestanden
├── cypress.config.ts     # Configuratie
├── tsconfig.json         # TypeScript config
└── package.json
```

---

## Installatie

```bash
# Nieuwe project
npm init -y
npm install cypress typescript --save-dev

# Cypress openen (genereert structuur)
npx cypress open
```

---

## cypress.config.ts

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
  },
});
```

---

## TypeScript Setup

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["ES2021", "DOM"],
    "types": ["cypress", "node"],
    "strict": true
  },
  "include": ["cypress/**/*.ts"]
}
```

### Voordelen TypeScript:
- IntelliSense in IDE
- Type checking
- Betere code completion
- Minder runtime errors

---

## Support Files

### cypress/support/e2e.ts
```typescript
// Laad custom commands
import './commands';

// Voorkom test failures op app errors
Cypress.on('uncaught:exception', () => false);

// Hook voor elke test
beforeEach(() => {
  cy.log(`Test: ${Cypress.currentTest.title}`);
});
```

---

## Environment Variables

### In cypress.config.ts:
```typescript
env: {
  testUser: 'student',
  testPassword: 'cypress123',
}
```

### Gebruiken in tests:
```typescript
const user = Cypress.env('testUser');
cy.get('[data-cy="username"]').type(user);
```

### Via command line:
```bash
npx cypress run --env testUser=admin
```

---

## NPM Scripts

```json
{
  "scripts": {
    "start": "serve demo-app -p 3000",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test": "npm run cy:run"
  }
}
```

---

## Best Practices

1. **Gebruik TypeScript** - Betere IDE support
2. **Structureer tests logisch** - Per feature/pagina
3. **Gebruik baseUrl** - Vermijd hardcoded URLs
4. **Environment variables** - Voor credentials
5. **Support file** - Voor shared setup

---

## Volgende: Selectors & Strategie

Nu je framework staat, gaan we leren hoe je elementen selecteert.
