'use client';

import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  role: 'ai' | 'user' | 'system';
  content: string;
  time: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  isActive: boolean;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  duration: string;
  unreadCount: number;
}

export default function ChatPanel({
  isOpen,
  onToggle,
  isActive,
  messages,
  isTyping,
  onSendMessage,
  duration,
  unreadCount,
}: ChatPanelProps) {
  const visibleMessages = messages.filter((m) => m.role !== 'system');

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          flex flex-col bg-bg-secondary border-l border-border-subtle overflow-hidden
          fixed inset-y-0 right-0 w-[88vw] max-w-[380px] z-40
          sm:static sm:inset-y-auto sm:right-auto sm:w-auto sm:max-w-none sm:z-auto sm:h-full
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}
        `}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border-subtle shrink-0">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span className="text-[13px] font-semibold text-text-primary tracking-tight">Conversation</span>
            {visibleMessages.length > 0 && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/10 text-accent tabular-nums">
                {visibleMessages.length}
              </span>
            )}
          </div>

          {/* Mobile close */}
          <button
            className="sm:hidden w-7 h-7 flex items-center justify-center rounded-full bg-surface-glass border border-border-subtle text-text-muted hover:text-text-primary transition-colors"
            onClick={onToggle}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <MessageList messages={messages} isTyping={isTyping} />

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-5 px-4 py-2.5 border-t border-border-subtle shrink-0">
          <Stat
            icon={
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            }
            value={String(visibleMessages.length)}
            label="messages"
          />
          <div className="w-px h-3 bg-border-subtle" />
          <Stat
            icon={
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
            value={duration}
            label="duration"
          />
        </div>

        {/* Input */}
        <ChatInput isActive={isActive} onSend={onSendMessage} />
      </aside>

      {/* Mobile FAB */}
      <button
        className="sm:hidden fixed bottom-5 right-5 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_4px_20px_rgba(99,102,241,0.4)] z-50 active:scale-90 transition-all"
        onClick={onToggle}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#ef4444] border-2 border-bg-primary rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    </>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
      <span className="opacity-60">{icon}</span>
      <span className="font-medium text-text-secondary">{value}</span>
      <span>{label}</span>
    </div>
  );
}
