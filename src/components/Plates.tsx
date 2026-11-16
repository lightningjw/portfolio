interface PlatesProps {
  /** Characters to hang, one per plate. An empty string in the list is an empty plate. */
  chars: readonly string[];
  size: 'xl' | 'm';
}

const SIZE = { xl: 'type-numeral-xl', m: 'type-numeral-m' } as const;

/**
 * A stat set one character per plate. Big Shoulders Display has no tabular
 * figures, so the fixed-width plates are what aligns the numerals.
 */
export function Plates({ chars, size }: PlatesProps) {
  return (
    <span aria-hidden="true" className={`plate-row shrink-0 text-chalk ${SIZE[size]}`}>
      {chars.map((char, index) => (
        <span key={index} className={`plate ${char === '.' ? 'plate-point' : ''}`}>
          {char}
        </span>
      ))}
    </span>
  );
}

/** Two empty plates: the slot has not been played yet. */
export const BLANK_PLATES = ['', ''] as const;
