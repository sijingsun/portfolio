import React from 'react';
import { motion } from 'motion/react';
import heroBg from '@/imports/video option 2.mp4';

const awards = [
  'NY Product Design Awards — Gold',
  'London Design Awards — Gold',
  'UX Design Awards',
  'Webby Award Nominee 2026',
  "A' Design Award Judge",
  'WBDS Design Judge',
];

const credentials = [
  { label: 'Currently', value: 'Senior UX Designer, AI/ML · Amazon Web Services' },
  { label: 'Previously', value: 'Founding Designer · C3.ai Generative AI Suite' },
  { label: 'Previously', value: 'Design Consultant · Deloitte Consulting' },
  { label: 'Education', value: 'HCI · Carnegie Mellon University' },
];

const links = [
  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/clairsun/' },
  { label: 'Email ↗', href: 'mailto:clairsun98@gmail.com' },
];

export function About() {
  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '64px clamp(32px, 9vw, 140px) 96px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '55% 40%',
          gap: '5%',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left: text content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Headline */}
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: 'clamp(36px, 4vw, 48px)',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              margin: '0 0 32px',
            }}
          >
            Oh hey there 👋
          </h1>

          {/* Bio */}
          {[
            "I design AI products that feel built for real people — because I've always been more interested in how technology changes us than in the technology itself.",
            "I started at a venture capital firm, watching hundreds of AI ideas take shape before most people knew what to do with them. That early view shaped how I design: I look for the gap nobody has claimed yet, then build toward it.",
            "Today I work at the frontier of AI interaction — inventing patterns that don't have a name yet, and shipping products that reach tens of thousands of enterprise users. I co-authored Alverse.design, a framework for designing AI, and I serve as an A' Design Award judge and Webby Award nominee.",
            "Outside of work, I teach yoga. It's taught me that the best experiences — digital or physical — create space for people to slow down and actually think.",
            "I'm always looking for problems worth solving. If you're building something that matters, I'd love to talk.",
          ].map((para, i, arr) => (
            <p
              key={i}
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 300,
                fontSize: '18px',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                margin: i === arr.length - 1 ? '0 0 48px' : '0 0 20px',
              }}
            >
              {para}
            </p>
          ))}

          {/* Credentials */}
          <div style={{ marginBottom: '40px' }}>
            {credentials.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text-tertiary)',
                    flexShrink: 0,
                    width: '90px',
                    paddingTop: '2px',
                  }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {c.value}
                </span>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div style={{ marginBottom: '40px' }}>
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                margin: '0 0 14px',
              }}
            >
              Recognition
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {awards.map((award, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '100px',
                    padding: '6px 14px',
                  }}
                >
                  {award}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'border-color 200ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderBottomColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: landscape video / photo placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'sticky', top: '88px' }}
        >
          {/* PHOTO_PLACEHOLDER — replace with <img src="your-photo.jpg" style={{ width: '100%', borderRadius: '16px' }} /> */}
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '3 / 4',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                display: 'block',
              }}
            >
              <source
                src={heroBg}
                type="video/mp4"
              />
            </video>
          </div>

          {/* Co-author callout */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px 20px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          >
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                margin: '0 0 6px',
              }}
            >
              Co-author
            </p>
            <a
              href="https://www.alverse.design"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 500,
                fontSize: '17px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                display: 'block',
                lineHeight: 1.4,
              }}
            >
              Alverse.design ↗
            </a>
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 300,
                fontSize: '13px',
                color: 'var(--text-secondary)',
                margin: '4px 0 0',
                lineHeight: 1.5,
              }}
            >
              A framework for designing AI interaction patterns
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
