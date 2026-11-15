#!/usr/bin/env node
// Fails if a component reaches around the design tokens.
// Tokens live in src/styles/tokens.css. Everything under src/ except that
// file must be free of raw hex colours, Tailwind arbitrary values and
// literal px / ms / rem sizes. A line can opt out with a "tokens-ok: reason"
// comment where a platform API cannot read a CSS variable.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = 'src';
const ALLOWED = new Set(['src/styles/tokens.css']);
const RULES = [
  { name: 'raw hex colour', re: /#[0-9a-fA-F]{3,8}\b/g },
  { name: 'Tailwind arbitrary value', re: /[a-z]-\[[^\]]+\]/g },
  { name: 'literal size or duration', re: /\b\d*\.?\d+(px|rem|ms)\b/g },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const problems = [];
for (const file of walk(ROOT)) {
  const rel = relative('.', file).replaceAll('\\', '/');
  if (ALLOWED.has(rel) || !/\.(tsx?|css)$/.test(rel)) continue;
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.includes('tokens-ok:')) return;
      for (const { name, re } of RULES) {
        for (const match of line.matchAll(re)) {
          problems.push(`${rel}:${i + 1}  ${name}: ${match[0]}`);
        }
      }
    });
}

if (problems.length > 0) {
  console.error(`Token check failed (${problems.length}):\n${problems.join('\n')}`);
  process.exit(1);
}
console.log('Token check passed: no raw hex, arbitrary values or literal sizes outside tokens.css');
