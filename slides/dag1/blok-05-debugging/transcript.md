# Transcript: Debugging & Timeouts

## Slide 1: Debugging & Timeouts

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

"Laatste opdrachten van vandaag! In opdracht 9 ga je bewust dingen debuggen, in opdracht 10 speel je met timeouts. Morgen gaan we verder met API testing!"