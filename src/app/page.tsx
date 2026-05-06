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
  const [seconds, setSeconds]             = useState(0);
  const [isTyping, setIsTyping]           = useState(false);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen]       = useState(false);
  const [unreadCount, setUnreadCount]     = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speakRef = useRef<((text: string) => void) | null>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const addMessage = useCallback(
    (role: Message['role'], content: string) => {
      const msg: Message = { id: makeId(), role, content, time: timestamp() };
      setMessages((prev) => [...prev, msg]);
      if (role === 'ai' && !isChatOpen) setUnreadCount((n) => n + 1);
    },
    [isChatOpen],
  );

  // ── Session callbacks ───────────────────────────────────────────────────────

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
      { id: makeId(), role: 'system', content: `Session ended. Duration: ${formatTime(seconds)}.`, time: timestamp() },
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
  }, [addMessage]);

  // ── Chat ────────────────────────────────────────────────────────────────────

  const handleSendMessage = useCallback(async (text: string) => {
    addMessage('user', text);

    if (speakRef.current) {
      speakRef.current(text);
      setIsTyping(true);
      return;
    }

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

  const handleChatToggle = useCallback(() => {
    setIsChatOpen((o) => !o);
    setUnreadCount(0);
  }, []);

  // ───────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden bg-bg-primary text-text-primary">
      <Header status={sessionStatus} timer={formatTime(seconds)} />

      <main className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_360px] overflow-hidden min-h-0">
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
          onToggle={handleChatToggle}
          isActive={sessionStatus === 'live' || sessionStatus === 'ended'}
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          duration={formatTime(seconds)}
          unreadCount={unreadCount}
        />
      </main>
    </div>
  );
}
