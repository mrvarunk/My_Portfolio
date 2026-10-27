import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CP_PLATFORMS, HONORS } from '../data/portfolioData.ts';

export const CompetitiveProgrammingSection: React.FC = () => {
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="competitive-programming" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-1.5 mb-8"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#4edea3] font-semibold tracking-wider">
            // 02. COMPETITIVE PROGRAMMING &amp; BENCHMARKS
          </span>
          <span className="h-px w-12 bg-[#4edea3]/20" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#e3e1e9] tracking-tight">
          High-pressure algorithmic performance &amp; mathematical rigor
        </h2>
        <p className="text-sm sm:text-base text-[#c7c4d7]">
          Trained in complex data structures, graph theory, segment trees, and dynamic programming across live rated contests.
        </p>
      </motion.div>

      {/* 3 CP Platform Cards with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CP_PLATFORMS.map((platform, idx) => {
          const isLeetCode = idx === 0;
          const isCodeChef = idx === 1;

          const badgeBg = isLeetCode
            ? 'text-[#4cd7f6] bg-[#4cd7f6]/10'
            : isCodeChef
            ? 'text-[#4edea3] bg-[#4edea3]/10'
            : 'text-[#c0c1ff] bg-[#c0c1ff]/10';

          const strokeColor = isLeetCode
            ? 'text-[#4cd7f6]'
            : isCodeChef
            ? 'text-[#4edea3]'
            : 'text-[#c0c1ff]';

          const linkColor = isLeetCode
            ? 'text-[#4cd7f6] hover:text-[#acedff]'
            : isCodeChef
            ? 'text-[#4edea3] hover:text-[#6ffbbe]'
            : 'text-[#c0c1ff] hover:text-[#e1e0ff]';

          const borderHover = isLeetCode
            ? 'hover:border-[#4cd7f6]/35'
            : isCodeChef
            ? 'hover:border-[#4edea3]/35'
            : 'hover:border-[#8083ff]/35';

          return (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className={`flex flex-col justify-between p-4 sm:p-6 rounded-xl bg-[#1e1f25] hover:bg-[#25262e] border border-white/[0.08] ${borderHover} transition-all duration-300 shadow-md hover:shadow-xl`}
            >
              <div className="flex flex-col gap-3">
                {/* Header Tag and Status */}
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${badgeBg}`}>
                    {platform.name}
                  </span>
                  <span className={`font-mono text-xs font-medium flex items-center gap-1 ${platform.badgeClass === 'text-secondary' ? 'text-[#4edea3]' : 'text-[#c0c1ff]'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                    {platform.badge.includes('★') ? (
                      <>
                        <span>3</span>
                        <span className="font-sans text-[13px] leading-none">★</span>
                        <span> PROGRAMMER</span>
                      </>
                    ) : (
                      platform.badge
                    )}
                  </span>
                </div>

                {/* Rating & Highlight */}
                <div className="flex flex-col mt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#e3e1e9]">
                      {platform.rating}
                    </span>
                    <span className="font-mono text-xs text-[#908fa0]">
                      {platform.ratingLabel}
                    </span>
                  </div>
                  <span className={`text-xs font-medium mt-0.5 ${platform.highlightColor === 'text-tertiary' ? 'text-[#4cd7f6]' : platform.highlightColor === 'text-secondary' ? 'text-[#4edea3]' : 'text-[#c0c1ff]'}`}>
                    {platform.statusText}
                  </span>
                </div>

                {/* Profile Screenshot with Click to Zoom */}
                {platform.screenshotUrl ? (
                  <div
                    onClick={() => setZoomedImage({ url: platform.screenshotUrl!, title: `${platform.name} Verified Standing` })}
                    className="w-full my-2 pt-1 overflow-hidden rounded-lg border border-white/[0.08] cursor-zoom-in relative group/img bg-[#121318]"
                    title="Click to view full screenshot"
                  >
                    <img
                      src={platform.screenshotUrl}
                      alt={`${platform.name} profile screenshot`}
                      className="w-full h-36 object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1 text-xs font-mono text-white">
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                      <span>Enlarge Proof</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full my-2 pt-1">
                    <svg className={`w-full h-12 ${strokeColor}`} fill="none" viewBox="0 0 200 40">
                      <path
                        d={platform.sparklinePoints}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                      <circle
                        className="fill-current"
                        cx={platform.sparklinePeak.cx}
                        cy={platform.sparklinePeak.cy}
                        r="3.5"
                      />
                    </svg>
                  </div>
                )}

                {/* Stats Breakdown */}
                <div className="flex flex-col gap-1.5 text-xs text-[#c7c4d7]">
                  {platform.stats.map((s, sIdx) => (
                    <div key={sIdx} className="flex flex-wrap justify-between items-start gap-x-2 gap-y-0.5 py-0.5 border-b border-white/[0.02]">
                      <span className="min-w-0">{s.label}</span>
                      <span className={`min-w-0 text-right break-words font-mono font-medium ${s.valueClass?.includes('secondary') ? 'text-[#4edea3]' : 'text-[#e3e1e9]'}`}>
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Link */}
              <a
                href={platform.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 mt-5 pt-3 font-mono text-xs font-medium ${linkColor} transition-colors border-t border-white/[0.04] group/link`}
                aria-label={platform.verifyText}
              >
                <span>{platform.verifyText}</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                  open_in_new
                </span>
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Honors & Certifications Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {HONORS.map((honor, idx) => {
          const Content = (
            <>
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-lg bg-[#292a2f] shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  honor.iconColor === 'text-secondary' ? 'text-[#4edea3]' : 'text-[#c0c1ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {honor.icon}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-0.5">
                  <span
                    className={`font-mono text-[11px] font-semibold tracking-wider ${
                      honor.typeColor === 'text-secondary' ? 'text-[#4edea3]' : 'text-[#c0c1ff]'
                    }`}
                  >
                    {honor.type}
                  </span>
                  {honor.certificateUrl && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-0.5 rounded border border-[#4cd7f6]/20 transition-all group-hover:bg-[#4cd7f6]/20">
                      <span>VERIFIED CREDENTIAL</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </span>
                  )}
                </div>
                <span className="text-base font-semibold text-[#e3e1e9] group-hover:text-white transition-colors truncate">
                  {honor.title}
                </span>
                <span className="text-xs text-[#c7c4d7]">
                  {honor.subtitle}
                </span>
              </div>
            </>
          );

          if (honor.certificateUrl) {
            return (
              <motion.a
                key={idx}
                href={honor.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open official verified ${honor.title}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.15 }}
                whileHover={{ y: -4, borderColor: 'rgba(76, 215, 246, 0.4)' }}
                className="group flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#1e1f25] hover:bg-[#25262e] border border-white/[0.08] transition-all shadow-sm hover:shadow-lg cursor-pointer"
              >
                {Content}
              </motion.a>
            );
          }

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: idx * 0.15 }}
              whileHover={{ y: -3 }}
              className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#1e1f25] border border-white/[0.08] hover:border-white/[0.18] transition-all shadow-sm"
            >
              {Content}
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal for Full Screenshot Zoom */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-50 bg-[#0d0e13]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#181b26] rounded-xl border border-white/[0.15] p-3 shadow-2xl overflow-hidden flex flex-col gap-2"
            >
              <div className="flex items-center justify-between px-2 py-1">
                <span className="font-mono text-xs text-[#4edea3] font-semibold">
                  {zoomedImage.title}
                </span>
                <button
                  onClick={() => setZoomedImage(null)}
                  className="p-1 text-[#908fa0] hover:text-white rounded"
                  aria-label="Close Preview"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <div className="max-h-[80vh] overflow-auto rounded-lg border border-white/[0.08]">
                <img
                  src={zoomedImage.url}
                  alt={zoomedImage.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
