import React, { useState, useEffect } from 'react';
import { formatLatency } from '../utils/systemLogic.ts';

interface FooterProps {
  onOpenArchitectureModal: (index: number) => void;
  onOpenTerminalModal: (initialCmd?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenArchitectureModal,
  onOpenTerminalModal,
}) => {
  const [latency, setLatency] = useState(18);

  // Micro jitter simulation for live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(17 + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#0d0e13] border-t border-white/[0.06] py-8 sm:py-10 shadow-[0_-1px_8px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Telemetry Node Status */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]" />
            </span>
            <span className="font-mono text-xs text-[#4edea3] font-medium tracking-wide">
              NODE STATUS: ALL CLUSTERS OPERATIONAL
            </span>
          </div>

          <span className="hidden sm:inline text-[#464554] font-mono">•</span>

          <span className="font-mono text-xs text-[#c7c4d7]">
            {formatLatency(latency, 'us-east-1')}
          </span>
        </div>

        {/* Footer Navigation & Interactive Commands */}
        <div className="flex items-center gap-6 text-xs text-[#c7c4d7]">
          <button
            onClick={() => onOpenArchitectureModal(0)}
            className="hover:text-white transition-colors"
          >
            Architecture
          </button>
          <a href="#competitive-programming" className="hover:text-white transition-colors">
            Telemetry &amp; CP
          </a>
          <button
            onClick={() => onOpenTerminalModal('pgp')}
            className="hover:text-white transition-colors"
          >
            PGP Key
          </button>
          <button
            onClick={() => onOpenTerminalModal()}
            className="hover:text-white transition-colors flex items-center gap-1 text-[#8083ff]"
          >
            <span>Terminal</span>
            <kbd className="text-[10px] bg-[#1e1f25] px-1 rounded text-[#908fa0]">⌘K</kbd>
          </button>
        </div>

        {/* Copyright notice */}
        <div className="font-mono text-xs text-[#908fa0]">
          © 2025 Varun K. Distributed &amp; Deterministic Systems.
        </div>
      </div>
    </footer>
  );
};
