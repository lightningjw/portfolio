import type { ReactNode } from 'react';

const BASE =
  'pressable type-label inline-flex h-(--size-button) items-center justify-center rounded-control px-6 text-center';

const VARIANTS = {
  primary: 'bg-gold text-board hover:bg-gold-hover active:bg-gold-pressed',
  secondary: 'border border-line-control bg-board text-chalk hover:border-chalk',
} as const;

interface ButtonLinkProps {
  href: string;
  variant: keyof typeof VARIANTS;
  children: ReactNode;
  className?: string;
}

/** Primary and secondary buttons. Every button on this site navigates, so it is a link. */
export function ButtonLink({ href, variant, children, className = '' }: ButtonLinkProps) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
