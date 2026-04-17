import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const notes = [
  {
    title: "AI Design Pattern: Managing Memory",
    description: "AI system remembers and recalls user context, or history to support continuity and personalization.",
    href: "https://www.aiverse.design/patterns/learning-memory",
    imageUrl: "https://vz-5359d360-758.b-cdn.net/cb5574cc-22be-420c-a3d0-72b71d1998a8/thumbnail_ae6eed6a.jpg"
  },
  {
    title: "AI Design Pattern: Model Selection",
    description: "Allowing users to choose between different AI models so they can optimize for trade-offs like cost, latency, quality, or style.",
    href: "https://www.aiverse.design/patterns/input-model",
    imageUrl: "https://vz-5359d360-758.b-cdn.net/b29df843-733a-4f3b-81bd-07b3726b6bc4/thumbnail_ba5cf741.jpg"
  },
  {
    title: "AI Design Pattern: Knowledge Bases & Integration",
    description: "Enable individuals and teams to connect and scope data for AI, so answers stay grounded and permission-aware.",
    href: "https://www.aiverse.design/patterns/input-knowledge",
    imageUrl: "https://aiverse-next.b-cdn.net/bites/sana-ai-s-conversational-chat/qb4kzioV2cRDmBmS8rW7drIjSMo.png"
  },
  {
    title: "AI Design Pattern: Summary",
    description: "Turn information into intent-aware recaps, highlighting what users focus on and care about.",
    href: "https://www.aiverse.design/patterns/output-summary",
    imageUrl: "https://vz-5359d360-758.b-cdn.net/32e0f17c-5e5e-45e9-ae74-e1f4529155b2/thumbnail.jpg"
  }
];

export function Notes() {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '120px 16px 0' }}>
      {/* Section label */}
      <p
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          marginBottom: '56px',
        }}
      >
        My Writing
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
        {notes.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width: '100%',
                aspectRatio: '3 / 2',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '20px',
              }}
            >
              <ImageWithFallback
                src={note.imageUrl}
                alt={note.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Title */}
            <a
              href={note.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 400,
                fontSize: '22px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                lineHeight: 1.35,
                marginBottom: '10px',
                borderBottom: '1px solid transparent',
                paddingBottom: '2px',
                transition: 'border-color 200ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderBottomColor = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
            >
              {note.title}
            </a>

            {/* Description */}
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                margin: 0,
              }}
            >
              {note.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer link */}
      <p
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: 'var(--text-tertiary)',
          marginTop: '64px',
          textAlign: 'center',
        }}
      >
        View more AI design patterns at{' '}
        <a
          href="https://www.aiverse.design/patterns"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--accent)',
            paddingBottom: '1px',
          }}
        >
          aiverse.design/patterns
        </a>
      </p>
    </div>
  );
}
