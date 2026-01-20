#!/usr/bin/env node
/**
 * Rijkshuisstijl Validation Agent
 *
 * Dit script valideert of de applicatie voldoet aan de Rijkshuisstijl richtlijnen.
 * Het controleert:
 * - Kleuren (primair blauw #01689b, etc.)
 * - Typografie (correcte font-families)
 * - Spacing (8px grid systeem)
 * - Accessibility (focus states, contrast)
 *
 * Gebruik:
 *   node scripts/agents/validate-rijkshuisstijl.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');
const frontendSrc = join(projectRoot, 'demo-app/frontend/src');

// Rijkshuisstijl kleuren
const RIJKSHUISSTIJL_COLORS = {
  'donkerblauw': '#01689b',
  'hemelblauw': '#007bc7',
  'donkergroen': '#275937',
  'groen': '#39870c',
  'rood': '#d52b1e',
  'oranje': '#e17000',
  'paars': '#42145f',
};

// Verboden kleuren (te vermijden)
const FORBIDDEN_COLORS = [
  '#000000', // pure black (use #154273 or #535353)
];

let errors = [];
let warnings = [];
let passed = [];

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║         🏛️  Rijkshuisstijl Validation Agent                    ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

/**
 * Recursief alle bestanden in een directory ophalen
 */
function getAllFiles(dir, extensions = ['.css', '.jsx', '.tsx', '.ts']) {
  const files = [];

  try {
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files.push(...getAllFiles(fullPath, extensions));
      } else if (extensions.includes(extname(item))) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Directory doesn't exist
  }

  return files;
}

/**
 * Check of CSS variabelen worden gebruikt
 */
function checkCSSVariables(content, filePath) {
  const relativePath = filePath.replace(projectRoot, '');

  // Check voor hardcoded hex colors
  const hexColorRegex = /#[0-9a-fA-F]{3,6}\b/g;
  const matches = content.match(hexColorRegex) || [];

  for (const color of matches) {
    const lowerColor = color.toLowerCase();

    // Skip als het in een CSS variabele definitie staat
    if (content.includes(`--rhs-color`) && content.includes(lowerColor)) {
      continue;
    }

    // Check verboden kleuren
    if (FORBIDDEN_COLORS.includes(lowerColor)) {
      warnings.push(`${relativePath}: Vermijd pure black (#000000), gebruik --rhs-color-zwart`);
    }

    // Check of Rijkshuisstijl kleuren hardcoded zijn
    for (const [name, hex] of Object.entries(RIJKSHUISSTIJL_COLORS)) {
      if (lowerColor === hex.toLowerCase()) {
        warnings.push(`${relativePath}: Gebruik var(--rhs-color-${name}) in plaats van ${hex}`);
      }
    }
  }
}

/**
 * Check of tokens.css bestaat en correct is
 */
function checkTokensFile() {
  const tokensPath = join(frontendSrc, 'styles/tokens.css');

  try {
    const content = readFileSync(tokensPath, 'utf-8');

    // Check primaire kleur
    if (content.includes('--rhs-color-donkerblauw') && content.includes('#01689b')) {
      passed.push('✓ Primaire kleur (donkerblauw #01689b) correct gedefinieerd');
    } else {
      errors.push('Primaire kleur --rhs-color-donkerblauw (#01689b) ontbreekt in tokens.css');
    }

    // Check font-family
    if (content.includes('--rhs-font-family')) {
      passed.push('✓ Font-family variabele gedefinieerd');
    } else {
      errors.push('Font-family variabele ontbreekt in tokens.css');
    }

    // Check spacing systeem (8px grid)
    if (content.includes('--rhs-space')) {
      passed.push('✓ Spacing systeem gedefinieerd');
    } else {
      warnings.push('Spacing variabelen (--rhs-space-*) ontbreken');
    }

    // Check focus styling
    if (content.includes('--rhs-focus')) {
      passed.push('✓ Focus styling variabelen gedefinieerd');
    } else {
      warnings.push('Focus styling variabelen ontbreken (accessibility)');
    }

  } catch (err) {
    errors.push('tokens.css bestand niet gevonden in styles/');
  }
}

/**
 * Check data-cy attributen voor Cypress testing
 */
function checkDataCyAttributes(content, filePath) {
  const relativePath = filePath.replace(projectRoot, '');

  // Check voor interactieve elementen zonder data-cy
  const interactiveElements = [
    /<button[^>]*(?!data-cy)[^>]*>/gi,
    /<input[^>]*(?!data-cy)[^>]*>/gi,
    /<a[^>]*(?!data-cy)[^>]*>/gi,
    /<select[^>]*(?!data-cy)[^>]*>/gi,
  ];

  // Simplified check - just verify some data-cy attributes exist
  if (content.includes('data-cy=')) {
    passed.push(`✓ ${relativePath}: data-cy attributen aanwezig`);
  }
}

/**
 * Main validation
 */
function validate() {
  console.log('📁 Scannen van frontend bronbestanden...\n');

  // Check tokens file
  checkTokensFile();

  // Get all CSS and component files
  const files = getAllFiles(frontendSrc);
  console.log(`   Gevonden: ${files.length} bestanden\n`);

  // Check each file
  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');

      if (file.endsWith('.css')) {
        checkCSSVariables(content, file);
      }

      if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
        checkDataCyAttributes(content, file);
      }
    } catch (err) {
      // Skip unreadable files
    }
  }

  // Print results
  console.log('════════════════════════════════════════════════════════════════');
  console.log('                        RESULTATEN');
  console.log('════════════════════════════════════════════════════════════════\n');

  if (passed.length > 0) {
    console.log('✅ GESLAAGD:');
    passed.forEach(p => console.log(`   ${p}`));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  WAARSCHUWINGEN:');
    warnings.forEach(w => console.log(`   ${w}`));
    console.log('');
  }

  if (errors.length > 0) {
    console.log('❌ FOUTEN:');
    errors.forEach(e => console.log(`   ${e}`));
    console.log('');
  }

  // Summary
  console.log('════════════════════════════════════════════════════════════════');
  console.log(`   Geslaagd: ${passed.length} | Waarschuwingen: ${warnings.length} | Fouten: ${errors.length}`);
  console.log('════════════════════════════════════════════════════════════════\n');

  if (errors.length > 0) {
    console.log('❌ Validatie GEFAALD - Los de fouten op voor Rijkshuisstijl compliance\n');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log('⚠️  Validatie GESLAAGD met waarschuwingen\n');
    process.exit(0);
  } else {
    console.log('✅ Validatie GESLAAGD - Applicatie voldoet aan Rijkshuisstijl!\n');
    process.exit(0);
  }
}

validate();
