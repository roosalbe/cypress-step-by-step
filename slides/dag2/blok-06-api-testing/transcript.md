# Transcript: API Testing

## Slide 1: API Testing

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

"Aan de slag! Opdracht 11 is GET requests, opdracht 12 de rest. Tip: de API draait op localhost:3001/api."