#!/usr/bin/env node
// Builds the Grand Line theme from src/*.css + assets/*.svg.
//
//   node build.mjs
//
// Outputs:
//   dist/grand-line.user.css  Stylus userstyle (core colours editable in Stylus)
//   dist/grand-line.css       plain CSS for any other CSS injector
//
// In src/, write `url(svg:NAME)` to use assets/NAME.svg; the build inlines each
// asset once as a data-URI custom property (--gl-svg-NAME) and points at it.
// GitHub's CSP allows data: images but blocks external fonts and images from
// unknown hosts, so everything the theme draws ships inside the CSS.

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const pkg = { name: 'GitHub · The Grand Line', version: '1.0.0' };

// Core palette — exposed as Stylus @vars, and as :root defaults in plain CSS.
const core = [
  ['gl-ocean', 'Deep ocean (page)', '#071B2B'],
  ['gl-deep', 'Dark ocean (surfaces)', '#0B2638'],
  ['gl-tide', 'Muted turquoise', '#1B6570'],
  ['gl-parchment', 'Parchment', '#E8D6AD'],
  ['gl-gold', 'Aged gold', '#C6A15B'],
  ['gl-sunset', 'Sunset orange', '#D97941'],
];

const svgUri = (name) => {
  const svg = readFileSync(join(root, 'assets', `${name}.svg`), 'utf8')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim()
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
  return `url("data:image/svg+xml,${svg}")`;
};

// Each asset is inlined once as a custom property and referenced by var().
const used = new Set();
const source = readdirSync(join(root, 'src'))
  .filter((f) => f.endsWith('.css'))
  .sort()
  .map((f) => readFileSync(join(root, 'src', f), 'utf8'))
  .join('\n')
  .replace(/url\(svg:([\w-]+)\)/g, (_, name) => (used.add(name), `var(--gl-svg-${name})`));
const assets = `/* Inlined SVG assets (source: assets/*.svg) */
:root {
${[...used].sort().map((n) => `  --gl-svg-${n}: ${svgUri(n)};`).join('\n')}
}
`;
const body = `${assets}\n${source}`;

const indent = (css) => css.replace(/^(?=.)/gm, '  ');
const scope = (css) =>
  `@-moz-document regexp("https://(gist\\\\.)?github\\\\.com(/.*)?") {\n${indent(css)}}\n`;

const userstyle = `/* ==UserStyle==
@name           ${pkg.name}
@namespace      github.com/reventhTheCoder333
@version        ${pkg.version}
@description    A One Piece–inspired Grand Line theme for GitHub: ocean navy, parchment and aged gold. CSS only.
@author         Reventh Sathish Kumar (reventhTheCoder333)
@license        MIT
@preprocessor   default
${core.map(([k, label, v]) => `@var color ${k.padEnd(14)} "${label}" ${v}`).join('\n')}
==/UserStyle== */

${scope(body)}`;

const plain = `/* ${pkg.name} v${pkg.version} — plain CSS build. Inject on github.com only. */
:root {
${core.map(([k, , v]) => `  --${k}: ${v};`).join('\n')}
}

${body}`;

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist', 'grand-line.user.css'), userstyle);
writeFileSync(join(root, 'dist', 'grand-line.css'), plain);
console.log(
  `built dist/grand-line.user.css (${(userstyle.length / 1024).toFixed(1)} KB), dist/grand-line.css`,
);
