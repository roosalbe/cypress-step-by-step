# Transcript: UI Flows Testen

## Slide 1: UI Flows Testen

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

"Nu mogen jullie flows bouwen! Opdracht 7 is de login flow, opdracht 8 de product flow. En vergeet niet: test ook wat er gebeurt als het FOUT gaat. Die unhappy paths zijn minstens zo belangrijk."