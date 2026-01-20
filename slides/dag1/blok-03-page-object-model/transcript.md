# Transcript: Page Object Model

## Slide 1: Page Object Model

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

"Nu is het aan jullie. In opdracht 5 maak je een LoginPage, in opdracht 6 voeg je er meer Page Objects aan toe. Vergeet niet: return this!"