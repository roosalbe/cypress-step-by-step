# Mocking & Stubbing met cy.intercept()

## Waarom Mocken?

- **Snellere tests** - Geen echte API calls
- **Consistente data** - Altijd dezelfde response
- **Edge cases testen** - Errors, lege data, slow responses
- **Offline testen** - Geen backend nodig

---

## cy.intercept() Basics

```typescript
// Intercept een request
cy.intercept('GET', '/api/products.json').as('getProducts');

cy.visit('/products.html');

// Wacht op de request
cy.wait('@getProducts');
```

---

## Response Mocken

```typescript
// Mock met statische data
cy.intercept('GET', '/api/products.json', {
  statusCode: 200,
  body: {
    products: [
      { id: 1, name: 'Mock Product', price: 99.99 }
    ]
  }
});

// Mock met fixture
cy.intercept('GET', '/api/products.json', {
  fixture: 'products.json'
});
```

---

## Request Matching

```typescript
// Exacte URL
cy.intercept('GET', '/api/products.json');

// Wildcard
cy.intercept('GET', '/api/*');

// Regex
cy.intercept('GET', /\/api\/products/);

// Met query params
cy.intercept({
  method: 'GET',
  url: '/api/products*',
  query: { category: 'electronics' }
});
```

---

## Response Modificatie

```typescript
cy.intercept('GET', '/api/products.json', (req) => {
  req.continue((res) => {
    // Modificeer de echte response
    res.body.products = res.body.products.slice(0, 3);
    res.send();
  });
});
```

---

## Error Responses Mocken

```typescript
// 404 Not Found
cy.intercept('GET', '/api/products.json', {
  statusCode: 404,
  body: { error: 'Not found' }
});

// 500 Server Error
cy.intercept('GET', '/api/products.json', {
  statusCode: 500,
  body: { error: 'Internal server error' }
});

// Network Error
cy.intercept('GET', '/api/products.json', {
  forceNetworkError: true
});
```

---

## Slow Responses

```typescript
// Vertraag response
cy.intercept('GET', '/api/products.json', (req) => {
  req.on('response', (res) => {
    res.setDelay(3000); // 3 seconden
  });
});

// Of met fixture
cy.intercept('GET', '/api/products.json', {
  fixture: 'products.json',
  delay: 3000
});
```

---

## Spy op Requests

```typescript
cy.intercept('POST', '/api/orders').as('createOrder');

// Doe actie die request triggert
cy.get('[data-cy="place-order"]').click();

// Verify de request
cy.wait('@createOrder').then((interception) => {
  expect(interception.request.body).to.have.property('items');
  expect(interception.response.statusCode).to.equal(200);
});
```

---

## Request Body Validatie

```typescript
cy.intercept('POST', '/api/login').as('login');

cy.get('[data-cy="username"]').type('student');
cy.get('[data-cy="password"]').type('cypress123');
cy.get('[data-cy="login-button"]').click();

cy.wait('@login').its('request.body').should('deep.equal', {
  username: 'student',
  password: 'cypress123'
});
```

---

## Meerdere Intercepts

```typescript
// Eerste call geeft lege array
cy.intercept('GET', '/api/products.json', {
  body: { products: [] }
}).as('emptyProducts');

// Na actie, andere response
cy.get('[data-cy="refresh"]').click();

cy.intercept('GET', '/api/products.json', {
  fixture: 'products.json'
}).as('fullProducts');
```

---

## Best Practices

1. **Gebruik aliases** - `cy.intercept(...).as('name')`
2. **Wacht met cy.wait('@alias')** - Niet met `cy.wait(ms)`
3. **Mock alleen wat nodig is** - Niet alles
4. **Test echte API ook** - In aparte test suite
5. **Gebruik fixtures** - Voor complexe mock data

---

## Volgende: Opdracht 15 & 16

Je gaat:
1. Requests intercepten en observeren
2. Responses mocken
3. Error scenarios testen
