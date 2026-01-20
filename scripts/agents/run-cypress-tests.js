#!/usr/bin/env node
/**
 * Cypress Test Runner Agent
 *
 * Dit script draait alle Cypress tests in de uitwerkingen folder
 * en rapporteert de resultaten.
 *
 * Gebruik:
 *   node scripts/agents/run-cypress-tests.js
 *   node scripts/agents/run-cypress-tests.js --spec "cypress/e2e/uitwerkingen/**/*.cy.ts"
 *   node scripts/agents/run-cypress-tests.js --headed
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

// Parse command line arguments
const args = process.argv.slice(2);
const isHeaded = args.includes('--headed');
const specIndex = args.indexOf('--spec');
const specPattern = specIndex !== -1 ? args[specIndex + 1] : 'cypress/e2e/uitwerkingen/**/*.cy.ts';

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║           🧪 Cypress Test Runner Agent                         ║');
console.log('╠════════════════════════════════════════════════════════════════╣');
console.log(`║ Spec Pattern: ${specPattern.padEnd(48)}║`);
console.log(`║ Mode: ${(isHeaded ? 'Headed (browser visible)' : 'Headless').padEnd(56)}║`);
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// Build cypress command
const cypressArgs = [
  'run',
  '--spec', specPattern,
];

if (isHeaded) {
  cypressArgs.push('--headed');
}

// Run cypress
const cypress = spawn('npx', ['cypress', ...cypressArgs], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: true
});

cypress.on('close', (code) => {
  console.log('');
  console.log('════════════════════════════════════════════════════════════════');

  if (code === 0) {
    console.log('✅ Alle tests zijn geslaagd!');
  } else {
    console.log(`❌ Tests gefaald met exit code: ${code}`);
    console.log('');
    console.log('Tips voor debugging:');
    console.log('  1. Draai met --headed om de browser te zien');
    console.log('  2. Check screenshots in cypress/screenshots/');
    console.log('  3. Gebruik cy.pause() om te stoppen op een specifiek punt');
  }

  console.log('════════════════════════════════════════════════════════════════');
  process.exit(code);
});

cypress.on('error', (err) => {
  console.error('❌ Kon Cypress niet starten:', err.message);
  console.log('');
  console.log('Zorg ervoor dat:');
  console.log('  1. De applicatie draait (npm run dev)');
  console.log('  2. Cypress is geïnstalleerd (npm install)');
  process.exit(1);
});
