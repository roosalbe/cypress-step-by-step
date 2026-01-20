# Debugging & Timeouts

## Cypress Debugging Tools

### Time Travel
- Cypress maakt snapshots bij elke command
- Hover over commands in de Test Runner
- Bekijk de DOM state op elk moment

### Console Output
```typescript
cy.get('[data-cy="element"]').then(($el) => {
  console.log('Element:', $el);
  console.log('Text:', $el.text());
});
```

---

## Debug Commands

```typescript
// Pause de test - interactief debuggen
cy.get('[data-cy="element"]').debug();

// Pauzeer de test runner
cy.pause();

// Log naar command log
cy.log('Dit verschijnt in de Test Runner');

// Log object naar console
cy.task('log', { data: 'object' });
```

---

## Screenshots

```typescript
// Handmatige screenshot
cy.screenshot('mijn-screenshot');

// Screenshot van specifiek element
cy.get('[data-cy="cart"]').screenshot('cart-state');

// Automatisch bij failure (default aan)
// cypress.config.ts:
// screenshotOnRunFailure: true
```

---

## Timeouts Begrijpen

### Default Timeouts:
| Timeout | Default | Gebruik |
|---------|---------|---------|
| defaultCommandTimeout | 4000ms | `cy.get()`, assertions |
| requestTimeout | 5000ms | `cy.request()`, `cy.wait()` |
| responseTimeout | 30000ms | Wachten op server response |
| pageLoadTimeout | 60000ms | `cy.visit()` |

---

## Timeouts Aanpassen

### Globaal (cypress.config.ts):
```typescript
export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
  }
});
```

### Per Command:
```typescript
// Langere timeout voor specifieke command
cy.get('[data-cy="slow-element"]', { timeout: 15000 })
  .should('be.visible');

// Voor assertions
cy.get('[data-cy="element"]')
  .should('be.visible', { timeout: 10000 });
```

---

## Wacht Strategieën

### ❌ Anti-pattern: Hardcoded waits
```typescript
cy.wait(5000); // SLECHT - onnodig traag
```

### ✅ Best Practice: Wacht op conditie
```typescript
// Wacht op element
cy.get('[data-cy="modal"]').should('be.visible');

// Wacht op network request
cy.intercept('GET', '/api/data').as('getData');
cy.wait('@getData');

// Wacht op URL change
cy.url().should('include', '/dashboard');
```

---

## Network Debugging

```typescript
// Log alle requests
cy.intercept('*', (req) => {
  console.log('Request:', req.url);
});

// Bekijk request/response details
cy.intercept('GET', '/api/products').as('products');
cy.wait('@products').then((interception) => {
  console.log('Status:', interception.response?.statusCode);
  console.log('Body:', interception.response?.body);
});
```

---

## Veelvoorkomende Problemen

### Element niet gevonden
```typescript
// Probleem: Element bestaat nog niet
cy.get('[data-cy="dynamic"]'); // Faalt direct

// Oplossing: Cypress wacht automatisch met should
cy.get('[data-cy="dynamic"]').should('exist');
```

### Element bedekt
```typescript
// Probleem: Element achter ander element
cy.get('[data-cy="button"]').click(); // Faalt

// Oplossing: Force click
cy.get('[data-cy="button"]').click({ force: true });

// Of scroll naar element
cy.get('[data-cy="button"]').scrollIntoView().click();
```

---

## Retries

### Test Retries (cypress.config.ts):
```typescript
retries: {
  runMode: 2,    // CI: retry 2x
  openMode: 0,   // Dev: geen retry
}
```

### Command Retries:
- Cypress retry automatisch `cy.get()` en assertions
- Tot timeout bereikt is

```typescript
// Dit wordt automatisch geretried tot element visible is
cy.get('[data-cy="element"]').should('be.visible');
```

---

## Debugging Checklist

1. **Check Test Runner** - Bekijk screenshots/snapshots
2. **Console bekijken** - Errors en logs
3. **Network tab** - API calls checken
4. **Voeg logs toe** - `cy.log()` en `console.log()`
5. **Gebruik pause** - `cy.pause()` voor interactief
6. **Check selectors** - Selector Playground gebruiken
7. **Verhoog timeout** - Bij trage elementen

---

## Volgende: Opdracht 9 & 10

Je gaat oefenen met:
1. Debugging tools gebruiken
2. Timeouts configureren
3. Problemen oplossen in falende tests
