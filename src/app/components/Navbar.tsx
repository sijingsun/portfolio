import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'home' | 'sidework' | 'about';

const navLinks: { name: string; view: View }[] = [
  { name: 'Projects', view: 'home' },
  { name: 'Other Work', view: 'sidework' },
  { name: 'About', view: 'about' },
];

interface NavbarProps {
  onHomeClick?: () => void;
  onSideWorkClick?: () => void;
  onAboutClick?: () => void;
  activeView?: View;
}

export function Navbar({ onHomeClick, onSideWorkClick, onAboutClick, activeView = 'home' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.setProperty('color-scheme', 'light');
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleNavClick(view: View) {
    if (view === 'home') onHomeClick?.();
    else if (view === 'sidework') onSideWorkClick?.();
    else if (view === 'about') onAboutClick?.();
    setIsOpen(false);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
          backgroundColor: scrolled ? 'rgba(250, 248, 245, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: '1px solid var(--border)',
          height: '85px',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '28px clamp(24px, 6vw, 96px) 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src="/images/clairlogo.png"
                alt="Clair Sun"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 400,
                fontSize: '20px',
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
            >
              Clair Sun
            </span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden md:flex">
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: 'var(--text-primary)',
                    opacity: isActive ? 1 : 0.5,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = isActive ? '1' : '0.5'; }}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '8px',
              zIndex: 60,
              position: 'relative',
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 55,
              backgroundColor: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 400,
                    fontSize: '32px',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    lineHeight: 1.2,
                  }}
                >
                  {link.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
