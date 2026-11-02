import { useId } from 'react';
import type { IslandTheme } from '../../data/projects';

type IslandProps = { theme: IslandTheme; accent: string; className?: string };

/** Each project's island: shared sea + landmass, with a themed landmark on top. */
export function Island({ theme, accent, className = '' }: IslandProps) {
  const uid = useId().replace(/:/g, '');
  const sky = `isl-sky-${uid}`;
  const land = `isl-land-${uid}`;
  const glow = `isl-glow-${uid}`;

  return (
    <svg viewBox="0 0 400 220" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#081426" />
          <stop offset="100%" stopColor="#13304f" />
        </linearGradient>
        <linearGradient id={land} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f6b4a" />
          <stop offset="55%" stopColor="#2b4a36" />
          <stop offset="56%" stopColor="#c9b07a" />
          <stop offset="100%" stopColor="#8f7a4e" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="220" fill={`url(#${sky})`} />
      {/* Stars */}
      <g fill="#f1e4c6">
        {[
          [30, 24], [80, 50], [140, 18], [260, 30], [330, 54], [372, 20], [210, 62], [48, 88],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.3 : 0.8} className="anim-twinkle" style={{ ['--dur' as string]: `${3 + i}s` }} />
        ))}
      </g>
      <ellipse cx="200" cy="120" rx="170" ry="90" fill={`url(#${glow})`} />

      {/* Sea */}
      <rect y="168" width="400" height="52" fill="#0b2340" />
      <g opacity="0.5" stroke="#5bb5ad" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M20 184 q10 -4 20 0 t20 0" />
        <path d="M300 196 q10 -4 20 0 t20 0" />
        <path d="M120 206 q10 -4 20 0 t20 0" />
      </g>

      {/* Landmass */}
      <path d="M70 172 Q110 120 170 126 Q210 104 250 122 Q310 118 336 172Z" fill={`url(#${land})`} />
      <ellipse cx="203" cy="173" rx="150" ry="6" fill={accent} opacity="0.22" className="anim-shimmer" />

      {theme === 'neural' && <NeuralLandmark accent={accent} />}
      {theme === 'sentry' && <SentryLandmark accent={accent} />}
      {theme === 'fold' && <FoldLandmark accent={accent} />}
      {theme === 'medpred' && <MedLandmark accent={accent} />}
      {theme === 'lumi' && <LumiLandmark accent={accent} />}
      {theme === 'incuria' && <IncuriaLandmark accent={accent} />}
      {theme === 'spam' && <SpamLandmark accent={accent} />}
      {theme === 'cnn' && <CnnLandmark accent={accent} />}
    </svg>
  );
}

function NeuralLandmark({ accent }: { accent: string }) {
  return (
    <g>
      {/* Observatory tower */}
      <rect x="192" y="74" width="16" height="56" fill="#1d2d44" stroke={accent} strokeWidth="1" />
      <path d="M184 76 Q200 52 216 76Z" fill="#22406a" stroke={accent} strokeWidth="1" />
      <circle cx="200" cy="58" r="4" fill={accent} className="anim-twinkle" />
      {/* EEG traces */}
      <g fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 4" className="anim-dash">
        <path d="M40 66 L70 66 L78 50 L86 82 L94 58 L102 70 L150 70" />
        <path d="M250 50 L290 50 L296 36 L304 64 L312 44 L320 54 L370 54" opacity="0.8" />
        <path d="M232 92 L262 92 L268 82 L276 104 L284 88 L360 88" stroke="#ecca82" opacity="0.7" />
      </g>
      {/* Neuron network */}
      <g stroke={accent} strokeWidth="0.8" opacity="0.7">
        <line x1="120" y1="110" x2="150" y2="96" />
        <line x1="150" y1="96" x2="176" y2="112" />
        <line x1="150" y1="96" x2="162" y2="78" />
      </g>
      <g fill="#9fd6cf">
        <circle cx="120" cy="110" r="3" />
        <circle cx="150" cy="96" r="3.5" />
        <circle cx="176" cy="112" r="3" />
        <circle cx="162" cy="78" r="2.5" />
      </g>
    </g>
  );
}

function SentryLandmark({ accent }: { accent: string }) {
  return (
    <g>
      {/* Watchtower */}
      <path d="M190 132 L196 70 L212 70 L218 132Z" fill="#2a2633" stroke={accent} strokeWidth="1" />
      <rect x="188" y="62" width="32" height="10" fill="#3a2f3a" stroke={accent} strokeWidth="1" />
      <circle cx="204" cy="54" r="5" fill={accent} className="anim-twinkle" style={{ ['--dur' as string]: '1.6s' }} />
      {/* Radar */}
      <g transform="translate(300 76)">
        <circle r="34" fill="none" stroke={accent} strokeOpacity="0.4" />
        <circle r="22" fill="none" stroke={accent} strokeOpacity="0.3" />
        <circle r="10" fill="none" stroke={accent} strokeOpacity="0.3" />
        <g className="anim-sweep" style={{ ['--dur' as string]: '3.5s' }}>
          <circle r="34" fill="transparent" />
          <path d="M0 0 L34 0 A34 34 0 0 0 24 -24Z" fill={accent} opacity="0.4" />
        </g>
        <circle cx="12" cy="-14" r="2.2" fill="#ecca82" className="anim-twinkle" style={{ ['--dur' as string]: '2s' }} />
      </g>
      {/* Audio waveform */}
      <g fill={accent}>
        {[10, 22, 14, 34, 18, 40, 26, 12, 30, 16, 8].map((h, i) => (
          <rect key={i} x={46 + i * 9} y={80 - h / 2} width="4" height={h} rx="2" opacity={0.5 + (i % 3) * 0.2} />
        ))}
      </g>
    </g>
  );
}

function FoldLandmark({ accent }: { accent: string }) {
  const tiles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <g>
      {/* Floating classification grid */}
      <g transform="translate(138 30)">
        {tiles.map((i) => {
          const x = (i % 4) * 32;
          const y = Math.floor(i / 4) * 26;
          const hit = i === 1 || i === 6 || i === 11;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="26"
              height="20"
              rx="3"
              fill={hit ? accent : '#1b3253'}
              fillOpacity={hit ? 0.75 : 0.85}
              stroke={accent}
              strokeOpacity="0.6"
              className={hit ? 'anim-twinkle' : undefined}
              style={hit ? { ['--dur' as string]: `${2.5 + i * 0.3}s` } : undefined}
            />
          );
        })}
      </g>
      {/* Simple garment glyphs */}
      <g fill="none" stroke="#f1e4c6" strokeWidth="1.2" strokeLinejoin="round" opacity="0.9">
        <path d="M177 36 l4 -2 h4 l4 2 l3 4 l-3 2 v8 h-12 v-8 l-3 -2Z" />
        <path d="M212 88 h10 l2 14 h-5 l-2 -9 l-2 9 h-5Z" />
      </g>
      {/* Network edges down to the island */}
      <g stroke={accent} strokeWidth="0.8" opacity="0.5">
        <line x1="190" y1="110" x2="178" y2="130" />
        <line x1="210" y1="110" x2="222" y2="130" />
        <line x1="200" y1="110" x2="200" y2="130" />
      </g>
    </g>
  );
}

function MedLandmark({ accent }: { accent: string }) {
  return (
    <g>
      {/* Research dome */}
      <path d="M168 128 Q168 92 200 92 Q232 92 232 128Z" fill="#2c3550" stroke={accent} strokeWidth="1" />
      <path d="M200 92 V128 M180 98 Q190 114 190 128 M220 98 Q210 114 210 128" stroke={accent} strokeWidth="0.7" opacity="0.6" fill="none" />
      <path d="M196 74 h8 v6 h6 v8 h-6 v6 h-8 v-6 h-6 v-8 h6Z" fill={accent} className="anim-twinkle" style={{ ['--dur' as string]: '3s' }} />
      {/* Bar chart — five categories */}
      <g transform="translate(262 50)">
        {[38, 30, 18, 46, 24].map((h, i) => (
          <rect key={i} x={i * 14} y={60 - h} width="9" height={h} rx="2" fill={i === 3 ? '#ecca82' : accent} opacity={i === 3 ? 0.9 : 0.6} />
        ))}
        <line x1="-4" y1="60" x2="70" y2="60" stroke="#f1e4c6" strokeOpacity="0.4" />
      </g>
      {/* Token lines (text being read) */}
      <g fill="#f1e4c6" opacity="0.55">
        {[[40, 54, 46], [40, 66, 30], [92, 66, 22], [40, 78, 54], [40, 90, 24], [70, 90, 34]].map(([x, y, w], i) => (
          <rect key={i} x={x} y={y} width={w} height="5" rx="2.5" className={i === 3 ? 'anim-twinkle' : undefined} />
        ))}
      </g>
    </g>
  );
}

function LumiLandmark({ accent }: { accent: string }) {
  return (
    <g>
      {/* Lighthouse with a sweeping beam */}
      <g transform="translate(200 62)">
        <g className="anim-sweep" style={{ ['--dur' as string]: '9s' }}>
          <circle r="150" fill="transparent" />
          <path d="M0 0 L150 -26 L150 26Z" fill={accent} opacity="0.18" />
        </g>
      </g>
      <path d="M190 130 L194 70 L206 70 L210 130Z" fill="#e9e1cf" />
      <path d="M192 112 h16 M193 94 h14" stroke="#b8392e" strokeWidth="5" />
      <rect x="191" y="56" width="18" height="14" rx="2" fill="#1d2d44" stroke={accent} />
      <circle cx="200" cy="62" r="5" fill="#fff6d8" className="anim-twinkle" style={{ ['--dur' as string]: '2.4s' }} />
      <path d="M188 56 L200 46 L212 56Z" fill="#2a3a55" />
      {/* Voice arcs */}
      <g fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
        <path d="M86 70 a14 14 0 0 1 0 24" />
        <path d="M94 62 a24 24 0 0 1 0 40" opacity="0.6" />
        <path d="M102 54 a34 34 0 0 1 0 56" opacity="0.35" />
      </g>
      <circle cx="78" cy="82" r="5" fill={accent} />
      {/* Storybook stars */}
      <g fill="#ecca82">
        <path d="M300 40 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1Z" className="anim-twinkle" />
        <path d="M330 86 l2 4 4 1 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -1Z" className="anim-twinkle" style={{ ['--dur' as string]: '5s' }} />
      </g>
    </g>
  );
}

function IncuriaLandmark({ accent }: { accent: string }) {
  const envelopes = [
    [70, 46, -8, 3.5],
    [110, 82, 6, 4.5],
    [290, 40, 10, 5],
    [318, 90, -6, 4],
  ];
  return (
    <g>
      {/* Scriptorium tower */}
      <rect x="182" y="84" width="36" height="46" fill="#3a3550" stroke={accent} strokeWidth="1" />
      <path d="M176 86 L200 62 L224 86Z" fill="#2c4a3a" stroke={accent} strokeWidth="1" />
      <path d="M194 130 v-16 a6 6 0 0 1 12 0 v16Z" fill="#1d2d44" />
      <rect x="190" y="94" width="8" height="8" fill="#ecca82" className="anim-twinkle" />
      <rect x="202" y="94" width="8" height="8" fill="#ecca82" className="anim-twinkle" style={{ ['--dur' as string]: '5s' }} />
      {/* Quill */}
      <path d="M232 60 Q250 30 262 26 Q252 44 238 64Z" fill="#f1e4c6" opacity="0.9" />
      <line x1="238" y1="64" x2="230" y2="76" stroke="#f1e4c6" strokeWidth="1.2" />
      {/* Floating envelopes */}
      {envelopes.map(([x, y, r, d], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <g className="anim-float" style={{ ['--dur' as string]: `${d}s` }}>
            <rect x="-14" y="-9" width="28" height="18" rx="2" fill="#f1e4c6" opacity="0.92" />
            <path d="M-14 -9 L0 2 L14 -9" fill="none" stroke={accent} strokeWidth="1.4" />
          </g>
        </g>
      ))}
      {/* Draft lines */}
      <g stroke={accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" className="anim-dash" opacity="0.6">
        <path d="M128 72 Q160 60 182 92" fill="none" />
        <path d="M218 92 Q250 70 276 50" fill="none" />
      </g>
    </g>
  );
}

function SpamLandmark({ accent }: { accent: string }) {
  return (
    <g>
      {/* Filter funnel */}
      <path d="M160 52 H240 L212 92 V120 H188 V92Z" fill="#2e2a40" stroke={accent} strokeWidth="1.2" />
      <g stroke={accent} strokeOpacity="0.5" strokeWidth="0.8">
        <line x1="170" y1="62" x2="230" y2="62" />
        <line x1="180" y1="74" x2="220" y2="74" />
      </g>
      {/* Incoming messages */}
      <g fill="#f1e4c6" opacity="0.85">
        <rect x="120" y="30" width="20" height="13" rx="2" className="anim-twinkle" />
        <rect x="150" y="18" width="20" height="13" rx="2" />
        <rect x="236" y="24" width="20" height="13" rx="2" className="anim-twinkle" style={{ ['--dur' as string]: '5s' }} />
      </g>
      {/* Caught spam */}
      <g transform="translate(296 70)">
        <rect x="-12" y="-8" width="24" height="16" rx="2" fill="#5a2a3a" stroke={accent} />
        <path d="M-5 -4 L5 4 M5 -4 L-5 4" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(330 98)">
        <rect x="-12" y="-8" width="24" height="16" rx="2" fill="#5a2a3a" stroke={accent} />
        <path d="M-5 -4 L5 4 M5 -4 L-5 4" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Legitimate mail passes */}
      <g transform="translate(96 96)">
        <rect x="-12" y="-8" width="24" height="16" rx="2" fill="#f1e4c6" />
        <path d="M-5 0 L-1 4 L6 -4" stroke="#2f6b4f" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <g stroke={accent} strokeWidth="1.4" fill="none" strokeDasharray="3 5" className="anim-dash" opacity="0.6">
        <path d="M240 60 Q272 58 284 66" />
        <path d="M160 60 Q120 70 108 88" />
      </g>
    </g>
  );
}

function CnnLandmark({ accent }: { accent: string }) {
  // Feature maps shrinking through the network, drawn as skewed planes.
  const layers = [
    { x: 92, w: 40, h: 64 },
    { x: 148, w: 32, h: 52 },
    { x: 196, w: 24, h: 40 },
    { x: 236, w: 16, h: 28 },
  ];
  const mid = 70;
  return (
    <g>
      {layers.map((l, i) => (
        <g key={i}>
          {[0, 5, 10].map((o) => (
            <path
              key={o}
              d={`M${l.x + o} ${mid - l.h / 2 - o * 0.4} l${l.w / 2} -10 v${l.h} l-${l.w / 2} 10Z`}
              fill="#1b2a52"
              stroke={accent}
              strokeOpacity={0.4 + o * 0.04}
              strokeWidth="1"
            />
          ))}
        </g>
      ))}
      <g stroke={accent} strokeWidth="0.8" opacity="0.5" strokeDasharray="2 3">
        <line x1="118" y1="60" x2="148" y2="62" />
        <line x1="170" y1="62" x2="196" y2="64" />
        <line x1="214" y1="64" x2="236" y2="66" />
      </g>
      {/* Output nodes */}
      <g fill={accent}>
        {[46, 60, 74, 88].map((y, i) => (
          <circle key={y} cx="292" cy={y} r="4" opacity={i === 1 ? 1 : 0.45} className={i === 1 ? 'anim-twinkle' : undefined} />
        ))}
      </g>
      <g stroke={accent} strokeWidth="0.6" opacity="0.4">
        {[46, 60, 74, 88].map((y) => (
          <line key={y} x1="262" y1="66" x2="288" y2={y} />
        ))}
      </g>
      {/* Kernel square sliding over the first map */}
      <rect x="100" y="44" width="12" height="12" fill="none" stroke="#ecca82" strokeWidth="1.4" className="anim-float" style={{ ['--dur' as string]: '3s' }} />
    </g>
  );
}
