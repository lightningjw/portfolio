import type { ReactNode } from 'react';

/**
 * A visible placeholder for an unconfirmed brief field. Callers render it
 * only when SHOW_TODOS is on; it never appears on the deployed site.
 */
export function TodoNote({ children }: { children: ReactNode }) {
  return (
    <span className="type-body-s inline-block border border-dashed border-line-control px-2 py-1 text-chalk-dim">
      TODO: {children}
    </span>
  );
}
