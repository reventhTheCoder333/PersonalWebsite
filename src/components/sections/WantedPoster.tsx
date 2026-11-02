import { useRef, type PointerEvent } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { profile } from '../../data/profile';

/** Wanted-poster profile card with a gentle pointer tilt. */
export function WantedPoster() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className="[perspective:1200px]">
      <m.figure
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, rotate: -1.5 }}
        className="parchment relative mx-auto w-full max-w-[22rem] rounded-[4px] px-6 pb-7 pt-6 sm:px-8"
        aria-label={`Wanted poster for ${profile.name}`}
      >
        {/* Pin */}
        <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-ember shadow-[0_2px_4px_rgba(0,0,0,0.5)]" aria-hidden />
        <p className="text-center font-display text-5xl font-extrabold tracking-[0.12em] text-ink sm:text-6xl">WANTED</p>
        <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-ink/70">
          For building intelligent systems
        </p>

        <div className="relative mt-4 aspect-[4/3.4] overflow-hidden border-[3px] border-ink/80 bg-[#e3d2a8]">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              className="h-full w-full object-cover sepia-[.35]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <PortraitPlaceholder />
          )}
        </div>

        <p className="mt-3 text-center font-display text-[11px] font-bold uppercase tracking-[0.4em] text-ink/70">Alive &amp; building</p>
        <figcaption className="mt-1 text-center font-display text-2xl font-extrabold uppercase leading-tight tracking-wider text-ink sm:text-[1.7rem]">
          {profile.name}
        </figcaption>

        <div className="mt-3 flex items-end justify-center gap-2 border-y-2 border-ink/60 py-2">
          <span className="pb-1 font-display text-xs font-bold tracking-widest text-ink/70">BOUNTY</span>
          <span className="font-display text-4xl font-extrabold tracking-wider text-ink">{profile.bounty.value}</span>
        </div>
        <p className="mt-2 text-center font-hand text-lg leading-none text-ink/70">{profile.bounty.caption}</p>

        <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60">
          <span>{profile.universityShort}</span>
          <span>Class of {profile.graduation.split(' ')[1]}</span>
        </div>

        {/* Ink stamp */}
        <span
          className="absolute right-3 top-[24%] rotate-[12deg] rounded border-2 border-ember/80 bg-[#efe0bd]/70 px-2 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-ember/90"
          aria-hidden
        >
          Dean's List · Fall 2025
        </span>
      </m.figure>
    </div>
  );
}

/** Illustrated stand-in until a real photo is added via profile.photo. */
function PortraitPlaceholder() {
  return (
    <svg viewBox="0 0 400 340" className="h-full w-full" role="img" aria-label="Illustrated placeholder portrait">
      <defs>
        <linearGradient id="pp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9d6a8" />
          <stop offset="100%" stopColor="#d4b97f" />
        </linearGradient>
      </defs>
      <rect width="400" height="340" fill="url(#pp-sky)" />
      <circle cx="290" cy="210" r="70" fill="#c9773f" opacity="0.35" />
      <path d="M0 236 H400 V340 H0Z" fill="#b89a62" opacity="0.6" />
      <g stroke="#2a1c0f" strokeWidth="1.2" opacity="0.35" fill="none">
        <path d="M20 256 q20 -6 40 0 t40 0" />
        <path d="M260 276 q20 -6 40 0 t40 0" />
        <path d="M120 300 q20 -6 40 0 t40 0" />
      </g>
      {/* Bust silhouette in ink */}
      <g fill="#2a1c0f">
        <circle cx="200" cy="138" r="52" />
        <path d="M96 340 Q100 228 200 214 Q300 228 304 340Z" />
      </g>
      {/* Neural-signal halo */}
      <path
        d="M118 104 L146 104 L154 82 L164 124 L174 92 L182 104 L218 104 L226 80 L236 128 L246 96 L254 104 L282 104"
        fill="none"
        stroke="#b8392e"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.8"
      />
      <text x="200" y="300" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="800" fontSize="44" fill="#e9d6a8" letterSpacing="6">
        RSK
      </text>
    </svg>
  );
}
