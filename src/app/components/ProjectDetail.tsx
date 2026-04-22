import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Project, projects } from "../data/projects";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { VideoPlayer } from './VideoPlayer';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onProjectClick?: (project: Project) => void;
}

// ─── Stat block data ──────────────────────────────────────────────────────────

const statBlocks: Record<number, { value: string; label: string }[]> = {
  1: [
    { value: '73k+', label: 'Total users' },
    { value: '72.46%', label: 'Ease of use' },
    { value: '87.83%', label: 'Task completion' },
  ],
  2: [
    { value: '635k+', label: 'GA users at launch' },
    { value: '72.5%', label: 'Ease of use' },
    { value: '+17.5pt', label: 'Ease of use improvement' },
  ],
  3: [
    { value: '60', label: 'New companies in 2 days' },
    { value: '25', label: 'Client companies' },
    { value: '$5M', label: 'Revenue generated' },
  ],
};

const kumoAwards = [
  { award: 'Gold', org: 'New York Product Design Awards' },
  { award: 'Gold', org: 'London Design Awards' },
  { award: 'Nominee', org: 'UX Design Awards' },
  { award: 'Nominee', org: 'Webby Award 2026' },
];

// ─── Shared style helpers ─────────────────────────────────────────────────────

const sectionLabel: React.CSSProperties = {
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  fontWeight: 500,
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-tertiary)',
  margin: '0 0 16px',
};

const bodyText: React.CSSProperties = {
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  fontWeight: 300,
  fontSize: '18px',
  lineHeight: 1.75,
  color: 'var(--text-secondary)',
  margin: 0,
};

const boldInBody: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--text-primary)',
};

const captionText: React.CSSProperties = {
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  color: 'var(--text-tertiary)',
  marginTop: '10px',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <p style={sectionLabel}>{children}</p>;
}

function ContentBlock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {children}
    </div>
  );
}

// Text wrapper — no width constraint, fills the container
function TextCol({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ ...style }}>{children}</div>;
}

// Large bold pitch statement — the "ad headline" style
function PitchStatement({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
      fontSize: 'clamp(24px, 2.8vw, 38px)',
      color: 'var(--text-primary)',
      lineHeight: 1.25,
      margin: 0,
      ...style,
    }}>
      {children}
    </p>
  );
}

function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        gap: '2px',
        backgroundColor: 'var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '48px',
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              margin: '0 0 8px',
            }}
          >
            {stat.value}
          </p>
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function AwardGrid({ awards }: { awards: typeof kumoAwards }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2px',
        backgroundColor: 'var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '48px',
      }}
    >
      {awards.map((a, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '24px 32px',
          }}
        >
          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontSize: '20px',
              color: 'var(--text-primary)',
              margin: '0 0 4px',
            }}
          >
            {a.award}
          </p>
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              color: 'var(--text-secondary)',
              margin: 0,
            }}
          >
            {a.org}
          </p>
        </div>
      ))}
    </div>
  );
}

function CaseStudyCTA() {
  return (
    <div style={{ marginBottom: '48px' }}>
      <a
        href="mailto:clairsun98@gmail.com"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          color: 'var(--text-primary)',
          border: '1.5px solid var(--text-primary)',
          borderRadius: '8px',
          padding: '12px 24px',
          textDecoration: 'none',
          transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
      >
        Get in touch for a case study
        <ArrowUpRight size={14} />
      </a>
    </div>
  );
}

function ReadAboutIt({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '40px',
        marginTop: '16px',
      }}
    >
      <SectionHeader>Read about it</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              paddingBottom: '2px',
              width: 'fit-content',
              transition: 'color 200ms ease, border-color 200ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderBottomColor = 'var(--border-strong)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderBottomColor = 'transparent';
            }}
          >
            {link.label}
            <ArrowUpRight size={13} />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Spaces Vision feature showcase ──────────────────────────────────────────

function SpacesVision() {
  const features = [
    {
      label: 'Scoped knowledge',
      title: 'Build your space',
      description: 'Connect data sources, files, and knowledge bases to define exactly what your AI knows — and nothing outside it.',
      image: '/images/landing.png',
      imageAlt: 'Empty space setup screen',
    },
    {
      label: 'Persistent outputs',
      title: 'Chat with your data',
      description: 'Every conversation produces structured artifacts — summaries, analyses, next steps — organized and ready to reuse.',
      image: '/images/enter an artifact.png',
      imageAlt: 'GA space with populated knowledge',
    },
  ];

  return (
    <div style={{ marginBottom: '160px' }}>
      {/* Header row — full-width headline */}
      <div style={{ marginBottom: '32px' }}>
        <SectionHeader>The Vision</SectionHeader>
        <p style={{ ...bodyText, fontSize: '16px', margin: '16px 0 24px', maxWidth: '640px' }}>
          To resolve this gap, I drove the team to a new vision by studying the competitive landscape and doing a thorough user audit on the current product.
        </p>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 400,
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          margin: 0,
        }}>
          Context is explicit, inputs are scoped to your data, and every output is structured and built to last.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', backgroundColor: 'var(--border)', marginBottom: '40px' }} />

      {/* Two feature columns */}
      <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        {features.map((f, i) => (
          <div key={i} style={{
            paddingRight: i === 0 ? '48px' : 0,
            paddingLeft: i === 1 ? '48px' : 0,
            borderRight: i === 0 ? '1px solid var(--border)' : 'none',
          }}>
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              color: 'var(--text-primary)',
              margin: '0 0 10px',
            }}>{f.title}</p>
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              margin: '0 0 24px',
            }}>{f.description}</p>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <ImageWithFallback
                src={f.image}
                alt={f.imageAlt}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProjectDetail({ project, onBack, onProjectClick }: ProjectDetailProps) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const heroTitles: Record<number, string> = {
    1: 'Quick Spaces',
  };
  const heroTaglines: Record<number, string> = {
    1: 'A Gen AI workspace that turns conversations into structured, reusable work.',
    2: 'Making it possible for any business user to build their own AI agent — no engineering required.',
    3: 'Unifying fragmented enterprise knowledge into a single AI-powered search and chat experience, built in 90 days.',
    4: 'Turning prompt engineering from a black box into a guided, accessible experience for enterprise users.',
    5: 'An AI companion designed not to speed you up — but to help you slow down and reflect.',
  };
  const heroRole: Record<number, string> = {
    3: 'Founding Designer',
    4: 'Founding Designer',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ paddingBottom: '80px' }}
    >
      {/* ── Back button ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px 0', paddingLeft: 'calc(16px + clamp(24px, 6vw, 80px))' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: 'var(--text-tertiary)',
            marginBottom: '48px',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >
          ← Back to projects
        </button>
      </div>

      {/* ══ UNIFIED HERO — identical layout for all projects ══ */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 16px', overflow: 'hidden', marginBottom: '128px' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '68vh', overflow: 'hidden' }}>
          {/* Left: text */}
          <div style={{
            flexShrink: 0, width: 'min(46%, 580px)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', paddingLeft: 'clamp(24px, 6vw, 80px)', paddingRight: '56px',
            paddingTop: '60px', paddingBottom: '60px',
          }}>
            <p style={{ ...sectionLabel, marginBottom: '24px' }}>
              {heroRole[project.id] ?? project.role} · {project.year}
            </p>
            <h1 style={{
              fontFamily: '"Playfair Display", serif', fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--text-primary)',
              lineHeight: 1.1, margin: '0 0 28px', letterSpacing: '-0.01em',
            }}>
              {heroTitles[project.id] ?? project.title}
            </h1>
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300,
              fontSize: 'clamp(15px, 1.3vw, 18px)', color: 'var(--text-secondary)',
              lineHeight: 1.7, margin: 0, maxWidth: '400px',
            }}>
              {heroTaglines[project.id]}
            </p>
          </div>
          {/* Right: media card with progressive blur */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
            <div style={{
              width: 'calc(100% + 80px)', height: '100%', borderRadius: '16px 0 0 16px',
              overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
              borderLeft: '1px solid var(--border)', borderRight: 'none', boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
            }}>
              {project.video ? (
                <VideoPlayer src={project.video} poster={project.image} autoPlay loop muted playsInline
                  className="w-full h-full" videoClassName="w-full h-full object-cover object-left block" />
              ) : (
                <img
                  src={project.id === 4 ? 'https://www.dropbox.com/scl/fi/33ul0sl037tmlz6nz3r4x/detail-page-cover.png?rlkey=99hzh4tnbzdij8zmsi1uon1pw&st=4i7r92lv&raw=1' : project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center', display: 'block' }}
                />
              )}
            </div>
            {[
              { width: 240, blur: 2,  start: '0%'  },
              { width: 200, blur: 6,  start: '15%' },
              { width: 160, blur: 12, start: '30%' },
              { width: 120, blur: 20, start: '50%' },
              { width:  80, blur: 32, start: '70%' },
            ].map((layer, i) => (
              <div key={i} style={{
                position: 'absolute', top: '40px', right: 0, bottom: '40px',
                width: `${layer.width}px`, backdropFilter: `blur(${layer.blur}px)`,
                WebkitBackdropFilter: `blur(${layer.blur}px)`,
                maskImage: `linear-gradient(to right, transparent ${layer.start}, black 100%)`,
                WebkitMaskImage: `linear-gradient(to right, transparent ${layer.start}, black 100%)`,
                pointerEvents: 'none',
              }} />
            ))}
            <div style={{
              position: 'absolute', top: '40px', right: 0, bottom: '40px', width: '240px',
              background: 'linear-gradient(to right, transparent 0%, var(--bg-primary) 80%)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>

      {/* ══ PROJECT 1: Quick Spaces ══ */}
      {project.id === 1 && (
        <>
          {/* Spaces content */}
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(32px, 9vw, 140px)' }}>
            <div style={{ marginBottom: '160px' }}>
              <SectionHeader>The Problem</SectionHeader>
              <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginTop: '32px' }}>
                <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
                  Enterprise AI chat has no memory. Every conversation starts from zero.
                </p>
                <div>
                  <p style={{ ...bodyText, fontSize: '17px', marginBottom: '24px' }}>AI tools weren't designed for persistent work.<br />Users hit the same walls every day:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {['Context resets every session — no memory of past decisions', 'Outputs vanish into transcripts, never structured for reuse', 'AI answers from generic training, not your actual data'].map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', marginTop: '10px' }} />
                        <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <SpacesVision />
            <div className="spaces-funded-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', marginBottom: '128px' }}>
              <div style={{ padding: 'clamp(32px, 4vw, 56px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <p style={{ ...sectionLabel, marginBottom: '10px' }}>From zero to funded</p>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0 }}>This product didn't exist. No roadmap, no brief, no precedent inside Amazon.</p>
              </div>
              <div style={{ padding: 'clamp(32px, 4vw, 56px)' }}>
                <PitchStatement style={{ fontSize: 'clamp(16px, 1.4vw, 22px)', lineHeight: 1.6 }}>
                  I identified the gap, prototyped the entire experience, and demoed to senior leadership to get a full engineering team funded. We successfully launched to GA in October 2025.
                </PitchStatement>
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <SectionHeader>Impact</SectionHeader>
              <p style={{ ...bodyText, fontSize: '17px', marginTop: '16px' }}>
                Launched to <strong style={boldInBody}>73,000+</strong> enterprise users at GA. Ease of use scored <strong style={boldInBody}>72.46%</strong> against a product average of <strong style={boldInBody}>62.25%</strong>, with <strong style={boldInBody}>87.83%</strong> task completion.
              </p>
            </div>
            <StatGrid stats={statBlocks[1]} />
            <CaseStudyCTA />
            <ReadAboutIt links={[
              { label: 'Watch this announced at re:Invent', href: 'https://www.youtube.com/watch?v=0GThOh8ylKg' },
              { label: 'Learn more about Amazon Quick Spaces', href: 'https://aws.amazon.com/quick/spaces/' },
            ]} />
          </div>
        </>
      )}

      {/* ══ PROJECT 2: Build with AI ══ */}
      {project.id === 2 && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(32px, 9vw, 140px)' }}>

          {/* The Opportunity */}
          <div style={{ marginBottom: '140px' }}>
            <SectionHeader>The Opportunity</SectionHeader>
            <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginTop: '32px' }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
                Building AI agents required engineering expertise most business users simply didn't have.
              </p>
              <div>
                <p style={{ ...bodyText, fontSize: '17px', marginBottom: '24px' }}>
                  Many users who could benefit most from custom agents were dropping off during setup. The opportunity: use AI itself to lower the barrier.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    "Complex API configurations required technical knowledge users didn't have",
                    "Prompt engineering was opaque — no feedback, no guidance, no iteration",
                    "Data integration required understanding permissions most users couldn't navigate",
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', marginTop: '10px' }} />
                      <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interaction framework callout */}
          <div className="spaces-funded-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', marginBottom: '96px' }}>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p style={{ ...sectionLabel, marginBottom: '10px' }}>Interaction Framework</p>
              <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0 }}>Three modes that defined every design decision in this project.</p>
            </div>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)' }}>
              <PitchStatement style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: 1.35 }}>
                Done for me. Done with me. Done by me. — Build with AI lives squarely in the middle: giving users momentum without taking away control.
              </PitchStatement>
            </div>
          </div>

          {/* Interaction typologies image */}
          <div style={{ marginBottom: '96px' }}>
            <SectionHeader>The Design</SectionHeader>
            <div style={{ marginTop: '32px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src="https://www.dropbox.com/scl/fi/ggtu8x9n9bkhiuv9rpvp2/ai-user-interactions.png?rlkey=naczdbx0wram5atu3qze754ho&st=r0h07a4x&raw=1" alt="AI–user interaction typologies" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <p style={captionText}>AI–user interaction typologies</p>
          </div>

          {/* Solution video */}
          <div style={{ marginBottom: '96px' }}>
            <SectionHeader>The Experience</SectionHeader>
            <div style={{ marginTop: '32px', borderRadius: '16px', overflow: 'hidden' }}>
              <VideoPlayer src="https://dl.dropboxusercontent.com/scl/fi/ntp60onb0qxgeb5eulcn3/build-with-AI-1.mov?rlkey=10odc6b2caewjsbqfvkj5wixb&st=tj5q6wte&dl=0" autoPlay loop muted playsInline className="w-full h-auto" />
            </div>
            <p style={captionText}>A snapshot of the Build with AI experience</p>
          </div>

          {/* Impact metrics */}
          <div style={{ marginBottom: '24px' }}>
            <SectionHeader>Impact</SectionHeader>
            <p style={{ ...bodyText, fontSize: '17px', marginTop: '16px' }}>
              Build with AI launched to over <strong style={boldInBody}>635k</strong> users at GA. Ease of use improved from <strong style={boldInBody}>55%</strong> to <strong style={boldInBody}>72.5%</strong>. The VP of Amazon Agentic AI called it "The cleanest feature and interface I have seen in Quick Suite."
            </p>
          </div>
          <StatGrid stats={statBlocks[2]} />
          <CaseStudyCTA />
          <ReadAboutIt links={[
            { label: 'Watch this announced at re:Invent', href: 'https://www.youtube.com/watch?v=duccb_K1seQ' },
            { label: 'Learn more about Amazon Quick Agents', href: 'https://aws.amazon.com/quick/chat-agents/' },
          ]} />
        </div>
      )}

      {/* ══ PROJECT 3: C3 Generative AI ══ */}
      {project.id === 3 && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(32px, 9vw, 140px)' }}>

          {/* The Challenge */}
          <div style={{ marginBottom: '140px' }}>
            <SectionHeader>The Challenge</SectionHeader>
            <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginTop: '32px' }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
                Enterprise professionals spend 60–70% of their day inside documents — with no AI built for them.
              </p>
              <div>
                <p style={{ ...bodyText, fontSize: '17px', marginBottom: '24px' }}>
                  Despite the surge in generative AI tools in early 2023, none addressed what enterprise users actually needed: scalability, security, accuracy, and a tailored experience.
                </p>
                <ImageWithFallback src="https://www.dropbox.com/scl/fi/k84z14id3axr7lr4si0bn/painpoints.png?rlkey=f7it6cgsexu9y5318o51pkiqc&st=ffypephc&raw=1" alt="Painpoints" className="w-full h-auto rounded-lg" />
                <p style={captionText}>Painpoints for enterprise professionals</p>
              </div>
            </div>
          </div>

          {/* Design approach — two feature columns */}
          <div style={{ marginBottom: '140px' }}>
            <SectionHeader>Defining the Design</SectionHeader>
            <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', marginTop: '40px' }}>
              <div style={{ paddingRight: '48px', borderRight: '1px solid var(--border)' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 12px' }}>Choosing the right layout</p>
                <p style={{ ...bodyText, fontSize: '15px', marginBottom: '24px' }}>Asked to mirror Bing, I pushed back — consumer patterns don't map to enterprise workflows. We landed on a session-style layout that supports deeper, follow-up questions.</p>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <ImageWithFallback src="https://www.dropbox.com/scl/fi/m423lds4yrhzedqaim421/different-layouts.png?rlkey=qpy7uzu2tjc83k1mlpyoem9tq&st=60iu1kci&raw=1" alt="Layout exploration" className="w-full h-auto" />
                </div>
              </div>
              <div style={{ paddingLeft: '48px' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 12px' }}>Split-pane architecture</p>
                <p style={{ ...bodyText, fontSize: '15px', marginBottom: '24px' }}>A split-pane structure lets users keep their question visible while verifying sources side by side — bridging AI generation and verification without breaking flow.</p>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <ImageWithFallback src="https://www.dropbox.com/scl/fi/oszy7akazt7el85wa6j6v/define-interaction.png?rlkey=mawh3a3ij012b81tdavgzhirz&st=6vyosagx&raw=1" alt="Split-pane interaction" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Speed + craft callout */}
          <div className="spaces-funded-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', marginBottom: '96px' }}>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p style={{ ...sectionLabel, marginBottom: '10px' }}>The loading state</p>
              <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0 }}>With a 20-second average load time, every frame had to earn its place.</p>
            </div>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)' }}>
              <PitchStatement style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: 1.35 }}>
                I partnered with data scientists to turn the loading sequence into a visual narrative — giving users a window into how their answer was being built.
              </PitchStatement>
            </div>
          </div>

          {/* Loading images */}
          <div style={{ marginBottom: '96px' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <ImageWithFallback src="https://www.dropbox.com/scl/fi/1ia8yle5z4ai8lz748v37/loading-3.png?rlkey=ikkgel8k5uajteq0zphip6tw9&st=cld3z6v9&raw=1" alt="Loading experience" className="w-full h-auto" />
            </div>
            <p style={captionText}>The final loading experience — a visual narrative of how the answer is generated</p>
          </div>

          {/* Solution video */}
          <div style={{ marginBottom: '96px' }}>
            <SectionHeader>Solution Walkthrough</SectionHeader>
            <p style={{ ...bodyText, fontSize: '17px', marginTop: '16px', marginBottom: '32px' }}>
              Launched in March 2023 — a unified enterprise knowledge source that lets users search data, ask questions, and act on insights through a single conversational experience.
            </p>
            <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <VideoPlayer src="https://www.dropbox.com/scl/fi/dpmswejcwctb1jb7xh2h7/search-chat.mov?rlkey=x48205jv26l7t0bi45o6z0nfb&st=o5spr2wm&raw=1" className="w-full h-auto" autoPlay loop muted playsInline />
            </div>
          </div>

          {/* Impact */}
          <div style={{ marginBottom: '24px' }}>
            <SectionHeader>Impact</SectionHeader>
            <p style={{ ...bodyText, fontSize: '17px', marginTop: '16px' }}>
              The product drew in <strong style={boldInBody}>60</strong> new companies within two days of launch, now serves <strong style={boldInBody}>25</strong> client companies across <strong style={boldInBody}>19</strong> industries, and generated <strong style={boldInBody}>$5M</strong> in revenue for C3.ai.
            </p>
          </div>
          <StatGrid stats={statBlocks[3]} />
          <CaseStudyCTA />
          <ReadAboutIt links={[
            { label: 'Read about the launch in 2023', href: 'https://c3.ai/c3-ai-announces-launch-of-c3-generative-ai-product-suite/' },
            { label: 'Watch how this product works in CRM', href: 'https://www.youtube.com/watch?v=IbZD79nJ8Y8&list=PL9sUPTgqL5NppJtYMY8HAYL65oNY_V7zX&index=10' },
          ]} />
        </div>
      )}

      {/* ══ PROJECT 4: C3.AI Prompt Engineering ══ */}
      {project.id === 4 && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(32px, 9vw, 140px)' }}>

          {/* The Challenge */}
          <div style={{ marginBottom: '140px' }}>
            <SectionHeader>The Challenge</SectionHeader>
            <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginTop: '32px' }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
                Prompt engineering was too important to stay locked behind technical expertise.
              </p>
              <div>
                <p style={{ ...bodyText, fontSize: '17px', marginBottom: '24px' }}>After launching the C3 Generative AI MVP, two critical gaps emerged immediately:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    "Users couldn't tailor AI outputs to their business context — only data scientists could touch the model",
                    "Without evaluation tools, there was no way to compare prompts or deploy with confidence",
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', marginTop: '10px' }} />
                      <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '16px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Part 1: Prompt configuration — two feature columns */}
          <div style={{ marginBottom: '140px' }}>
            <SectionHeader>Part 1: Prompt Configuration</SectionHeader>
            <p style={{ ...bodyText, fontSize: '17px', marginTop: '16px', marginBottom: '40px', maxWidth: '640px' }}>
              I worked with data scientists to decompose a complex prompt script into modular, user-friendly components — then simplified further to remove everything users didn't need.
            </p>
            <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
              <div style={{ paddingRight: '48px', borderRight: '1px solid var(--border)' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 12px' }}>Understanding the complexity</p>
                <p style={{ ...bodyText, fontSize: '15px', marginBottom: '24px' }}>Starting with what data scientists actually used — mapping the full script into understandable segments.</p>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <ImageWithFallback src="https://www.dropbox.com/scl/fi/ab1i4iscv3oc1ru2fglsn/understand.png?rlkey=86kwq6u4pmf1bvrdau4l29mt8&st=ffwwzhjv&raw=1" alt="Comparisons of model outputs" className="w-full h-auto" />
                </div>
              </div>
              <div style={{ paddingLeft: '48px' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 12px' }}>Simplifying to the essentials</p>
                <p style={{ ...bodyText, fontSize: '15px', marginBottom: '24px' }}>Three layout explorations — then a deliberate simplification that removed and combined sections for a cleaner, more direct experience.</p>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <ImageWithFallback src="https://www.dropbox.com/scl/fi/yitrsj2j84jkm4dsp3uuq/refine-design.png?rlkey=xhk4ptccp6na34kqklk5mgu69&st=8b3znfaq&raw=1" alt="Final configuration interface" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Part 2: Evaluation — two feature columns */}
          <div style={{ marginBottom: '96px' }}>
            <SectionHeader>Part 2: Prompt Evaluation</SectionHeader>
            <p style={{ ...bodyText, fontSize: '17px', marginTop: '16px', marginBottom: '40px', maxWidth: '640px' }}>
              Side-by-side visual comparison was inefficient and prone to bias. I replaced it with a scoring-based evaluation system built with data scientists — making results systematic and actionable.
            </p>
            <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
              <div style={{ paddingRight: '48px', borderRight: '1px solid var(--border)' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 12px' }}>Testing interaction modes</p>
                <p style={{ ...bodyText, fontSize: '15px', marginBottom: '24px' }}>Explored two evaluation approaches — user interviews with data scientists confirmed batch testing was the right path.</p>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <ImageWithFallback src="https://www.dropbox.com/scl/fi/yk4dgt6wbcl5kmho6ufsa/eval-1.png?rlkey=kh7nuk63slq68xgujh5l7bdpa&st=lp7hdgp4&raw=1" alt="Evaluation workflow concepts" className="w-full h-auto" />
                </div>
              </div>
              <div style={{ paddingLeft: '48px' }}>
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '18px', color: 'var(--text-primary)', margin: '0 0 12px' }}>Scoring-based evaluation</p>
                <p style={{ ...bodyText, fontSize: '15px', marginBottom: '24px' }}>AI-generated scores with clear, actionable feedback — so users know not just how their prompt scored, but exactly how to improve it.</p>
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <ImageWithFallback src="https://www.dropbox.com/scl/fi/m9o50r0uryokny35u35l3/eval-2.png?rlkey=w8ih4q0xacbc3x9nhvrb8qg1e&st=llph9f8u&raw=1" alt="Evaluation dashboard" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Solution callout */}
          <div className="spaces-funded-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', marginBottom: '96px' }}>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p style={{ ...sectionLabel, marginBottom: '10px' }}>The result</p>
              <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0 }}>Zero prompt engineering knowledge required.</p>
            </div>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)' }}>
              <PitchStatement style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: 1.35 }}>
                Users can now configure LLMs through a guided experience, compare multiple prompt versions, and evaluate effectiveness — all without writing a single line of code.
              </PitchStatement>
            </div>
          </div>

          {/* Solution video */}
          <div style={{ marginBottom: '96px' }}>
            <SectionHeader>Solution Walkthrough</SectionHeader>
            <div style={{ marginTop: '32px', borderRadius: '16px', overflow: 'hidden' }}>
              <VideoPlayer src="https://www.dropbox.com/scl/fi/ydhosf199oytivgjpe6j0/LLM-Config.mov?rlkey=sgmsm2qz3g3591338y4fru66j&st=6v8x1grt&raw=1" className="w-full h-auto" autoPlay loop muted playsInline />
            </div>
          </div>

          <CaseStudyCTA />
          <ReadAboutIt links={[{ label: 'Learn more about C3 Generative AI', href: 'https://c3.ai/products/c3-generative-ai/' }]} />
        </div>
      )}

      {/* ══ PROJECT 5: Kumo ══ */}
      {project.id === 5 && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(32px, 9vw, 140px)' }}>

          {/* The Concept */}
          <div style={{ marginBottom: '140px' }}>
            <SectionHeader>The Concept</SectionHeader>
            <div className="spaces-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginTop: '32px' }}>
              <p style={{ fontFamily: '"Playfair Display", serif', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
                What if AI created space to slow down — not speed up?
              </p>
              <div>
                <p style={{ ...bodyText, fontSize: '17px' }}>
                  Kumo is an AI-powered reflection companion designed to help users process emotions, build self-awareness, and develop a more intentional relationship with their inner life. Most AI tools optimize for productivity — Kumo optimizes for presence.
                </p>
              </div>
            </div>
          </div>

          {/* 2×2 image grid */}
          <div style={{ marginBottom: '140px' }}>
            <SectionHeader>The Experience</SectionHeader>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <ImageWithFallback src="https://www.dropbox.com/scl/fi/udftcutwvljfvb3xi1dx2/Screen-1-Welcome-screen.png?rlkey=ku9b01rk35cfzlbkd8quajhve&st=ibmby2o5&raw=1" alt="Kumo Welcome" className="w-full h-auto" loading="lazy" />
              </div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <ImageWithFallback src="https://www.dropbox.com/scl/fi/reo7iuld6liax283p6ja3/Screen-2-Chat-screen.png?rlkey=875m2bax5swwoxwrd30xwv05g&st=s49fm3yg&raw=1" alt="Kumo Chat" className="w-full h-auto" loading="lazy" />
              </div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <ImageWithFallback src="https://www.dropbox.com/scl/fi/v1alx9zcl1s355c36qzcl/Screen-3-First-island-growth.png?rlkey=ondwcuagwjx9ity1xft5e9fv3&st=2lqtt2f7&raw=1" alt="Kumo Island" className="w-full h-auto" loading="lazy" />
              </div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <ImageWithFallback src="https://www.dropbox.com/scl/fi/cfs9vq3z7vaestae8mqj2/Screen-4-Island-detail-breakdown.png?rlkey=8umftkeg78ohtahe2s7ooxlpd&st=v98h4lm3&raw=1" alt="Kumo Detail" className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          </div>

          {/* Recognition callout */}
          <div className="spaces-funded-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', marginBottom: '96px' }}>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <p style={{ ...sectionLabel, marginBottom: '10px' }}>Recognition</p>
              <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 300, fontSize: '15px', color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0 }}>Multiple international design honors across four award bodies.</p>
            </div>
            <div style={{ padding: 'clamp(32px, 4vw, 56px)' }}>
              <AwardGrid awards={kumoAwards} />
            </div>
          </div>

          <CaseStudyCTA />
          <ReadAboutIt links={[
            { label: 'New York Design Awards', href: 'https://nydesignawards.com/winner-info.php?id=3665' },
            { label: 'London Design Awards', href: 'https://thelondondesignawards.com/winner-info.php?id=7069' },
            { label: 'UX Design Awards', href: 'https://ux-design-awards.com/winners/2025-2-kumo-real-time-mental-health-support-for-women' },
          ]} />
        </div>
      )}

      {/* ── Shared: style + prev/next nav ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(32px, 9vw, 140px)' }}>
        <style>{`
          @media (max-width: 768px) {
            .spaces-two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
            .spaces-funded-card { grid-template-columns: 1fr !important; }
            .spaces-funded-card > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
          }
        `}</style>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '80px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
          }}
        >
          {prevProject ? (
            <button
              onClick={() => onProjectClick?.(prevProject)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 400,
                fontSize: '14px', color: 'var(--text-tertiary)',
                transition: 'color 200ms ease', textAlign: 'left',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            >
              ← {prevProject.title}
            </button>
          ) : <div />}

          {nextProject ? (
            <button
              onClick={() => onProjectClick?.(nextProject)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 400,
                fontSize: '14px', color: 'var(--text-tertiary)',
                transition: 'color 200ms ease', textAlign: 'right',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            >
              {nextProject.title} →
            </button>
          ) : <div />}
        </div>
      </div>
    </motion.div>
  );
}
