import { useReducedMotion } from 'motion/react';
import { useMemo } from 'react';

/*
 * Motion values for JavaScript-driven animation. They are read from the CSS
 * custom properties in styles/tokens.css, so that file stays the only place a
 * duration or curve is written down.
 */

type Bezier = [number, number, number, number];

export interface MotionTokens {
  /** Seconds. */
  fast: number;
  base: number;
  layout: number;
  /** First gap between staggered items, and how much each later gap shrinks. */
  staggerSection: number;
  staggerSectionDecay: number;
  staggerSectionMax: number;
  /** Pixels. */
  enter: number;
  easeOut: Bezier;
  easeInOut: Bezier;
}

const LINEAR: Bezier = [0, 0, 1, 1];

function read(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function number(name: string): number {
  const value = Number.parseFloat(read(name));
  return Number.isFinite(value) ? value : 0;
}

/**
 * A CSS time as seconds. The unit is read, not assumed: the production CSS
 * minifier rewrites millisecond tokens as fractional seconds, and dividing
 * those by 1000 made every Motion animation finish inside one frame.
 */
function seconds(name: string): number {
  const raw = read(name);
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 0;
  return /\d\s*ms$/i.test(raw) ? value / 1000 : value;
}

function bezier(name: string): Bezier {
  const parts = read(name).match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
  const [a, b, c, d] = parts;
  return a === undefined || b === undefined || c === undefined || d === undefined ? LINEAR : [a, b, c, d];
}

let cached: MotionTokens | undefined;

export function motionTokens(): MotionTokens {
  cached ??= {
    fast: seconds('--duration-fast'),
    base: seconds('--duration-base'),
    layout: seconds('--duration-layout'),
    staggerSection: seconds('--stagger-section'),
    staggerSectionDecay: seconds('--stagger-section-decay'),
    staggerSectionMax: number('--stagger-section-max'),
    enter: number('--distance-enter'),
    easeOut: bezier('--ease-out'),
    easeInOut: bezier('--ease-in-out'),
  };
  return cached;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Tokens for Motion components. Under prefers-reduced-motion every duration,
 * stagger and distance is zero, so nothing moves or fades.
 */
export function useMotionTokens(): MotionTokens {
  const reduced = useReducedMotion();
  return useMemo(() => {
    const tokens = motionTokens();
    return reduced ? { ...tokens, fast: 0, base: 0, layout: 0, staggerSection: 0, staggerSectionDecay: 0, enter: 0 } : tokens;
  }, [reduced]);
}
