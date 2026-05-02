'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AvatarPanel from './components/AvatarPanel';
import ChatPanel from './components/ChatPanel';

interface Message {
  id: string;
  role: 'ai' | 'user' | 'system';
  content: string;
  time: string;
}

export default function AIVideoAgent() {
  // ───── State ─────
  const [sessionStatus, setSessionStatus] = useState<'idle' | 'live' | 'ended'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // ───── Timer ─────
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionStatus === 'live') {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStatus]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // ───── Actions ─────
  const addSystemMessage = (text: string) => {
    const newMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'system',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addAIMessage = (text: string) => {
    const newMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'ai',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    
    if (!isChatOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const addUserMessage = (text: string) => {
    const newMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const simulateSpeaking = (duration: number) => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), duration);
  };

  const startSession = () => {
    setSessionStatus('live');
    setSeconds(0);
    addSystemMessage('Session started. The avatar is ready.');
    
    // Simulate initial greeting
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addAIMessage("Hello! I'm the DevKit Market assistant. I can help you find the right starter kit, explain features, or answer any questions about our products and tools. What would you like to know?");
        simulateSpeaking(4000);
      }, 1500);
    }, 800);
  };

  const endSession = () => {
    setSessionStatus('ended');
    setIsMicActive(false);
    setIsSpeaking(false);
    addSystemMessage(`Session ended. Duration: ${formatTime(seconds)}.`);
  };

  const toggleMic = () => {
    if (sessionStatus !== 'live') return;
    setIsMicActive(!isMicActive);
    if (!isMicActive) {
      addSystemMessage('Microphone enabled — speak to the avatar.');
    }
  };

  const handleSendMessage = (text: string) => {
    addUserMessage(text);
    
    // Simulate AI response logic
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Demo responses
      const responses = [
        "The SaaS Starter Pro is our best seller at $79. It includes authentication, Stripe billing, team management, an admin dashboard, and role-based access control.",
        "We have 8 completely free starter kits! The most popular ones are the Next.js Blog Kit and the Waitlist App.",
        "Every kit comes with full deployment instructions for Vercel, Railway, and Render."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addAIMessage(randomResponse);
      simulateSpeaking(4000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-bg-primary text-text-primary">
      {/* Header */}
      <Header status={sessionStatus} timer={formatTime(seconds)} />

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_380px] overflow-hidden">
        {/* Avatar Panel */}
        <AvatarPanel 
          isActive={sessionStatus === 'live'}
          isSpeaking={isSpeaking}
          isMicActive={isMicActive}
          onStart={startSession}
          onEnd={endSession}
          onToggleMic={toggleMic}
        />

        {/* Chat Panel */}
        <ChatPanel 
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          isActive={sessionStatus === 'live'}
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
          duration={formatTime(seconds)}
          isMicActive={isMicActive}
        />
      </main>

      {/* Mobile Chat Toggle */}
      <button 
        className="flex sm:hidden fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full bg-accent text-white items-center justify-center shadow-[0_4px_20px_rgba(99,102,241,0.4)] z-50 active:scale-90 transition-all"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
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