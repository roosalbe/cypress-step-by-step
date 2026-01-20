# Selector Strategieën

## Het Belang van Goede Selectors

Slechte selectors = **breekbare tests**

```typescript
// ❌ SLECHT - Breekt bij styling changes
cy.get('.btn-primary.mt-3.px-4');

// ❌ SLECHT - Breekt bij tekst wijzigingen
cy.contains('Klik hier om door te gaan');

// ❌ SLECHT - Breekt bij DOM wijzigingen
cy.get('div > div:nth-child(2) > button');

// ✅ GOED - Stabiel en duidelijk
cy.get('[data-cy="submit-button"]');
```

---

## Selector Prioriteit (Best naar Slechtst)

| Prioriteit | Selector Type | Voorbeeld |
|------------|--------------|-----------|
| 1 | data-cy | `[data-cy="submit"]` |
| 2 | data-test | `[data-test="submit"]` |
| 3 | id (uniek) | `#submit-btn` |
| 4 | input name | `[name="email"]` |
| 5 | class (stabiel) | `.login-form` |
| 6 | tag + attr | `button[type="submit"]` |
| 7 | contains | `cy.contains('Submit')` |

---

## data-cy Attributen

### In de HTML:
```html
<button data-cy="login-button" class="btn btn-primary">
  Inloggen
</button>
```

### In je test:
```typescript
cy.get('[data-cy="login-button"]').click();
```

### Voordelen:
- Specifiek voor testen
- Onafhankelijk van styling
- Duidelijke intentie
- Makkelijk te vinden

---

## Cypress Selector Commands

```typescript
// Basis selector (CSS)
cy.get('[data-cy="element"]');

// Tekst zoeken
cy.contains('Welkom');
cy.contains('[data-cy="header"]', 'Welkom');

// Binnen element zoeken
cy.get('[data-cy="form"]').find('[data-cy="submit"]');

// Eerste/laatste
cy.get('[data-cy="item"]').first();
cy.get('[data-cy="item"]').last();

// Index
cy.get('[data-cy="item"]').eq(2); // 3e item (0-indexed)

// Parent/children
cy.get('[data-cy="child"]').parent();
cy.get('[data-cy="parent"]').children();
```

---

## Meerdere Elementen

```typescript
// Alle items
cy.get('[data-cy="product-card"]')
  .should('have.length', 15);

// Itereren
cy.get('[data-cy="product-card"]').each(($el, index) => {
  cy.wrap($el).should('be.visible');
});

// Filteren
cy.get('[data-cy="product-card"]')
  .filter(':contains("Laptop")')
  .should('have.length', 1);
```

---

## Custom Selector Command

```typescript
// In commands.ts
Cypress.Commands.add('getByDataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// Gebruik
cy.getByDataCy('login-button').click();
```

---

## Tips voor HTML Developers

### Voeg data-cy toe aan:
- Buttons en links
- Form inputs
- Belangrijke tekst elementen
- Containers/sections
- Dynamische content

### Naming conventions:
```html
<!-- Acties -->
data-cy="login-button"
data-cy="submit-form"

<!-- Elementen -->
data-cy="username-input"
data-cy="error-message"

<!-- Containers -->
data-cy="product-list"
data-cy="cart-items"
```

---

## Debugging Selectors

```typescript
// Cypress Selector Playground
// Open Cypress > Click target icon

// In console
cy.get('[data-cy="element"]').then(console.log);

// Debug mode
cy.get('[data-cy="element"]').debug();
```

---

## Volgende: Opdracht 3 & 4

Nu gaan we oefenen met:
1. Het vinden van elementen met data-cy
2. Verschillende selector strategieën
3. Formulier interacties
