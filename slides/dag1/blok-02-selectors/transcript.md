# Transcript: Selectors Strategie

## Slide 1: Selectors Strategie

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

"Jullie beurt! In opdracht 3 ga je oefenen met selectors, en in opdracht 4 test je een formulier. Probeer echt alleen data-cy te gebruiken. Ik daag je uit!"