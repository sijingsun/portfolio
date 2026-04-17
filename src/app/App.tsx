import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import '@/styles/fonts.css';
import { Navbar } from '@/app/components/Navbar';
import { Hero } from '@/app/components/Hero';
import { ProjectGrid } from '@/app/components/ProjectGrid';
import { Footer } from '@/app/components/Footer';
import { BackToTop } from '@/app/components/BackToTop';
import { ProjectDetail } from '@/app/components/ProjectDetail';
import { ForFun } from '@/app/components/ForFun';
import { About } from '@/app/components/About';
import { Contact } from '@/app/components/Contact';
import { Project } from '@/app/data/projects';

import { OtherWorkPreview } from '@/app/components/OtherWorkPreview';

type View = 'home' | 'sidework' | 'about';

const ENABLE_PASSWORD_GATE = import.meta.env.VITE_ENABLE_PASSWORD_GATE === 'true';

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<View>('home');

  function goHome() {
    setSelectedProject(null);
    setView('home');
    window.scrollTo(0, 0);
  }

  function goSideWork() {
    setSelectedProject(null);
    setView('sidework');
    window.scrollTo(0, 0);
  }

  function goAbout() {
    setSelectedProject(null);
    setView('about');
    window.scrollTo(0, 0);
  }

  const activeView: View = selectedProject ? view : view;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        color: 'var(--text-primary)',
      }}
    >
      <Navbar
        onHomeClick={goHome}
        onSideWorkClick={goSideWork}
        onAboutClick={goAbout}
        activeView={view}
      />

      <main style={{ width: '100%', paddingTop: '103px' }}>
        <BackToTop />

        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectDetail
                project={selectedProject}
                onBack={() => {
                  setSelectedProject(null);
                  window.scrollTo(0, 0);
                }}
                onProjectClick={(p) => {
                  setSelectedProject(p);
                  window.scrollTo(0, 0);
                }}
              />
              <Footer />
            </motion.div>
          ) : view === 'sidework' ? (
            <motion.div
              key="sidework"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ForFun />
              <Footer />
            </motion.div>
          ) : view === 'about' ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <About />
              <Footer />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hero />
              <ProjectGrid onProjectClick={setSelectedProject} />
              <OtherWorkPreview onSideWorkClick={goSideWork} />
              <Contact />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  // Password gate wired to env var — logic implemented by Clair separately
  if (ENABLE_PASSWORD_GATE) {
    // <PasswordGate> would wrap AppContent here
    return <AppContent />;
  }
  return <AppContent />;
}
