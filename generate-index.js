#!/usr/bin/env node
/**
 * generate-index.js
 *
 * Scans current directory for .html files (excluding index.html itself)
 * and writes a files.js manifest used by index.html.
 *
 * Run: node generate-index.js
 * Or wire it into a git pre-commit hook / npm script.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'files.js');
const SKIP = new Set(['index.html', '404.html']);

function scan(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let results = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      results = results.concat(scan(path.join(dir, entry.name), rel));
    } else if (entry.isFile() && /\.html?$/i.test(entry.name) && !SKIP.has(rel)) {
      results.push(rel);
    }
  }

  return results;
}

const files = scan(ROOT).sort((a, b) =>
  a.localeCompare(b, undefined, { sensitivity: 'base' })
);

const content = `// AUTO-GENERATED. Do not edit. Run \`node generate-index.js\` to regenerate.
const FILES = ${JSON.stringify(files, null, 2)};
`;

fs.writeFileSync(OUT, content);
console.log(`✔ Wrote ${files.length} file(s) to files.js`);
files.forEach(f => console.log(`  · ${f}`));
