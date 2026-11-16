import type { ReactNode } from 'react';

/**
 * A visible placeholder for an unconfirmed brief field. Callers render it
 * only when SHOW_TODOS is on; it never appears on the deployed site.
 */
export function TodoNote({ children }: { children: ReactNode }) {
  // The flag is read here directly, not through lib/env.ts: the bundler only
  // drops this markup, and its "TODO" text, from the built files when the
  // check is a constant inside this function.
  if (import.meta.env.VITE_SHOW_TODOS !== 'true') return null;
  return (
    <span className="type-body-s inline-block border border-dashed border-line-control px-2 py-1 text-chalk-dim">
      TODO: {children}
    </span>
  );
}
