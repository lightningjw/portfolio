/*
 * Field markings: chalk lines from real playing surfaces at regulation
 * proportions. Lines only, always static, always decorative.
 */

// Baseball infield, in feet, with home plate at the origin and second base
// straight up. 90ft base paths; 95ft infield arc centred on the pitcher's
// plate, 60.5ft from home; home plate is 17in wide.
const BASE = 90 / Math.SQRT2;
const RUBBER = 60.5;
const ARC = 95;
const ARC_END = (RUBBER + Math.sqrt(2 * ARC ** 2 - RUBBER ** 2)) / 2;
const PLATE = 17 / 12 / 2;
const DIAMOND_TOP = RUBBER + ARC;
const round = (value: number) => Math.round(value * 100) / 100;
// SVG y runs down, so field coordinates are flipped around the top of the arc.
const fy = (feet: number) => round(DIAMOND_TOP - feet);

const DIAMOND_PATHS = [
  // Foul lines from home plate out to the infield arc.
  `M${round(-ARC_END)} ${fy(ARC_END)}L0 ${fy(0)}L${round(ARC_END)} ${fy(ARC_END)}`,
  // Base paths through second base.
  `M${round(BASE)} ${fy(BASE)}L0 ${fy(2 * BASE)}L${round(-BASE)} ${fy(BASE)}`,
  // Infield arc.
  `M${round(-ARC_END)} ${fy(ARC_END)}A${ARC} ${ARC} 0 0 1 ${round(ARC_END)} ${fy(ARC_END)}`,
  // Home plate.
  `M${-PLATE} ${fy(2 * PLATE)}H${PLATE}V${fy(PLATE)}L0 ${fy(0)}L${-PLATE} ${fy(PLATE)}Z`,
];

/** Baseball diamond for the Projects header band. Background strength, 1024 and up only. */
export function Diamond() {
  return (
    <svg
      viewBox={`${round(-ARC_END)} 0 ${round(2 * ARC_END)} ${round(DIAMOND_TOP)}`}
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-0 hidden h-full overflow-visible lg:block"
    >
      {DIAMOND_PATHS.map((d) => (
        <path key={d} d={d} className="marking stroke-chalk-line-bg" />
      ))}
    </svg>
  );
}
