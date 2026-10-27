import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO, METRIC_CARDS } from '../data/portfolioData.ts';

interface HeroProps {
  onCopyEmail: (email: string) => void;
  onOpenArchitectureModal: (index: number) => void;
}

// Animated counter hook with cubic easing
function useCounter(target: string, duration = 1600, delay = 600) {
  const [value, setValue] = useState('0');
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const numericMatch = target.match(/[\d,.]+/);
    if (!numericMatch) {
      setValue(target);
      return;
    }

    const numStr = numericMatch[0].replace(/,/g, '');
    const targetNum = parseFloat(numStr);
    const isDecimal = numStr.includes('.');
    const prefix = target.slice(0, target.indexOf(numericMatch[0]));
    const suffix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);

    const startTime = Date.now() + delay;

    const tick = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * targetNum;

      if (isDecimal) {
        setValue(`${prefix}${current.toFixed(2)}${suffix}`);
      } else {
        const formatted = Math.round(current).toLocaleString();
        setValue(`${prefix}${formatted}${suffix}`);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    requestAnimationFrame(tick);
  }, [target, duration, delay]);

  return value;
}

// Cycling highlights underneath the tagline
const ROTATING_SPECIALTIES = [
  '⚡ High-Concurrency Java 21 & Project Loom Virtual Threads',
  '🧠 Full-Stack RAG Systems with pgvector & Gemini',
  '📦 Event-Driven Microservices on Apache Kafka & Redis Locks',
  '🏆 1,000+ Algorithmic Solves (Knight Top 4.2% LeetCode)',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

const MetricCardAnimated: React.FC<{ card: (typeof METRIC_CARDS)[0]; index: number }> = ({ card, index }) => {
  const animatedValue = useCounter(card.value, 1500, 500 + index * 180);

  return (
    <motion.div
      variants={fadeUpVariant}
      whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.22)' }}
      transition={{ duration: 0.2 }}
      className="flex flex-col p-4 sm:p-5 rounded-xl bg-[#1e1f25] border border-white/[0.08] shadow-sm hover:shadow-lg transition-colors cursor-default"
    >
      <span className="font-mono text-[11px] text-[#908fa0] uppercase tracking-wider font-medium">
        {card.label}
      </span>
      <div className="flex items-baseline gap-1.5 mt-1.5">
        <span className={`text-2xl sm:text-3xl font-semibold tracking-tight ${card.colorClass === 'text-primary-fixed' ? 'text-[#e1e0ff]' : card.colorClass === 'text-tertiary' ? 'text-[#4cd7f6]' : 'text-[#e3e1e9]'}`}>
          {animatedValue}
        </span>
        {card.subValue && (
          <span className={`font-mono text-xs ${card.colorClass === 'text-tertiary' ? 'text-[#4cd7f6]' : 'text-[#4edea3]'}`}>
            {card.subValue}
          </span>
        )}
        {card.badge && (
          <span className="font-mono text-xs text-[#908fa0]">
            {card.badge}
          </span>
        )}
      </div>
      <span className="text-xs text-[#c7c4d7] mt-1 font-normal">
        {card.description}
      </span>
    </motion.div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onCopyEmail }) => {
  const [specialtyIndex, setSpecialtyIndex] = useState(0);
  const [photoTilt, setPhotoTilt] = useState({ rotateX: 0, rotateY: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handlePhotoPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === 'touch') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setPhotoTilt({
      rotateX: -offsetY * 12,
      rotateY: offsetX * 12,
    });
  };

  const resetPhotoTilt = () => setPhotoTilt({ rotateX: 0, rotateY: 0 });

  // Cycle rotating specialty every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSpecialtyIndex((prev) => (prev + 1) % ROTATING_SPECIALTIES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="overview"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-14 pb-8 flex flex-col items-start gap-8 overflow-x-clip"
    >
      {/* Ambient Animated Backdrop Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 left-1/4 w-[420px] h-[420px] bg-[#8083ff]/20 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-36 right-4 w-[380px] h-[380px] bg-[#4edea3]/15 rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Status Radar Badge */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1f25]/90 border border-white/[0.12] shadow-sm backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]" />
        </span>
        <span className="font-mono text-[11px] text-[#4edea3] tracking-wide uppercase font-semibold">
          Available for SDE Internships &amp; Full-Time Roles
        </span>
      </motion.div>

      {/* Hero Content: Text + Enlarged Profile Photo (No Surrounding Text) */}
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-14 w-full">
        {/* Main Title & Bio */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 max-w-3xl flex-1 text-left"
        >
          {/* Telemetry pill row */}
          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#908fa0] flex items-center gap-1.5 bg-[#1e1f25] px-2.5 py-1 rounded border border-white/[0.06]">
              <span className="material-symbols-outlined text-[14px] text-[#4edea3]">location_on</span>
              {PERSONAL_INFO.location}
            </span>
            <span className="font-mono text-xs text-[#4cd7f6] font-medium bg-[#1e1f25] px-2.5 py-1 rounded border border-white/[0.06]">
              {PERSONAL_INFO.role}
            </span>
            <span className="font-mono text-xs text-[#c0c1ff] font-medium bg-[#8083ff]/10 px-2.5 py-1 rounded border border-[#8083ff]/20">
              MSRIT ISE '27
            </span>
          </motion.div>

          {/* Character cascade headline and a clean signal-wipe tagline */}
          <div className="flex flex-col gap-2 pt-1">
            <motion.div
              variants={fadeUpVariant}
              className="flex items-center gap-3 flex-wrap select-none"
            >
              <h1
                aria-label="Hi, I'm Varun K."
                className="text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#e3e1e9]"
              >
                <span className="font-mono text-[#e1e0ff] drop-shadow-[0_0_20px_rgba(128,131,255,0.4)]">
                  {Array.from("Hi, I'm Varun K.").map((character, index) => (
                    <motion.span
                      key={`${character}-${index}`}
                      aria-hidden="true"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 22, rotateX: -55 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.3 + index * 0.035, ease: 'easeOut' }}
                      className="inline-block"
                    >
                      {character === ' ' ? '\u00a0' : character}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* Audio/Data frequency waveform telemetry indicator */}
              <div className="hidden sm:flex items-end gap-0.5 h-6 px-2 py-1 rounded bg-[#1e1f25] border border-white/[0.08]">
                {[0.4, 0.8, 0.3, 1, 0.6, 0.9, 0.5, 0.7].map((height, i) => (
                  <motion.span
                    key={i}
                    animate={{ scaleY: [height, 1, 0.2, height] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.12,
                    }}
                    className="w-1 bg-[#4edea3] rounded-full origin-bottom"
                    style={{ height: '100%' }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Tagline reveals as a single signal sweep instead of a looping gradient */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, delay: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl sm:text-3xl lg:text-[38px] font-semibold leading-[1.25] tracking-tight"
            >
              <span className="text-[#c7c4d7] font-medium mr-2">I engineer</span>
              <span className="text-[#e1e0ff] font-bold">
                scalable distributed backends
              </span>{' '}
              <span className="text-[#c7c4d7] font-medium">&amp;</span>{' '}
              <span className="inline-flex items-center gap-1.5 text-[#4cd7f6] font-bold">AI systems.</span>
            </motion.div>
          </div>

          {/* Dynamic Rotating Specialty Chip */}
          <motion.div variants={fadeUpVariant} className="h-8 flex items-center pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={specialtyIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] text-[#c0c1ff] bg-[#1e1f25] border border-[#8083ff]/25 px-3 py-1 rounded-md shadow-sm"
              >
                <span>{ROTATING_SPECIALTIES[specialtyIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            variants={fadeUpVariant}
            className="text-base sm:text-[17px] text-[#c7c4d7] max-w-2xl leading-relaxed font-normal pt-1"
          >
            Information Science &amp; Engineering undergrad at{' '}
            <strong className="text-[#e3e1e9] font-semibold">MSRIT (8.92 CGPA)</strong> specializing
            in Java, Spring Boot, Microservices, Cloud Infrastructure, and Competitive Programming
            with <span className="text-[#4edea3] font-mono font-semibold">1,000+</span> algorithmic
            problems solved.
          </motion.p>

          {/* Actions & Social Channels */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#featured-projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8083ff] text-[#0d0096] text-sm font-semibold shadow-[0_0_24px_rgba(128,131,255,0.35)] hover:shadow-[0_0_32px_rgba(128,131,255,0.55)] hover:bg-[#c0c1ff] transition-all duration-200"
            >
              <span>Explore Architecture &amp; Projects</span>
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </motion.a>

            <div className="flex items-center gap-2">
              {/* GitHub */}
              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile (mrvarunk)"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1e1f25] hover:bg-[#292a2f] border border-white/[0.08] hover:border-[#8083ff]/40 text-[#e3e1e9] hover:text-[#c0c1ff] transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </motion.a>

              {/* LeetCode */}
              <motion.a
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                title="LeetCode Profile (mrvarunk)"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1e1f25] hover:bg-[#292a2f] border border-white/[0.08] hover:border-[#4edea3]/40 text-[#e3e1e9] hover:text-[#4edea3] transition-colors"
                aria-label="LeetCode Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .271 3.524 5.656 5.656 0 0 0 1.848 2.457 5.688 5.688 0 0 0 3.342 1.055h8.608c.758 0 1.374-.616 1.374-1.374s-.616-1.374-1.374-1.374H7.389a2.937 2.937 0 0 1-1.724-.543 2.915 2.915 0 0 1-.954-1.267 2.85 2.85 0 0 1-.14-1.817 2.716 2.716 0 0 1 .624-1.085L8.98 8.643l4.503-4.819c.536-.574.506-1.474-.068-2.01A1.37 1.37 0 0 0 13.483 0zm4.27 10.428h-6.89c-.758 0-1.374.616-1.374 1.374s.616 1.374 1.374 1.374h6.89c.758 0 1.374-.616 1.374-1.374s-.616-1.374-1.374-1.374z" />
                </svg>
              </motion.a>

              {/* Copy Email Button */}
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCopyEmail(PERSONAL_INFO.email)}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1e1f25] hover:bg-[#292a2f] border border-white/[0.08] hover:border-[#4cd7f6]/40 text-[#e3e1e9] hover:text-[#4cd7f6] transition-colors"
                title={`Copy Email (${PERSONAL_INFO.email})`}
                aria-label="Copy Email Address"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Clean Enlarged Profile Photo (No Surrounding Text) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative shrink-0 flex items-center justify-center my-4 lg:my-0"
        >
          {/* Subtle Outer Neon Breathing Glow */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#8083ff]/35 via-[#4cd7f6]/30 to-[#4edea3]/35 blur-3xl pointer-events-none animate-pulse" />

          {/* Animated Dual Rotating Cybernetic Gradient Ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#8083ff] via-[#4cd7f6] via-[#4edea3] to-[#8083ff] animate-spin-slow opacity-90 blur-[3px]" />

          {/* Photo Container — Clean & Unobstructed */}
          <div className="animate-float-slow">
            <div
              onPointerMove={handlePhotoPointerMove}
              onPointerLeave={resetPhotoTilt}
              style={{
                transform: prefersReducedMotion
                  ? undefined
                  : `perspective(900px) rotateX(${photoTilt.rotateX}deg) rotateY(${photoTilt.rotateY}deg) scale(${photoTilt.rotateX || photoTilt.rotateY ? 1.03 : 1})`,
                transition: photoTilt.rotateX || photoTilt.rotateY
                  ? 'transform 0.12s ease-out'
                  : 'transform 0.4s ease-out',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-56 h-56 sm:w-68 sm:h-68 lg:w-80 lg:h-80 xl:w-88 xl:h-88 rounded-full p-[4px] bg-[#121318] shadow-[0_0_50px_rgba(128,131,255,0.3)]"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#181b26] relative">
                <img
                  src="/assets/profile-photo.jpg"
                  alt="Varun K. — Distributed Systems Engineer & System Architect"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle Vignette Gradient for Depth */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0d0e13]/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Engineering Telemetry Strip with Count-Up Animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-2"
      >
        {METRIC_CARDS.map((card, idx) => (
          <MetricCardAnimated key={idx} card={card} index={idx} />
        ))}
      </motion.div>
    </section>
  );
};
