# Transcript: Mocking & Stubbing

## Slide 1: Mocking & Stubbing

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

"Aan de slag met intercepten en mocken! En vergeet niet een error scenario te testen - wat gebeurt er als de API een 500 teruggeeft?"