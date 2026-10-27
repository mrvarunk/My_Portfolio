import React, { useEffect } from 'react';
import { PROJECTS } from '../data/portfolioData.ts';

interface ArchitectureModalProps {
  isOpen: boolean;
  projectIndex: number;
  onSelectProject: (index: number) => void;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  projectIndex,
  onSelectProject,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const project = PROJECTS[projectIndex] || PROJECTS[0];
  const { architectureDetails } = project;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0d0e13]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#1e1f25] border border-white/[0.12] p-5 sm:p-7 rounded-2xl shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-scaleUp">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8083ff] text-[22px]">
              account_tree
            </span>
            <span id="arch-modal-title" className="text-lg font-semibold text-[#e3e1e9]">
              {architectureDetails.pipelineName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#c7c4d7] hover:text-white rounded-md bg-[#292a2f] hover:bg-[#34343a] transition-colors"
            aria-label="Close Architecture Modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#121318] p-1.5 rounded-lg border border-white/[0.04]">
          {PROJECTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => onSelectProject(idx)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                projectIndex === idx
                  ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-sm'
                  : 'text-[#908fa0] hover:text-[#e3e1e9] hover:bg-[#1e1f25]'
              }`}
            >
              {p.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        {/* Pipeline Terminal View */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0d0e13] border border-white/[0.06] font-mono text-xs text-[#e3e1e9] flex flex-col gap-2.5 shadow-inner">
          <div className="text-[#908fa0] font-mono text-[11px] pb-1 border-b border-white/[0.04] flex items-center justify-between">
            <span>// DATA FLOW &amp; HIGH-CONCURRENCY PIPELINE</span>
            <span className="text-[#4edea3]">STATUS: VERIFIED</span>
          </div>

          {architectureDetails.steps.map((st, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
              <span className={`font-semibold shrink-0 ${st.colorClass || 'text-[#4cd7f6]'}`}>
                {st.step}
              </span>
              <span className="text-[#c7c4d7] font-mono">
                {st.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {architectureDetails.metrics.map((m, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-[#292a2f] border border-white/[0.04]">
              <span className="font-mono text-[10px] text-[#908fa0] block uppercase tracking-wider">
                {m.label}
              </span>
              <span className={`text-sm sm:text-base font-semibold mt-0.5 block ${m.color || 'text-[#e3e1e9]'}`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.08]">
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8083ff] hover:text-[#c0c1ff]"
          >
            <span>View Repository Source</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] text-xs font-medium transition-colors"
          >
            Close Specification
          </button>
        </div>
      </div>
    </div>
  );
};
