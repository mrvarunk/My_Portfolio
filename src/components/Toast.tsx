import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#292a2f] border border-white/[0.1] px-4 py-2.5 rounded-lg shadow-xl animate-bounceIn"
    >
      <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
        check_circle
      </span>
      <span className="font-mono text-xs text-[#e3e1e9]">
        {message}
      </span>
    </div>
  );
};
