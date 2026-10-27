import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { CompetitiveProgrammingSection } from './components/CompetitiveProgrammingSection.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { TimelineSection } from './components/TimelineSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ArchitectureModal } from './components/ArchitectureModal.tsx';
import { TerminalModal } from './components/TerminalModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { Toast } from './components/Toast.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [archProjectIndex, setArchProjectIndex] = useState(0);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [terminalInitialCmd, setTerminalInitialCmd] = useState<string | undefined>(undefined);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Scroll spy to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'featured-projects', 'competitive-programming', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut for Terminal (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  }, []);

  const handleCopyEmail = (email: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showToast(`Copied to clipboard: ${email}`);
        })
        .catch(() => {
          showToast(`Contact email: ${email}`);
        });
    } else {
      showToast(`Contact email: ${email}`);
    }
  };

  const handleOpenArchitecture = (index: number) => {
    setArchProjectIndex(index);
    setArchModalOpen(true);
  };

  const handleOpenTerminal = (initialCmd?: string) => {
    setTerminalInitialCmd(initialCmd);
    setTerminalModalOpen(true);
  };

  return (
    <div className="bg-[#121318] text-[#e3e1e9] min-h-screen selection:bg-[#8083ff] selection:text-[#0d0096]">
      {/* Fixed Header */}
      <Header
        activeSection={activeSection}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenTerminalModal={() => handleOpenTerminal()}
      />

      {/* Main Content Area */}
      <main className="w-full pt-16 bg-[#121318]">
        {/* Section 00: Hero & Telemetry Strip */}
        <Hero
          onCopyEmail={handleCopyEmail}
          onOpenArchitectureModal={handleOpenArchitecture}
        />

        {/* Section 01: Production Systems & Architecture */}
        <ProjectsSection onOpenArchitectureModal={handleOpenArchitecture} />

        {/* Section 02: Competitive Programming & Benchmarks */}
        <CompetitiveProgrammingSection />

        {/* Section 03: Technical Capabilities & Toolchain */}
        <SkillsSection />

        {/* Section 04: Academic & Leadership Timeline */}
        <TimelineSection />

        {/* Section 05: Contact & Initiation Callout */}
        <ContactSection
          onCopyEmail={handleCopyEmail}
          onOpenResumeModal={() => setResumeModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenArchitectureModal={handleOpenArchitecture}
        onOpenTerminalModal={handleOpenTerminal}
      />

      {/* Modals & Overlays */}
      <ArchitectureModal
        isOpen={archModalOpen}
        projectIndex={archProjectIndex}
        onSelectProject={(idx) => setArchProjectIndex(idx)}
        onClose={() => setArchModalOpen(false)}
      />

      <TerminalModal
        isOpen={terminalModalOpen}
        initialCommand={terminalInitialCmd}
        onClose={() => setTerminalModalOpen(false)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenArchitectureModal={handleOpenArchitecture}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onCopyEmail={handleCopyEmail}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
