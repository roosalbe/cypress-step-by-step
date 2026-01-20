# CI/CD Integratie

## Waarom CI/CD?

- **Automatisch testen** bij elke commit
- **Vroeg problemen vinden** - Fail fast
- **Consistent** - Dezelfde omgeving elke keer
- **Documentatie** - Test resultaten zichtbaar

---

## Cypress in CI

```bash
# Headless mode (standaard in CI)
npx cypress run

# Met specifieke browser
npx cypress run --browser chrome

# Met specifieke specs
npx cypress run --spec "cypress/e2e/**/*.cy.ts"

# Parallel runs
npx cypress run --parallel --record
```

---

## GitHub Actions Workflow

### .github/workflows/cypress.yml

```yaml
name: Cypress Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Start server
        run: npm start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run Cypress tests
        uses: cypress-io/github-action@v6
        with:
          wait-on: 'http://localhost:3000'
          browser: chrome
```

---

## Cypress GitHub Action

```yaml
- name: Cypress run
  uses: cypress-io/github-action@v6
  with:
    # Start server
    start: npm start
    wait-on: 'http://localhost:3000'

    # Browser
    browser: chrome

    # Specific specs
    spec: cypress/e2e/**/*.cy.ts

    # Record to Cypress Cloud
    record: true
  env:
    CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

---

## Artifacts Opslaan

```yaml
- name: Upload screenshots
  uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: cypress-screenshots
    path: cypress/screenshots

- name: Upload videos
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: cypress-videos
    path: cypress/videos
```

---

## Matrix Testing

Test op meerdere browsers/OS:

```yaml
jobs:
  cypress-run:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        browser: [chrome, firefox, edge]

    steps:
      - uses: cypress-io/github-action@v6
        with:
          browser: ${{ matrix.browser }}
```

---

## Parallel Testing

```yaml
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        containers: [1, 2, 3, 4]

    steps:
      - uses: cypress-io/github-action@v6
        with:
          record: true
          parallel: true
          group: 'CI - Chrome'
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
```

---

## Environment Specifieke Tests

```yaml
jobs:
  test-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: cypress-io/github-action@v6
        env:
          CYPRESS_BASE_URL: ${{ vars.STAGING_URL }}

  test-production:
    runs-on: ubuntu-latest
    environment: production
    needs: test-staging
    steps:
      - uses: cypress-io/github-action@v6
        env:
          CYPRESS_BASE_URL: ${{ vars.PROD_URL }}
```

---

## Cypress Cloud (Dashboard)

- **Test recordings** - Video en screenshots
- **Parallelization** - Snellere runs
- **Flake detection** - Identificeer instabiele tests
- **Analytics** - Trends en statistieken

```bash
# Record naar Cypress Cloud
npx cypress run --record --key YOUR_KEY
```

---

## Best Practices

1. **Run in headless mode** - Sneller in CI
2. **Sla artifacts op** - Voor debugging
3. **Parallel testing** - Bij grote test suites
4. **Fail fast** - Stop bij eerste failure (optioneel)
5. **Branch protection** - Tests moeten slagen

---

## NPM Scripts voor CI

```json
{
  "scripts": {
    "cy:run": "cypress run",
    "cy:run:chrome": "cypress run --browser chrome",
    "cy:run:ci": "cypress run --browser chrome --headless",
    "test:ci": "start-server-and-test start http://localhost:3000 cy:run:ci"
  }
}
```

---

## Volgende: Opdracht 19

Je gaat:
1. GitHub Actions workflow maken
2. CI configuratie opzetten
3. Test reports configureren
