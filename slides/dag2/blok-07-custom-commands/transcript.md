# Transcript: Custom Commands

## Slide 1: Custom Commands

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

"Ga je eigen commands bouwen! Opdracht 13 is het login command, opdracht 14 zijn utility commands zoals cy.getByDataCy()."