# API Testing met Cypress

## Waarom API Testing?

- **Sneller** dan UI tests
- **Stabieler** - geen DOM afhankelijkheid
- **Test backend** onafhankelijk van frontend
- **Setup/teardown** - data voorbereiden voor UI tests

---

## cy.request() Basics

```typescript
// GET request
cy.request('GET', '/api/products.json')
  .then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('products');
  });

// Kortere syntax
cy.request('/api/products.json')
  .its('status')
  .should('equal', 200);
```

---

## Request Methods

```typescript
// GET
cy.request('GET', '/api/users.json');

// POST
cy.request('POST', '/api/users', {
  username: 'newuser',
  email: 'new@test.nl'
});

// PUT
cy.request('PUT', '/api/users/1', {
  name: 'Updated Name'
});

// DELETE
cy.request('DELETE', '/api/users/1');
```

---

## Request Opties

```typescript
cy.request({
  method: 'POST',
  url: '/api/login',
  body: {
    username: 'student',
    password: 'cypress123'
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  failOnStatusCode: false, // Laat test niet falen bij 4xx/5xx
  timeout: 10000
});
```

---

## Response Validatie

```typescript
cy.request('/api/products.json').then((response) => {
  // Status code
  expect(response.status).to.equal(200);

  // Headers
  expect(response.headers['content-type'])
    .to.include('application/json');

  // Body
  expect(response.body.products).to.have.length.greaterThan(0);

  // Specifiek product
  const laptop = response.body.products
    .find((p: Product) => p.name.includes('Laptop'));
  expect(laptop.price).to.be.greaterThan(1000);
});
```

---

## Chaining Requests

```typescript
// Login en gebruik token voor volgende request
cy.request('POST', '/api/login', credentials)
  .its('body.token')
  .then((token) => {
    cy.request({
      url: '/api/protected',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  });
```

---

## API voor Test Setup

```typescript
describe('Product Tests', () => {
  beforeEach(() => {
    // Login via API (sneller dan UI)
    cy.request('POST', '/api/login', {
      username: 'student',
      password: 'cypress123'
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
  });

  it('should show products', () => {
    cy.visit('/products.html');
    // User is al ingelogd via API
  });
});
```

---

## Best Practices

1. **Gebruik API voor setup** - Sneller dan UI clicks
2. **Valideer response structuur** - Niet alleen status
3. **Test edge cases** - 404, 500, invalid data
4. **Combineer met UI tests** - API setup + UI verificatie

---

## Volgende: Opdracht 11 & 12

Je gaat oefenen met:
1. GET requests en response validatie
2. POST/PUT/DELETE requests
3. API voor test data setup
