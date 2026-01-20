# Cypress Cursus

Een complete 2-daagse Cypress cursus voor het leren van end-to-end testing met Cypress en TypeScript.

## Overzicht

Deze cursus is ontworpen voor ontwikkelaars die willen leren hoe ze betrouwbare end-to-end tests kunnen schrijven met Cypress. De cursus bestaat uit:

- **20 opdrachten** (10 per dag)
- **~10 minuten theorie** + **~40-50 minuten praktijk** per blok
- **Progressieve opdrachten** die voortbouwen op elkaar
- **Lokale demo-applicatie** (geen externe dependencies)
- **TypeScript** voor alle tests

## Installatie

```bash
# Clone de repository
git clone <repository-url>
cd cypress-cursus

# Installeer dependencies
npm install

# Start de demo applicatie
npm start

# Open Cypress
npm run cy:open
```

## Structuur

```
cypress-cursus/
├── demo-app/                    # Demo webshop applicatie
│   ├── index.html              # Homepage
│   ├── login.html              # Login pagina
│   ├── dashboard.html          # Dashboard
│   ├── products.html           # Producten overzicht
│   ├── cart.html               # Winkelwagen
│   ├── checkout.html           # Checkout
│   ├── api/                    # Mock API (JSON)
│   ├── css/                    # Styling
│   └── js/                     # JavaScript
│
├── slides/                     # Theorie presentaties (Markdown)
│   ├── dag1/                   # Dag 1 slides
│   └── dag2/                   # Dag 2 slides
│
├── cypress/
│   ├── e2e/
│   │   ├── opdrachten/         # Startbestanden met TODO's
│   │   │   ├── dag1/           # Opdrachten 1-10
│   │   │   └── dag2/           # Opdrachten 11-20
│   │   └── uitwerkingen/       # Complete oplossingen
│   │       ├── dag1/           # Uitwerkingen 1-10
│   │       └── dag2/           # Uitwerkingen 11-20
│   ├── support/
│   │   ├── commands.ts         # Custom commands
│   │   ├── e2e.ts             # Support configuratie
│   │   └── pages/              # Page Objects
│   └── fixtures/               # Test data
│
└── .github/workflows/          # CI/CD configuratie
```

## NPM Scripts

| Script | Beschrijving |
|--------|-------------|
| `npm start` | Start de demo applicatie op http://localhost:3000 |
| `npm run cy:open` | Open Cypress Test Runner |
| `npm run cy:run` | Run alle tests headless |
| `npm run cy:run:chrome` | Run tests in Chrome |
| `npm run cy:run:firefox` | Run tests in Firefox |
| `npm test` | Start server en run tests |

## Dagplanning

### Dag 1 - Basis

| Tijd | Onderwerp | Opdrachten |
|------|-----------|------------|
| 09:00-10:00 | Introductie & Setup | 1-2 |
| 10:15-11:15 | Selectors & Formulieren | 3-4 |
| 11:30-12:30 | Page Object Model | 5-6 |
| 13:30-14:30 | UI Flows | 7-8 |
| 14:45-15:45 | Debugging & Timeouts | 9-10 |

### Dag 2 - Verdieping

| Tijd | Onderwerp | Opdrachten |
|------|-----------|------------|
| 09:00-10:00 | API Testing | 11-12 |
| 10:15-11:15 | Custom Commands | 13-14 |
| 11:30-12:30 | Mocking & Stubbing | 15-16 |
| 13:30-14:30 | Fixtures & Testdata | 17-18 |
| 14:45-15:45 | CI/CD | 19 |
| 16:00-16:50 | Eindopdracht | 20 |

## Opdrachten

### Dag 1 - Basis

| # | Opdracht | Leerdoel |
|---|----------|----------|
| 1 | Eerste Test | `cy.visit()`, `cy.get()` |
| 2 | Navigatie & Assertions | `should()`, URL assertions |
| 3 | Selectors Strategie | data-cy attributen |
| 4 | Formulier Interacties | `type()`, `click()`, `select()` |
| 5 | Page Object Basis | POM pattern |
| 6 | Page Object Uitbreiding | Method chaining |
| 7 | Login Flow | Complete login test |
| 8 | Product Flow | E-commerce flow |
| 9 | Debugging | `.debug()`, `.pause()` |
| 10 | Timeout Handling | Timeouts, waiting strategies |

### Dag 2 - Verdieping

| # | Opdracht | Leerdoel |
|---|----------|----------|
| 11 | API GET Requests | `cy.request()` |
| 12 | API POST Requests | POST/PUT/DELETE |
| 13 | Custom Command Login | `Cypress.Commands.add()` |
| 14 | Custom Command Utilities | Helper commands |
| 15 | Intercept Basics | `cy.intercept()` |
| 16 | Intercept Mocking | Response mocking |
| 17 | Fixtures & Testdata | `cy.fixture()` |
| 18 | Data-Driven Tests | Parameterized tests |
| 19 | CI/CD Configuratie | GitHub Actions |
| 20 | Eindopdracht | Complete test suite |

## Demo Applicatie

De demo applicatie is een eenvoudige webshop met:

- Login/logout functionaliteit
- Product browsing met filters en zoeken
- Winkelwagen
- Checkout formulier

### Test Accounts

| Gebruiker | Wachtwoord | Rol |
|-----------|------------|-----|
| student | cypress123 | User |
| admin | admin123 | Admin |
| tester | test123 | User |

## Custom Commands

De volgende custom commands zijn beschikbaar:

```typescript
// Login via UI
cy.login(username, password)

// Login via localStorage (snel)
cy.loginViaApi(userType)

// Logout
cy.logout()

// Voeg product toe aan cart
cy.addToCart(productId, quantity)

// Maak cart leeg
cy.clearCart()

// Get element by data-cy
cy.getByDataCy(selector)
```

## Best Practices

1. **Gebruik data-cy attributen** voor stabiele selectors
2. **Vermijd hardcoded waits** - gebruik assertions
3. **Gebruik Page Objects** voor herbruikbare code
4. **Test isolation** - elke test moet onafhankelijk zijn
5. **Custom commands** voor herhaalde acties
6. **Fixtures** voor test data management

## CI/CD

De repository bevat een GitHub Actions workflow die:

- Tests runt op elke push naar main/develop
- Tests runt bij pull requests
- Screenshots en videos upload bij failures
- Parallel testing ondersteunt

## Slides Bekijken

De theorie slides zijn geschreven in Markdown. Je kunt ze bekijken met elke Markdown viewer, of presenteren met tools zoals:

- [Marp](https://marp.app/) - Markdown Presentation Ecosystem
- [reveal-md](https://github.com/webpro/reveal-md) - Reveal.js met Markdown
- VS Code met Markdown preview

## Troubleshooting

### Port 3000 is al in gebruik

```bash
# Vind het process
lsof -i :3000

# Stop het process
kill -9 <PID>
```

### Cypress opent niet

```bash
# Verifieer installatie
npx cypress verify

# Herinstalleer Cypress
npm install cypress --save-dev
```

### Tests falen met timeout

- Verhoog de timeout in `cypress.config.ts`
- Check of de demo app draait op http://localhost:3000
- Gebruik `{ timeout: 10000 }` voor specifieke elementen

## Licentie

Dit materiaal is bedoeld voor educatieve doeleinden.

---

Happy Testing! 🧪
