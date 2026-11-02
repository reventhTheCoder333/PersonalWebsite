import { m } from 'framer-motion';
import { Compass } from '../illustrations/Compass';

/** Brief opening screen: the compass spins while the map "unrolls" away. */
export function Loader() {
  return (
    <m.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,181,173,0.12),transparent_60%)]" />
      <m.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.6 } }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Compass className="h-28 w-28 drop-shadow-[0_0_30px_rgba(216,170,79,0.35)]" spinning />
      </m.div>
      <m.p
        className="mt-8 font-display text-sm tracking-[0.5em] text-gold-soft"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        CHARTING THE COURSE
      </m.p>
      <div className="mt-5 h-px w-48 overflow-hidden bg-mist/15">
        <m.div
          className="h-full bg-gradient-to-r from-tide via-gold to-sunset"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ originX: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </div>
    </m.div>
  );
}
