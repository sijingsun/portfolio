import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { VideoPlayer } from '@/app/components/VideoPlayer';

type ProjectItem = {
  title: string;
  description: string;
  category: string;
  videoUrl?: string;
  posterUrl?: string;
  imageUrl?: string;
  link: string;
};

const allItems: ProjectItem[] = [
  {
    title: 'PawCast',
    description: 'Your feline-powered guide to finding the purr-fect powder.',
    category: 'vibe coding experiments',
    videoUrl: 'https://dl.dropboxusercontent.com/scl/fi/9gpjjnoe8tb4sqyl7cr2k/cat_ski.webm?rlkey=jjbsb8vvhoelnu61fhf8fll58&st=j6ptwl1t&dl=1',
    posterUrl: 'https://www.dropbox.com/scl/fi/9gpjjnoe8tb4sqyl7cr2k/cat_ski.webm?rlkey=jjbsb8vvhoelnu61fhf8fll58&st=j6ptwl1t&raw=1',
    link: '#',
  },
  {
    title: 'Iris',
    description: 'Take control over your financial future — learn and invest with Iris.',
    category: 'side projects',
    imageUrl: 'https://www.dropbox.com/scl/fi/3y5vyq6yofyol5ug577le/aris-project.png?rlkey=6oayc78hw7c4hdfs1bvoo12mf&st=jqrncv55&raw=1',
    link: '#',
  },
  {
    title: 'AI Design Pattern: Managing Memory',
    description: 'AI system remembers and recalls user context, or history to support continuity and personalization.',
    category: 'writing',
    imageUrl: 'https://vz-5359d360-758.b-cdn.net/cb5574cc-22be-420c-a3d0-72b71d1998a8/thumbnail_ae6eed6a.jpg',
    link: 'https://www.aiverse.design/patterns/learning-memory',
  },
  {
    title: 'AI Design Pattern: Model Selection',
    description: 'Allowing users to choose between different AI models so they can optimize for trade-offs like cost, latency, quality, or style.',
    category: 'writing',
    imageUrl: 'https://vz-5359d360-758.b-cdn.net/b29df843-733a-4f3b-81bd-07b3726b6bc4/thumbnail_ba5cf741.jpg',
    link: 'https://www.aiverse.design/patterns/input-model',
  },
  {
    title: 'Vibe Translator',
    description: 'Describe UI patterns in your own words and get the standard design terms that designers recognize and LLMs understand.',
    category: 'vibe coding experiments',
    imageUrl: 'https://www.dropbox.com/scl/fi/g41nvg31ifj56soiwk3sl/vibe-translator.png?rlkey=gqqrv92yvl5b5qlcms4e2ltof&st=02jwpvik&raw=1',
    link: '#',
  },
  {
    title: 'AI Design Pattern: Knowledge Bases & Integration',
    description: 'Enable individuals and teams to connect and scope data for AI, so answers stay grounded and permission-aware.',
    category: 'writing',
    imageUrl: 'https://aiverse-next.b-cdn.net/bites/sana-ai-s-conversational-chat/qb4kzioV2cRDmBmS8rW7drIjSMo.png',
    link: 'https://www.aiverse.design/patterns/input-knowledge',
  },
  {
    title: 'Vibe Shelf',
    description: 'A curated kanban board of the best vibe coding resources.',
    category: 'vibe coding experiments',
    imageUrl: 'https://www.dropbox.com/scl/fi/o3mg4xsx3cml35i2rld72/vibe-shelf-2.png?rlkey=qkirqvh0wai0jeua9pdh4djmf&st=9h2f5t4u&raw=1',
    link: '#',
  },
  {
    title: 'AI Design Pattern: Summary',
    description: 'Turn information into intent-aware recaps, highlighting what users focus on and care about.',
    category: 'writing',
    imageUrl: 'https://vz-5359d360-758.b-cdn.net/32e0f17c-5e5e-45e9-ae74-e1f4529155b2/thumbnail.jpg',
    link: 'https://www.aiverse.design/patterns/output-summary',
  },
  {
    title: 'Muse',
    description: 'Engaging art lovers with new exhibitions and events.',
    category: 'side projects',
    imageUrl: 'https://www.dropbox.com/scl/fi/lnnitf4fmgf3e5shcscwh/muse-side-project.png?rlkey=elagpmyiiit56axxu50wpm0cw&st=e1kcv2dw&raw=1',
    link: '#',
  },
];

// Split into two columns by alternating items
const column1 = allItems.filter((_, i) => i % 2 === 0);
const column2 = allItems.filter((_, i) => i % 2 === 1);

function SideCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <motion.a
      href={project.link}
      target={project.link !== '#' ? '_blank' : undefined}
      rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'block',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        textDecoration: 'none',
        position: 'relative',
        cursor: 'pointer',
      }}
      className="side-card"
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {project.videoUrl ? (
          <VideoPlayer
            src={project.videoUrl}
            poster={project.posterUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full"
            videoClassName="w-full h-auto block"
          />
        ) : (
          <ImageWithFallback
            src={project.imageUrl!}
            alt={project.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        )}

        {/* Hover overlay */}
        <div
          className="side-card-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(26, 25, 22, 0)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px',
            transition: 'background-color 300ms ease',
          }}
        >
          <p
            className="side-card-category"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              margin: '0 0 4px',
              opacity: 0,
              transition: 'opacity 280ms ease',
            }}
          >
            {project.category}
          </p>
          <h3
            className="side-card-title-overlay"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: '18px',
              color: '#fff',
              margin: '0 0 6px',
              opacity: 0,
              transition: 'opacity 280ms ease',
            }}
          >
            {project.title}
          </h3>
          <p
            className="side-card-desc"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 300,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
              lineHeight: 1.5,
              opacity: 0,
              transition: 'opacity 280ms ease',
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export function ForFun() {
  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '64px 16px 96px',
      }}
    >
      {/* Intro */}
      <div style={{ marginBottom: '64px', maxWidth: '640px' }}>
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 500,
            fontSize: 'clamp(28px, 3vw, 36px)',
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            margin: '0 0 20px',
          }}
        >
          Welcome to the playground.
        </p>
        <p
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 300,
            fontSize: '18px',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          A living collection of scrappy experiments, strange prompts, vibe coded
          ideas, and writing I build or publish purely out of curiosity. Some are rough,
          some surprisingly useful, and I'll keep updating this space as new things come to life.
        </p>
      </div>

      {/* 2-column card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}
        className="forfun-grid"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {column1.map((project, i) => (
            <SideCard key={i} project={project} index={i * 2} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {column2.map((project, i) => (
            <SideCard key={i} project={project} index={i * 2 + 1} />
          ))}
        </div>
      </div>

      {/* Writing footer link */}
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

      <style>{`
        @media (max-width: 640px) {
          .forfun-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .side-card:hover .side-card-overlay {
          background-color: rgba(26, 25, 22, 0.5) !important;
        }
        .side-card:hover .side-card-category,
        .side-card:hover .side-card-title-overlay,
        .side-card:hover .side-card-desc {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
