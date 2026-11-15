import { MotionConfig } from 'motion/react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="type-label sr-only z-20 rounded-control bg-gold px-4 text-board focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:flex focus:h-(--size-touch) focus:items-center"
      >
        Skip to main content
      </a>
      <div id="top" />
      <Nav />
      <main id="main" className="flex flex-col gap-16 pt-12 pb-16 md:gap-24 md:pb-24">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
