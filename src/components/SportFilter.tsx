import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
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

/** Box shared by a plate and its copy in the gold layer, so the two line up exactly. */
const PLATE = 'type-label flex h-(--size-touch) items-center gap-2 rounded-control border px-4';
const ROW = 'flex flex-wrap gap-2';

export function SportFilter({ sports, value, onChange, count, status }: SportFilterProps) {
  const tokens = useMotionTokens();
  const options: { id: FilterValue; label: string }[] = [{ id: 'all', label: 'All' }, ...sports];
  const groupRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);

  // The gold layer is clipped to the active plate. Changing the clip moves the
  // gold, and a CSS transition makes that travel interruptible: a second press
  // retargets from wherever the clip is.
  const placeGold = useCallback(
    (travel: boolean) => {
      const group = groupRef.current;
      const gold = goldRef.current;
      const plate = group?.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!group || !gold || !plate) return;
      const top = plate.offsetTop;
      const left = plate.offsetLeft;
      const right = group.offsetWidth - left - plate.offsetWidth;
      const bottom = group.offsetHeight - top - plate.offsetHeight;
      gold.toggleAttribute('data-travel', travel);
      gold.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round var(--radius-control))`;
    },
    [],
  );

  // First placement has nothing to travel from; later ones do.
  const placedRef = useRef(false);
  useLayoutEffect(() => {
    placeGold(placedRef.current);
    placedRef.current = true;
  }, [placeGold, value, sports]);

  // A resize, a wrap onto two rows or a font swap re-places the clip with no travel.
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const observer = new ResizeObserver(() => placeGold(false));
    observer.observe(group);
    for (const plate of group.querySelectorAll('button')) observer.observe(plate);
    return () => observer.disconnect();
  }, [placeGold, sports]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div ref={groupRef} className="relative">
        <div role="group" aria-label="Filter projects by sport" className={ROW}>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={option.id === value}
              onClick={() => onChange(option.id)}
              className={`pressable ${PLATE} border-line-control text-chalk-dim ${
                option.id === value ? '' : 'hover:border-chalk hover:text-chalk'
              }`}
            >
              {option.id === 'all' ? null : <SportSwatch sport={option.id} />}
              {option.label}
            </button>
          ))}
        </div>

        {/* The gold layer: the same row in on-gold colours, clipped to the active plate. */}
        <div
          ref={goldRef}
          aria-hidden="true"
          className={`gold-clip pointer-events-none absolute inset-0 bg-gold ${ROW}`}
        >
          {options.map((option) => (
            <span key={option.id} className={`${PLATE} border-transparent text-board`}>
              {option.id === 'all' ? null : <SportSwatch sport={option.id} onGold />}
              {option.label}
            </span>
          ))}
        </div>
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
