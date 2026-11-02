import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Music, Pause, Play, Volume1, Volume2, VolumeX, X } from 'lucide-react';

const SRC = '/music/background.mp3';
const STORAGE_KEY = 'grandline-music';
const DEFAULT_VOLUME = 0.3;

type Prefs = { volume: number; enabled: boolean };
type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'unavailable';

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<Prefs>;
      const volume = typeof p.volume === 'number' && p.volume >= 0 && p.volume <= 1 ? p.volume : DEFAULT_VOLUME;
      return { volume, enabled: p.enabled === true };
    }
  } catch {
    /* storage unavailable or corrupt — fall back to defaults */
  }
  return { volume: DEFAULT_VOLUME, enabled: false };
}

function writePrefs(p: Prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* preference simply won't persist */
  }
}

/**
 * Opt-in background music. Never autoplays: a remembered "on" preference only
 * changes the label to "Resume", the visitor still has to press play. The audio
 * element lives at the app root, so in-page navigation never interrupts it.
 */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [prefs, setPrefs] = useState<Prefs>(readPrefs);
  const [status, setStatus] = useState<Status>('idle');
  const [open, setOpen] = useState(false);

  const playing = status === 'playing';

  useEffect(() => writePrefs(prefs), [prefs]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = prefs.volume;
  }, [prefs.volume]);

  // Close the panel on Escape or a click elsewhere.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = prefs.volume;
    if (status === 'unavailable') audio.load(); // retry a failed fetch
    setStatus('loading');
    try {
      await audio.play();
      setStatus('playing');
      setPrefs((p) => ({ ...p, enabled: true }));
    } catch (err) {
      // NotAllowedError = browser policy; anything else = file missing/undecodable.
      setStatus(err instanceof DOMException && err.name === 'NotAllowedError' ? 'blocked' : 'unavailable');
    }
  }, [prefs.volume, status]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setStatus('paused');
    setPrefs((p) => ({ ...p, enabled: false }));
  }, []);

  const toggle = () => (playing ? pause() : play());

  const setVolume = (v: number) => setPrefs((p) => ({ ...p, volume: v }));
  const VolumeIcon = prefs.volume === 0 ? VolumeX : prefs.volume < 0.5 ? Volume1 : Volume2;

  const message: Record<Status, string> = {
    idle: prefs.enabled ? 'Your music was on last voyage — press play to resume.' : 'Optional ambience. Off until you press play.',
    loading: 'Raising the sails…',
    playing: 'Now playing on the ship’s music box.',
    paused: 'Paused. The sea is quiet.',
    blocked: 'Your browser blocked playback — press play again.',
    unavailable: 'Music is unavailable right now. The rest of the site works as usual.',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <audio
        ref={audioRef}
        src={SRC}
        preload="none"
        loop
        onError={() => setStatus('unavailable')}
        onPause={() => setStatus((s) => (s === 'playing' ? 'paused' : s))}
        onPlay={() => setStatus('playing')}
      />

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="music-panel"
            role="region"
            aria-label="Background music controls"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 1, originY: 1 }}
            className="w-[min(18rem,calc(100vw-2rem))] rounded-3xl border border-gold/25 bg-navy-950/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_30px_-12px_rgba(216,170,79,0.35)] backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-hand text-base leading-none text-gold-soft/80">Ship’s music box</p>
                <p className="mt-1 truncate font-display text-sm font-bold tracking-wide text-parchment">Binks’ Sake</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Close music controls"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-mist/60 transition hover:bg-mist/10 hover:text-parchment"
              >
                <X size={14} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={toggle}
                disabled={status === 'loading'}
                aria-label={playing ? 'Pause music' : prefs.enabled ? 'Resume music' : 'Play music'}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-navy-950 shadow-glow transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {playing ? <Pause size={18} /> : <Play size={18} className="translate-x-px" />}
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVolume(prefs.volume === 0 ? DEFAULT_VOLUME : 0)}
                  aria-label={prefs.volume === 0 ? 'Unmute' : 'Mute'}
                  className="shrink-0 text-mist/70 transition hover:text-parchment"
                >
                  <VolumeIcon size={16} />
                </button>
                <label htmlFor="music-volume" className="sr-only">
                  Volume
                </label>
                <input
                  id="music-volume"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(prefs.volume * 100)}
                  onChange={(e) => setVolume(Number(e.target.value) / 100)}
                  aria-valuetext={`${Math.round(prefs.volume * 100)}%`}
                  className="h-1.5 w-full cursor-pointer accent-gold"
                />
                <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-mist/60">
                  {Math.round(prefs.volume * 100)}%
                </span>
              </div>
            </div>

            <p
              aria-live="polite"
              className={`mt-3 text-xs leading-snug ${
                status === 'unavailable' || status === 'blocked' ? 'text-[#f5b088]' : 'text-mist/65'
              }`}
            >
              {message[status]}
            </p>
          </m.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="music-panel"
        aria-label={playing ? 'Music playing — open music controls' : 'Open music controls'}
        className={`group relative grid h-12 w-12 place-items-center rounded-full border bg-navy-950/85 backdrop-blur-md transition duration-300 hover:border-gold/60 ${
          playing
            ? 'border-gold/50 shadow-[0_0_24px_-6px_rgba(216,170,79,0.6)]'
            : 'border-gold/20 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]'
        }`}
      >
        {playing && <span className="anim-pulse-ring absolute inset-0 rounded-full border border-gold/40" aria-hidden />}
        {playing ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0, 0.2, 0.4, 0.1].map((d, i) => (
              <span key={i} className="anim-eq w-[3px] rounded-full bg-gold-soft" style={{ animationDelay: `${d}s`, height: '100%' }} />
            ))}
          </span>
        ) : (
          <Music size={18} className="text-gold-soft transition group-hover:scale-110" aria-hidden />
        )}
        {!playing && prefs.enabled && status !== 'unavailable' && (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-tide" aria-hidden />
        )}
      </button>
    </div>
  );
}
