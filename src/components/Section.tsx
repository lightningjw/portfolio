import { useRef, type ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  /** A background field marking for the header band, shown from 1024 up. */
  marking?: ReactNode;
  /** A divider marking rendered above the heading. */
  divider?: ReactNode;
}

/** A page section: optional divider, an h2 in its header band, then content. */
export function Section({ id, title, children, marking, divider }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const headingId = `${id}-title`;

  return (
    <section ref={ref} id={id} aria-labelledby={headingId} className="shell">
      {divider ? <div className="mb-12">{divider}</div> : null}
      <div className={`relative mb-8 ${marking ? 'lg:flex lg:h-(--size-header-band) lg:items-end' : ''}`}>
        {marking}
        <h2 id={headingId} data-reveal className="type-display-l relative text-chalk">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
