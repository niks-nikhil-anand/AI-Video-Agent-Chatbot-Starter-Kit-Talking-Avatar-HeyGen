'use client';

import React from 'react';

interface AvatarPanelProps {
  isActive: boolean;
  isSpeaking: boolean;
  onStart: () => void;
  onEnd: () => void;
  onToggleMic: () => void;
  isMicActive: boolean;
}

export default function AvatarPanel({ 
  isActive, 
  isSpeaking, 
  onStart, 
  onEnd, 
  onToggleMic, 
  isMicActive 
}: AvatarPanelProps) {
  return (
    <div className={`flex flex-col items-center justify-center relative bg-bg-primary overflow-hidden p-6 transition-all duration-1000 ${isActive ? 'before:content-[""] before:absolute before:top-1/2 before:left-1/2 before:w-[500px] before:h-[500px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] before:pointer-events-none before:opacity-100' : 'before:opacity-0'}`}>
      
      <div className={`relative w-full max-w-[440px] aspect-[3/4] max-h-[calc(100dvh-3a80px)] rounded-3xl overflow-hidden bg-bg-tertiary border border-border-subtle shadow-2xl transition-all duration-300 ${isActive ? 'border-border-active shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_40px_rgba(99,102,241,0.15)]' : ''}`}>
        
        {/* Video stream */}
        <video 
          className="w-full h-full object-cover block" 
          id="avatarVideo" 
          autoPlay 
          playsInline 
          muted 
        />

        {/* Placeholder */}
        {!isActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-bg-tertiary to-bg-secondary transition-opacity duration-300">
            <div className="w-[160px] h-[160px] rounded-full bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/15 flex items-center justify-center relative after:content-[''] after:absolute after:inset-[-10px] after:rounded-full after:border after:border-dashed after:border-accent/15 after:animate-spin-slow">
              <svg className="w-16 h-16 text-accent opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
              </svg>
            </div>
            <p className="text-sm text-text-muted text-center max-w-[220px] leading-relaxed">
              Start a session to connect with the AI Avatar
            </p>
          </div>
        )}

        {/* Speaking indicator */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-bg-card/80 backdrop-blur-xl border border-border-subtle rounded-full transition-opacity duration-300 pointer-events-none ${isSpeaking ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-end gap-[2px] h-4">
            <span className="w-[3px] h-1.5 bg-accent rounded-[2px] animate-bar-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-[3px] h-3 bg-accent rounded-[2px] animate-bar-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-[3px] h-2 bg-accent rounded-[2px] animate-bar-bounce" style={{ animationDelay: '0.3s' }} />
            <span className="w-[3px] h-3.5 bg-accent rounded-[2px] animate-bar-bounce" style={{ animationDelay: '0.45s' }} />
            <span className="w-[3px] h-1.5 bg-accent rounded-[2px] animate-bar-bounce" style={{ animationDelay: '0.6s' }} />
          </div>
          <span className="text-xs text-text-primary font-medium">Speaking...</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2.5 mt-5">
        {!isActive ? (
          <button 
            onClick={onStart}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent border border-accent text-white rounded-full text-[13px] font-semibold cursor-pointer transition-all hover:bg-[#5558e6] hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)] active:scale-95 shadow-[0_2px_12px_rgba(99,102,241,0.15)]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Start Session
          </button>
        ) : (
          <>
            <button 
              onClick={onEnd}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ef4444] border border-[#ef4444] text-white rounded-full text-[13px] font-semibold cursor-pointer transition-all hover:bg-[#dc2626] active:scale-95 shadow-[0_2px_12px_rgba(239,68,68,0.15)]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
              End Session
            </button>
            <button 
              onClick={onToggleMic}
              className={`w-11 h-11 flex items-center justify-center rounded-full bg-surface-glass border border-border-subtle text-text-secondary cursor-pointer transition-all hover:bg-surface-glass-hover hover:text-text-primary active:scale-95 ${isMicActive ? 'bg-red/15 border-red/40 text-[#ef4444] animate-mic-pulse' : ''}`}
              title={isMicActive ? 'Mute' : 'Unmute'}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                <path d="M19 10v2a7 7 0 01-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
          </>
        )}
        <button 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-surface-glass border border-border-subtle text-text-secondary rounded-full text-[13px] font-semibold cursor-pointer transition-all hover:bg-surface-glass-hover hover:text-text-primary active:scale-95"
          onClick={() => alert('Settings Placeholder')}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
