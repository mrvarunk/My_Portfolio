import React, { useState, useRef, useEffect } from 'react';
import { processTerminalCommand, TerminalOutput } from '../utils/systemLogic.ts';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onOpenArchitectureModal: (index: number) => void;
  initialCommand?: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onOpenArchitectureModal,
  initialCommand,
}) => {
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      command: 'init',
      response: [
        'VARUN.DEV CLUSTER DIAGNOSTIC CLI [Version 2.4.0-release]',
        'Connected to cluster node us-east-1. Type "help" for available system commands.',
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (initialCommand) {
        handleRunCommand(initialCommand);
      }
    }
  }, [isOpen, initialCommand]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (cmdStr: string) => {
    const res = processTerminalCommand(cmdStr);
    if (res.action === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, res]);
      if (res.action === 'open_modal') {
        if (res.modalId === 'resume-modal') {
          onOpenResumeModal();
        } else if (res.modalId === 'gitgpt-modal') {
          onOpenArchitectureModal(0);
        } else if (res.modalId === 'crawler-modal') {
          onOpenArchitectureModal(1);
        } else if (res.modalId === 'microcommerce-modal') {
          onOpenArchitectureModal(2);
        } else if (res.modalId === 'cafeops-modal') {
          onOpenArchitectureModal(3);
        }
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleRunCommand(inputVal);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0d0e13]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#0d0e13] border border-white/[0.15] rounded-xl shadow-2xl flex flex-col h-[520px] max-h-[85vh] overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-[#1e1f25] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>
            <span id="terminal-title" className="font-mono text-[10px] sm:text-xs text-[#908fa0] ml-1 sm:ml-2">
              varun@cluster-us-east-1:~#
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded">
              ONLINE
            </span>
            <button
              onClick={onClose}
              className="text-[#908fa0] hover:text-white p-1"
              aria-label="Close Terminal"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-[#e3e1e9] flex flex-col gap-2">
          {history.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {item.command && item.command !== 'init' && (
                <div className="flex items-center gap-2 text-[#8083ff]">
                  <span>&gt;</span>
                  <span className="text-[#e3e1e9]">{item.command}</span>
                </div>
              )}
              {item.response.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className={`leading-relaxed ${
                    line.startsWith('HTTP') || line.startsWith('VARUN.DEV')
                      ? 'text-[#4cd7f6]'
                      : line.startsWith('Command not recognized')
                      ? 'text-[#ffb4ab]'
                      : line.startsWith('  ')
                      ? 'text-[#c7c4d7]'
                      : 'text-[#e3e1e9]'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Suggestions */}
        <div className="px-4 py-1.5 bg-[#121318] border-t border-white/[0.04] flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-[#908fa0]">
          <span className="shrink-0 text-[#8083ff]">Try:</span>
          {['help', 'about', 'projects', 'stats', 'ping', 'pgp', 'curl resume', 'clear'].map((c) => (
            <button
              key={c}
              onClick={() => handleRunCommand(c)}
              className="hover:text-[#4edea3] px-1.5 py-0.5 rounded bg-[#1e1f25] border border-white/[0.04] shrink-0"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={onSubmit} className="p-3 bg-[#181b26] border-t border-white/[0.08] flex items-center gap-2">
          <span className="text-[#8083ff] font-mono text-sm font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g., 'help', 'stats', 'pgp', 'curl resume')..."
            className="min-w-0 flex-1 bg-transparent border-0 outline-none font-mono text-xs text-[#e3e1e9] placeholder-[#908fa0]"
            aria-label="Terminal command input"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-[#8083ff] text-[#0d0096] text-xs font-mono font-semibold"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
};
