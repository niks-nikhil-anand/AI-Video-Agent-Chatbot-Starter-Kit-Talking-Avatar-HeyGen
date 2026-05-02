'use client';

import React, { useState, useRef, useEffect } from 'react';

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
  isMicActive: boolean;
}

export default function ChatPanel({ 
  isOpen, 
  onToggle, 
  isActive, 
  messages, 
  isTyping, 
  onSendMessage,
  duration,
  isMicActive
}: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || !isActive) return;
    onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col bg-bg-secondary border-l border-border-subtle overflow-hidden transition-transform duration-300 sm:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} fixed inset-0 z-40 sm:static`}>
      
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-border-subtle flex-shrink-0">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <span className="text-[13px] font-semibold text-text-primary">Conversation</span>
          <span className="text-[11px] font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded-full">
            {messages.filter(m => m.role !== 'system').length}
          </span>
        </div>
        <button 
          className="flex sm:hidden w-8 h-8 rounded-full bg-surface-glass border border-border-subtle text-text-secondary items-center justify-center hover:bg-surface-glass-hover hover:text-text-primary transition-all"
          onClick={onToggle}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar scroll-smooth">
        {messages.length === 0 ? (
          <div className="message system self-center max-w-[80%]">
             <div className="bg-transparent border border-dashed border-border-subtle text-text-muted text-[12px] text-center px-4 py-2 rounded-md">
               No messages yet. Start a session to begin.
             </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-2.5 max-w-[95%] animate-msg-in ${msg.role === 'user' ? 'self-end flex-row-reverse' : msg.role === 'system' ? 'self-center max-w-[80%]' : ''}`}
            >
              {msg.role !== 'system' && (
                <div className={`w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-semibold ${msg.role === 'ai' ? 'bg-gradient-to-br from-accent to-[#818cf8] text-white' : 'bg-bg-tertiary border border-border-subtle text-text-secondary'}`}>
                  {msg.role === 'ai' ? 'AI' : 'You'}
                </div>
              )}
              
              {msg.role === 'system' ? (
                <div className="bg-transparent border border-dashed border-border-subtle text-text-muted text-[12px] text-center px-4 py-2 rounded-md w-full">
                  {msg.content}
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className={`px-3.5 py-2.5 rounded-xl text-[13.5px] leading-relaxed ${msg.role === 'ai' ? 'bg-bg-card border border-border-subtle text-text-primary' : 'bg-accent text-white'}`}>
                    {msg.content}
                  </div>
                  <div className={`text-[11px] text-text-muted mt-1 px-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    {msg.time}
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2.5 max-w-[95%] animate-msg-in">
            <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-semibold bg-gradient-to-br from-accent to-[#818cf8] text-white">
              AI
            </div>
            <div className="flex gap-1 items-center px-4 py-3 bg-bg-card border border-border-subtle rounded-xl">
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-center gap-6 py-2.5 px-4 border-t border-border-subtle bg-bg-secondary flex-shrink-0">
        <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
          <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span className="text-text-secondary font-medium">{messages.filter(m => m.role !== 'system').length}</span> messages
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
          <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="text-text-secondary font-medium">{duration}</span> duration
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
          <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>
          <span className="text-text-secondary font-medium">{isMicActive ? 'Active' : 'Muted'}</span>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border-subtle flex-shrink-0 bg-bg-secondary">
        <div className={`flex items-center gap-2 bg-bg-primary border border-border-subtle rounded-xl p-1 pl-3.5 transition-all duration-150 ${isActive ? 'focus-within:border-accent/40' : 'opacity-50'}`}>
          <input 
            className="flex-1 bg-transparent border-none outline-none font-sans text-[13.5px] text-text-primary py-2 placeholder:text-text-muted"
            type="text" 
            placeholder="Ask the avatar anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!isActive}
          />
          <button 
            className={`w-[34px] h-[34px] rounded-lg bg-accent text-white flex items-center justify-center transition-all hover:bg-[#5558e6] disabled:opacity-30 disabled:cursor-not-allowed`}
            onClick={handleSend}
            disabled={!input.trim() || !isActive}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
