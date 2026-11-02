import { useId } from 'react';
import { m } from 'framer-motion';

type CompassProps = {
  className?: string;
  /** Needle heading in degrees. When undefined the needle drifts gently. */
  heading?: number;
  spinning?: boolean;
};

const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

/** An original compass rose with a gimballed needle. */
export function Compass({ className = '', heading, spinning = false }: CompassProps) {
  const uid = useId().replace(/:/g, '');
  const face = `cmp-face-${uid}`;
  const ring = `cmp-ring-${uid}`;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={face} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#173253" />
          <stop offset="100%" stopColor="#07111f" />
        </radialGradient>
        <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3d690" />
          <stop offset="50%" stopColor="#b8862f" />
          <stop offset="100%" stopColor="#f0cf84" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill={`url(#${ring})`} />
      <circle cx="100" cy="100" r="88" fill={`url(#${face})`} />
      <g stroke="#d8aa4f" strokeLinecap="round">
        {ticks.map((t) => (
          <line
            key={t}
            x1="100"
            y1={t % 45 === 0 ? 16 : 20}
            x2="100"
            y2="25"
            strokeWidth={t % 45 === 0 ? 2 : 0.8}
            opacity={t % 45 === 0 ? 1 : 0.55}
            transform={`rotate(${t} 100 100)`}
          />
        ))}
      </g>
      {/* Rose */}
      <g opacity="0.85">
        {[0, 90, 180, 270].map((r) => (
          <path key={r} d="M100 34 L108 100 L100 92 L92 100Z" fill="#ecca82" transform={`rotate(${r} 100 100)`} />
        ))}
        {[45, 135, 225, 315].map((r) => (
          <path key={r} d="M100 52 L105 100 L100 95 L95 100Z" fill="#5bb5ad" transform={`rotate(${r} 100 100)`} />
        ))}
      </g>
      <g fill="#f1e4c6" fontFamily="Cinzel, serif" fontSize="13" fontWeight="700" textAnchor="middle">
        <text x="100" y="44" fill="#e8773b">N</text>
        <text x="160" y="105">E</text>
        <text x="100" y="167">S</text>
        <text x="40" y="105">W</text>
      </g>
      <m.g
        style={{ originX: '100px', originY: '100px' }}
        animate={
          spinning
            ? { rotate: [0, 360] }
            : heading !== undefined
              ? { rotate: heading }
              : { rotate: [-14, 10, -6, 14, -14] }
        }
        transition={
          spinning
            ? { duration: 2.4, repeat: Infinity, ease: 'linear' }
            : heading !== undefined
              ? { type: 'spring', stiffness: 60, damping: 9 }
              : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <path d="M100 30 L109 100 L100 108 L91 100Z" fill="#c0392b" />
        <path d="M100 170 L109 100 L100 92 L91 100Z" fill="#e7dcc4" />
      </m.g>
      <circle cx="100" cy="100" r="7" fill={`url(#${ring})`} />
      <circle cx="100" cy="100" r="2.5" fill="#07111f" />
      <ellipse cx="80" cy="62" rx="40" ry="20" fill="#ffffff" opacity="0.06" transform="rotate(-30 80 62)" />
    </svg>
  );
}
