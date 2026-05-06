'use client';

import { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import AvatarPanel from './components/AvatarPanel';
import ChatPanel from './components/ChatPanel';

interface Message {
  id: string;
  role: 'ai' | 'user' | 'system';
  content: string;
  time: string;
}

function makeId() {
  return Math.random().toString(36).slice(2, 11);
}

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function AIVideoAgent() {
  const [sessionStatus, setSessionStatus] = useState<'idle' | 'live' | 'ended'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speakRef = useRef<((text: string) => void) | null>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const addMessage = useCallback((role: Message['role'], content: string) => {
    const msg: Message = { id: makeId(), role, content, time: timestamp() };
    setMessages((prev) => [...prev, msg]);
    if (role !== 'system' && role === 'ai' && !isChatOpen) {
      setUnreadCount((n) => n + 1);
    }
    return msg;
  }, [isChatOpen]);

  // ── Avatar session callbacks ──────────────────────────────────────────────

  const handleSessionStart = useCallback(() => {
    setSessionStatus('live');
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    addMessage('system', 'Session started. The avatar is ready.');
  }, [addMessage]);

  const handleSessionEnd = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    speakRef.current = null;
    setSessionStatus('ended');
    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        role: 'system',
        content: `Session ended. Duration: ${formatTime(seconds)}.`,
        time: timestamp(),
      },
    ]);
  }, [seconds]);

  const handleSessionReady = useCallback((speak: (text: string) => void) => {
    speakRef.current = speak;
  }, []);

  const handleUserTranscription = useCallback((text: string) => {
    addMessage('user', text);
  }, [addMessage]);

  const handleAvatarTranscription = useCallback((text: string) => {
    setIsTyping(false);
    addMessage('ai', text);
    if (!isChatOpen) setUnreadCount((n) => n + 1);
  }, [addMessage, isChatOpen]);

  // ── Text chat ─────────────────────────────────────────────────────────────

  const handleSendMessage = useCallback(async (text: string) => {
    addMessage('user', text);

    if (speakRef.current) {
      // Avatar is live — let LiveAvatar's LLM respond via voice
      speakRef.current(text);
      setIsTyping(true);
      return;
    }

    // No avatar session — fall back to Gemini text chat
    setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages
            .filter((m) => m.role !== 'system')
            .map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
        }),
      });
      const data = await res.json();
      addMessage('ai', data.response ?? data.message ?? 'No response.');
    } catch {
      addMessage('system', 'Failed to get a response. Please try again.');
    } finally {
      setIsTyping(false);
    }
  }, [addMessage, messages]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-bg-primary text-text-primary">
      <Header status={sessionStatus} timer={formatTime(seconds)} />

      <main className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_380px] overflow-hidden">
        <AvatarPanel
          isActive={sessionStatus === 'live'}
          onStart={handleSessionStart}
          onEnd={handleSessionEnd}
          onSessionReady={handleSessionReady}
          onUserTranscription={handleUserTranscription}
          onAvatarTranscription={handleAvatarTranscription}
        />

        <ChatPanel
          isOpen={isChatOpen}
          onToggle={() => {
            setIsChatOpen((o) => !o);
            setUnreadCount(0);
          }}
          isActive={sessionStatus === 'live' || sessionStatus === 'ended'}
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          duration={formatTime(seconds)}
          isMicActive={false}
        />
      </main>

      {/* Mobile chat toggle */}
      <button
        className="flex sm:hidden fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-accent text-white items-center justify-center shadow-[0_4px_20px_rgba(99,102,241,0.4)] z-50 active:scale-90 transition-all"
        onClick={() => {
          setIsChatOpen((o) => !o);
          setUnreadCount(0);
        }}
      >
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#ef4444] border-2 border-bg-primary rounded-full text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
