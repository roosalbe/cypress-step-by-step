#!/usr/bin/env node
/**
 * Didactische Presentatie Generator Agent
 *
 * Genereert Reveal.js presentaties en transcripts voor de Cypress cursus.
 * Output: slides/dag{1,2}/blok-{nn}-{naam}/index.html + transcript.md
 *
 * Gebruik:
 *   node scripts/agents/generate-presentation.js
 *   node scripts/agents/generate-presentation.js --blok 1
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');
const slidesDir = join(projectRoot, 'slides');

// Blok configuraties met content
const BLOKKEN = [
  {
    id: 1,
    dag: 1,
    folder: 'blok-01-introductie',
    titel: 'Introductie Cypress',
    opdrachten: ['01-eerste-test', '02-navigatie-assertions'],
    leerdoelen: [
      'Begrijpen wat Cypress is en waarom het anders is dan Selenium',
      'Een eerste test kunnen schrijven met cy.visit() en cy.get()',
      'Assertions gebruiken met should() en and()'
    ],
    slides: [
      {
        titel: 'Introductie Cypress',
        subtitel: 'End-to-End Testing met plezier',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Waarom Cypress?',
        bullets: [
          'Draait IN de browser, niet erbuiten',
          'Automatische wachttijden (geen sleep() meer!)',
          'Time-travel debugging',
          'Realtime reloads tijdens development'
        ]
      },
      {
        titel: 'Cypress vs Selenium',
        content: `<div class="columns">
          <div>
            <h3>Selenium</h3>
            <ul>
              <li>WebDriver protocol</li>
              <li>Externe browser control</li>
              <li>Veel async/wait code</li>
            </ul>
          </div>
          <div>
            <h3>Cypress</h3>
            <ul>
              <li>Draait in browser</li>
              <li>Directe DOM access</li>
              <li>Automatisch wachten</li>
            </ul>
          </div>
        </div>`
      },
      {
        titel: 'Je eerste test',
        code: `describe('Mijn eerste test', () => {
  it('bezoekt de homepage', () => {
    cy.visit('/')
    cy.get('[data-cy="welcome"]').should('be.visible')
    cy.url().should('include', 'localhost')
  })
})`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 1:</strong> Schrijf je eerste test',
          '<strong>Opdracht 2:</strong> Navigatie en assertions',
          'Open: cypress/e2e/opdrachten/dag1/',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: Introductie Cypress

"Welkom bij de Cypress cursus! De komende twee dagen gaan we leren hoe je end-to-end tests schrijft met Cypress. En ik beloof je: dit wordt leuker dan je denkt.

Cypress is echt anders dan wat je misschien gewend bent van Selenium of andere test frameworks. Het voelt veel meer als gewoon JavaScript schrijven."

## Slide 2: Wat gaan we leren?

"Dit zijn de dingen die je na dit blok kunt. We beginnen rustig - eerst snappen wat Cypress is, dan je eerste test schrijven. Niks ingewikkelds."

## Slide 3: Waarom Cypress?

"Oké, waarom Cypress? Het grote verschil is dat Cypress IN de browser draait. Niet erbuiten zoals Selenium. Dat betekent dat je directe toegang hebt tot alles - de DOM, network requests, localStorage, noem maar op.

En het beste: geen sleep() statements meer! Cypress wacht automatisch tot elementen er zijn. Hoeveel van jullie hebben ooit tests gehad die faalden omdat iets nog niet geladen was? Ja, dat is verleden tijd."

## Slide 4: Cypress vs Selenium

"Even een snelle vergelijking. Selenium werkt via het WebDriver protocol - het stuurt commando's naar een aparte browser driver. Cypress zit gewoon in je browser. Dat maakt het sneller en stabieler.

Je hoeft ook niet meer te dealen met al die async/await gedoe. Cypress handelt dat voor je af."

## Slide 5: Je eerste test

"Dit is hoe een Cypress test eruitziet. Herkenbaar als je Jest of Mocha kent - describe en it blocks.

cy.visit gaat naar een pagina, cy.get pakt een element, en should checkt of iets waar is. Simpel toch?"

## Slide 6: Tijd voor de opdracht!

"Oké, genoeg theorie. Jullie gaan nu zelf aan de slag met opdracht 1 en 2. Open de opdrachten folder en volg de TODO's. Ik loop rond als je vragen hebt. Succes!"`
  },
  {
    id: 2,
    dag: 1,
    folder: 'blok-02-selectors',
    titel: 'Selectors Strategie',
    opdrachten: ['03-selectors-strategie', '04-formulier-interacties'],
    leerdoelen: [
      'Best practices voor stabiele selectors begrijpen',
      'data-cy attributen effectief gebruiken',
      'Formulieren testen met type(), select() en check()'
    ],
    slides: [
      {
        titel: 'Selectors Strategie',
        subtitel: 'Stabiele tests beginnen hier',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Het selector probleem',
        bullets: [
          'CSS classes veranderen bij redesigns',
          'ID\'s worden hergebruikt of verwijderd',
          'XPath is fragiel en moeilijk leesbaar',
          '<strong>Oplossing:</strong> data-cy attributen'
        ]
      },
      {
        titel: 'De selector prioriteit',
        code: `// Vermijd (fragiel)
cy.get('.btn-primary')
cy.get('#submit-btn')
cy.get('form > div:nth-child(2) > button')

// Gebruik (stabiel)
cy.get('[data-cy="submit-button"]')
cy.getByDataCy('submit-button')  // custom command`
      },
      {
        titel: 'Formulier interacties',
        code: `// Tekst invoeren
cy.get('[data-cy="email"]').type('test@example.com')

// Dropdown selecteren
cy.get('[data-cy="country"]').select('Nederland')

// Checkbox aan/uit
cy.get('[data-cy="terms"]').check()
cy.get('[data-cy="newsletter"]').uncheck()`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 3:</strong> Selector strategie oefenen',
          '<strong>Opdracht 4:</strong> Formulieren testen',
          'Let op: gebruik alleen data-cy selectors!',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: Selectors Strategie

"Oké, dit is misschien wel het belangrijkste onderwerp van vandaag. Selectors. Want als je selectors niet goed zijn, krijg je flaky tests. En flaky tests zijn het ergste wat er is."

## Slide 2: Wat gaan we leren?

"We gaan kijken naar best practices, data-cy attributen, en hoe je formulieren test. Na dit blok schrijf je selectors waar je over 2 jaar nog blij mee bent."

## Slide 3: Het selector probleem

"Wie heeft dit meegemaakt: je test werkt prima, dan doet een designer een kleine CSS aanpassing, en boem - test broken. Dat komt omdat je CSS classes als selector gebruikte.

Of nog erger: XPath. Wie heeft er XPath selectors geschreven? Sorry daarvoor. XPath is super fragiel en niemand kan het lezen.

De oplossing is simpel: data-cy attributen. Die zitten er puur voor testing. Geen enkele developer gaat die per ongeluk aanpassen."

## Slide 4: De selector prioriteit

"Kijk, dit is het verschil. Bovenaan zie je wat je NIET moet doen - CSS classes, ID's, of complexe CSS selectors.

Onderaan zie je wat WEL werkt: data-cy attributen. En als je dat custom command maakt, wordt het nog leesbaarder."

## Slide 5: Formulier interacties

"Voor formulieren heb je drie hoofdcommando's: type voor tekst, select voor dropdowns, en check/uncheck voor checkboxes.

Let op: clear() is ook handig als er al tekst in een veld staat. En special keys zoals {enter} kun je ook meegeven aan type()."

## Slide 6: Tijd voor de opdracht!

"Jullie beurt! In opdracht 3 ga je oefenen met selectors, en in opdracht 4 test je een formulier. Probeer echt alleen data-cy te gebruiken. Ik daag je uit!"`
  },
  {
    id: 3,
    dag: 1,
    folder: 'blok-03-page-object-model',
    titel: 'Page Object Model',
    opdrachten: ['05-page-object-basis', '06-page-object-uitbreiding'],
    leerdoelen: [
      'Het Page Object Model pattern begrijpen',
      'Een LoginPage class kunnen maken',
      'Method chaining toepassen voor leesbare tests'
    ],
    slides: [
      {
        titel: 'Page Object Model',
        subtitel: 'Onderhoudbare tests schrijven',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Waarom Page Objects?',
        bullets: [
          'Selectors op één plek (DRY)',
          'Tests lezen als user stories',
          'Makkelijker onderhoud bij UI changes',
          'Herbruikbare acties'
        ]
      },
      {
        titel: 'Een Page Object',
        code: `export class LoginPage {
  // Selectors op één plek
  private emailInput = '[data-cy="email"]'
  private passwordInput = '[data-cy="password"]'
  private submitButton = '[data-cy="login-button"]'

  visit() {
    cy.visit('/login')
    return this
  }

  login(email, password) {
    cy.get(this.emailInput).type(email)
    cy.get(this.passwordInput).type(password)
    cy.get(this.submitButton).click()
    return this
  }
}`
      },
      {
        titel: 'Method Chaining',
        code: `// Zonder Page Object
cy.visit('/login')
cy.get('[data-cy="email"]').type('test@test.nl')
cy.get('[data-cy="password"]').type('password123')
cy.get('[data-cy="login-button"]').click()

// Met Page Object
const loginPage = new LoginPage()
loginPage
  .visit()
  .login('test@test.nl', 'password123')`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 5:</strong> LoginPage class maken',
          '<strong>Opdracht 6:</strong> Meer Page Objects toevoegen',
          'Tip: return this voor method chaining',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: Page Object Model

"Page Object Model, of POM. Dit is een design pattern dat je leven veel makkelijker gaat maken. Serieus, als je dit eenmaal gebruikt, wil je niet meer terug."

## Slide 2: Wat gaan we leren?

"We gaan een LoginPage class maken en leren hoe method chaining werkt. Aan het eind van dit blok schrijven je tests zich bijna als gewone zinnen."

## Slide 3: Waarom Page Objects?

"Het probleem met tests zonder Page Objects: je herhaalt dezelfde selectors overal. Als de login button dan een andere data-cy krijgt, moet je 50 tests aanpassen.

Met Page Objects zet je alle selectors op één plek. Eén aanpassing, klaar. Plus je tests worden veel leesbaarder."

## Slide 4: Een Page Object

"Zo ziet een Page Object eruit. Bovenaan je selectors als private properties. Dan methods voor acties die je op die pagina kunt doen.

Let op de return this aan het eind van elke method. Dat maakt method chaining mogelijk."

## Slide 5: Method Chaining

"Kijk eens naar dit verschil. Bovenaan de 'oude' manier - veel losse Cypress commands. Onderaan met een Page Object - het leest als een verhaal.

loginPage.visit().login(). Dat is toch veel mooier?"

## Slide 6: Tijd voor de opdracht!

"Nu is het aan jullie. In opdracht 5 maak je een LoginPage, in opdracht 6 voeg je er meer Page Objects aan toe. Vergeet niet: return this!"`
  },
  {
    id: 4,
    dag: 1,
    folder: 'blok-04-ui-flows',
    titel: 'UI Flows Testen',
    opdrachten: ['07-login-flow', '08-product-flow'],
    leerdoelen: [
      'Complete user flows end-to-end testen',
      'Happy path en error scenarios dekken',
      'Page Objects combineren in flows'
    ],
    slides: [
      {
        titel: 'UI Flows Testen',
        subtitel: 'Van login tot checkout',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Wat is een UI Flow?',
        bullets: [
          'Een complete user journey door de applicatie',
          'Meerdere pagina\'s en acties achter elkaar',
          'Test de applicatie zoals een echte gebruiker',
          'Combinatie van je Page Objects'
        ]
      },
      {
        titel: 'Login Flow Voorbeeld',
        code: `describe('Login Flow', () => {
  it('successful login shows dashboard', () => {
    loginPage.visit()
    loginPage.login('student@test.nl', 'cypress123')

    dashboardPage.shouldBeVisible()
    dashboardPage.shouldShowWelcomeMessage('Student')
  })

  it('invalid password shows error', () => {
    loginPage.visit()
    loginPage.login('student@test.nl', 'wrong')

    loginPage.shouldShowError('Ongeldige inloggegevens')
  })
})`
      },
      {
        titel: 'Product Flow Voorbeeld',
        code: `describe('Product Flow', () => {
  beforeEach(() => {
    cy.loginViaApi('student@test.nl', 'cypress123')
  })

  it('adds product to cart', () => {
    productsPage.visit()
    productsPage.searchProduct('Laptop')
    productsPage.addToCart('Laptop Pro')

    cartPage.visit()
    cartPage.shouldContainProduct('Laptop Pro')
  })
})`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 7:</strong> Complete login flow testen',
          '<strong>Opdracht 8:</strong> Product en cart flow',
          'Test ook de unhappy paths!',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: UI Flows Testen

"Nu gaan we alles combineren wat we geleerd hebben. We gaan complete user flows testen - van login tot checkout, van zoeken tot bestellen."

## Slide 2: Wat gaan we leren?

"Het doel is dat je straks een hele user journey kunt testen. Niet alleen losse stukjes, maar de complete flow zoals een echte gebruiker die zou doorlopen."

## Slide 3: Wat is een UI Flow?

"Een UI flow is eigenlijk het verhaal van een gebruiker. Ze komen binnen, loggen in, zoeken een product, voegen het toe aan hun winkelwagen, en rekenen af.

Het mooie is: we hebben nu Page Objects, dus dit wordt super leesbaar."

## Slide 4: Login Flow Voorbeeld

"Hier zie je een login flow. Twee scenarios: success en failure. Bij success check je of de dashboard verschijnt, bij failure check je de error message.

Let op hoe leesbaar dit is dankzij de Page Objects. shouldBeVisible, shouldShowWelcomeMessage - dat leest als gewoon Engels."

## Slide 5: Product Flow Voorbeeld

"En hier een product flow. We loggen eerst in via de API - dat is sneller dan via de UI. Dan zoeken we een product, voegen het toe, en checken de cart.

Die beforeEach met loginViaApi is een patroon dat je veel gaat gebruiken. Scheelt enorm veel tijd in je tests."

## Slide 6: Tijd voor de opdracht!

"Nu mogen jullie flows bouwen! Opdracht 7 is de login flow, opdracht 8 de product flow. En vergeet niet: test ook wat er gebeurt als het FOUT gaat. Die unhappy paths zijn minstens zo belangrijk."`
  },
  {
    id: 5,
    dag: 1,
    folder: 'blok-05-debugging',
    titel: 'Debugging & Timeouts',
    opdrachten: ['09-debugging-oefening', '10-timeout-handling'],
    leerdoelen: [
      'Cypress debugging tools effectief gebruiken',
      'Timeouts begrijpen en configureren',
      'Flaky tests oplossen'
    ],
    slides: [
      {
        titel: 'Debugging & Timeouts',
        subtitel: 'Als tests niet doen wat je verwacht',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Debugging Tools',
        bullets: [
          '<code>cy.log()</code> - berichten in de Test Runner',
          '<code>.debug()</code> - pauzeert en opent DevTools',
          '<code>cy.pause()</code> - stopt de test',
          '<code>cy.screenshot()</code> - maakt screenshot'
        ]
      },
      {
        titel: 'Debugging in Actie',
        code: `it('debug voorbeeld', () => {
  cy.visit('/products')

  cy.log('Zoeken naar producten...')

  cy.get('[data-cy="product-list"]')
    .debug()  // Opent DevTools, pauzeert hier
    .find('.product-card')
    .should('have.length.gt', 0)

  cy.pause()  // Test stopt hier, je kunt stappen
})`
      },
      {
        titel: 'Timeouts Configureren',
        code: `// Globaal in cypress.config.ts
defaultCommandTimeout: 10000,  // 10 sec default

// Per command
cy.get('[data-cy="slow-element"]', { timeout: 15000 })
  .should('be.visible')

// Per assertion
cy.get('[data-cy="loading"]')
  .should('not.exist', { timeout: 20000 })`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 9:</strong> Debugging tools gebruiken',
          '<strong>Opdracht 10:</strong> Timeouts configureren',
          'Tip: cy.log() is je beste vriend',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: Debugging & Timeouts

"Laatste onderwerp van dag 1: debugging. Want tests gaan fout. Dat is normaal. Het belangrijke is dat je weet hoe je ze kunt fixen."

## Slide 2: Wat gaan we leren?

"We gaan de debugging tools van Cypress leren gebruiken, en we gaan begrijpen hoe timeouts werken. Na dit blok kun je elke flaky test oplossen."

## Slide 3: Debugging Tools

"Dit zijn je wapens. cy.log voor berichten, .debug voor de DevTools openen, cy.pause om te stoppen, en cy.screenshot voor een plaatje.

Ik gebruik cy.log het meest. Gewoon even loggen waar je bent in de test."

## Slide 4: Debugging in Actie

"Hier zie je ze in actie. Na .debug stopt de test en gaan de DevTools open. Je kunt dan het element inspecteren, in de console kijken, alles.

cy.pause is ook super handig - je kunt dan stap voor stap door je test gaan."

## Slide 5: Timeouts Configureren

"Timeouts. Cypress wacht standaard 4 seconden. Soms is dat niet genoeg - als je API traag is bijvoorbeeld.

Je kunt dit globaal instellen, maar ook per command of per assertion. Kijk naar die tweede optie - timeout als tweede argument. Heel handig."

## Slide 6: Tijd voor de opdracht!

"Laatste opdrachten van vandaag! In opdracht 9 ga je bewust dingen debuggen, in opdracht 10 speel je met timeouts. Morgen gaan we verder met API testing!"`
  },
  {
    id: 6,
    dag: 2,
    folder: 'blok-06-api-testing',
    titel: 'API Testing',
    opdrachten: ['11-api-get-requests', '12-api-post-requests'],
    leerdoelen: [
      'API requests maken met cy.request()',
      'Response data valideren',
      'GET, POST, PUT en DELETE requests'
    ],
    slides: [
      {
        titel: 'API Testing',
        subtitel: 'Testen onder de motorkap',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Waarom API Testing?',
        bullets: [
          'Sneller dan UI tests (geen browser rendering)',
          'Test de business logic direct',
          'Makkelijker edge cases testen',
          'Setup data via API (loginViaApi!)'
        ]
      },
      {
        titel: 'GET Request',
        code: `it('haalt producten op', () => {
  cy.request('GET', '/api/products')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.products).to.have.length.gt(0)
      expect(response.body.products[0]).to.have.property('name')
    })
})

// Of met .its() chaining
cy.request('/api/products')
  .its('body.products')
  .should('have.length.gt', 0)`
      },
      {
        titel: 'POST/PUT/DELETE',
        code: `// POST - nieuwe resource
cy.request('POST', '/api/cart', {
  productId: '123',
  quantity: 2
}).its('status').should('eq', 201)

// PUT - update resource
cy.request('PUT', '/api/cart/item-1', {
  quantity: 5
})

// DELETE - verwijder resource
cy.request('DELETE', '/api/cart/item-1')
  .its('status').should('eq', 200)`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 11:</strong> GET requests en responses',
          '<strong>Opdracht 12:</strong> POST, PUT, DELETE',
          'Check altijd status codes!',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: API Testing

"Welkom bij dag 2! We beginnen met API testing. Dit is waar Cypress echt krachtig wordt - je kunt niet alleen de UI testen, maar ook direct met je backend praten."

## Slide 2: Wat gaan we leren?

"We gaan cy.request() gebruiken voor alle HTTP methods. GET, POST, PUT, DELETE - alles wat je nodig hebt."

## Slide 3: Waarom API Testing?

"API tests zijn VEEL sneller dan UI tests. Geen browser die hoeft te renderen, geen wachten op animaties.

Plus je kunt er test data mee opzetten. Weet je nog die loginViaApi van gisteren? Dat is precies dit - direct de API aanroepen in plaats van door de UI klikken."

## Slide 4: GET Request

"Dit is een GET request. Super simpel - je geeft de URL en Cypress doet de rest. In de .then() kun je de response checken.

Die tweede manier met .its() is nog korter. Handig voor snelle checks."

## Slide 5: POST/PUT/DELETE

"Voor POST, PUT en DELETE geef je de method mee als eerste argument. En bij POST en PUT ook een body met je data.

Let op de status codes - 201 voor created, 200 voor success. Die moet je altijd checken."

## Slide 6: Tijd voor de opdracht!

"Aan de slag! Opdracht 11 is GET requests, opdracht 12 de rest. Tip: de API draait op localhost:3001/api."`
  },
  {
    id: 7,
    dag: 2,
    folder: 'blok-07-custom-commands',
    titel: 'Custom Commands',
    opdrachten: ['13-custom-command-login', '14-custom-command-utilities'],
    leerdoelen: [
      'Custom commands maken met Cypress.Commands.add()',
      'TypeScript type declarations toevoegen',
      'Child commands en dual commands'
    ],
    slides: [
      {
        titel: 'Custom Commands',
        subtitel: 'Bouw je eigen Cypress toolkit',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Waarom Custom Commands?',
        bullets: [
          'Herbruikbare acties (login, setup data)',
          'Leesbare tests (cy.login() vs 10 regels code)',
          'Consistente implementatie overal',
          'Makkelijk aan te passen op één plek'
        ]
      },
      {
        titel: 'Een Custom Command Maken',
        code: `// cypress/support/commands.ts
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/auth/login', { email, password })
    .then((response) => {
      window.localStorage.setItem('token', response.body.token)
    })
})

// Gebruik in tests
cy.login('student@test.nl', 'cypress123')`
      },
      {
        titel: 'TypeScript Types',
        code: `// cypress/support/index.d.ts
declare namespace Cypress {
  interface Chainable {
    /**
     * Login via de API
     * @param email - User email
     * @param password - User password
     */
    login(email: string, password: string): Chainable<void>
  }
}`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 13:</strong> Login command maken',
          '<strong>Opdracht 14:</strong> Utility commands',
          'Vergeet de TypeScript types niet!',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: Custom Commands

"Custom commands zijn een game changer. Je kunt je eigen Cypress commands maken die precies doen wat jij nodig hebt."

## Slide 2: Wat gaan we leren?

"We gaan commands maken, TypeScript types toevoegen, en kijken naar verschillende soorten commands."

## Slide 3: Waarom Custom Commands?

"Stel je voor dat je in 50 tests moet inloggen. Met een custom command is dat cy.login() - één regel. Zonder is het 10 regels copy-paste.

En als de login flow verandert? Met een command pas je het op één plek aan. Zonder moet je 50 tests door."

## Slide 4: Een Custom Command Maken

"Zo maak je een command. Cypress.Commands.add met de naam en een functie. In dit geval doet ie een API call en slaat de token op.

In je test gebruik je het dan gewoon als cy.login(). Cypress herkent het automatisch."

## Slide 5: TypeScript Types

"Dit is belangrijk voor TypeScript projecten. Je moet Cypress vertellen welke commands er zijn en welke parameters ze verwachten.

Dit doe je in index.d.ts. Dan krijg je ook autocomplete in je editor."

## Slide 6: Tijd voor de opdracht!

"Ga je eigen commands bouwen! Opdracht 13 is het login command, opdracht 14 zijn utility commands zoals cy.getByDataCy()."`
  },
  {
    id: 8,
    dag: 2,
    folder: 'blok-08-mocking',
    titel: 'Mocking & Stubbing',
    opdrachten: ['15-intercept-basics', '16-intercept-mocking'],
    leerdoelen: [
      'Network requests intercepten met cy.intercept()',
      'Responses mocken voor gecontroleerde tests',
      'Error scenarios simuleren'
    ],
    slides: [
      {
        titel: 'Mocking & Stubbing',
        subtitel: 'Neem controle over je network',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Waarom Mocken?',
        bullets: [
          'Tests onafhankelijk van backend state',
          'Edge cases testen (errors, lege data)',
          'Snellere tests (geen echte API calls)',
          'Stabielere tests (geen network issues)'
        ]
      },
      {
        titel: 'cy.intercept() Basics',
        code: `// Spy op requests (observeren)
cy.intercept('GET', '/api/products').as('getProducts')
cy.visit('/products')
cy.wait('@getProducts')

// Check de response
cy.wait('@getProducts').then((interception) => {
  expect(interception.response.statusCode).to.eq(200)
  expect(interception.response.body.products).to.have.length(10)
})`
      },
      {
        titel: 'Responses Mocken',
        code: `// Mock met vaste data
cy.intercept('GET', '/api/products', {
  statusCode: 200,
  body: { products: [{ id: 1, name: 'Test Product' }] }
})

// Mock met fixture file
cy.intercept('GET', '/api/products', {
  fixture: 'products.json'
})

// Simuleer een error
cy.intercept('GET', '/api/products', {
  statusCode: 500,
  body: { error: 'Server error' }
})`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 15:</strong> Requests intercepten en observeren',
          '<strong>Opdracht 16:</strong> Responses mocken',
          'Test ook error scenarios!',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: Mocking & Stubbing

"Dit is echt een van de krachtigste features van Cypress. Met cy.intercept() kun je alle network traffic onderscheppen en manipuleren."

## Slide 2: Wat gaan we leren?

"We gaan requests intercepten, responses mocken, en error scenarios simuleren. Na dit blok kun je elke situatie testen - ook als je backend het niet ondersteunt."

## Slide 3: Waarom Mocken?

"Stel je wilt testen wat er gebeurt als de server een 500 error geeft. Hoe doe je dat met een echte backend? Lastig.

Met mocking zeg je gewoon: als er een request naar /api/products komt, return deze response. Klaar. Je hebt volledige controle."

## Slide 4: cy.intercept() Basics

"Dit is hoe je een request onderschept. cy.intercept met de method en URL. Met .as() geef je een alias, en met cy.wait() wacht je tot ie gebeurt.

Je kunt dan de interception inspecteren - status code, body, headers, alles."

## Slide 5: Responses Mocken

"En hier mock je responses. Eerste voorbeeld: gewoon een object teruggeven. Tweede: een fixture file gebruiken. Derde: een error simuleren.

Die fixtures zijn super handig - je hebt je test data in JSON files en kunt ze overal hergebruiken."

## Slide 6: Tijd voor de opdracht!

"Aan de slag met intercepten en mocken! En vergeet niet een error scenario te testen - wat gebeurt er als de API een 500 teruggeeft?"`
  },
  {
    id: 9,
    dag: 2,
    folder: 'blok-09-fixtures',
    titel: 'Fixtures & Testdata',
    opdrachten: ['17-fixtures-testdata', '18-data-driven-tests'],
    leerdoelen: [
      'Fixtures laden en gebruiken met cy.fixture()',
      'Test data organiseren en beheren',
      'Data-driven tests schrijven met loops'
    ],
    slides: [
      {
        titel: 'Fixtures & Testdata',
        subtitel: 'Georganiseerde test data',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Wat zijn Fixtures?',
        bullets: [
          'JSON bestanden met test data',
          'Leven in cypress/fixtures/',
          'Herbruikbaar in meerdere tests',
          'Makkelijk te onderhouden'
        ]
      },
      {
        titel: 'Fixtures Gebruiken',
        code: `// cypress/fixtures/users.json
{
  "validUser": {
    "email": "student@test.nl",
    "password": "cypress123"
  },
  "invalidUser": {
    "email": "wrong@test.nl",
    "password": "wrong"
  }
}

// In je test
cy.fixture('users').then((users) => {
  cy.login(users.validUser.email, users.validUser.password)
})`
      },
      {
        titel: 'Data-Driven Tests',
        code: `// Test meerdere scenarios
const testCases = [
  { product: 'Laptop', expected: 1299 },
  { product: 'Mouse', expected: 49 },
  { product: 'Keyboard', expected: 129 }
]

testCases.forEach(({ product, expected }) => {
  it(\`shows correct price for \${product}\`, () => {
    productsPage.searchProduct(product)
    productsPage.getPrice().should('contain', expected)
  })
})`
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 17:</strong> Fixtures laden en gebruiken',
          '<strong>Opdracht 18:</strong> Data-driven tests',
          'Organiseer je data logisch!',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: Fixtures & Testdata

"Fixtures zijn hoe je test data organiseert in Cypress. Geen hardcoded strings meer in je tests, maar nette JSON files."

## Slide 2: Wat gaan we leren?

"We gaan fixtures gebruiken, data organiseren, en data-driven tests schrijven. Die laatste is super krachtig - één test die meerdere scenarios dekt."

## Slide 3: Wat zijn Fixtures?

"Fixtures zijn gewoon JSON bestanden in de fixtures folder. Je kunt er users in zetten, producten, testscenarios - alles wat je nodig hebt.

Het voordeel: je test data is gescheiden van je test logica. Makkelijker te onderhouden."

## Slide 4: Fixtures Gebruiken

"Zo ziet een fixture eruit. Gewoon JSON. En in je test laad je het met cy.fixture(). In de .then() heb je toegang tot alle data.

Je kunt het ook combineren met aliases voor nog makkelijker gebruik."

## Slide 5: Data-Driven Tests

"Dit is echt cool. Je definieert een array met test cases, en dan loop je eroverheen. Cypress maakt automatisch aparte tests voor elke case.

In je test results zie je dan: shows correct price for Laptop, shows correct price for Mouse, etc. Drie tests met bijna geen code duplicatie."

## Slide 6: Tijd voor de opdracht!

"Ga fixtures gebruiken en data-driven tests schrijven! Dit is een patroon dat je veel gaat gebruiken in echte projecten."`
  },
  {
    id: 10,
    dag: 2,
    folder: 'blok-10-cicd',
    titel: 'CI/CD Integratie',
    opdrachten: ['19-cicd-config'],
    leerdoelen: [
      'Cypress in CI/CD pipelines draaien',
      'GitHub Actions workflow configureren',
      'Test reports en artifacts beheren'
    ],
    slides: [
      {
        titel: 'CI/CD Integratie',
        subtitel: 'Tests automatisch draaien',
        type: 'title'
      },
      {
        titel: 'Wat gaan we leren?',
        type: 'leerdoelen'
      },
      {
        titel: 'Waarom CI/CD?',
        bullets: [
          'Tests draaien bij elke PR',
          'Bugs vinden voor ze in main komen',
          'Consistent test environment',
          'Automatische quality gates'
        ]
      },
      {
        titel: 'GitHub Actions Workflow',
        code: `name: Cypress Tests
on: [push, pull_request]

jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm run dev
          wait-on: 'http://localhost:3000'`
      },
      {
        titel: 'Best Practices',
        bullets: [
          'Gebruik de officiële cypress-io/github-action',
          'Start je app in de workflow',
          'Upload screenshots/videos als artifacts',
          'Paralleliseer voor snelheid'
        ]
      },
      {
        titel: 'Tijd voor de opdracht!',
        bullets: [
          '<strong>Opdracht 19:</strong> GitHub Actions configureren',
          'Maak een werkende workflow',
          'Test lokaal met act (optioneel)',
          'Tijd: ~50 minuten'
        ]
      }
    ],
    transcript: `## Slide 1: CI/CD Integratie

"Bijna klaar! Nu gaan we kijken hoe je Cypress in je CI/CD pipeline draait. Want tests die je handmatig moet starten, worden vergeten."

## Slide 2: Wat gaan we leren?

"We gaan een GitHub Actions workflow maken die je tests automatisch draait bij elke push."

## Slide 3: Waarom CI/CD?

"Tests in CI/CD draaien heeft mega voordelen. Elke PR wordt automatisch getest. Je kunt niet meer vergeten om tests te draaien. En als iets faalt, block je de merge.

Dit is hoe professionele teams werken."

## Slide 4: GitHub Actions Workflow

"Dit is een complete workflow. Bij push of PR start ie, draait op Ubuntu, checked de code uit, en gebruikt de officiële Cypress action.

Die action doet alles: npm install, start je app, wacht tot ie up is, en draait de tests."

## Slide 5: Best Practices

"Een paar tips. Gebruik altijd de officiële action - die handelt alle edge cases af. Start je app IN de workflow, niet erbuiten. En upload screenshots en videos als artifacts - super handig voor debugging."

## Slide 6: Tijd voor de opdracht!

"Maak je eigen workflow! In opdracht 19 ga je een GitHub Actions file schrijven. Als je klaar bent heb je een complete CI/CD setup."`
  },
  {
    id: 11,
    dag: 2,
    folder: 'blok-11-eindopdracht',
    titel: 'Eindopdracht',
    opdrachten: ['20-eindopdracht'],
    leerdoelen: [
      'Alle geleerde concepten combineren',
      'Een complete test suite bouwen',
      'Best practices toepassen'
    ],
    slides: [
      {
        titel: 'Eindopdracht',
        subtitel: 'Laat zien wat je kunt!',
        type: 'title'
      },
      {
        titel: 'De Opdracht',
        bullets: [
          'Bouw een complete E2E test suite',
          'Minimaal 10 tests',
          'Gebruik Page Objects',
          'Gebruik Custom Commands',
          'Minimaal 1x cy.intercept()',
          'Minimaal 1 data-driven test'
        ]
      },
      {
        titel: 'Succes!',
        content: `<div style="text-align: center; padding: 2em;">
          <p style="font-size: 1.5em;">Tijd: ~50 minuten</p>
          <p style="font-size: 1.2em; color: #86868b;">Vraag hulp als je vastloopt!</p>
        </div>`
      }
    ],
    transcript: `## Slide 1: Eindopdracht

"Dit is het moment! De eindopdracht. Hier ga je alles combineren wat je de afgelopen twee dagen hebt geleerd."

## Slide 2: De Opdracht

"Dit zijn de requirements. Je bouwt een complete test suite met minimaal 10 tests. Je gebruikt Page Objects, Custom Commands, cy.intercept(), en minstens één data-driven test.

Kijk even terug naar je eerdere opdrachten als je iets vergeten bent. Alles wat je nodig hebt, heb je al gedaan."

## Slide 3: Succes!

"Je hebt 50 minuten. Dat is genoeg als je de eerdere opdrachten goed hebt gedaan. En als je vastloopt - vraag hulp! Daar ben ik voor.

Succes!"`
  }
];

/**
 * Genereer HTML voor een slide
 */
function generateSlideHtml(slide, leerdoelen) {
  if (slide.type === 'title') {
    return `      <section class="title-slide">
        <h1>${slide.titel}</h1>
        <p>${slide.subtitel || ''}</p>
      </section>`;
  }

  if (slide.type === 'leerdoelen') {
    const items = leerdoelen.map(l => `            <li>${l}</li>`).join('\n');
    return `      <section>
        <h2>${slide.titel}</h2>
        <div class="leerdoelen">
          <h3>Na dit blok kun je:</h3>
          <ul>
${items}
          </ul>
        </div>
      </section>`;
  }

  if (slide.code) {
    return `      <section>
        <h2>${slide.titel}</h2>
        <pre><code class="language-javascript" data-trim data-noescape>${escapeHtml(slide.code)}</code></pre>
      </section>`;
  }

  if (slide.bullets) {
    const items = slide.bullets.map(b => `          <li>${b}</li>`).join('\n');
    return `      <section>
        <h2>${slide.titel}</h2>
        <ul>
${items}
        </ul>
      </section>`;
  }

  if (slide.content) {
    return `      <section>
        <h2>${slide.titel}</h2>
        ${slide.content}
      </section>`;
  }

  return `      <section>
        <h2>${slide.titel}</h2>
      </section>`;
}

/**
 * Escape HTML entities
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Genereer volledige Reveal.js presentatie
 */
function generatePresentation(blok) {
  const slidesHtml = blok.slides
    .map(slide => generateSlideHtml(slide, blok.leerdoelen))
    .join('\n\n');

  const assetsPath = blok.dag === 1 ? '../../assets' : '../../assets';

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blok.titel} - Cypress Cursus</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/monokai.css">
  <link rel="stylesheet" href="${assetsPath}/minimal.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
${slidesHtml}
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/dist/reveal.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4/plugin/highlight/highlight.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      slideNumber: true,
      plugins: [RevealHighlight]
    });
  </script>
</body>
</html>`;
}

/**
 * Main functie
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║      📚 Didactische Presentatie Generator                       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  let generated = 0;

  for (const blok of BLOKKEN) {
    const dagFolder = `dag${blok.dag}`;
    const outputDir = join(slidesDir, dagFolder, blok.folder);

    // Maak directory aan
    mkdirSync(outputDir, { recursive: true });

    // Genereer presentatie
    const presentation = generatePresentation(blok);
    const presentationPath = join(outputDir, 'index.html');
    writeFileSync(presentationPath, presentation);

    // Schrijf transcript
    const transcriptPath = join(outputDir, 'transcript.md');
    writeFileSync(transcriptPath, `# Transcript: ${blok.titel}\n\n${blok.transcript}`);

    console.log(`✅ Blok ${blok.id}: ${blok.titel}`);
    console.log(`   📄 ${presentationPath.replace(projectRoot, '')}`);
    console.log(`   📝 ${transcriptPath.replace(projectRoot, '')}\n`);

    generated++;
  }

  console.log('════════════════════════════════════════════════════════════════');
  console.log(`✅ ${generated} presentaties gegenereerd!`);
  console.log(`📁 Output: slides/dag1/ en slides/dag2/`);
  console.log(`🚀 Start met: npx serve slides`);
  console.log('════════════════════════════════════════════════════════════════\n');
}

main();
