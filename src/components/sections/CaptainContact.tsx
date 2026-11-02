import { profile } from '../../data/profile';
import { ContactForm } from './ContactForm';

/*
 * Layout maths: both character layers share a 560×330 viewBox and span the full
 * width W. The form is inset 5% each side (x 28–532) and pulled up over the bottom
 * (330 − 215) units of the drawing — margin-top % resolves against width — so its
 * top edge sits at y=215 at any size.
 */
const VB = '0 0 560 330';
const FORM_TOP = 215;
const OVERLAP = `${-((330 - FORM_TOP) / 560) * 100}%`;
// The figure is drawn at a base scale, then enlarged around the centre line.
const FIGURE = 'translate(-70 -8) scale(1.25)';

const skin = '#c58c5c';
const skinShade = '#9c6740';
const coat = '#183251';

/** An original straw-hatted captain who peeks over and holds up the contact parchment. */
export function CaptainContact() {
  const art = profile.contactCaptainArt;

  return (
    <div className="anim-float-sm mx-auto w-full max-w-xl focus-within:[animation-play-state:paused]" style={{ ['--dur' as string]: '7s' }}>
      <div className="group relative -rotate-[0.8deg] transition-transform duration-500 ease-out hover:-translate-y-1 hover:rotate-0">
        {art ? (
          <img
            src={art}
            alt=""
            className="pointer-events-none relative z-0 mx-auto block aspect-[560/330] w-full object-contain object-bottom"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <CaptainBack />
        )}

        <div className="relative z-10 mx-[5%]" style={{ marginTop: OVERLAP }}>
          <ContactForm />
        </div>

        {!art && <CaptainHands />}
      </div>
    </div>
  );
}

function CaptainBack() {
  return (
    <svg viewBox={VB} className="pointer-events-none relative z-0 block h-auto w-full" aria-hidden="true">
      <defs>
        <radialGradient id="cap-aura" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#d8aa4f" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#d8aa4f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cap-straw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3d98f" />
          <stop offset="100%" stopColor="#d4ac55" />
        </linearGradient>
      </defs>
      <ellipse cx="280" cy="150" rx="220" ry="140" fill="url(#cap-aura)" />

      {/* Cuffs at the paper's edges (the arms run behind the parchment) */}
      {[18, 542].map((x) => (
        <g key={x}>
          <circle cx={x} cy="256" r="18" fill={coat} stroke="#0b1a2e" strokeWidth="2" />
          <circle cx={x} cy="256" r="18" fill="none" stroke="#d8aa4f" strokeWidth="3" strokeDasharray="4 3" opacity="0.9" />
        </g>
      ))}

      <g transform={FIGURE}>
      {/* Coat & shoulders */}
      <path d="M150 300 Q156 176 232 158 L328 158 Q404 176 410 300Z" fill={coat} stroke="#0b1a2e" strokeWidth="2" />
      <path d="M248 158 L280 196 L312 158" fill="none" stroke="#d8aa4f" strokeWidth="3" strokeLinejoin="round" />
      <path d="M232 158 Q200 168 184 190" fill="none" stroke="#d8aa4f" strokeWidth="2" opacity="0.7" />
      <path d="M328 158 Q360 168 376 190" fill="none" stroke="#d8aa4f" strokeWidth="2" opacity="0.7" />

      {/* Neck */}
      <path d="M262 128 h36 v34 q-18 10 -36 0Z" fill={skinShade} />

      {/* Head */}
      <ellipse cx="231" cy="96" rx="9" ry="12" fill={skin} />
      <ellipse cx="329" cy="96" rx="9" ry="12" fill={skin} />
      <ellipse cx="280" cy="92" rx="50" ry="53" fill={skin} />

      {/* Hair */}
      <path
        d="M228 74 Q236 46 280 44 Q324 46 332 74 L330 92 L320 78 L311 92 L300 76 L290 90 L280 74 L270 90 L260 76 L250 92 L240 78 L231 94Z"
        fill="#1b1410"
      />

      {/* Face */}
      <g fill="none" stroke="#2a1608" strokeLinecap="round">
        <path d="M252 84 q8 -4 16 -1" strokeWidth="2.5" />
        <path d="M292 83 q8 -3 16 1" strokeWidth="2.5" />
        <path d="M254 100 q8 -9 16 0" strokeWidth="3.5" />
        <path d="M290 100 q8 -9 16 0" strokeWidth="3.5" />
        <path d="M280 103 q4 6 -1 9" strokeWidth="2" stroke={skinShade} />
      </g>
      <circle cx="252" cy="114" r="7" fill="#e07a5f" opacity="0.3" />
      <circle cx="308" cy="114" r="7" fill="#e07a5f" opacity="0.3" />
      <path d="M254 118 Q280 152 306 118 Q280 126 254 118Z" fill="#3a1410" />
      <path d="M258 120 Q280 127 302 120 Q300 126 280 128 Q262 127 258 120Z" fill="#fff8ec" />
      <path d="M268 137 Q280 143 292 137" fill="none" stroke="#c4554a" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

      {/* Straw hat — tips up on hover */}
      <g className="origin-center transition-transform duration-500 [transform-box:fill-box] group-hover:-translate-y-1.5 group-hover:-rotate-6">
        <ellipse cx="280" cy="60" rx="114" ry="20" fill="url(#cap-straw)" stroke="#a97f2b" strokeWidth="2" />
        <ellipse cx="280" cy="60" rx="96" ry="13" fill="none" stroke="#b88d38" strokeWidth="1" opacity="0.6" />
        <path d="M226 60 Q222 18 280 14 Q338 18 334 60Z" fill="url(#cap-straw)" stroke="#a97f2b" strokeWidth="2" />
        <g stroke="#b88d38" strokeWidth="1" opacity="0.55" fill="none">
          <path d="M236 34 Q280 26 324 34" />
          <path d="M232 44 Q280 36 328 44" />
          <path d="M256 18 L250 58 M280 15 V58 M304 18 L310 58" />
        </g>
        <path d="M227 48 Q280 58 333 48 L334 60 Q280 70 226 60Z" fill="#1f5a5f" />
      </g>
      </g>
    </svg>
  );
}

/** Hands sit above the form so the thumbs overlap the parchment. */
function CaptainHands() {
  return (
    <svg
      viewBox={VB}
      className="pointer-events-none absolute inset-x-0 top-0 z-20 block h-auto w-full"
      aria-hidden="true"
    >
      {[
        { x: 26, dir: 1 },
        { x: 534, dir: -1 },
      ].map(({ x, dir }) => (
        <g key={x} transform={`translate(${x} 244) scale(${dir} 1)`}>
          <ellipse cx="-2" cy="2" rx="14" ry="18" fill={skin} stroke={skinShade} strokeWidth="1.5" />
          <path d="M-12 -4 q6 3 12 0 M-12 4 q6 3 12 0 M-11 12 q5 3 10 0" stroke={skinShade} strokeWidth="1.2" fill="none" opacity="0.8" />
          <ellipse cx="14" cy="-8" rx="10" ry="6" transform="rotate(-28 14 -8)" fill={skin} stroke={skinShade} strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}
