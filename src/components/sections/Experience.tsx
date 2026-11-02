import { Anchor, Award, Briefcase, GraduationCap, HeartHandshake, ScrollText, type LucideIcon } from 'lucide-react';
import { timeline, type TimelineKind } from '../../data/timeline';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const kinds: Record<TimelineKind, { label: string; Icon: LucideIcon; color: string }> = {
  education: { label: 'Home port', Icon: GraduationCap, color: '#ecca82' },
  honor: { label: 'Honour', Icon: Award, color: '#e8773b' },
  research: { label: 'Research', Icon: ScrollText, color: '#6fd0c6' },
  project: { label: 'Voyage', Icon: Anchor, color: '#5bb5ad' },
  volunteer: { label: 'Volunteering', Icon: HeartHandshake, color: '#c25b5b' },
  work: { label: 'Experience', Icon: Briefcase, color: '#d8aa4f' },
};

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="container-sea">
        <SectionHeading
          id="experience-title"
          log="Log 06"
          eyebrow="Experience & Achievements · The Crew"
          title="The Captain's Log"
          intro="Ports of call, honours and voyages so far — most recent first."
          align="center"
        />

        <ol className="relative mx-auto max-w-4xl">
          {/* Rope line */}
          <span
            className="absolute bottom-2 left-[19px] top-2 w-px bg-[repeating-linear-gradient(180deg,rgba(216,170,79,0.7)_0_6px,transparent_6px_12px)] md:left-1/2"
            aria-hidden
          />
          {timeline.map((t, i) => {
            const k = kinds[t.kind];
            const right = i % 2 === 1;
            return (
              <li key={t.id} className="relative pb-10 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
                <span
                  className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border bg-navy-950 md:left-1/2 md:-translate-x-1/2"
                  style={{ borderColor: `${k.color}88`, color: k.color, boxShadow: `0 0 24px -6px ${k.color}` }}
                  aria-hidden
                >
                  <k.Icon size={17} />
                </span>
                <Reveal
                  y={20}
                  className={right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}
                >
                  <div className="group rounded-2xl border border-mist/10 bg-navy-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/30">
                    <p className={`flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${right ? '' : 'md:justify-end'}`}>
                      <span style={{ color: k.color }}>{k.label}</span>
                      <span className="text-mist/30" aria-hidden>·</span>
                      <span className="text-mist/60">{t.when}</span>
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold text-parchment sm:text-xl">{t.title}</h3>
                    {t.org && <p className="text-sm font-medium text-mist">{t.org}</p>}
                    <p className="mt-2 text-sm leading-relaxed text-mist/80">{t.description}</p>
                    {t.tags && (
                      <ul className={`mt-3 flex flex-wrap gap-1.5 ${right ? '' : 'md:justify-end'}`}>
                        {t.tags.map((tag) => (
                          <li key={tag} className="chip border-mist/10 text-mist/75">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
