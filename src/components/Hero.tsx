import { useLayoutEffect, useRef } from 'react';
import { profile } from '../data/profile';
import { prefersReducedMotion } from '../lib/motion';
import { COURT } from '../lib/shotChart';
import { ButtonLink } from './Button';
import { ShotChart } from './ShotChart';

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

    const run = () => {
      sequenceRef.current = 'running';
      // Screen pixels per viewBox unit. While the lines draw, their width is
      // set from this instead of non-scaling-stroke, which breaks the
      // pathLength dash setup in Chromium.
      figure.style.setProperty('--court-scale', String(svg.clientWidth / COURT.width));
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
    const onVisible = () => {
      if (document.visibilityState === 'visible' && sequenceRef.current === 'idle') run();
    };

    // Listeners attach on every effect run, so a re-run while the sequence
    // is playing (React StrictMode) still gets its ending.
    lastBeat.addEventListener('animationend', finish);
    lastBeat.addEventListener('animationcancel', finish);
    if (sequenceRef.current === 'idle') {
      if (document.visibilityState === 'visible') {
        run();
      } else {
        figure.dataset.hero = 'armed';
        document.addEventListener('visibilitychange', onVisible);
      }
    }
    return () => {
      lastBeat.removeEventListener('animationend', finish);
      lastBeat.removeEventListener('animationcancel', finish);
      document.removeEventListener('visibilitychange', onVisible);
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
