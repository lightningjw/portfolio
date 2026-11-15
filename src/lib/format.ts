import type { YearMonth } from '../data/experience';

const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function format(value: YearMonth): string {
  return monthYear.format(new Date(`${value}-01T00:00:00Z`));
}

/** "Jul 2026 – Present". Date ranges use an en dash. */
export function dateRange(start: YearMonth, end: YearMonth | null): string {
  return `${format(start)} – ${end ? format(end) : 'Present'}`;
}
