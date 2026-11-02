import { useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Island } from '../illustrations/Island';
import { ProjectLinks } from './ProjectLinks';

type ProjectDialogProps = {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Accessible modal with focus trap, Esc to close and arrow-key island hopping. */
export function ProjectDialog({ project, onClose, onPrev, onNext }: ProjectDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [onClose, onNext, onPrev]);

  return (
    <m.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close project details"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-abyss/80 backdrop-blur-sm"
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-gold/20 bg-navy-900 shadow-2xl sm:rounded-3xl"
        style={{ boxShadow: `0 40px 120px -40px ${project.accent}66` }}
      >
        <div className="relative">
          <m.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Island theme={project.island.theme} accent={project.accent} className="block aspect-[400/180] w-full" />
          </m.div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-mist/20 bg-navy-950/70 text-parchment transition hover:border-gold/60"
          >
            <X size={18} />
          </button>
          <p className="absolute left-6 top-4 font-hand text-lg text-parchment/80">
            {project.island.name} · {project.island.coords}
          </p>
        </div>

        <m.div key={`${project.id}-body`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="px-6 pb-8 sm:px-10">
          {(project.period || project.status) && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: project.accent }}>
              {[project.period, project.status].filter(Boolean).join(' · ')}
            </p>
          )}
          <h3 id="project-dialog-title" className="mt-2 font-display text-3xl font-bold text-parchment sm:text-4xl">
            {project.name}
          </h3>
          {project.subtitle && <p className="mt-1 font-medium text-mist">{project.subtitle}</p>}
          <p className="mt-4 leading-relaxed text-mist/90">{project.description}</p>

          {project.metrics && (
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.metrics.map((mt) => (
                <div key={mt.label} className="rounded-2xl border border-mist/10 bg-navy-950/60 p-3">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/60">{mt.label}</dt>
                  <dd className="mt-1 font-display text-lg font-bold text-parchment">{mt.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <h4 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">
            Treasures recovered
          </h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-mist/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: project.accent }} aria-hidden />
                {h}
              </li>
            ))}
          </ul>

          {project.extra && (
            <>
              <h4 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">
                {project.extra.heading}
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.extra.items.map((it) => (
                  <li key={it} className="chip border-mist/15 bg-navy-950/50 text-parchment">
                    {it}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h4 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.25em] text-gold-soft">Built with</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="chip text-parchment" style={{ borderColor: `${project.accent}55`, background: `${project.accent}14` }}>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-mist/10 pt-6">
            <ProjectLinks project={project} />
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button type="button" onClick={onPrev} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-mist transition hover:text-parchment">
              <ChevronLeft size={16} aria-hidden /> Previous island
            </button>
            <button type="button" onClick={onNext} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-mist transition hover:text-parchment">
              Next island <ChevronRight size={16} aria-hidden />
            </button>
          </div>
        </m.div>
      </m.div>
    </m.div>
  );
}
