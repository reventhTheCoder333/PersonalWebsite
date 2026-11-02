import { useId } from 'react';
import type { SkillGroup } from '../../data/skills';

type DevilFruitProps = { palette: SkillGroup['palette']; variant: SkillGroup['variant']; className?: string };

/** An original swirl-patterned fruit. The 'haki' variant renders an aura emblem instead. */
export function DevilFruit({ palette, variant, className = '' }: DevilFruitProps) {
  const uid = useId().replace(/:/g, '');
  const body = `df-body-${uid}`;
  const aura = `df-aura-${uid}`;

  if (variant === 'haki') {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
        <defs>
          <radialGradient id={aura} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.light} stopOpacity="0.9" />
            <stop offset="55%" stopColor={palette.base} stopOpacity="0.45" />
            <stop offset="100%" stopColor={palette.base} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="56" fill={`url(#${aura})`} className="anim-shimmer" />
        <g fill="none" stroke={palette.light} strokeWidth="2.2" strokeLinecap="round">
          <path d="M60 18 L66 46 L94 34 L74 56 L102 66 L72 70 L82 98 L60 78 L38 98 L48 70 L18 66 L46 56 L26 34 L54 46Z" fill={palette.swirl} fillOpacity="0.7" />
        </g>
        <circle cx="60" cy="62" r="10" fill={palette.light} />
        <circle cx="60" cy="62" r="4" fill={palette.swirl} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={body} cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="70%" stopColor={palette.base} />
          <stop offset="100%" stopColor={palette.swirl} />
        </radialGradient>
      </defs>
      {/* Stem + leaf */}
      <path d="M60 26 Q58 14 66 6" stroke="#3b2a12" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M64 14 Q84 2 96 14 Q82 26 64 14Z" fill="#4f7d3a" />
      <path d="M66 14 Q80 10 92 14" stroke="#2d4a20" strokeWidth="1" fill="none" />
      {/* Body: clustered lobes */}
      <g fill={`url(#${body})`}>
        <circle cx="44" cy="52" r="22" />
        <circle cx="76" cy="52" r="22" />
        <circle cx="60" cy="40" r="20" />
        <circle cx="40" cy="80" r="22" />
        <circle cx="80" cy="80" r="22" />
        <circle cx="60" cy="90" r="22" />
        <circle cx="60" cy="66" r="26" />
      </g>
      {/* Swirls */}
      <g fill="none" stroke={palette.swirl} strokeWidth="2.6" strokeLinecap="round" opacity="0.85">
        {[
          [44, 52], [76, 52], [60, 40], [40, 80], [80, 80], [60, 92], [60, 66],
        ].map(([x, y], i) => (
          <path
            key={i}
            d={`M${x} ${y} m-1 0 a2 2 0 1 1 3 2 a5 5 0 1 1 -7 -6 a9 9 0 1 1 10 12`}
          />
        ))}
      </g>
      <ellipse cx="46" cy="40" rx="8" ry="4" fill="#ffffff" opacity="0.35" transform="rotate(-30 46 40)" />
    </svg>
  );
}
