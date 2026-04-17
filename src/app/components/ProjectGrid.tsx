import React from "react";
import { motion } from "motion/react";
import { projects, Project } from "../data/projects";

interface ProjectGridProps {
  onProjectClick?: (project: Project) => void;
}


const videoPosition: Record<number, string> = {
  1: 'center 20%', // Spaces — shift up to reduce top cutoff
};

const eraGroups = [
  {
    label: '2025–now: Agentic experience',
    ids: [1, 2],
  },
  {
    label: '2025 and before: Generative AI experience',
    ids: [3, 4, 5],
  },
];

function ProjectCard({
  project,
  onClick,
  delay,
}: {
  project: Project;
  onClick?: () => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      {/* Image/video card — white border, clickable */}
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={onClick}
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(255,255,255,0.9)',
          borderRadius: '12px',
          padding: '10px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            aspectRatio: '16 / 10',
            position: 'relative',
          }}
        >
          {project.video ? (
            <video
              src={project.video}
              autoPlay loop muted playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: videoPosition[project.id] ?? 'center', display: 'block' }}
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>
      </motion.div>

      {/* Project info below card */}
      <div style={{ padding: '0 4px' }}>
        <h3
          onClick={onClick}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 400,
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            margin: '0 0 8px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

function EraHeader({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '40px' }}
    >
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 300,
          fontSize: '24px',
          color: 'var(--text-primary)',
          margin: '0 0 12px',
        }}
      >
        {label}
      </p>
      <div
        style={{
          height: '1px',
          backgroundColor: 'var(--border)',
          width: '100%',
        }}
      />
    </motion.div>
  );
}

export function ProjectGrid({ onProjectClick }: ProjectGridProps) {
  return (
    <div
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 16px',
      }}
    >
      {eraGroups.map((era, eraIndex) => {
        const eraProjects = era.ids
          .map(id => projects.find(p => p.id === id))
          .filter(Boolean) as Project[];

        return (
          <div key={era.label} style={{ marginBottom: '160px' }}>
            <EraHeader label={era.label} index={eraIndex} />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${eraProjects.length}, 1fr)`,
                gap: '24px',
              }}
              className="project-era-grid"
            >
              {eraProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick?.(project)}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          .project-era-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .project-era-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
