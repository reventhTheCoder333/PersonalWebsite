import { useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Check, Copy, Github, Linkedin, Mail, Phone, Sparkles } from 'lucide-react';
import { profile } from '../../data/profile';
import { Ship } from '../illustrations/Ship';
import { Waves } from '../illustrations/Waves';
import { Reveal } from '../ui/Reveal';
import { ContactForm } from './ContactForm';

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'LinkedIn', value: 'in/reventh-sathishkumar', href: profile.links.linkedin, Icon: Linkedin },
  { label: 'GitHub', value: 'reventhTheCoder333', href: profile.links.github, Icon: Github },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, Icon: Phone },
];

export function Contact() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end start'] });
  // The ship sails toward the sun as the scene passes through the viewport.
  const shipX = useTransform(scrollYProgress, [0, 1], ['-30%', '40%']);
  const shipScale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden">
      {/* Sunset scene */}
      <div ref={sceneRef} className="relative h-[clamp(320px,52vh,520px)] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#06101f_0%,#2a2347_30%,#7a3a45_55%,#d8693a_76%,#f2b257_86%)]" />
        <div className="absolute bottom-[14%] left-1/2 h-[clamp(140px,22vw,260px)] w-[clamp(140px,22vw,260px)] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff1c4_0%,#f6c063_45%,#e8773b_75%)] shadow-[0_0_120px_40px_rgba(242,178,87,0.45)]" />
        <div className="anim-cloud absolute left-0 top-[22%]" style={{ ['--dur' as string]: '160s', animationDelay: '-60s' }}>
          <div className="h-8 w-80 rounded-full bg-[#f7c37a] opacity-25 blur-2xl" />
        </div>
        <div className="anim-cloud absolute left-0 top-[40%]" style={{ ['--dur' as string]: '120s', animationDelay: '-20s' }}>
          <div className="h-6 w-60 rounded-full bg-[#ffdca0] opacity-25 blur-xl" />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-b from-[#6a3048] to-navy-950" />
        <div className="anim-shimmer absolute bottom-[4%] left-1/2 h-[10%] w-[28%] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(255,214,140,0.55),transparent_70%)]" />

        <m.div style={{ x: shipX, scale: shipScale }} className="absolute bottom-[10%] left-[18%] w-36 origin-bottom sm:w-48 md:w-56">
          <div className="anim-bob" style={{ ['--dur' as string]: '7s' }}>
            <Ship silhouette className="h-auto w-full" />
          </div>
        </m.div>

        <Waves
          className="bottom-0 h-[14%]"
          layers={[
            { color: '#3a2240', duration: 22, amplitude: 10, offset: 10, opacity: 0.9 },
            { color: '#1a1a35', duration: 16, amplitude: 14, offset: 40 },
            { color: '#06101f', duration: 12, amplitude: 16, offset: 66 },
          ]}
        />
      </div>

      <div className="relative bg-navy-950 pb-24 md:pb-32">
        <div className="container-sea -mt-6 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="flex items-center gap-3">
              <span className="shrink-0 whitespace-nowrap font-hand text-xl text-gold-soft">Log 07</span>
              <span className="h-px w-10 shrink-0 bg-gradient-to-r from-gold/70 to-transparent" aria-hidden />
              <span className="eyebrow">Contact · The Final Island</span>
            </p>
            <h2 id="contact-title" className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-wide text-parchment sm:text-4xl md:text-5xl">
              Every adventure begins with a connection.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-mist/85 md:text-lg">
              Whether it's an internship, a research collaboration, or an ambitious idea that needs a crew — I'd love to
              hear about it.
            </p>

            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's build something extraordinary")}`}
              className="btn-gold mt-8 px-7 py-4 text-base"
            >
              <Sparkles size={18} aria-hidden /> Let's Build Something Extraordinary
            </a>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-center gap-3 rounded-2xl border border-mist/10 bg-navy-900/60 p-4 transition hover:border-gold/40"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sunset/10 text-[#f5b088] transition group-hover:bg-sunset/20">
                      <Icon size={17} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-mist/55">{label}</span>
                      <span className="block text-sm font-medium text-parchment [overflow-wrap:anywhere]">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-4 inline-flex items-center gap-2 text-sm text-mist/70 transition hover:text-parchment"
            >
              {copied ? <Check size={15} className="text-tide" aria-hidden /> : <Copy size={15} aria-hidden />}
              <span aria-live="polite">{copied ? 'Email copied to clipboard' : 'Copy email address'}</span>
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
