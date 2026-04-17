import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SplitText from '@/app/components/SplitText/SplitText';
import BorderGlow from '@/app/components/BorderGlow/BorderGlow';
import heroBg from '@/imports/video option 2.mp4';

const DAISY_ICON = "/images/daisybullet.png";

const bullets = [
  { text: "Inventing AI interaction patterns that don't exist yet", size: 18 },
  { text: "Co-author of Alverse.design, a framework for designing AI", size: 17 },
  { text: "A' Design Award judge · Webby Award nominee", size: 17 },
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

/*
  Blur strategy
  ─────────────
  z-index 1  Card glass  — always present, blur(10px) only over the bullet card area.
             Positioned to exactly underlay the 652×206 card.
  z-index 2  Full overlay — covers the ENTIRE hero at the same blur(10px) + white tint.
             Fades out at t=1s. While it's opaque the card glass is completely hidden
             beneath it, so the viewer sees one uniform blur. When it fades, the card
             glass is revealed — identical blur on identical video → seamless.
  z-index 3  Ghost spacer (visibility:hidden) — holds layout so content layer doesn't shift.
  z-index 4  Content (SplitText + bullets)
  z-index 5  "See my work" button
*/

export function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto 96px', padding: '0 clamp(16px, 3vw, 40px)' }}>
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
          ── z-index 1 · Card glass (always present) ──────────────────────────
          Permanently blurs just the bullet card area. This is what remains
          visible after the full overlay fades away.
        */}
        <div style={{ ...LAYOUT, zIndex: 1, pointerEvents: 'none' }}>
          {/* invisible spacer pushes card glass into the right position */}
          <div style={{ width: '476px', maxWidth: '100%', visibility: 'hidden', flexShrink: 0 }}>
            <p className="split-title-line">Nice to meet you,</p>
            <p className="split-title-line">I'm Clair Sun</p>
          </div>
          <BorderGlow
            borderRadius={20}
            backgroundColor='rgba(255,255,255,0.10)'
            glowColor='0 0 95'
            glowIntensity={0.8}
            glowRadius={36}
            colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.5)']}
            fillOpacity={0}
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              width: '652px',
              maxWidth: '100%',
              height: '206px',
              flexShrink: 0,
              boxShadow: 'none',
              pointerEvents: 'auto',
            }}
          />
        </div>

        {/*
          ── z-index 2 · Full-hero overlay (fades out) ────────────────────────
          Identical blur + tint covering the whole hero, sitting ON TOP of the
          card glass. While opaque, only this layer is visible — uniform blur
          everywhere. On fade, the card glass underneath is revealed with the
          exact same appearance. No visual jump.
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

        {/* ── z-index 3 · Ghost spacer (layout anchor) ── */}
        <div style={{ ...LAYOUT, zIndex: 3, pointerEvents: 'none' }}>
          <div style={{ width: '476px', maxWidth: '100%', visibility: 'hidden', flexShrink: 0 }}>
            <p className="split-title-line">Nice to meet you,</p>
            <p className="split-title-line">I'm Clair Sun</p>
          </div>
          <div style={{ width: '652px', maxWidth: '100%', height: '206px', flexShrink: 0 }} />
        </div>

        {/* ── z-index 4 · Content ── */}
        <div style={{ ...LAYOUT, zIndex: 4, pointerEvents: 'none' }}>
          <div style={{ width: '476px', maxWidth: '100%', textAlign: 'center' }}>
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

          <div style={{ position: 'relative', width: '652px', maxWidth: '100%', height: '206px', flexShrink: 0 }}>
            {[
              { top: '48px',  size: 18, h: '23px' },
              { top: '87px',  size: 17, h: '22px' },
              { top: '126px', size: 17, h: '22px' },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.15, ease: EASE }}
                style={{
                  position: 'absolute',
                  left: '58px', top: b.top,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                <img src={DAISY_ICON} alt="" style={{ width: '26px', height: b.h, objectFit: 'contain', flexShrink: 0 }} />
                <span style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 500, fontSize: `clamp(13px, 1.4vw, ${b.size}px)`,
                  lineHeight: '1.4', color: 'rgba(0,0,0,0.8)',
                }}>
                  {bullets[i].text}
                </span>
              </motion.div>
            ))}
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
