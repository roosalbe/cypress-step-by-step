# Introductie Cypress

## Wat is Cypress?

Cypress is een moderne end-to-end testing framework voor webapplicaties.

### Kenmerken:
- **All-in-one**: Test runner, assertion library, mocking ingebouwd
- **Real-time reloading**: Tests worden automatisch opnieuw uitgevoerd
- **Time travel debugging**: Bekijk snapshots van elke stap
- **Automatische wachttijden**: Geen `sleep()` of `wait()` nodig
- **Network control**: Intercept en mock HTTP requests

---

## Cypress vs Selenium

| Cypress | Selenium |
|---------|----------|
| JavaScript only | Multi-language |
| Draait in browser | Draait buiten browser |
| Sneller | Trager |
| Automatisch wachten | Handmatig wachten |
| Ingebouwde tools | Extra libraries nodig |

---

## Architectuur

```
┌─────────────────────────────────┐
│         Cypress Test            │
│    (draait IN de browser)       │
├─────────────────────────────────┤
│         Applicatie              │
│    (dezelfde browser context)   │
└─────────────────────────────────┘
```

### Voordelen:
- Directe toegang tot DOM
- Synchrone code
- Snellere uitvoering
- Betere debugging

---

## Wanneer Cypress gebruiken?

### ✅ Ideaal voor:
- End-to-end UI tests
- Integration tests
- Component tests
- API tests

### ⚠️ Beperkingen:
- Alleen Chromium, Firefox, Edge, Electron
- Één browser tab tegelijk
- Geen multi-domain in één test (workarounds beschikbaar)

---

## Basis Commando's

```typescript
// Navigatie
cy.visit('/pagina');

// Elementen selecteren
cy.get('selector');
cy.get('[data-cy="element"]');

// Interacties
cy.get('input').type('tekst');
cy.get('button').click();

// Assertions
cy.get('h1').should('contain', 'Welkom');
cy.url().should('include', '/dashboard');
```

---

## Test Structuur

```typescript
describe('Feature naam', () => {
  beforeEach(() => {
    // Setup voor elke test
    cy.visit('/');
  });

  it('should do something', () => {
    // Test code
  });

  it('should do something else', () => {
    // Test code
  });
});
```

---

## Volgende: Opdracht 1 & 2

1. Cypress installeren en configureren
2. Je eerste test schrijven
3. De demo-applicatie verkennen

**Tijd**: 50 minuten praktijk
