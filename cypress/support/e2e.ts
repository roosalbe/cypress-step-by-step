// ***********************************************************
// Cypress Cursus - Support File
// Dit bestand wordt automatisch geladen voor elke test
// ***********************************************************

// Import custom commands
import "./commands"

// Prevent Cypress from failing tests on uncaught exceptions from the app
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent the error from failing the test
  // Je kunt hier specifieke errors filteren als nodig
  console.log('Uncaught exception:', err.message);
  return false;
});

// Log the test name before each test
beforeEach(() => {
  cy.log(`**Running: ${Cypress.currentTest.title}**`);
});

// Clear localStorage before each test to ensure clean state
// Uncomment if needed for your tests:
// beforeEach(() => {
//   cy.clearLocalStorage();
// });

// Add custom assertions or global hooks here
// Example: Take screenshot on failure
// afterEach(function() {
//   if (this.currentTest?.state === 'failed') {
//     cy.screenshot(`${this.currentTest.title} - failed`);
//   }
// });
