import type { SportId } from '../data/projects';

const SWATCH: Record<SportId, string> = {
  baseball: 'bg-sport-baseball',
  basketball: 'bg-sport-basketball',
  motorsport: 'bg-sport-motorsport',
  'core-ml': 'bg-sport-core-ml',
};

/** The sport accent swatch. Always sits beside the sport's name; `onGold` switches it to board. */
export function SportSwatch({ sport, onGold = false }: { sport: SportId; onGold?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-(--size-swatch) shrink-0 ${onGold ? 'on-gold-settle bg-board' : SWATCH[sport]}`}
    />
  );
}
