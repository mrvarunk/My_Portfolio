import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface ContactSectionProps {
  onCopyEmail: (email: string) => void;
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCopyEmail,
  onOpenResumeModal,
}) => {
  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 mb-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-[#1e1f25] border border-white/[0.08] hover:border-[#8083ff]/30 p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 transition-colors"
      >
        {/* Animated Ambient Blur Orb */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-10 -bottom-10 w-96 h-96 bg-[#8083ff]/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="flex flex-col gap-2 max-w-2xl relative z-10">
          <span className="font-mono text-xs text-[#4edea3] tracking-widest uppercase font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            // INITIATE COLLABORATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#e3e1e9] tracking-tight">
            Let's build resilient, high-throughput systems together.
          </h2>
          <p className="text-sm sm:text-base text-[#c7c4d7] leading-relaxed">
            Currently interviewing for Software Development Engineer (SDE) internships and distributed systems roles. Feel free to copy my direct contact or ping my inbox.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto relative z-10">
          {/* Copy Email Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onCopyEmail(PERSONAL_INFO.email)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#8083ff] text-[#0d0096] font-semibold text-sm shadow-[0_0_20px_rgba(128,131,255,0.3)] hover:shadow-[0_0_28px_rgba(128,131,255,0.5)] hover:bg-[#c0c1ff] transition-all cursor-pointer"
            aria-label="Copy Email to Clipboard"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            <span>Copy Email</span>
          </motion.button>

          {/* Open Mail Client Button */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#292a2f] hover:bg-[#38393f] text-[#e3e1e9] font-medium text-sm border border-white/[0.08] hover:border-white/[0.18] transition-colors"
            aria-label="Open Mail Client"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Open Mail Client</span>
          </motion.a>

          {/* View Resume Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenResumeModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#121318] hover:bg-[#292a2f] text-[#c0c1ff] font-mono text-xs border border-white/[0.08] hover:border-[#8083ff]/30 transition-colors cursor-pointer"
            aria-label="View Printable Resume"
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            <span>Resume</span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
