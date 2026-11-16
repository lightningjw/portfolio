import { useLayoutEffect, useRef } from 'react';
import { profile } from '../data/profile';
import { prefersReducedMotion } from '../lib/motion';
import { COURT } from '../lib/shotChart';
import { ButtonLink } from './Button';
import { ShotChart } from './ShotChart';

/** Longest the armed chart waits for an idle main thread before starting anyway, in milliseconds. */
const START_DEADLINE = 500;
/** Wait used where requestIdleCallback is missing, in milliseconds. */
const START_FALLBACK = 150;

/** Headline beside the chart. The h1 and buttons are in their final state from the first frame. */
export function Hero() {
  const figureRef = useRef<HTMLElement>(null);

  const sequenceRef = useRef<'idle' | 'running' | 'done'>('idle');

  // The chart is fully drawn by default. This arms the sequence (the hidden
  // first frame is applied here, by script) and plays it once, as soon as the
  // page is visible. It never replays and is skipped under reduced motion.
  useLayoutEffect(() => {
    const figure = figureRef.current;
    const svg = figure?.querySelector('svg');
    const lastBeat = figure?.querySelector('[data-beat="5"]');
    if (!figure || !svg || !lastBeat || sequenceRef.current === 'done' || prefersReducedMotion()) return;

    // Holds the hidden first frame. Screen pixels per viewBox unit are
    // measured here: while the lines draw, their width is set from this
    // instead of non-scaling-stroke, which breaks the pathLength dash setup
    // in Chromium.
    const arm = () => {
      figure.style.setProperty('--court-scale', String(svg.clientWidth / COURT.width));
      figure.dataset.hero = 'armed';
    };
    const run = () => {
      sequenceRef.current = 'running';
      figure.dataset.hero = 'run';
    };
    // Ends on the last beat finishing, or on it being cancelled (reduced
    // motion switched on mid-sequence). Either way the chart is left in its
    // default, fully drawn state.
    const finish = (event: Event) => {
      if (event.target !== lastBeat) return;
      sequenceRef.current = 'done';
      figure.removeAttribute('data-hero');
      figure.style.removeProperty('--court-scale');
    };

    // The line draw repaints on the main thread, so it must not start inside
    // the mount task: at 4x CPU throttling the first paint, effects and font
    // swap took the first third of beat 1 and dropped a quarter of its
    // frames. The sequence starts once the main thread is idle instead.
    let cancelStart = () => {};
    const startWhenIdle = () => {
      if (document.visibilityState !== 'visible' || sequenceRef.current !== 'idle') return;
      cancelStart();
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(run, { timeout: START_DEADLINE });
        cancelStart = () => window.cancelIdleCallback(id);
      } else {
        // Safari: no idle callback, so wait out the mount work instead.
        const id = setTimeout(run, START_FALLBACK);
        cancelStart = () => clearTimeout(id);
      }
    };

    // Listeners attach on every effect run, so a re-run while the sequence
    // is playing (React StrictMode) still gets its ending.
    lastBeat.addEventListener('animationend', finish);
    lastBeat.addEventListener('animationcancel', finish);
    if (sequenceRef.current === 'idle') {
      arm();
      startWhenIdle();
      document.addEventListener('visibilitychange', startWhenIdle);
    }
    return () => {
      lastBeat.removeEventListener('animationend', finish);
      lastBeat.removeEventListener('animationcancel', finish);
      document.removeEventListener('visibilitychange', startWhenIdle);
      cancelStart();
    };
  }, []);

  return (
    <section aria-labelledby="hero-title" className="shell page-grid gap-y-12">
      <div className="col-span-full lg:col-span-5">
        <h1 id="hero-title" className="type-display-xl text-chalk">
          {profile.headline}
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#projects" variant="primary">
            View projects
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>
      <figure ref={figureRef} className="col-span-full lg:col-span-7">
        <ShotChart />
      </figure>
    </section>
  );
}
