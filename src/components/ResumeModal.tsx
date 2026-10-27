import React, { useEffect } from 'react';
import { PERSONAL_INFO, EDUCATION, PROJECTS, CP_PLATFORMS, HONORS, LEADERSHIP } from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyEmail: (email: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onCopyEmail }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0d0e13]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div className="relative w-full max-w-4xl bg-[#1e1f25] border border-white/[0.12] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#121318] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8083ff] text-[22px]">
              description
            </span>
            <span id="resume-title" className="text-base font-semibold text-[#e3e1e9]">
              Varun K. — Curriculum Vitae &amp; Systems Engineering Record
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292a2f] hover:bg-[#34343a] text-xs font-mono text-[#e3e1e9] border border-white/[0.08]"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#908fa0] hover:text-white rounded-md bg-[#292a2f]"
              aria-label="Close Resume"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#121318] text-[#e3e1e9] font-sans">
          {/* Header */}
          <div className="border-b border-white/[0.1] pb-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e3e1e9]">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm font-mono text-[#8083ff] mt-1">
              Distributed Systems Engineer &amp; Microservices Architect
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-[#908fa0] mt-3">
              <span>Bengaluru, India</span>
              <span>•</span>
              <button
                onClick={() => onCopyEmail(PERSONAL_INFO.email)}
                className="text-[#4edea3] hover:underline"
              >
                {PERSONAL_INFO.email}
              </button>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#8083ff] hover:underline">
                github.com/mrvarunk
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noreferrer" className="text-[#4cd7f6] hover:underline">
                leetcode.com/u/mrvarunk
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#4edea3] mb-3">
              EDUCATION
            </h2>
            <div className="flex flex-col gap-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-sm text-[#e3e1e9]">
                      {edu.institution}
                    </span>
                    <span className="font-mono text-xs text-[#908fa0]">{edu.period}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#c7c4d7] mt-0.5">
                    <span>{edu.degree}</span>
                    <span className="font-mono font-semibold text-[#8083ff]">
                      {edu.scoreLabel ? `${edu.scoreLabel}: ` : ''}{edu.score}
                    </span>
                  </div>
                  <p className="text-xs text-[#908fa0] mt-1">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Production Projects */}
          <div className="mb-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8083ff] mb-3">
              PRODUCTION PROJECTS &amp; DISTRIBUTED ARCHITECTURE
            </h2>
            <div className="flex flex-col gap-4">
              {PROJECTS.map((proj, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-sm text-[#e3e1e9]">
                      {proj.title}
                    </span>
                    <span className="font-mono text-xs text-[#4edea3]">{proj.latencyBadge}</span>
                  </div>
                  <p className="text-xs text-[#c7c4d7] mt-1">{proj.summary}</p>
                  <ul className="list-disc list-inside text-xs text-[#908fa0] mt-1.5 space-y-1">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {proj.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1e1f25] text-[#c7c4d7] border border-white/[0.04]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Programming */}
          <div className="mb-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#4cd7f6] mb-3">
              COMPETITIVE PROGRAMMING &amp; RATINGS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CP_PLATFORMS.map((cp) => (
                <div key={cp.name} className="p-3 rounded-lg bg-[#1e1f25] border border-white/[0.06]">
                  <div className="font-mono text-xs text-[#908fa0]">{cp.name}</div>
                  <div className="text-lg font-bold text-[#e3e1e9] mt-0.5">
                    {cp.rating} <span className="text-xs font-normal text-[#908fa0]">({cp.badge})</span>
                  </div>
                  <div className="text-xs text-[#4edea3] mt-0.5">{cp.statusText}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Certifications */}
          <div className="mb-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#c0c1ff] mb-2">
              HONORS &amp; ADVANCED CERTIFICATIONS
            </h2>
            <div className="space-y-2 text-xs">
              {HONORS.map((h, i) => (
                <div key={i} className="flex justify-between">
                  <span className="font-medium text-[#e3e1e9]">{h.title}</span>
                  <span className="text-[#908fa0]">{h.subtitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#4edea3] mb-2">
              INSTITUTIONAL LEADERSHIP
            </h2>
            <div className="text-xs">
              <div className="flex justify-between font-semibold text-[#e3e1e9]">
                <span>{LEADERSHIP.role} — {LEADERSHIP.organization}</span>
                <span className="font-mono text-[#908fa0]">{LEADERSHIP.period}</span>
              </div>
              <p className="text-[#908fa0] mt-1">{LEADERSHIP.description}</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 bg-[#121318] border-t border-white/[0.08] flex justify-between items-center">
          <span className="text-xs font-mono text-[#908fa0]">
            System Record ID: 0x4EDE_A3C0 • MSRIT B.E. ISE
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#292a2f] hover:bg-[#34343a] text-xs font-medium text-[#e3e1e9]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
