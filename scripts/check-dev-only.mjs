#!/usr/bin/env node
// Fails if the development-only stress-test data (src/dev/) reached the
// production build. Run after `vite build`.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
// Present in every fixture and on the data switch itself (src/dev/fixtures.ts).
const SENTINEL = 'BREAK-UI-FIXTURE-DO-NOT-SHIP';

if (!existsSync(DIST)) {
  console.error('Dev-only check failed: dist/ does not exist. Run the build first.');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const leaks = walk(DIST).filter((file) => readFileSync(file).includes(SENTINEL));

if (leaks.length > 0) {
  console.error(`Dev-only check failed: stress-test fixtures found in the build:\n${leaks.join('\n')}`);
  process.exit(1);
}
console.log('Dev-only check passed: no stress-test fixtures in dist/');
