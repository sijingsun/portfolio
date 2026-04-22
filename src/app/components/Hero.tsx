import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplitText from '@/app/components/SplitText/SplitText';
import BorderGlow from '@/app/components/BorderGlow/BorderGlow';
import heroBg from '@/imports/video option 2.mp4';

const DAISY_ICON = "/images/daisybullet.png";

const bullets = [
  { text: "Inventing AI interaction patterns that don't exist yet", size: 15 },
  { text: "Co-author of Alverse.design, a framework for designing AI", size: 14 },
  { text: "A' Design Award judge · Webby Award nominee", size: 14 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const LAYOUT: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '48px',
  paddingTop: '30px',
  paddingBottom: '120px',
  paddingLeft: '40px',
  paddingRight: '40px',
  boxSizing: 'border-box',
};

/* Bullet list rendered at both z-1 (hidden, for sizing) and z-4 (visible) */
function BulletList({ visible }: { visible: boolean }) {
  return (
    <div style={{
      padding: '28px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      visibility: visible ? 'visible' : 'hidden',
    }}>
      {bullets.map((b, i) => (
        <motion.div
          key={i}
          initial={visible ? { opacity: 0, x: -10 } : false}
          animate={visible ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.35 + i * 0.15, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <img src={DAISY_ICON} alt="" style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0 }} />
          <span style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 500,
            fontSize: `clamp(11px, 1.1vw, ${b.size}px)`,
            lineHeight: '1.4',
            color: 'rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
          }}>
            {b.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto 96px', padding: '0 clamp(32px, 9vw, 140px)' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(500px, calc(100vh - 80px), 840px)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* ── Video ── */}
        <video
          autoPlay loop muted playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
          }}
        >
          <source src={heroBg} type="video/mp4" />
        </video>

        {/*
          z-index 1 · BorderGlow card — always present, one consistent blur.
          Sized by invisible duplicate bullet content so it wraps tightly.
          The overlay (z-2) sits on top and fades away, revealing this card
          underneath with identical blur — no jump, no double-blur.
        */}
        <div style={{ ...LAYOUT, zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ visibility: 'hidden', flexShrink: 0 }}>
            <p className="split-title-line">Nice to meet you,</p>
            <p className="split-title-line">I'm Clair Sun</p>
          </div>
          <BorderGlow
            borderRadius={20}
            backgroundColor="rgba(255,255,255,0.10)"
            glowColor="38 45 90"
            colors={['transparent', 'transparent', 'transparent']}
            glowIntensity={0.8}
            fillOpacity={0}
            style={{
              flexShrink: 0,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: 'none',
              pointerEvents: 'auto',
            }}
          >
            {/* invisible — only here to size the card */}
            <BulletList visible={false} />
          </BorderGlow>
        </div>

        {/*
          z-index 2 · Full-hero overlay — same blur(10px) covering everything.
          While present, viewer sees one uniform blur. On fade, the z-1 card
          with identical blur is revealed underneath → seamless, no jump.
        */}
        <AnimatePresence>
          {!revealed && (
            <motion.div
              key="overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: 0,
                zIndex: 2,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                background: 'rgba(255,255,255,0.18)',
              }}
            />
          )}
        </AnimatePresence>

        {/* ── z-index 4 · Visible content: title + bullets ── */}
        <div style={{ ...LAYOUT, zIndex: 4, pointerEvents: 'none' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <SplitText
              text="Nice to meet you,"
              tag="p" splitType="chars"
              duration={0.7} delay={35} ease="power3.out"
              from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}
              threshold={0} rootMargin="0px"
              textAlign="center" className="split-title-line"
            />
            <SplitText
              text="I'm Clair Sun"
              tag="p" splitType="chars"
              duration={0.7} delay={35} ease="power3.out"
              from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}
              threshold={0} rootMargin="0px"
              textAlign="center" className="split-title-line"
            />
          </div>
          {/* Visible bullets — same layout as z-1 hidden clone → perfect overlay */}
          <div style={{ flexShrink: 0 }}>
            <BulletList visible={true} />
          </div>
        </div>

        {/* ── z-index 5 · "See my work" ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
          style={{
            position: 'absolute', bottom: '28px', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            cursor: 'pointer',
          }}
        >
          <span style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 400, fontSize: '14px', color: '#ffffff',
            letterSpacing: '0.02em', whiteSpace: 'nowrap',
            textShadow: '0 1px 4px rgba(0,0,0,0.35)',
          }}>
            See my work
          </span>
          <motion.svg
            width="20" height="12" viewBox="0 0 20 12" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={revealed ? { y: [0, 4, 0] } : {}}
            transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <path d="M1 1L10 10L19 1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 520px) {
          .split-title-line { font-size: clamp(28px, 8vw, 44px) !important; }
        }
      `}</style>
    </div>
  );
}
