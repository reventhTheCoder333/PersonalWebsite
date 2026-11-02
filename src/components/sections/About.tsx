import { Award, BookOpen, CalendarClock, GraduationCap, Sparkles } from 'lucide-react';
import { profile } from '../../data/profile';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { WantedPoster } from './WantedPoster';

const facts = [
  { Icon: GraduationCap, label: 'University', value: profile.university },
  { Icon: BookOpen, label: 'Degree', value: profile.degree },
  { Icon: CalendarClock, label: 'Expected graduation', value: profile.graduation },
  { Icon: Sparkles, label: 'GPA', value: `${profile.gpa} / ${profile.gpaScale}` },
  { Icon: Award, label: 'Recognition', value: profile.honors[0] },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(91,181,173,0.08),transparent_55%)]" />
      <div className="container-sea relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading id="about-title" log="Log 02" eyebrow="About · The Captain" title="The One Who Set Sail" />

          <Reveal className="space-y-5 text-base leading-relaxed text-mist/90 md:text-lg">
            <p>
              Every voyage starts with a question. Mine was simple:{' '}
              <em className="font-medium not-italic text-parchment">how do machines learn to see, listen and understand?</em>{' '}
              I'm a Computer Science student at {profile.university} who loves building things — from EEG pipelines that
              decode motor imagery to real-time systems that listen for danger.
            </p>
            <p>
              I'm drawn to the uncharted waters of the field —{' '}
              <span className="text-tide-soft">
                artificial intelligence, machine learning, computer vision, natural language processing and neural interfaces
              </span>{' '}
              — and to the engineering that turns research ideas into working software.
            </p>
            <p>
              I value curiosity, rigour and finishing what I start. The map is still being drawn, and I intend to chart
              every island I can.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <dl className="grid gap-3 sm:grid-cols-2">
              {facts.map(({ Icon, label, value }, i) => (
                <div
                  key={label}
                  className={`group flex items-start gap-3 rounded-2xl border border-mist/10 bg-navy-900/60 p-4 transition hover:border-gold/40 ${
                    i === facts.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/10 text-gold-soft transition group-hover:bg-gold/20">
                    <Icon size={17} aria-hidden />
                  </span>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mist/60">{label}</dt>
                    <dd className="mt-0.5 font-medium text-parchment">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={40}>
          <WantedPoster />
        </Reveal>
      </div>
    </section>
  );
}
