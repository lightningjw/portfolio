/**
 * A fact from docs/PORTFOLIO_BRIEF.md that may still be unconfirmed.
 *
 * `known(value)` is confirmed. `todo(note)` is a field the brief marks
 * "TODO:"; it has no value and is hidden on the site. `known(value, note)`
 * is a confirmed value with an open TODO attached to part of it.
 *
 * TODO notes are never rendered unless VITE_SHOW_TODOS=true (see lib/env.ts).
 */
export type Field<T> =
  | { readonly value: T; readonly todo?: string }
  | { readonly value?: undefined; readonly todo: string };

export function known<T>(value: T, todoNote?: string): Field<T> {
  return todoNote === undefined ? { value } : { value, todo: todoNote };
}

export function todo<T = never>(note: string): Field<T> {
  return { todo: note };
}
