type WaveLayer = { color: string; opacity?: number; duration: number; amplitude: number; offset: number };

type WavesProps = { layers: WaveLayer[]; className?: string };

/** Eight identical 200-unit crests across 1600 units, so translating by -50% loops seamlessly. */
function wavePath(amplitude: number) {
  return `M0 ${amplitude} q100 ${-amplitude} 200 0${' t200 0'.repeat(7)} V200 H0Z`;
}

/**
 * Horizontally drifting wave strips. Each layer is an SVG twice the container's width
 * translating by -50%, which is a GPU-friendly transform-only animation.
 */
export function Waves({ layers, className = '' }: WavesProps) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`} aria-hidden="true">
      {layers.map((l, i) => (
        <div
          key={i}
          className="anim-wave absolute left-0 w-[200%]"
          style={{
            top: `${l.offset}%`,
            bottom: 0,
            ['--dur' as string]: `${l.duration}s`,
            animationDirection: i % 2 ? 'reverse' : 'normal',
          }}
        >
          <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="h-full w-full">
            <path d={wavePath(l.amplitude)} fill={l.color} opacity={l.opacity ?? 1} />
          </svg>
        </div>
      ))}
    </div>
  );
}
