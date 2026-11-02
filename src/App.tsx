import { useEffect, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domMax, useReducedMotion } from 'framer-motion';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/layout/Loader';
import { MusicPlayer } from './components/layout/MusicPlayer';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Research } from './components/sections/Research';
import { Skills } from './components/sections/Skills';

const LOADER_MS = 1300;
const SEEN_KEY = 'grandline-intro-seen';

function shouldShowIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(() => !reduceMotion && shouldShowIntro());
  const [introDelay] = useState(() => (showLoader ? LOADER_MS / 1000 + 0.1 : 0.1));

  useEffect(() => {
    if (!showLoader) return;
    const t = window.setTimeout(() => {
      setShowLoader(false);
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* storage unavailable — intro simply shows again next time */
      }
    }, LOADER_MS);
    return () => window.clearTimeout(t);
  }, [showLoader]);

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only z-[80] rounded-full bg-gold px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <AnimatePresence>{showLoader && <Loader key="loader" />}</AnimatePresence>
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <Hero introDelay={introDelay} />
          <About />
          <Projects />
          <Skills />
          <Research />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <MusicPlayer />
      </MotionConfig>
    </LazyMotion>
  );
}
