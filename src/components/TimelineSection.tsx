import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION, LEADERSHIP } from '../data/portfolioData.ts';

export const TimelineSection: React.FC = () => {
  return (
    <section id="education" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
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
            // 04. ACADEMIC &amp; LEADERSHIP TIMELINE
          </span>
          <span className="h-px w-12 bg-[#c0c1ff]/20" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#e3e1e9] tracking-tight">
          Structured foundation &amp; institutional involvement
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Education Left Column (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* MSRIT Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, borderColor: 'rgba(78, 222, 163, 0.3)' }}
            className="flex flex-col p-6 rounded-xl bg-[#1e1f25] border border-white/[0.08] shadow-sm transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xl font-semibold text-[#e3e1e9]">
                {EDUCATION[0].institution}
              </span>
              <span className="font-mono text-xs text-[#4edea3] bg-[#4edea3]/10 border border-[#4edea3]/20 px-2 py-0.5 rounded font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                {EDUCATION[0].period}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#c0c1ff]">
              <span>{EDUCATION[0].degree}</span>
              <span className="text-[#464554] font-mono">•</span>
              <span className="font-mono text-xs text-[#4edea3] font-semibold">
                CGPA: {EDUCATION[0].score}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#c7c4d7] mt-3 leading-relaxed">
              {EDUCATION[0].details}
            </p>
          </motion.div>

          {/* Pre-University Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -3, borderColor: 'rgba(255, 255, 255, 0.18)' }}
            className="flex flex-col p-4 sm:p-5 rounded-xl bg-[#1e1f25] border border-white/[0.08] shadow-sm transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-base font-semibold text-[#e3e1e9]">
                {EDUCATION[1].institution}
              </span>
              <span className="font-mono text-xs text-[#908fa0]">
                {EDUCATION[1].period}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#c7c4d7]">
              <span>{EDUCATION[1].degree}</span>
              <span className="font-mono text-xs text-[#c0c1ff] font-semibold">
                {EDUCATION[1].score}
              </span>
            </div>
          </motion.div>

          {/* High School Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3, borderColor: 'rgba(255, 255, 255, 0.18)' }}
            className="flex flex-col p-4 sm:p-5 rounded-xl bg-[#1e1f25] border border-white/[0.08] shadow-sm transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-base font-semibold text-[#e3e1e9]">
                {EDUCATION[2].institution}
              </span>
              <span className="font-mono text-xs text-[#908fa0]">
                {EDUCATION[2].period}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm text-[#c7c4d7]">
              <span>{EDUCATION[2].degree}</span>
              <span className="font-mono text-xs text-[#c0c1ff] font-semibold">
                {EDUCATION[2].score}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Leadership Right Column (1 Col) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -4, borderColor: 'rgba(78, 222, 163, 0.3)' }}
          className="flex flex-col p-6 rounded-xl bg-[#1e1f25] border border-white/[0.08] shadow-sm justify-between transition-all"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[22px]">
                diversity_3
              </span>
              <span className="font-mono text-xs text-[#4edea3] uppercase tracking-wider font-semibold">
                Leadership &amp; Responsibility
              </span>
            </div>

            <h3 className="text-lg font-semibold text-[#e3e1e9] pt-1">
              {LEADERSHIP.role} — {LEADERSHIP.organization}
            </h3>
            <span className="font-mono text-[11px] text-[#908fa0]">
              {LEADERSHIP.period}
            </span>

            <p className="text-xs sm:text-sm text-[#c7c4d7] leading-relaxed pt-2">
              {LEADERSHIP.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col gap-1">
            <span className="font-mono text-[10px] text-[#908fa0] uppercase tracking-wider font-medium">
              {LEADERSHIP.scopeLabel}
            </span>
            <span className="text-xs text-[#4edea3] font-medium">
              {LEADERSHIP.scopeDetail}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
