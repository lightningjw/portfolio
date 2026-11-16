import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

let tree: ReactNode = <App />;

// Stress-test data switch (?data=worst). import.meta.env.DEV is a build-time
// constant, so a production build drops this branch and never emits src/dev/.
// scripts/check-dev-only.mjs verifies that on every build.
if (import.meta.env.DEV) {
  const { DevData } = await import('./dev/DevData');
  tree = <DevData>{tree}</DevData>;
}

createRoot(root).render(<StrictMode>{tree}</StrictMode>);
