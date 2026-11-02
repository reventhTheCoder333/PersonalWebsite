import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Compass as CompassIcon, Github, GraduationCap } from 'lucide-react';
import { profile } from '../../data/profile';
import { Compass } from '../illustrations/Compass';
import { Ship } from '../illustrations/Ship';
import { Waves } from '../illustrations/Waves';

// Deterministic star field so server/client and every render agree.
const stars = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 100, y: r(2) * 58, s: r(3) > 0.85 ? 2 : 1, d: 2 + r(4) * 5 };
});

const clouds = [
  { top: '12%', w: 340, dur: 140, delay: -30, o: 0.18 },
  { top: '26%', w: 220, dur: 110, delay: -80, o: 0.12 },
  { top: '8%', w: 260, dur: 170, delay: -120, o: 0.1 },
  { top: '38%', w: 420, dur: 200, delay: -10, o: 0.08 },
];

type HeroProps = { introDelay: number };

export function Hero({ introDelay }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Scroll-driven "setting sail": the copy lifts away, the ship heads for the horizon.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const shipX = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const shipScale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const compassRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const item = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: introDelay + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Sky */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#030812_0%,#071429_35%,#0f2b48_62%,#2a4a63_74%)]" />
      <div className="absolute inset-x-0 bottom-[clamp(200px,32vh,340px)] -z-10 h-64 translate-y-1/2 bg-[radial-gradient(ellipse_at_70%_50%,rgba(232,119,59,0.38),rgba(216,170,79,0.12)_35%,transparent_65%)]" />

      <m.div style={{ y: starsY }} className="absolute inset-0 -z-10" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className="anim-twinkle absolute rounded-full bg-parchment"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, ['--dur' as string]: `${s.d}s` }}
          />
        ))}
      </m.div>

      {/* Drifting clouds */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {clouds.map((c, i) => (
          <div
            key={i}
            className="anim-cloud absolute left-0"
            style={{ top: c.top, ['--dur' as string]: `${c.dur}s`, animationDelay: `${c.delay}s` }}
          >
            <div
              className="rounded-full bg-parchment blur-2xl"
              style={{ width: c.w, height: c.w * 0.22, opacity: c.o }}
            />
          </div>
        ))}
      </div>

      {/* Chart grid + annotations */}
      <svg className="absolute inset-0 -z-10 h-full w-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M120 0H0V120" fill="none" stroke="#ecca82" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      <p className="pointer-events-none absolute right-[7%] top-[58%] hidden -rotate-6 font-hand text-2xl text-gold-soft/40 xl:block" aria-hidden="true">
        Grand Line — 0° N
      </p>
      <p className="pointer-events-none absolute bottom-[clamp(220px,34vh,360px)] right-[3%] hidden rotate-3 font-hand text-xl text-tide/40 xl:block" aria-hidden="true">
        ↙ here be intelligent systems
      </p>

      {/* Log Pose / compass */}
      <div
        className="pointer-events-none absolute right-[-64px] top-20 -z-10 w-44 opacity-25 sm:right-[-40px] sm:top-24 sm:w-64 sm:opacity-30 lg:right-[-40px] lg:top-28 lg:w-72 lg:opacity-50 xl:right-[6%] xl:opacity-70"
        aria-hidden="true"
      >
        <m.div
          style={{ rotate: compassRotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: introDelay + 0.3 }}
        >
          <Compass className="h-full w-full drop-shadow-[0_0_40px_rgba(216,170,79,0.25)]" />
        </m.div>
      </div>

      {/* Copy */}
      <m.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-sea relative z-10 pb-[clamp(230px,36vh,370px)] pt-32 sm:pt-36"
      >
        <m.p {...item(0)} className="flex items-center gap-3">
          <span className="shrink-0 whitespace-nowrap font-hand text-xl text-gold-soft">Log 01</span>
          <span className="h-px w-10 shrink-0 bg-gold/60" aria-hidden />
          <span className="eyebrow">The Captain's Introduction</span>
        </m.p>

        <m.h1
          id="hero-title"
          {...item(1)}
          className="mt-5 max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-wide text-gradient-gold drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl"
        >
          The Grand Line <br className="hidden sm:block" />
          Awaits.
        </m.h1>

        <m.p {...item(2)} className="mt-6 font-display text-xl font-semibold text-parchment sm:text-2xl md:text-3xl">
          I'm {profile.name}.
        </m.p>

        <m.p {...item(3)} className="mt-4 max-w-xl text-base leading-relaxed text-mist/90 sm:text-lg">
          Computer Science student building intelligent systems, exploring AI, and turning ambitious ideas into reality.
        </m.p>

        <m.ul {...item(4)} className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm" aria-label="Quick facts">
          <li className="chip border-tide/30 bg-navy-900/60 text-tide-soft">
            <GraduationCap size={14} aria-hidden /> {profile.degree} · {profile.universityShort}
          </li>
          <li className="chip border-gold/30 bg-navy-900/60 text-gold-soft">GPA {profile.gpa}</li>
          <li className="chip border-mist/20 bg-navy-900/60 text-mist">Graduating {profile.graduation}</li>
          <li className="chip border-sunset/30 bg-navy-900/60 text-[#f5b088]">AI / ML Engineer · Software Developer</li>
        </m.ul>

        <m.div {...item(5)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#about" className="btn-gold group">
            <CompassIcon size={18} className="transition-transform duration-500 group-hover:rotate-180" aria-hidden />
            Explore My Journey
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn-ghost">
            <Github size={18} aria-hidden /> View My GitHub
          </a>
        </m.div>

        <m.a
          {...item(6)}
          href="#contact"
          className="mt-6 inline-flex items-center gap-3 rounded-full text-sm text-mist/80 transition hover:text-parchment"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="anim-pulse-ring absolute inline-flex h-full w-full rounded-full bg-tide" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-tide" />
          </span>
          {profile.availability}
        </m.a>
      </m.div>

      {/* Sea + ship */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(200px,32vh,340px)]" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#123552] via-[#0b2440] to-navy-950" />
        <div className="anim-shimmer absolute left-[58%] top-2 h-24 w-64 -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(236,202,130,0.35),transparent_70%)] sm:w-96" />

        <m.div
          style={{ x: shipX, scale: shipScale }}
          className="absolute bottom-[58%] right-[6%] w-40 origin-bottom sm:right-[14%] sm:w-56 lg:right-[22%] lg:w-64"
        >
          <m.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, delay: introDelay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="anim-bob">
              <Ship className="h-auto w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
            </div>
          </m.div>
        </m.div>

        <Waves
          className="inset-y-0"
          layers={[
            { color: '#16405f', duration: 26, amplitude: 10, offset: 34, opacity: 0.9 },
            { color: '#0f2f4f', duration: 20, amplitude: 14, offset: 48 },
            { color: '#0b2442', duration: 15, amplitude: 18, offset: 64 },
            { color: '#06101f', duration: 11, amplitude: 22, offset: 80 },
          ]}
        />
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-mist/70 transition hover:text-gold-soft"
      >
        Set sail
        <ArrowDown size={16} className="anim-float" style={{ ['--dur' as string]: '2.4s' }} aria-hidden />
      </a>
    </section>
  );
}
