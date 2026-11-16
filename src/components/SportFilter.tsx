import { AnimatePresence, motion } from 'motion/react';
import type { SportId } from '../data/projects';
import { useMotionTokens } from '../lib/motion';
import { Plates } from './Plates';
import { SportSwatch } from './SportSwatch';

export type FilterValue = SportId | 'all';

interface SportFilterProps {
  /** Categories that have at least one project, in display order. */
  sports: readonly { id: SportId; label: string }[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  /** Number of projects currently shown. */
  count: number;
  /** Polite announcement of the result. */
  status: string;
}

/** Two plates, right-aligned, with a leading empty plate for single digits. */
function countChars(count: number): string[] {
  const digits = [...String(count)];
  return digits.length === 1 ? ['', ...digits] : digits;
}

export function SportFilter({ sports, value, onChange, count, status }: SportFilterProps) {
  const tokens = useMotionTokens();
  const options: { id: FilterValue; label: string }[] = [{ id: 'all', label: 'All' }, ...sports];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div role="group" aria-label="Filter projects by sport" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.id)}
              // The active plate keeps its border and resting label colour: the
              // gold plate covers the border, and the label switches to board
              // on its own span once the gold has landed (on-gold-settle).
              className={`pressable type-label relative flex h-(--size-touch) items-center gap-2 rounded-control border border-line-control px-4 text-chalk-dim ${
                active ? '' : 'hover:border-chalk hover:text-chalk'
              }`}
            >
              {active ? (
                // One shared gold plate that travels between buttons by transform.
                <motion.span
                  layoutId="filter-gold"
                  aria-hidden="true"
                  className="absolute -inset-(--size-hairline) bg-gold"
                  // The radius is an inline value so Motion can counter-scale it:
                  // the plate stretches between plates of different widths, and a
                  // class-set radius stretched with it.
                  style={{ borderRadius: tokens.radiusControl }}
                  transition={{ duration: tokens.layout, ease: tokens.easeInOut }}
                />
              ) : null}
              {option.id === 'all' ? null : (
                <span className="relative flex">
                  <SportSwatch sport={option.id} onGold={active} />
                </span>
              )}
              <span className={`relative ${active ? 'on-gold-settle text-board' : ''}`}>{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="slot relative ml-auto flex h-(--size-touch) items-center overflow-hidden rounded-plate px-2">
        <span className="sr-only">{count} shown</span>
        {/* Sizes the slot; the animated copies sit on top of it. */}
        <span className="invisible flex">
          <Plates chars={countChars(count)} size="m" />
        </span>
        <AnimatePresence initial={false}>
          <motion.span
            key={count}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: tokens.base, ease: tokens.easeOut }}
          >
            <Plates chars={countChars(count)} size="m" />
          </motion.span>
        </AnimatePresence>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
    </div>
  );
}
