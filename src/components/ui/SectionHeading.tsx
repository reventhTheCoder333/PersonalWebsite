import { Reveal } from './Reveal';

type SectionHeadingProps = {
  log: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  id?: string;
};

export function SectionHeading({
  log,
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-12 md:mb-16 ${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <p className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="shrink-0 whitespace-nowrap font-hand text-xl text-gold-soft">{log}</span>
        <span className="h-px w-10 shrink-0 bg-gradient-to-r from-gold/70 to-transparent" aria-hidden />
        <span className="eyebrow">{eyebrow}</span>
      </p>
      <h2
        id={id}
        className={`mt-4 font-display text-3xl font-bold leading-[1.1] tracking-wide sm:text-4xl md:text-5xl ${
          tone === 'dark' ? 'text-parchment' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${tone === 'dark' ? 'text-mist/85' : 'text-ink/80'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
