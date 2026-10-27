import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData.ts';

interface ProjectsSectionProps {
  onOpenArchitectureModal: (index: number) => void;
}

const ProjectCard: React.FC<{
  project: (typeof PROJECTS)[0];
  index: number;
  onOpenArchitectureModal: (index: number) => void;
}> = ({ project, index, onOpenArchitectureModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'screenshot' | 'blueprint'>('screenshot');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const prefersReducedMotion = useReducedMotion();

  const isCrawler = index === 1;
  const isCafeOps = index === 3;

  const accentColor = isCrawler
    ? '#4edea3'
    : isCafeOps
    ? '#4cd7f6'
    : '#8083ff';

  const badgeBg = isCrawler
    ? 'text-[#4edea3] bg-[#4edea3]/10'
    : isCafeOps
    ? 'text-[#4cd7f6] bg-[#4cd7f6]/10'
    : 'text-[#c0c1ff] bg-[#c0c1ff]/10';

  const titleHoverColor = isCrawler
    ? 'group-hover:text-[#4edea3]'
    : isCafeOps
    ? 'group-hover:text-[#4cd7f6]'
    : 'group-hover:text-[#c0c1ff]';

  const exploreLinkColor = isCrawler
    ? 'text-[#4edea3] hover:text-[#6ffbbe]'
    : isCafeOps
    ? 'text-[#4cd7f6] hover:text-[#acedff]'
    : 'text-[#c0c1ff] hover:text-[#e1e0ff]';

  // Interactive 3D mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Clamped tilt between -4.5deg and +4.5deg
    const rotateX = -((y - centerY) / centerY) * 4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    setMousePos({ x, y, rotateX, rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePos.rotateX}deg) rotateY(${mousePos.rotateY}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
      }}
      className="group relative flex flex-col justify-between p-4 sm:p-7 rounded-2xl bg-[#1e1f25] border border-white/[0.08] hover:border-white/[0.22] transition-colors duration-300 shadow-xl overflow-hidden"
    >
      {/* Dynamic Cursor Proximity Spotlight Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${accentColor}18, transparent 75%)`,
          }}
        />
      )}

      {/* Cybernetic Corner Accent Marks */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 rounded-tl pointer-events-none group-hover:border-current" style={{ color: accentColor }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 rounded-tr pointer-events-none group-hover:border-current" style={{ color: accentColor }} />

      <div className="flex flex-col gap-4 relative z-10">
        {/* Top Header: Category Badge + Telemetry Metric + Blueprint View Toggle */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`font-mono text-[11px] font-semibold px-2.5 py-1 rounded tracking-wide ${badgeBg}`}>
            {project.category}
          </span>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider font-medium flex items-center gap-1.5 bg-[#121318] px-2 py-0.5 rounded border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
              {project.latencyBadge}
            </span>

            {/* View Mode Toggle Switch (Screenshot vs Holographic Blueprint) */}
            <div className="inline-flex rounded-lg bg-[#121318] p-0.5 border border-white/[0.08] text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setViewMode('screenshot')}
                className={`px-2 py-0.5 rounded transition-all ${
                  viewMode === 'screenshot'
                    ? 'bg-[#292a2f] text-white font-semibold shadow-sm'
                    : 'text-[#908fa0] hover:text-[#c7c4d7]'
                }`}
                title="Preview Visual Interface"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setViewMode('blueprint')}
                className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                  viewMode === 'blueprint'
                    ? 'bg-[#8083ff]/30 text-[#e1e0ff] font-semibold shadow-sm'
                    : 'text-[#908fa0] hover:text-[#c7c4d7]'
                }`}
                title="Inspect Architecture Blueprint Flow"
              >
                <span>Blueprint</span>
                <span className="material-symbols-outlined text-[11px]">alt_route</span>
              </button>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Either Screenshot OR Holographic Architecture Blueprint */}
        <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden border border-white/[0.08] bg-[#121318] shadow-inner">
          <AnimatePresence mode="wait">
            {viewMode === 'screenshot' && project.screenshotUrl ? (
              <motion.div
                key="screenshot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full sheen-effect"
              >
                <img
                  src={project.screenshotUrl}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Cyberpunk HUD Coordinate Tag Overlay */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0d0e13]/85 border border-white/[0.1] text-[10px] font-mono text-[#c7c4d7] backdrop-blur-sm pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
                  <span>SYS // {project.footerTag}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="blueprint"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full blueprint-grid p-4 flex flex-col justify-between overflow-y-auto font-mono text-xs"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
                  <span className="text-[11px] text-[#4cd7f6] font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">account_tree</span>
                    {project.architectureDetails.pipelineName}
                  </span>
                  <span className="text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-1.5 py-0.5 rounded">
                    INTERACTIVE PIPELINE
                  </span>
                </div>

                {/* Architecture Step Nodes Flow */}
                <div className="flex flex-col gap-1.5 my-auto py-1">
                  {project.architectureDetails.steps.slice(0, 3).map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-[11px]">
                      <span className="text-[#8083ff] font-bold shrink-0">{sIdx + 1}.</span>
                      <div className="flex flex-col">
                        <span className="text-[#e3e1e9] font-medium leading-tight">{st.step}</span>
                        <span className="text-[#908fa0] text-[10px] leading-tight">{st.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.08] text-[10px]">
                  <span className="text-[#c7c4d7]">
                    Latency: <strong className="text-[#4edea3]">{project.architectureDetails.metrics[0]?.value}</strong>
                  </span>
                  <button
                    onClick={() => onOpenArchitectureModal(index)}
                    className="text-[#8083ff] hover:text-[#c0c1ff] underline flex items-center gap-0.5"
                  >
                    <span>Full Spec</span>
                    <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title & Summary */}
        <div className="flex flex-col gap-1.5">
          <motion.h3
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14, rotateX: -18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : index * 0.1, ease: 'easeOut' }}
            className={`text-xl sm:text-[22px] font-semibold text-[#e3e1e9] ${titleHoverColor} transition-colors tracking-tight origin-bottom`}
          >
            {project.title}
            <motion.span
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.1 + 0.25, ease: 'easeOut' }}
              className="block h-0.5 w-16 mt-1 origin-left rounded-full bg-gradient-to-r from-[#8083ff] via-[#4cd7f6] to-transparent"
            />
          </motion.h3>
          <p className="text-sm text-[#c7c4d7] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Architectural Feature Bullets */}
        <ul className="flex flex-col gap-2 text-xs sm:text-[13px] text-[#c7c4d7]/90 list-disc list-inside leading-relaxed">
          {project.bullets.map((bullet, bIdx) => (
            <li key={bIdx} className="marker:text-[#908fa0]">
              <span
                dangerouslySetInnerHTML={{
                  __html: bullet.replace(
                    /(PostgreSQL with pgvector|Google Gemini API|Amazon SQS|Amazon S3|DynamoDB|Redis \(Redisson distributed locks\)|JUnit 5, ExecutorService, and CountDownLatch|Spring Security|PostgreSQL|Redis|Spring AOP)/g,
                    '<strong class="text-[#e3e1e9] font-medium">$1</strong>'
                  ),
                }}
              />
            </li>
          ))}
        </ul>

        {/* Interactive Magnetic Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech, tIdx) => (
            <motion.span
              key={tIdx}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#292a2f] text-[#c7c4d7] hover:text-white border border-white/[0.06] hover:border-[#8083ff]/40 cursor-default transition-all shadow-sm"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-white/[0.06] bg-transparent relative z-10">
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 font-mono text-xs font-medium ${exploreLinkColor} transition-colors group/link`}
          aria-label={`Explore source code for ${project.title}`}
        >
          <span>EXPLORE REPOSITORY</span>
          <span className="material-symbols-outlined text-[16px] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            arrow_outward
          </span>
        </a>

        {/* Architecture Spec Button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenArchitectureModal(index)}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#c7c4d7] hover:text-white px-2.5 py-1.5 rounded-lg bg-[#121318]/90 hover:bg-[#121318] border border-white/[0.1] hover:border-[#8083ff]/50 transition-all shadow-sm"
            title={`View detailed system architecture for ${project.title}`}
            aria-label={`View architecture for ${project.title}`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#8083ff] animate-spin-slow">
              account_tree
            </span>
            <span>View Architecture</span>
          </motion.button>
          <span className="hidden sm:inline font-mono text-[10px] text-[#908fa0] uppercase tracking-wider">
            {project.footerTag}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenArchitectureModal,
}) => {
  return (
    <section id="featured-projects" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-1.5 mb-8"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#c0c1ff] font-semibold tracking-wider">
            // 01. PRODUCTION SYSTEMS &amp; ARCHITECTURE
          </span>
          <span className="h-px w-12 bg-[#c0c1ff]/20" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#e3e1e9] tracking-tight">
          Fault-tolerant backends, RAG pipelines &amp; concurrent services
        </h2>
        <p className="text-sm sm:text-base text-[#c7c4d7]">
          Architected with deterministic concurrency control, strict data isolation, and microsecond telemetry.
        </p>
      </motion.div>

      {/* Bento Grid 2x2 with 3D Tilt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onOpenArchitectureModal={onOpenArchitectureModal}
          />
        ))}
      </div>
    </section>
  );
};
