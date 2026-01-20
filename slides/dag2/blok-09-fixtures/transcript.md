# Transcript: Fixtures & Testdata

## Slide 1: Fixtures & Testdata

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

"Ga fixtures gebruiken en data-driven tests schrijven! Dit is een patroon dat je veel gaat gebruiken in echte projecten."