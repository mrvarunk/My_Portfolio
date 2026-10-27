import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface HeaderProps {
  activeSection: string;
  onOpenResumeModal: () => void;
  onOpenTerminalModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onOpenResumeModal,
  onOpenTerminalModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'About', href: '#overview' },
    { id: 'featured-projects', label: 'Projects', href: '#featured-projects' },
    { id: 'competitive-programming', label: 'CP & Ranks', href: '#competitive-programming' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'education', label: 'Education', href: '#education' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0d0e13]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2">
          <a href="#overview" className="flex items-center gap-2 group">
            <img
              src={PERSONAL_INFO.logoUrl}
              alt="varun.dev Logo"
              className="h-8 w-auto object-contain rounded"
              onError={(e) => {
                // Graceful fallback if image fails to load
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-mono text-xs font-semibold text-[#c0c1ff] tracking-tight group-hover:text-white transition-colors">
              varun.dev
            </span>
            <span className="font-mono text-[10px] text-[#4edea3] bg-[#292a2f] px-1.5 py-0.5 rounded border border-[#4edea3]/20">
              {PERSONAL_INFO.version}
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#292a2f] text-[#e3e1e9] font-medium shadow-sm'
                    : 'text-[#c7c4d7] hover:text-[#e3e1e9] hover:bg-[#1e1f25]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons & Terminal Shortcut */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Terminal Command Button */}
          <button
            onClick={onOpenTerminalModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1e1f25] hover:bg-[#292a2f] text-[#c7c4d7] hover:text-[#e3e1e9] border border-white/[0.08] text-xs font-mono transition-colors"
            title="Open Interactive Terminal (or press ⌘K)"
            aria-label="Open Interactive Terminal"
          >
            <span className="material-symbols-outlined text-[16px] text-[#8083ff]">terminal</span>
            <span className="hidden sm:inline">Terminal</span>
            <kbd className="hidden lg:inline-block bg-[#121318] px-1.5 py-0.5 rounded text-[10px] text-[#908fa0] border border-white/[0.08]">
              ⌘K
            </kbd>
          </button>

          {/* Resume / Contact Button */}
          <button
            onClick={onOpenResumeModal}
            className="relative group inline-flex items-center justify-center font-mono text-xs px-3 sm:px-4 py-1.5 rounded-lg bg-[#8083ff] text-[#0d0096] font-semibold shadow-[0_0_16px_rgba(128,131,255,0.25)] hover:shadow-[0_0_24px_rgba(128,131,255,0.45)] hover:bg-[#c0c1ff] transition-all duration-200"
            aria-label="Resume and Contact"
          >
            Resume / Contact
          </button>

          {/* User Profile Avatar */}
          <div
            className="w-8 h-8 rounded-full overflow-hidden p-[1.5px] bg-gradient-to-tr from-[#8083ff] to-[#4edea3] cursor-pointer shadow-sm hover:ring-2 hover:ring-[#8083ff]/50 transition-all"
            title="Varun K. (MSRIT)"
            onClick={onOpenResumeModal}
          >
            <img
              src="/assets/profile-photo.jpg"
              alt="Varun K."
              className="w-full h-full rounded-full object-cover object-top"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-[#1e1f25] text-[#c7c4d7] hover:text-white border border-white/[0.08]"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0e13] border-b border-white/[0.08] px-4 py-3 flex flex-col gap-1.5 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-[#c7c4d7] hover:text-white hover:bg-[#1e1f25] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminalModal();
              }}
              className="flex items-center gap-2 text-xs font-mono text-[#4cd7f6]"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              System Terminal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="text-xs font-mono text-[#4edea3]"
            >
              View Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
