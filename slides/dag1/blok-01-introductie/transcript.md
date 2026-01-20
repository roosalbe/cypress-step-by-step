# Transcript: Introductie Cypress

## Slide 1: Introductie Cypress

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

"Oké, genoeg theorie. Jullie gaan nu zelf aan de slag met opdracht 1 en 2. Open de opdrachten folder en volg de TODO's. Ik loop rond als je vragen hebt. Succes!"