'use client';

import { useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'ai' | 'user' | 'system';
  content: string;
  time: string;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 rounded-full border border-dashed border-border-subtle flex items-center justify-center">
            <svg className="w-5 h-5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <p className="text-[12px] text-text-muted leading-relaxed max-w-[180px]">
            Start a session to begin your conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5 custom-scrollbar scroll-smooth">
      {messages.map((msg) => {
        if (msg.role === 'system') {
          return (
            <div key={msg.id} className="self-center animate-msg-in">
              <span className="inline-block text-[11px] text-text-muted px-3 py-1 bg-surface-glass border border-border-subtle rounded-full">
                {msg.content}
              </span>
            </div>
          );
        }

        if (msg.role === 'ai') {
          return (
            <div key={msg.id} className="flex gap-2.5 max-w-[90%] animate-msg-in">
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-accent to-[#818cf8] flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white mt-0.5 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                RU
              </div>
              <div className="flex flex-col gap-1">
                <div className="px-3.5 py-2.5 bg-bg-card border border-border-subtle rounded-2xl rounded-tl-md text-[13px] leading-relaxed text-text-primary">
                  {msg.content}
                </div>
                <span className="text-[10px] text-text-muted pl-1">{msg.time}</span>
              </div>
            </div>
          );
        }

        return (
          <div key={msg.id} className="flex gap-2.5 max-w-[90%] self-end flex-row-reverse animate-msg-in">
            <div className="w-6 h-6 rounded-full bg-bg-tertiary border border-border-subtle flex-shrink-0 flex items-center justify-center text-[8px] font-medium text-text-secondary mt-0.5">
              You
            </div>
            <div className="flex flex-col gap-1 items-end">
              <div className="px-3.5 py-2.5 bg-accent rounded-2xl rounded-tr-md text-[13px] leading-relaxed text-white">
                {msg.content}
              </div>
              <span className="text-[10px] text-text-muted pr-1">{msg.time}</span>
            </div>
          </div>
        );
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex gap-2.5 max-w-[90%] animate-msg-in">
          <div className="w-6 h-6 rounded-full bg-linear-to-br from-accent to-[#818cf8] flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white mt-0.5 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            RU
          </div>
          <div className="px-4 py-3 bg-bg-card border border-border-subtle rounded-2xl rounded-tl-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
