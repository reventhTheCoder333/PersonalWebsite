import { m } from 'framer-motion';
import { skillGroups, type SkillGroup } from '../../data/skills';
import { DevilFruit } from '../illustrations/DevilFruit';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(232,119,59,0.07),transparent_50%),radial-gradient(ellipse_at_85%_80%,rgba(91,181,173,0.08),transparent_50%)]" />
      <div className="container-sea relative">
        <SectionHeading
          id="skills-title"
          log="Log 04"
          eyebrow="Skills · Devil Fruits"
          title="My Devil Fruits"
          intro="Four sources of power, each with its own nature. No proficiency bars or invented percentages — just the tools, languages and training I've actually put to work."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} delay={(i % 2) * 0.1}>
              <FruitCard group={g} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FruitCard({ group, index }: { group: SkillGroup; index: number }) {
  const { palette } = group;
  return (
    <m.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      aria-labelledby={`skill-${group.id}`}
      className="group relative h-full overflow-hidden rounded-[2rem] border border-mist/10 bg-navy-900/70 p-6 transition-colors duration-500 hover:border-transparent sm:p-8"
      style={{ ['--fruit' as string]: palette.light }}
    >
      {/* Aura on hover */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: palette.base }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${palette.light}66` }}
        aria-hidden
      />

      <div className="relative flex items-start gap-5">
        <m.div
          variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -8, scale: 1.08 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="shrink-0"
        >
          <div className="anim-float" style={{ ['--dur' as string]: `${6 + index}s` }}>
            <DevilFruit
              palette={palette}
              variant={group.variant}
              className="h-20 w-20 drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)] sm:h-24 sm:w-24"
            />
          </div>
        </m.div>
        <div className="min-w-0">
          <p className="font-hand text-lg leading-none" style={{ color: palette.light }}>
            No. {String(index + 1).padStart(2, '0')} · {group.type}
          </p>
          <h3 id={`skill-${group.id}`} className="mt-1 font-display text-xl font-bold text-parchment sm:text-2xl">
            {group.category}
          </h3>
          <p className="mt-0.5 text-sm font-semibold uppercase tracking-[0.18em] text-mist/55">{group.fruit}</p>
        </div>
      </div>

      <p className="relative mt-5 text-sm leading-relaxed text-mist/85 sm:text-base">{group.ability}</p>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-mist/15 bg-navy-950/60 px-3.5 py-1.5 text-sm text-parchment transition duration-300 hover:-translate-y-0.5 hover:border-[color:var(--fruit)] hover:text-white hover:shadow-[0_0_18px_-4px_var(--fruit)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </m.article>
  );
}
