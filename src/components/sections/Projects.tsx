import { useCallback, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { projects, type Project } from '../../data/projects';
import { Island } from '../illustrations/Island';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectDialog } from './ProjectDialog';
import { ProjectLinks } from './ProjectLinks';

// Notched "chart plate" silhouette instead of a plain rectangle.
const plate =
  'polygon(0 22px, 22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px))';

export function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => setOpenIndex((i) => (i === null ? i : (i + 1) % projects.length)), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + projects.length) % projects.length)),
    [],
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative overflow-hidden bg-abyss py-24 md:py-32">
      <RouteBackdrop />
      <div className="container-sea relative">
        <SectionHeading
          id="projects-title"
          log="Log 03"
          eyebrow="Projects · The Adventures"
          title="Islands Charted Along the Way"
          intro="Every project is an island on the route — each with its own terrain, its own problems, and treasure worth recovering. Select an island to read its full log."
        />

        <ol className="grid gap-8 md:grid-cols-2 md:gap-10">
          {projects.map((p, i) => (
            <li key={p.id} className={i % 2 === 1 ? 'md:translate-y-16' : ''}>
              <Reveal delay={(i % 2) * 0.12}>
                <IslandCard project={p} index={i} onOpen={() => setOpenIndex(i)} />
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="h-0 md:h-16" />
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ProjectDialog project={projects[openIndex]} onClose={close} onNext={next} onPrev={prev} />
        )}
      </AnimatePresence>
    </section>
  );
}

function IslandCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <m.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative transition-[filter] duration-500 hover:drop-shadow-[0_24px_40px_rgba(0,0,0,0.65)]"
      aria-labelledby={`project-${project.id}`}
    >
      {/* Gradient border via a padded clipped wrapper */}
      <m.div
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="p-px"
        style={{ clipPath: plate, background: `linear-gradient(160deg, ${project.accent}aa, rgba(216,170,79,0.15) 40%, rgba(255,255,255,0.06))` }}
      >
        <div className="relative bg-navy-900" style={{ clipPath: plate }}>
          <div className="relative overflow-hidden">
            <m.div variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Island theme={project.island.theme} accent={project.accent} className="block aspect-[400/220] w-full" />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-transparent" />
            <div className="absolute left-5 top-5 flex items-center gap-2 font-hand text-lg text-parchment/85">
              <MapPin size={14} aria-hidden style={{ color: project.accent }} />
              {project.island.name}
            </div>
            {project.status && (
              <span
                className="absolute right-5 top-5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ borderColor: `${project.accent}88`, color: project.accent, background: 'rgba(6,16,31,0.7)' }}
              >
                {project.status}
              </span>
            )}
            <span className="absolute bottom-3 right-5 font-display text-5xl font-extrabold text-parchment/10" aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="px-6 pb-7 pt-1 sm:px-7">
            {project.period && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-mist/60">{project.period}</p>
            )}
            <h3 id={`project-${project.id}`} className="font-display text-2xl font-bold text-parchment sm:text-[1.7rem]">
              {project.name}
            </h3>
            {project.subtitle && <p className="mt-1 text-sm font-medium text-mist">{project.subtitle}</p>}
            <p className="mt-3 leading-relaxed text-mist/85">{project.summary}</p>

            {project.metrics && (
              <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {project.metrics.map((mt) => (
                  <div key={mt.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/50">{mt.label}</dt>
                    <dd className="font-display text-lg font-bold" style={{ color: project.accent }}>
                      {mt.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tech.map((t) => (
                <li key={t} className="chip border-mist/12 bg-navy-950/60 text-mist/90">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpen}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy-950 transition hover:brightness-110"
                style={{ background: project.accent }}
                aria-haspopup="dialog"
              >
                Explore island
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" aria-hidden />
              </button>
              <ProjectLinks project={project} compact />
            </div>
          </div>
        </div>
      </m.div>
    </m.article>
  );
}

/** Dashed sea route meandering behind the island grid. */
function RouteBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 1200 1400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M-40 260 C 300 200, 420 520, 640 470 S 1000 300, 1240 520 M-40 900 C 260 820, 520 1160, 760 1040 S 1060 820, 1240 1080"
        fill="none"
        stroke="#d8aa4f"
        strokeWidth="2"
        strokeDasharray="2 14"
        strokeLinecap="round"
        className="anim-dash"
      />
      <g fill="#5bb5ad" opacity="0.6">
        <circle cx="640" cy="470" r="5" />
        <circle cx="760" cy="1040" r="5" />
      </g>
    </svg>
  );
}
