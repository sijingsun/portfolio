import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const BUBBLE_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 20px',
  borderRadius: '12px 12px 0 12px',
  overflow: 'hidden',
  maxWidth: 'calc(100vw - 48px)',
};

function BubbleBackground() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', borderRadius: 'inherit' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.35, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
        <img
          alt=""
          src="/images/contact-bg.png"
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
      </div>
    </>
  );
}

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [phase, setPhase] = useState<'hidden' | 'typing' | 'message'>('hidden');

  useEffect(() => {
    if (!isInView) return;
    setPhase('typing');
    const timer = setTimeout(() => setPhase('message'), 1800);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section
      ref={ref}
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'clamp(100px, 16vw, 240px) clamp(24px, 6vw, 96px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {phase === 'typing' && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, scale: 0.88, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15, ease: 'easeIn' } }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              style={{ ...BUBBLE_STYLE, padding: '14px 22px' }}
            >
              <BubbleBackground />
              <div style={{ position: 'relative', display: 'flex', gap: '6px', alignItems: 'center', height: '18px' }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.35)' }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.94, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30, mass: 0.7 }}
              style={{ ...BUBBLE_STYLE, padding: '32px 28px' }}
            >
              <BubbleBackground />
              <div style={{
                position: 'relative',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: '#000000',
                lineHeight: 1.55,
              }}>
                <p style={{ margin: 0 }}>
                  {'Well, you made it this far — shoot me an email at '}
                  <a
                    href="mailto:clairsun98@gmail.com"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    clairsun98@gmail.com
                  </a>
                  {' or find me on '}
                  <a
                    href="https://www.linkedin.com/in/clairsun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    LinkedIn
                  </a>
                  {' :)'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
