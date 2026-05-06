'use client';

import React from 'react';

import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  status: 'idle' | 'live' | 'ended';
  timer: string;
}

export default function Header({ status, timer }: HeaderProps) {
  const statusColors = {
    idle: 'text-text-secondary bg-surface-glass border-border-subtle',
    live: 'text-green border-green/30 bg-green/15',
    ended: 'text-red border-red/20 bg-red/15'
  };

  return (
    <header className="flex items-center justify-between padding-x-5 py-3 bg-bg-secondary border-b border-border-subtle z-10 gap-3">
      <div className="flex items-center gap-3 min-w-0 px-4">
        <div className="w-[34px] h-[34px] bg-gradient-to-br from-accent to-[#818cf8] rounded-lg flex items-center justify-center font-bold text-sm text-white shadow-[0_0_40px_rgba(99,102,241,0.15)] flex-shrink-0">
          RU
        </div>
        <div>
          <div className="text-[15px] font-semibold text-text-primary truncate">Rubenius AI Agent</div>
          <div className="text-[12px] text-text-muted mt-0.5 hidden sm:block">
            Powered by Rubenius &middot; Gemini &middot; Vectorless RAG
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 px-4">
        <ThemeToggle />
        <div 
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${statusColors[status]}`}
          data-status={status}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'live' ? 'bg-[#22c55e] animate-pulse-dot' : status === 'ended' ? 'bg-[#ef4444]' : 'bg-text-muted'}`} />
          <span className="capitalize">{status === 'idle' ? 'Ready' : status}</span>
        </div>
        <div className={`font-mono text-sm font-medium px-2.5 py-1.5 bg-surface-glass border border-border-subtle rounded-full tracking-wider min-w-[72px] text-center transition-all duration-300 ${status === 'live' ? 'text-green border-green/25' : 'text-text-secondary'}`}>
          {timer}
        </div>
      </div>
    </header>
  );
}
