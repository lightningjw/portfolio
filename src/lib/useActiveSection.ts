import { useEffect, useState } from 'react';

/** Share of the viewport height a section must have scrolled past to count as current. */
const READING_LINE = 0.4;

/** The id of the section currently being read, or null above the first one. */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * READING_LINE;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      let current: string | null = null;
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      if (atBottom && window.scrollY > 0) current = ids.at(-1) ?? current;
      setActive(current);
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids]);

  return active;
}
