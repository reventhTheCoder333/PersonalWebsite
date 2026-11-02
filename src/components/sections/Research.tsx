import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { BookMarked, ChevronDown, ExternalLink } from 'lucide-react';
import { publications, research, type ResearchEntry } from '../../data/research';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

// Primitive strokes combined into pseudo-glyphs. Purely ornamental — not a real script.
const strokes = [
  'M2 2h14', 'M2 16h14', 'M2 2v14', 'M16 2v14', 'M9 2v14', 'M2 9h14',
  'M2 2l14 14', 'M16 2L2 16', 'M4 12a5 5 0 0 1 10 0', 'M9 9m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  'M2 9l7-7 7 7', 'M5 16l4-6 4 6',
];

function glyph(seed: number) {
  const picks = [seed % 12, (seed * 7 + 3) % 12, (seed * 5 + 1) % 12];
  return Array.from(new Set(picks)).map((p) => strokes[p]);
}

function GlyphBand({ count, offset = 0, className = '' }: { count: number; offset?: number; className?: string }) {
  return (
    <svg viewBox={`0 0 ${count * 26} 22`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {Array.from({ length: count }, (_, i) => (
        <g
          key={i}
          transform={`translate(${i * 26 + 4} 2)`}
          className="anim-glyph"
          style={{ ['--dur' as string]: `${3 + ((i + offset) % 5)}s`, animationDelay: `${(i % 7) * 0.4}s` }}
        >
          {glyph(i + offset).map((d, j) => (
            <path key={j} d={d} fill="none" stroke="#6fd0c6" strokeWidth="1.6" strokeLinecap="round" />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="relative overflow-hidden bg-abyss py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(111,208,198,0.08),transparent_60%)]" />
      <div className="container-sea relative">
        <SectionHeading
          id="research-title"
          log="Log 05"
          eyebrow="Research · The Poneglyphs"
          title="Deciphering the Unknown"
          intro="The scientific side of the voyage: careful data, open questions, and the slow work of turning the unknown into something understood."
        />

        <div className="space-y-8">
          {research.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1}>
              <Poneglyph entry={r} index={i} />
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <PublicationsStone />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

function Poneglyph({ entry, index }: { entry: ResearchEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `research-${entry.id}`;

  return (
    <article className="stone relative overflow-hidden rounded-[1.75rem] border border-white/5" aria-labelledby={`${panelId}-title`}>
      <GlyphBand count={36} offset={index * 11} className="h-6 w-full px-6 pt-4 opacity-80" />

      <div className="grid gap-8 px-6 py-8 sm:px-10 md:grid-cols-[1fr_auto] md:py-10">
        <div>
          <p className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#9fe3da]">
            <span className="font-display text-base tracking-[0.2em]">Inscription {numerals[index] ?? index + 1}</span>
            <span className="h-px w-8 bg-[#9fe3da]/50" aria-hidden />
            <span>{entry.role}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#9fe3da]/40 px-2 py-0.5 text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9fe3da]" aria-hidden />
              {entry.status}
              {entry.period ? ` · ${entry.period}` : ''}
            </span>
          </p>
          <h3
            id={`${panelId}-title`}
            className="mt-4 font-display text-3xl font-bold text-[#efe6d6] drop-shadow-[0_0_18px_rgba(111,208,198,0.25)] sm:text-4xl"
          >
            {entry.title}
          </h3>
          {entry.group && <p className="mt-1 text-sm text-[#cfc6b6]">{entry.group}</p>}
          <p className="mt-4 max-w-2xl leading-relaxed text-[#d8d0c2]">{entry.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Research areas">
            {entry.areas.map((a) => (
              <li key={a} className="rounded-full border border-[#9fe3da]/25 bg-black/25 px-3 py-1 text-sm text-[#e6f5f2]">
                {a}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#9fe3da]/40 px-5 py-2.5 text-sm font-semibold text-[#e6f5f2] transition hover:bg-[#9fe3da]/10"
          >
            {open ? 'Seal inscription' : 'Decipher inscription'}
            <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <m.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-6 space-y-3 border-l border-[#9fe3da]/30 pl-5">
                  {entry.details.map((d) => (
                    <li key={d} className="leading-relaxed text-[#d8d0c2]">
                      {d}
                    </li>
                  ))}
                </ul>
                {entry.links && entry.links.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {entry.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#9fe3da] underline-offset-4 hover:underline">
                          {l.label} <ExternalLink size={13} aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vertical glyph column */}
        <div className="hidden w-20 md:block" aria-hidden>
          <svg viewBox="0 0 22 260" className="h-full max-h-72 w-full">
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i} transform={`translate(2 ${i * 26 + 2})`} className="anim-glyph" style={{ ['--dur' as string]: `${4 + (i % 4)}s`, animationDelay: `${i * 0.3}s` }}>
                {glyph(i * 3 + 5).map((d, j) => (
                  <path key={j} d={d} fill="none" stroke="#6fd0c6" strokeWidth="1.4" strokeLinecap="round" />
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <GlyphBand count={36} offset={index * 11 + 40} className="h-6 w-full px-6 pb-4 opacity-60" />
    </article>
  );
}

function PublicationsStone() {
  return (
    <div className="relative rounded-[1.75rem] border border-dashed border-[#9fe3da]/20 bg-navy-950/40 px-6 py-8 sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#9fe3da]/30 text-[#9fe3da]">
          <BookMarked size={18} aria-hidden />
        </span>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-parchment">Publications &amp; Papers</h3>
          {publications.length === 0 ? (
            <p className="mt-2 max-w-2xl text-mist/75">
              No publications yet — this stone is reserved for future papers, posters and academic contributions as the
              research voyage continues.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {publications.map((p) => (
                <li key={p.title} className="text-mist/90">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="font-semibold text-parchment hover:text-gold-soft">
                      {p.title}
                    </a>
                  ) : (
                    <span className="font-semibold text-parchment">{p.title}</span>
                  )}
                  <span className="text-mist/60"> — {p.venue}, {p.year}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
