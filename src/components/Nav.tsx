import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { useMotionTokens } from '../lib/motion';
import { useActiveSection } from '../lib/useActiveSection';

const LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS = LINKS.map((link) => link.id);
const MENU_ID = 'site-menu';

export function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const tokens = useMotionTokens();
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // The current-section bar is one element. It is placed under the active
  // link by transform, and only slides once it has a position to slide from.
  const placeBar = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const link = active ? listRef.current?.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
    if (!link) {
      bar.removeAttribute('data-placed');
      bar.removeAttribute('data-slide');
      return;
    }
    bar.toggleAttribute('data-slide', bar.hasAttribute('data-placed'));
    bar.style.transform = `translateX(${link.offsetLeft}px) scaleX(${link.offsetWidth})`;
    bar.setAttribute('data-placed', '');
  }, [active]);

  useLayoutEffect(() => {
    placeBar();
  }, [placeBar]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(placeBar);
    observer.observe(list);
    return () => observer.disconnect();
  }, [placeBar]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-board">
      <nav aria-label="Main" className="shell flex h-(--size-nav) items-center justify-between lg:h-(--size-nav-lg)">
        <a href="#top" className="type-display-s flex h-(--size-touch) items-center text-chalk">
          {profile.name}
        </a>

        <ul ref={listRef} className="relative hidden h-full lg:flex">
          {LINKS.map((link) => (
            <li key={link.id} className="h-full">
              <a
                href={`#${link.id}`}
                data-section={link.id}
                aria-current={active === link.id ? 'location' : undefined}
                className={`type-label flex h-full items-center px-4 hover:text-chalk ${
                  active === link.id ? 'text-chalk' : 'text-chalk-dim'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            ref={barRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-(--size-nav-bar) w-(--size-hairline) origin-left bg-gold opacity-0 duration-(--duration-base) ease-out data-placed:opacity-100 data-slide:transition-transform"
          />
        </ul>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((value) => !value)}
          className="pressable type-label flex h-(--size-touch) items-center px-3 text-chalk lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={MENU_ID}
            className="absolute inset-x-0 top-full z-20 border-b border-line bg-board lg:hidden"
            initial={{ opacity: 0, y: -tokens.enter }}
            animate={{ opacity: 1, y: 0, transition: { duration: tokens.fast, ease: tokens.easeOut } }}
            exit={{ opacity: 0, y: -tokens.enter, transition: { duration: tokens.fast, ease: tokens.easeIn } }}
          >
            <ul className="shell">
              {LINKS.map((link) => (
                <li key={link.id} className="border-t border-line first:border-t-0">
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'location' : undefined}
                    className={`type-label flex h-(--size-menu-row) items-center hover:text-chalk ${
                      active === link.id ? 'text-chalk' : 'text-chalk-dim'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
