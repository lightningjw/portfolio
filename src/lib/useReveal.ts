import { animate, inView, stagger } from 'motion';
import { useEffect, type RefObject } from 'react';
import { motionTokens, prefersReducedMotion } from './motion';

/**
 * Section entrance: once, on first entry to the viewport, the blocks marked
 * data-reveal fade in and rise. The hidden state is applied here, by script,
 * and only when the section is still below the fold, so content is never
 * hidden from first paint or from visitors without JavaScript.
 */
export function useReveal(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;
    if (section.getBoundingClientRect().top < window.innerHeight) return;

    const tokens = motionTokens();
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (items.length === 0) return;

    const hide = animate(items, { opacity: 0, y: tokens.enter }, { duration: 0 });
    const lastStep = tokens.staggerSectionMax - 1;
    const step = stagger(tokens.staggerSection);
    const stop = inView(
      section,
      () => {
        animate(
          items,
          { opacity: 1, y: 0 },
          {
            duration: tokens.base,
            ease: tokens.easeOut,
            delay: (index, total) => step(Math.min(index, lastStep), total),
          },
        );
      },
      { amount: 'some' },
    );

    return () => {
      stop();
      hide.cancel();
    };
  }, [ref]);
}
