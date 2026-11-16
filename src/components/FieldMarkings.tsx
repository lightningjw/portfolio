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

// FIBA court, in viewBox units of 10cm: 15m wide, centre circle radius 1.8m,
// key 4.9m wide, three-point corner lines 0.9m in from each sideline.
const COURT_WIDTH = 150;
const CENTRE_RADIUS = 18;
const KEY_HALF_WIDTH = 24.5;
const CORNER_INSET = 9;
/** Depth of court shown above the baseline before the band crops it. */
const BASELINE_BAND = 14;
const BASELINE_Y = BASELINE_BAND;
const BASELINE_TICKS = [
  0,
  CORNER_INSET,
  COURT_WIDTH / 2 - KEY_HALF_WIDTH,
  COURT_WIDTH / 2 + KEY_HALF_WIDTH,
  COURT_WIDTH - CORNER_INSET,
  COURT_WIDTH,
];

/** Halfway line and centre circle, cropped by the band. Divider between About and Experience. */
export function CentreCircle() {
  return (
    <svg
      viewBox={`0 ${-CENTRE_RADIUS} ${COURT_WIDTH} ${2 * CENTRE_RADIUS}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="pointer-events-none block h-(--size-divider) w-full"
    >
      <path d={`M0 0H${COURT_WIDTH}`} className="marking stroke-chalk-line-divider" />
      <circle cx={COURT_WIDTH / 2} cy={0} r={CENTRE_RADIUS} className="marking stroke-chalk-line-divider" />
    </svg>
  );
}

/**
 * Court baseline. The marks along it are the real lines that meet a baseline
 * (sidelines, three-point corner lines, key), cropped by the band.
 * Divider above Contact.
 */
export function Baseline() {
  return (
    <svg
      viewBox={`0 0 ${COURT_WIDTH} ${BASELINE_BAND + 0.5}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="pointer-events-none block h-(--size-divider-baseline) w-full"
    >
      <path d={`M0 ${BASELINE_Y}H${COURT_WIDTH}`} className="marking stroke-chalk-line-divider" />
      {BASELINE_TICKS.map((x) => (
        <path key={x} d={`M${x} ${BASELINE_Y}V0`} className="marking stroke-chalk-line-divider" />
      ))}
    </svg>
  );
}
