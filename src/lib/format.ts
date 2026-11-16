import type { YearMonth } from '../data/experience';

const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function format(value: YearMonth): string {
  return monthYear.format(new Date(`${value}-01T00:00:00Z`));
}

/** "Jul 2026 – Present". Date ranges use an en dash. A role inside one month is that month alone. */
export function dateRange(start: YearMonth, end: YearMonth | null): string {
  if (start === end) return format(start);
  return `${format(start)} – ${end ? format(end) : 'Present'}`;
}
