# Page Object Model (POM)

## Wat is Page Object Model?

Een design pattern waarbij je pagina-specifieke code encapsuleert in classes.

```
Tests ──────────> Page Objects ──────────> Applicatie
        roepen aan                interacteren met
```

---

## Waarom POM?

### Zonder POM (slecht):
```typescript
// test1.cy.ts
cy.get('[data-cy="username"]').type('student');
cy.get('[data-cy="password"]').type('cypress123');
cy.get('[data-cy="login-button"]').click();

// test2.cy.ts (zelfde code!)
cy.get('[data-cy="username"]').type('admin');
cy.get('[data-cy="password"]').type('admin123');
cy.get('[data-cy="login-button"]').click();
```

### Met POM (goed):
```typescript
// test1.cy.ts
loginPage.login('student', 'cypress123');

// test2.cy.ts
loginPage.login('admin', 'admin123');
```

---

## Voordelen POM

1. **DRY** - Don't Repeat Yourself
2. **Onderhoudbaarheid** - Wijzig op één plek
3. **Leesbaarheid** - Tests zijn duidelijker
4. **Herbruikbaarheid** - Deel logica tussen tests
5. **Abstractie** - Verberg implementatiedetails

---

## Basis Page Object

```typescript
// cypress/support/pages/LoginPage.ts
export class LoginPage {
  // Selectors als private properties
  private usernameInput = '[data-cy="username"]';
  private passwordInput = '[data-cy="password"]';
  private loginButton = '[data-cy="login-button"]';
  private errorMessage = '[data-cy="login-error"]';

  // Navigatie
  visit(): void {
    cy.visit('/login.html');
  }

  // Acties
  enterUsername(username: string): void {
    cy.get(this.usernameInput).type(username);
  }

  enterPassword(password: string): void {
    cy.get(this.passwordInput).type(password);
  }

  clickLogin(): void {
    cy.get(this.loginButton).click();
  }

  // Gecombineerde actie
  login(username: string, password: string): void {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  // Assertions
  shouldShowError(message: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain', message);
  }
}
```

---

## Gebruik in Tests

```typescript
// login.cy.ts
import { LoginPage } from '../support/pages/LoginPage';

describe('Login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully', () => {
    loginPage.login('student', 'cypress123');
    cy.url().should('include', '/dashboard');
  });

  it('should show error for invalid credentials', () => {
    loginPage.login('wrong', 'wrong');
    loginPage.shouldShowError('Ongeldige');
  });
});
```

---

## Page Object Best Practices

### ✅ DO:
- Selectors in page object
- Herbruikbare methodes
- Return `void` of `this` (voor chaining)
- Duidelijke method names

### ❌ DON'T:
- Assertions in page objects (meestal)
- Te veel logica
- Tests in page objects
- Hardcoded test data

---

## Method Chaining

```typescript
export class LoginPage {
  enterUsername(username: string): this {
    cy.get(this.usernameInput).type(username);
    return this;
  }

  enterPassword(password: string): this {
    cy.get(this.passwordInput).type(password);
    return this;
  }
}

// Gebruik
loginPage
  .enterUsername('student')
  .enterPassword('cypress123');
```

---

## Page Object met Getters

```typescript
export class ProductsPage {
  // Getter voor dynamische elementen
  get productCards() {
    return cy.get('[data-cy="product-card"]');
  }

  get searchInput() {
    return cy.get('[data-cy="search-input"]');
  }

  getProductByName(name: string) {
    return cy.contains('[data-cy="product-card"]', name);
  }
}
```

---

## Folder Structuur

```
cypress/
├── support/
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── ProductsPage.ts
│   │   └── index.ts        # Exports alle pages
│   ├── commands.ts
│   └── e2e.ts
```

### index.ts:
```typescript
export * from './LoginPage';
export * from './DashboardPage';
export * from './ProductsPage';
```

---

## Volgende: Opdracht 5 & 6

Je gaat nu:
1. Je eerste Page Object maken (LoginPage)
2. Page Objects uitbreiden voor andere pagina's
3. Tests refactoren om POM te gebruiken
