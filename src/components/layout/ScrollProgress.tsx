import { m, useScroll, useSpring } from 'framer-motion';

/** A thin gold "route line" across the top that fills as the visitor sails down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-[2px] bg-gradient-to-r from-tide via-gold to-sunset"
      style={{ scaleX, originX: 0 }}
    />
  );
}
