# Transcript: CI/CD Integratie

## Slide 1: CI/CD Integratie

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

"Maak je eigen workflow! In opdracht 19 ga je een GitHub Actions file schrijven. Als je klaar bent heb je een complete CI/CD setup."