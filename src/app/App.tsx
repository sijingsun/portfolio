import React from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
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
import { OtherWorkPreview } from '@/app/components/OtherWorkPreview';
import { projects } from '@/app/data/projects';
import type { Project } from '@/app/data/projects';

const ENABLE_PASSWORD_GATE = import.meta.env.VITE_ENABLE_PASSWORD_GATE === 'true';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function projectBySlug(slug: string): Project | undefined {
  return projects.find(p => slugify(p.title) === slug);
}

export { slugify };

function HomePage() {
  const navigate = useNavigate();

  function handleProjectClick(p: Project) {
    navigate(`/projects/${slugify(p.title)}`);
    window.scrollTo(0, 0);
  }

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero />
      <ProjectGrid onProjectClick={handleProjectClick} />
      <OtherWorkPreview onSideWorkClick={() => { navigate('/other-work'); window.scrollTo(0, 0); }} />
      <Contact />
      <Footer />
    </motion.div>
  );
}

function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? projectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/" replace />;

  return (
    <motion.div
      key={`project-${project.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectDetail
        project={project}
        onBack={() => { navigate('/'); window.scrollTo(0, 0); }}
        onProjectClick={(p) => { navigate(`/projects/${slugify(p.title)}`); window.scrollTo(0, 0); }}
      />
      <Footer />
    </motion.div>
  );
}

function SideWorkPage() {
  return (
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
  );
}

function AboutPage() {
  return (
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
  );
}

function activeViewFromPath(pathname: string): 'home' | 'sidework' | 'about' {
  if (pathname.startsWith('/other-work')) return 'sidework';
  if (pathname.startsWith('/about')) return 'about';
  return 'home';
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeView = activeViewFromPath(location.pathname);

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
        onHomeClick={() => { navigate('/'); window.scrollTo(0, 0); }}
        onSideWorkClick={() => { navigate('/other-work'); window.scrollTo(0, 0); }}
        onAboutClick={() => { navigate('/about'); window.scrollTo(0, 0); }}
        activeView={activeView}
      />

      <main style={{ width: '100%', paddingTop: '103px' }}>
        <BackToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/other-work" element={<SideWorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function AppContent() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

export default function App() {
  if (ENABLE_PASSWORD_GATE) {
    return <AppContent />;
  }
  return <AppContent />;
}
