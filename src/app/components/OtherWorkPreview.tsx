import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { VideoPlayer } from '@/app/components/VideoPlayer';

interface OtherWorkPreviewProps {
  onSideWorkClick: () => void;
}

const allItems = [
  {
    title: 'PawCast',
    category: 'vibe coding',
    videoUrl: 'https://dl.dropboxusercontent.com/scl/fi/9gpjjnoe8tb4sqyl7cr2k/cat_ski.webm?rlkey=jjbsb8vvhoelnu61fhf8fll58&st=j6ptwl1t&dl=1',
    posterUrl: 'https://www.dropbox.com/scl/fi/9gpjjnoe8tb4sqyl7cr2k/cat_ski.webm?rlkey=jjbsb8vvhoelnu61fhf8fll58&st=j6ptwl1t&raw=1',
  },
  {
    title: 'AI Design Pattern: Managing Memory',
    category: 'writing',
    imageUrl: 'https://vz-5359d360-758.b-cdn.net/cb5574cc-22be-420c-a3d0-72b71d1998a8/thumbnail_ae6eed6a.jpg',
    href: 'https://www.aiverse.design/patterns/learning-memory',
  },
  {
    title: 'Vibe Translator',
    category: 'vibe coding',
    imageUrl: 'https://www.dropbox.com/scl/fi/g41nvg31ifj56soiwk3sl/vibe-translator.png?rlkey=gqqrv92yvl5b5qlcms4e2ltof&st=02jwpvik&raw=1',
  },
  {
    title: 'AI Design Pattern: Model Selection',
    category: 'writing',
    imageUrl: 'https://vz-5359d360-758.b-cdn.net/b29df843-733a-4f3b-81bd-07b3726b6bc4/thumbnail_ba5cf741.jpg',
    href: 'https://www.aiverse.design/patterns/input-model',
  },
  {
    title: 'Iris',
    category: 'side project',
    imageUrl: 'https://www.dropbox.com/scl/fi/3y5vyq6yofyol5ug577le/aris-project.png?rlkey=6oayc78hw7c4hdfs1bvoo12mf&st=jqrncv55&raw=1',
  },
  {
    title: 'AI Design Pattern: Knowledge Bases',
    category: 'writing',
    imageUrl: 'https://aiverse-next.b-cdn.net/bites/sana-ai-s-conversational-chat/qb4kzioV2cRDmBmS8rW7drIjSMo.png',
    href: 'https://www.aiverse.design/patterns/input-knowledge',
  },
  {
    title: 'Vibe Shelf',
    category: 'vibe coding',
    imageUrl: 'https://www.dropbox.com/scl/fi/o3mg4xsx3cml35i2rld72/vibe-shelf-2.png?rlkey=qkirqvh0wai0jeua9pdh4djmf&st=9h2f5t4u&raw=1',
  },
  {
    title: 'AI Design Pattern: Summary',
    category: 'writing',
    imageUrl: 'https://vz-5359d360-758.b-cdn.net/32e0f17c-5e5e-45e9-ae74-e1f4529155b2/thumbnail.jpg',
    href: 'https://www.aiverse.design/patterns/output-summary',
  },
  {
    title: 'Muse',
    category: 'side project',
    imageUrl: 'https://www.dropbox.com/scl/fi/lnnitf4fmgf3e5shcscwh/muse-side-project.png?rlkey=elagpmyiiit56axxu50wpm0cw&st=e1kcv2dw&raw=1',
  },
];

const marqueeItems = [...allItems, ...allItems];

const CARD_WIDTH = 380;
const CARD_GAP = 24;

function MarqueeCard({ item }: { item: typeof allItems[number] }) {
  return (
    <div
      onClick={() => item.href && window.open(item.href, '_blank', 'noopener,noreferrer')}
      style={{
        width: `${CARD_WIDTH}px`,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: item.href ? 'pointer' : 'default',
      }}
    >
      <div style={{
        width: '100%',
        aspectRatio: '4 / 3',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
      }}>
        {item.videoUrl ? (
          <VideoPlayer
            src={item.videoUrl}
            poster={item.posterUrl}
            autoPlay loop muted playsInline
            className="w-full h-full"
            videoClassName="w-full h-full object-cover block"
          />
        ) : (
          <ImageWithFallback
            src={item.imageUrl!}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      <div>
        <p style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 500,
          fontSize: '11px',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          margin: '0 0 3px',
        }}>
          {item.category}
        </p>
        <p style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          {item.title}
        </p>
      </div>
    </div>
  );
}

export function OtherWorkPreview({ onSideWorkClick }: OtherWorkPreviewProps) {
  const [paused, setPaused] = useState(false);

  return (
    <section style={{ maxWidth: '1440px', margin: '0 auto 120px', padding: '0 16px' }}>

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '12px' }}>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 300,
          fontSize: 'clamp(16px, 2vw, 22px)',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          Done looking at my work? Check out my other stuff :)
        </p>
        <button
          onClick={onSideWorkClick}
          style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px',
            color: 'var(--text-primary)', flexShrink: 0, marginLeft: '24px',
            borderBottom: '1px solid transparent', transition: 'border-color 200ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderBottomColor = 'var(--text-primary)')}
          onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
        >
          View all →
        </button>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border)', marginBottom: '40px' }} />

      {/* Marquee */}
      <div style={{ overflow: 'hidden', margin: '0 -48px', padding: '0 48px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            padding: '8px 0',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div
            className="marquee-track"
            style={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              width: 'max-content',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {marqueeItems.map((item, i) => (
              <MarqueeCard key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        @media (max-width: 600px) {
          .marquee-track { animation-duration: 36s; }
        }
      `}</style>
    </section>
  );
}
