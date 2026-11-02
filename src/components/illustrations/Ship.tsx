import { useId } from 'react';

type ShipProps = { className?: string; silhouette?: boolean };

/**
 * An original three-sail brigantine with a sun figurehead and a compass crest.
 * `silhouette` renders a flat dark version for backlit (sunset) scenes.
 */
export function Ship({ className = '', silhouette = false }: ShipProps) {
  const s = silhouette;
  const uid = useId().replace(/:/g, '');
  const hull = s ? '#120a10' : `url(#ship-hull-${uid})`;
  const sail = s ? '#1a0f16' : `url(#ship-sail-${uid})`;
  const trim = s ? '#1a0f16' : '#d8aa4f';
  const mast = s ? '#120a10' : '#4a2f1a';

  return (
    <svg viewBox="0 0 260 240" className={className} aria-hidden="true">
      {!s && (
        <defs>
          <linearGradient id={`ship-hull-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a5a33" />
            <stop offset="100%" stopColor="#3d2414" />
          </linearGradient>
          <linearGradient id={`ship-sail-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbf2dc" />
            <stop offset="100%" stopColor="#d8c494" />
          </linearGradient>
        </defs>
      )}
      {/* Rigging */}
      <g stroke={s ? '#120a10' : '#2a1c0f'} strokeWidth="0.8" opacity={s ? 1 : 0.6}>
        <line x1="128" y1="22" x2="30" y2="160" />
        <line x1="128" y1="22" x2="214" y2="152" />
        <line x1="78" y1="64" x2="236" y2="150" />
      </g>
      {/* Masts */}
      <rect x="125.5" y="18" width="5" height="150" fill={mast} />
      <rect x="75.5" y="58" width="4" height="108" fill={mast} />
      {/* Bowsprit */}
      <line x1="214" y1="152" x2="252" y2="132" stroke={mast} strokeWidth="4" strokeLinecap="round" />
      {/* Flags */}
      <path d="M130 18 L156 24 L130 31Z" fill={s ? '#120a10' : '#b8392e'} />
      <path d="M79 58 L96 62 L79 67Z" fill={s ? '#120a10' : '#5bb5ad'} />
      {/* Main sails */}
      <path d="M133 34 Q176 46 178 78 L133 80Z" fill={sail} />
      <path d="M133 86 Q188 98 190 136 L133 138Z" fill={sail} />
      <path d="M123 40 Q92 62 94 100 L123 100Z" fill={sail} opacity={s ? 1 : 0.92} />
      <path d="M73 70 Q46 92 48 130 L73 130Z" fill={sail} opacity={s ? 1 : 0.92} />
      <path d="M214 150 L252 132 L210 104Z" fill={sail} opacity={s ? 1 : 0.88} />
      {/* Crest on the main sail: an original compass star */}
      {!s && (
        <g transform="translate(158 112)">
          <circle r="12" fill="none" stroke="#b8392e" strokeWidth="1.6" />
          <path d="M0 -14 L3 0 L0 14 L-3 0Z" fill="#b8392e" />
          <path d="M-14 0 L0 -3 L14 0 L0 3Z" fill="#b8392e" opacity="0.7" />
        </g>
      )}
      {/* Hull */}
      <path
        d="M22 156 Q40 150 128 152 Q200 150 232 146 Q228 176 206 190 Q130 202 58 192 Q34 182 22 156Z"
        fill={hull}
      />
      <path d="M26 162 Q120 168 230 152" stroke={trim} strokeWidth="2" fill="none" opacity={s ? 1 : 0.85} />
      {!s && (
        <g fill="#1d120a">
          {[70, 96, 122, 148, 174].map((x) => (
            <circle key={x} cx={x} cy="176" r="3.2" />
          ))}
        </g>
      )}
      {/* Sun figurehead */}
      <g transform="translate(228 146)">
        {!s &&
          Array.from({ length: 10 }, (_, i) => (
            <path key={i} d="M0 -15 L3 -9 L-3 -9Z" fill="#e8773b" transform={`rotate(${i * 36})`} />
          ))}
        <circle r="9" fill={s ? '#120a10' : '#ecca82'} />
        {!s && <circle r="9" fill="none" stroke="#a87b2a" strokeWidth="1.2" />}
      </g>
      {/* Stern lantern */}
      {!s && <circle cx="24" cy="150" r="3" fill="#ecca82" />}
    </svg>
  );
}
