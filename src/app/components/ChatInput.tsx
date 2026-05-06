'use client';

import { useState } from 'react';

interface ChatInputProps {
  isActive: boolean;
  onSend: (text: string) => void;
}

export default function ChatInput({ isActive, onSend }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || !isActive) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 pb-4 pt-2 flex-shrink-0">
      <div
        className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2 transition-all duration-150
          ${isActive
            ? 'bg-bg-tertiary border-border-subtle focus-within:border-accent/30 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.06)]'
            : 'bg-bg-tertiary/50 border-border-subtle opacity-40 cursor-not-allowed'
          }`}
      >
        <input
          className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-muted outline-none py-1 min-w-0"
          type="text"
          placeholder={isActive ? 'Ask the avatar anything…' : 'Start a session to chat'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isActive}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || !isActive}
          className="w-7 h-7 rounded-xl flex items-center justify-center bg-accent text-white
                     hover:bg-[#5558e6] active:scale-90 transition-all
                     disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-accent"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
