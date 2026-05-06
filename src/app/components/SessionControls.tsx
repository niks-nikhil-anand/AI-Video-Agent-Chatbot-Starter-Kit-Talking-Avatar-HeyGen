'use client';

interface SessionControlsProps {
  isActive: boolean;
  isLoading: boolean;
  isMicActive: boolean;
  onStart: () => void;
  onEnd: () => void;
  onToggleMic: () => void;
}

export default function SessionControls({
  isActive,
  isLoading,
  isMicActive,
  onStart,
  onEnd,
  onToggleMic,
}: SessionControlsProps) {
  if (!isActive) {
    return (
      <div className="flex items-center justify-center pt-5">
        <button
          onClick={onStart}
          disabled={isLoading}
          className="group flex items-center gap-2.5 px-7 py-3 rounded-full bg-accent text-white text-[13px] font-semibold
                     shadow-[0_2px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.4)]
                     hover:bg-[#5558e6] active:scale-[0.97] transition-all duration-200
                     disabled:opacity-60 disabled:cursor-wait disabled:hover:shadow-[0_2px_20px_rgba(99,102,241,0.25)]"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg
              className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {isLoading ? 'Connecting…' : 'Start Session'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-5">
      {/* Pill container */}
      <div className="flex items-center gap-1.5 px-2 py-2 bg-bg-secondary/80 border border-border-subtle rounded-full backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
        {/* Mic toggle */}
        <button
          onClick={onToggleMic}
          title={isMicActive ? 'Mute microphone' : 'Unmute microphone'}
          className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 active:scale-90
            ${isMicActive
              ? 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#ef4444] animate-mic-pulse'
              : 'bg-surface-glass border-border-subtle text-text-muted hover:text-text-primary hover:border-accent/30'
            }`}
        >
          <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMicActive ? (
              <>
                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </>
            ) : (
              <>
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" />
                <path d="M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </>
            )}
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-border-subtle" />

        {/* End session */}
        <button
          onClick={onEnd}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold
                     text-[#ef4444] bg-[#ef4444]/8 border border-[#ef4444]/20
                     hover:bg-[#ef4444]/15 active:scale-[0.97] transition-all duration-200"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <rect x="5" y="5" width="14" height="14" rx="2" />
          </svg>
          End
        </button>
      </div>
    </div>
  );
}
