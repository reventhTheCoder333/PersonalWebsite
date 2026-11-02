import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { Compass } from '../illustrations/Compass';

const ids = navItems.map((n) => n.id);

/** The Log Pose: a floating navigator whose needle swings toward the current island. */
export function Navbar() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const activeIndex = Math.max(0, ids.indexOf(active));
  const heading = -60 + (activeIndex / (ids.length - 1)) * 120;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const shell = scrolled || open
    ? 'border-gold/20 bg-navy-950/85 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md'
    : 'border-transparent bg-transparent';

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 ${shell}`}
      >
        <a href="#home" className="group flex items-center gap-3 rounded-full pr-2" onClick={() => setOpen(false)}>
          <span className="relative grid h-10 w-10 place-items-center">
            <span className="absolute inset-0 rounded-full bg-tide/15 blur-md transition group-hover:bg-tide/30" />
            <Compass className="relative h-10 w-10" heading={heading} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-[0.2em] text-parchment">R · S · K</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-tide/90">
              Log Pose · {navItems[activeIndex].label}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-navy-950' : 'text-mist hover:text-parchment'
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-gold-soft to-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {!isActive && (
                    <svg
                      viewBox="0 0 40 6"
                      className="absolute bottom-1 left-1/2 h-1.5 w-8 -translate-x-1/2 scale-x-0 text-tide opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <path d="M0 3 q5 -3 10 0 t10 0 t10 0 t10 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-mist/20 text-parchment transition hover:border-gold/60 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-gold/20 bg-navy-950/95 p-3 shadow-2xl backdrop-blur-md lg:hidden"
          >
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map((item, i) => (
                <li key={item.id} className={i === navItems.length - 1 ? 'col-span-2' : ''}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={item.id === active ? 'location' : undefined}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      item.id === active
                        ? 'border-gold/50 bg-gold/10 text-gold-soft'
                        : 'border-mist/10 text-mist hover:border-tide/40 hover:text-parchment'
                    }`}
                  >
                    {item.label}
                    <span className="font-hand text-base text-tide/80">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
