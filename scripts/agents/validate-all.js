#!/usr/bin/env node
/**
 * Full Validation Agent
 *
 * Dit script draait alle validatie agents:
 * 1. Rijkshuisstijl compliance check
 * 2. Cypress tests (uitwerkingen)
 *
 * Gebruik:
 *   node scripts/agents/validate-all.js
 *   node scripts/agents/validate-all.js --skip-tests  (alleen styling check)
 *   node scripts/agents/validate-all.js --skip-styling (alleen tests)
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const skipTests = args.includes('--skip-tests');
const skipStyling = args.includes('--skip-styling');

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║            🔍 Full Validation Agent                            ║');
console.log('╠════════════════════════════════════════════════════════════════╣');
console.log('║ Dit script valideert:                                          ║');
console.log('║   1. Rijkshuisstijl compliance                                 ║');
console.log('║   2. Cypress tests (uitwerkingen)                              ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

/**
 * Run a script and return a promise
 */
function runScript(scriptPath, name) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Starting: ${name}\n`);
    console.log('────────────────────────────────────────────────────────────────\n');

    const child = spawn('node', [scriptPath], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ name, success: true });
      } else {
        resolve({ name, success: false, code });
      }
    });

    child.on('error', (err) => {
      resolve({ name, success: false, error: err.message });
    });
  });
}

async function main() {
  const results = [];
  const startTime = Date.now();

  // Step 1: Rijkshuisstijl validation
  if (!skipStyling) {
    const stylingResult = await runScript(
      join(__dirname, 'validate-rijkshuisstijl.js'),
      'Rijkshuisstijl Validation'
    );
    results.push(stylingResult);
  }

  // Step 2: Cypress tests
  if (!skipTests) {
    const testsResult = await runScript(
      join(__dirname, 'run-cypress-tests.js'),
      'Cypress Tests (Uitwerkingen)'
    );
    results.push(testsResult);
  }

  // Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                    VALIDATION SUMMARY                          ║');
  console.log('╠════════════════════════════════════════════════════════════════╣');

  for (const result of results) {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    const line = `║ ${status} ${result.name.padEnd(52)}║`;
    console.log(line);
  }

  console.log('╠════════════════════════════════════════════════════════════════╣');
  console.log(`║ Totaal: ${passed} geslaagd, ${failed} gefaald (${duration}s)`.padEnd(65) + '║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('');

  if (failed > 0) {
    console.log('❌ Validatie niet volledig geslaagd. Check de fouten hierboven.\n');
    process.exit(1);
  } else {
    console.log('✅ Alle validaties geslaagd!\n');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
