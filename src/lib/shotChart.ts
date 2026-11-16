import data from '../data/heroShotBins.json';

/*
 * Geometry for the hero shot chart. Positions are viewBox units on a FIBA
 * half court: 1 unit is 10cm, so the court is 150 wide and 140 deep. The
 * baseline is at the bottom of the drawing.
 *
 * Everything drawn here comes from src/data/heroShotBins.json (bin totals
 * only) or from FIBA court regulations. Nothing is synthetic.
 */

const UNITS_PER_METRE = 10;
export const COURT = { width: 150, depth: 140 } as const;

/** Points per shot class bounds (DESIGN.md, Hero). Five classes. */
export const PPS_BOUNDS = [0.7, 0.85, 1.0, 1.15] as const;
/** The 95th percentile bin; volume above it does not grow the hexagon. */
const VOLUME_CAP = 310;
const MIN_SCALE = 0.35;
const RING_COUNT = 8;

// FIBA regulation distances, in metres.
const RIM_FROM_BASELINE = 1.575;
const RIM_RADIUS = 0.225;
const BACKBOARD_FROM_BASELINE = 1.2;
const BACKBOARD_WIDTH = 1.8;
const KEY_WIDTH = 4.9;
const KEY_DEPTH = 5.8;
const CIRCLE_RADIUS = 1.8;
const NO_CHARGE_RADIUS = 1.25;
const THREE_RADIUS = 6.75;
const THREE_CORNER_FROM_SIDELINE = 0.9;

const u = (metres: number) => Math.round(metres * UNITS_PER_METRE * 1000) / 1000;
/** Depth from the baseline to a y coordinate (baseline at the bottom). */
const y = (metres: number) => COURT.depth - u(metres);

const centreX = COURT.width / 2;
const rimY = y(RIM_FROM_BASELINE);
const threeCornerX = u(THREE_CORNER_FROM_SIDELINE);
const threeArcY = y(
  RIM_FROM_BASELINE + Math.sqrt(THREE_RADIUS ** 2 - (COURT.width / 2 / UNITS_PER_METRE - THREE_CORNER_FROM_SIDELINE) ** 2),
);
const keyLeft = centreX - u(KEY_WIDTH) / 2;
const keyRight = centreX + u(KEY_WIDTH) / 2;
const circle = u(CIRCLE_RADIUS);
const noCharge = u(NO_CHARGE_RADIUS);
const backboardY = y(BACKBOARD_FROM_BASELINE);

/** Court lines grouped by the hero beat that draws them. Each path starts at its baseline end. */
export const COURT_LINES = {
  beat1: [
    `M0 ${COURT.depth}H${COURT.width}`,
    `M0 ${COURT.depth}V0`,
    `M${COURT.width} ${COURT.depth}V0`,
    `M0 0H${COURT.width}`,
    `M${centreX - circle} 0A${circle} ${circle} 0 0 0 ${centreX + circle} 0`,
  ],
  beat2: [
    `M${keyLeft} ${COURT.depth}V${y(KEY_DEPTH)}H${keyRight}V${COURT.depth}`,
    `M${centreX - circle} ${y(KEY_DEPTH)}A${circle} ${circle} 0 0 1 ${centreX + circle} ${y(KEY_DEPTH)}`,
    `M${centreX - noCharge} ${backboardY}V${rimY}A${noCharge} ${noCharge} 0 0 1 ${centreX + noCharge} ${rimY}V${backboardY}`,
  ],
  beat3: [
    `M${threeCornerX} ${COURT.depth}V${threeArcY}A${u(THREE_RADIUS)} ${u(THREE_RADIUS)} 0 0 1 ${COURT.width - threeCornerX} ${threeArcY}V${COURT.depth}`,
  ],
} as const;

export const RIM = { cx: centreX, cy: rimY, r: u(RIM_RADIUS) } as const;
export const BACKBOARD = `M${centreX - u(BACKBOARD_WIDTH) / 2} ${backboardY}H${centreX + u(BACKBOARD_WIDTH) / 2}`;

/** Pointy-top hexagon outline around a centre, as an SVG points string. */
export function hexagonPoints(cx: number, cy: number, radius: number): string {
  return Array.from({ length: 6 }, (_, corner) => {
    const angle = (Math.PI / 180) * (60 * corner - 90);
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(' ');
}

export interface ChartBin {
  key: string;
  points: string;
  /** 0 to 4, index into the points-per-shot ramp. */
  ppsClass: number;
}

function ppsClass(pointsPerShot: number): number {
  return PPS_BOUNDS.filter((bound) => pointsPerShot >= bound).length;
}

function volumeScale(attempts: number): number {
  return MIN_SCALE + (1 - MIN_SCALE) * Math.sqrt(Math.min(attempts, VOLUME_CAP) / VOLUME_CAP);
}

const hexRadius = u(data.meta.hexRadiusM);

const placed = data.bins.map((bin) => {
  const cx = u(bin.w);
  const cy = y(bin.d);
  return {
    key: `${bin.w}:${bin.d}`,
    points: hexagonPoints(cx, cy, hexRadius * volumeScale(bin.att)),
    ppsClass: ppsClass(bin.pts / bin.att),
    distance: Math.hypot(cx - RIM.cx, cy - RIM.cy),
  };
});

const maxDistance = Math.max(...placed.map((bin) => bin.distance));

/** Bins grouped into distance rings from the rim outward, so the plot-in needs 8 delays, not 194. */
export const RINGS: readonly (readonly ChartBin[])[] = Array.from({ length: RING_COUNT }, (_, ring) =>
  placed
    .filter((bin) => Math.min(RING_COUNT - 1, Math.floor((bin.distance / maxDistance) * RING_COUNT)) === ring)
    .map(({ key, points, ppsClass: cls }) => ({ key, points, ppsClass: cls })),
);

export const LEGEND_HEX = {
  size: hexRadius * 2,
  small: hexagonPoints(hexRadius, hexRadius, hexRadius * MIN_SCALE),
  large: hexagonPoints(hexRadius, hexRadius, hexRadius),
} as const;

export const CHART_META = {
  league: data.meta.league,
  season: data.meta.firstGame.slice(0, 4),
  teams: data.meta.teams,
  shots: data.meta.shotsInSource,
  shotsInBins: data.meta.shotsInPublishedBins,
  minAttempts: data.meta.minAttemptsPerBin,
  binCount: data.bins.length,
} as const;
