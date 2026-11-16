import type { ReactNode } from 'react';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  /** Makes the link cover its nearest positioned ancestor. */
  stretched?: boolean;
}

/** Label-type link with a right arrow that nudges on hover. Colour does not change. */
export function ArrowLink({ href, children, stretched = false }: ArrowLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group/arrow type-label inline-flex min-h-(--size-touch) items-center gap-2 text-chalk ${
        stretched ? 'stretched-link' : ''
      }`}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="size-(--size-arrow) fill-none stroke-current stroke-(length:--size-arrow-stroke) transition-transform duration-(--duration-fast) ease-out motion-safe:group-hover:translate-x-(--distance-nudge) motion-safe:group-hover/arrow:translate-x-(--distance-nudge)"
      >
        <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
