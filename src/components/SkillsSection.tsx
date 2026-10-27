import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { filterSkills } from '../utils/systemLogic.ts';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return filterSkills(SKILL_CATEGORIES, searchQuery);
  }, [searchQuery]);

  return (
    <section id="skills" className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#4cd7f6] font-semibold tracking-wider">
              // 03. TECHNICAL CAPABILITIES &amp; TOOLCHAIN
            </span>
            <span className="h-px w-12 bg-[#4cd7f6]/20" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#e3e1e9] tracking-tight">
            Engineered for high throughput, thread safety, and resilience
          </h2>
          <p className="text-sm sm:text-base text-[#c7c4d7]">
            Core competency stack across systems programming, reactive backends, cloud primitives, and storage engines.
          </p>
        </div>

        {/* Quick Skill Search */}
        <div className="relative min-w-[260px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-[#908fa0]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter skills (e.g. Kafka, Redis)..."
            aria-label="Filter competencies"
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#1e1f25] border border-white/[0.08] focus:border-[#8083ff] focus:outline-none text-xs font-mono text-[#e3e1e9] placeholder-[#908fa0] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#908fa0] hover:text-white"
              aria-label="Clear filter"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Grid of 6 Categories */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredCategories.map((cat, idx) => {
            const iconColorClass =
              cat.iconColor === 'text-secondary'
                ? 'text-[#4edea3]'
                : cat.iconColor === 'text-tertiary'
                ? 'text-[#4cd7f6]'
                : 'text-[#c0c1ff]';

            return (
              <motion.div
                key={cat.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.18)' }}
                className="group flex flex-col gap-3 p-6 rounded-xl bg-[#1e1f25] hover:bg-[#25262e] border border-white/[0.08] transition-colors shadow-sm hover:shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[20px] ${iconColorClass} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    {cat.icon}
                  </span>
                  <h3 className="text-base font-semibold text-[#e3e1e9]">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.skills.map((skill, sIdx) => {
                    const isHighlighted = skill.highlight;
                    const tagColor =
                      skill.tagColor === 'text-primary'
                        ? 'text-[#c0c1ff] font-medium'
                        : skill.tagColor === 'text-secondary'
                        ? 'text-[#4edea3] font-medium'
                        : skill.tagColor === 'text-tertiary'
                        ? 'text-[#4cd7f6] font-medium'
                        : skill.tagColor === 'text-on-surface'
                        ? 'text-[#e3e1e9]'
                        : 'text-[#c7c4d7]';

                    return (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ duration: 0.15 }}
                        className={`font-mono text-[11px] px-2.5 py-1 rounded bg-[#292a2f] hover:bg-[#34343a] border border-white/[0.04] hover:border-white/[0.18] transition-colors cursor-default ${
                          isHighlighted ? 'border-white/[0.12] bg-[#2d2e35]' : ''
                        } ${tagColor}`}
                      >
                        {skill.name}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredCategories.length === 0 && (
        <div className="p-8 text-center rounded-xl bg-[#1e1f25] border border-white/[0.08] text-[#908fa0]">
          <span className="material-symbols-outlined text-[32px] mb-2 block">filter_alt_off</span>
          <p className="text-sm font-mono">No matching skills found for "{searchQuery}".</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs font-mono text-[#8083ff] hover:underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </section>
  );
};
