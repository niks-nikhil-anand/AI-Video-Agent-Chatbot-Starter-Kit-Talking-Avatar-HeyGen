'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { fetchSessionToken, stopSessionOnServer } from '../lib/liveavatar';
import type { LiveAvatarSession } from '@heygen/liveavatar-web-sdk';
import SessionControls from './SessionControls';

export interface AvatarPanelProps {
  isActive: boolean;
  onStart: () => void;
  onEnd: () => void;
  onUserTranscription?: (text: string) => void;
  onAvatarTranscription?: (text: string) => void;
  onSessionReady?: (speak: (text: string) => void) => void;
}

export default function AvatarPanel({
  isActive,
  onStart,
  onEnd,
  onUserTranscription,
  onAvatarTranscription,
  onSessionReady,
}: AvatarPanelProps) {
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [isMicActive, setIsMicActive]   = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [audioLocked, setAudioLocked]   = useState(false);

  const sessionRef      = useRef<LiveAvatarSession | null>(null);
  const sessionTokenRef = useRef<string | null>(null);
  const videoRef        = useRef<HTMLVideoElement>(null);
  const keepAliveRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const startingRef     = useRef(false);

  useEffect(() => {
    if (!isActive) return;
    keepAliveRef.current = setInterval(async () => {
      try { await sessionRef.current?.keepAlive(); } catch {}
    }, 120_000);
    return () => { if (keepAliveRef.current) clearInterval(keepAliveRef.current); };
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
      sessionRef.current?.stop().catch(() => {});
      if (sessionTokenRef.current) stopSessionOnServer(sessionTokenRef.current);
    };
  }, []);

  const unlockAudio = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
    setAudioLocked(false);
  }, []);

  const handleStart = useCallback(async () => {
    if (startingRef.current) return;
    startingRef.current = true;
    setIsLoading(true);
    setError(null);
    setAudioLocked(false);

    try {
      const { LiveAvatarSession, SessionEvent, AgentEventsEnum } = await import(
        '@heygen/liveavatar-web-sdk'
      );

      const token = await fetchSessionToken();
      sessionTokenRef.current = token;

      const session = new LiveAvatarSession(token);
      sessionRef.current = session;

      session.on(SessionEvent.SESSION_STREAM_READY, () => {
        const video = videoRef.current;
        if (!video) return;
        session.attach(video);
        video.muted = false;
        video.play().catch(() => {
          video.muted = true;
          setAudioLocked(true);
        });
      });

      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
        setIsMicActive(false);
        setIsSpeaking(false);
        setAudioLocked(false);
      });

      session.on(AgentEventsEnum.AVATAR_SPEAK_STARTED, () => setIsSpeaking(true));
      session.on(AgentEventsEnum.AVATAR_SPEAK_ENDED,   () => setIsSpeaking(false));

      session.on(AgentEventsEnum.USER_TRANSCRIPTION,   (e) => onUserTranscription?.(e.text));
      session.on(AgentEventsEnum.AVATAR_TRANSCRIPTION, (e) => onAvatarTranscription?.(e.text));

      session.on(AgentEventsEnum.SESSION_STOPPED, () => {
        setIsMicActive(false);
        setIsSpeaking(false);
        setAudioLocked(false);
      });

      await session.start();

      try {
        await session.voiceChat.start();
        setIsMicActive(true);
      } catch (vcErr) {
        console.error('[LiveAvatar] voiceChat.start() failed:', vcErr);
      }

      onSessionReady?.((text: string) => session.message(text));
      onStart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start session');
      sessionRef.current = null;
      sessionTokenRef.current = null;
    } finally {
      setIsLoading(false);
      startingRef.current = false;
    }
  }, [onStart, onUserTranscription, onAvatarTranscription, onSessionReady]);

  const handleEnd = useCallback(async () => {
    if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    try { await sessionRef.current?.stop(); } catch {}
    if (sessionTokenRef.current) stopSessionOnServer(sessionTokenRef.current);
    sessionRef.current = null;
    sessionTokenRef.current = null;
    setIsMicActive(false);
    setIsSpeaking(false);
    setAudioLocked(false);
    onEnd();
  }, [onEnd]);

  const toggleMic = useCallback(async () => {
    const vc = sessionRef.current?.voiceChat;
    if (!vc) return;
    if (isMicActive) {
      vc.stop();
      setIsMicActive(false);
    } else {
      await vc.start();
      setIsMicActive(true);
    }
  }, [isMicActive]);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-bg-primary p-6 transition-all duration-700">

      {/* Ambient glow behind video when live */}
      {isActive && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-3xl" />
        </div>
      )}

      {/* Video card */}
      <div
        className={`relative w-full max-w-[480px] aspect-3/4 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500
          ${isActive
            ? 'border border-accent/25 shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_60px_rgba(99,102,241,0.12)]'
            : 'border border-border-subtle shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
          }`}
      >
        {/* Stream */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover block bg-bg-tertiary"
          autoPlay
          playsInline
        />

        {/* Tap-to-unlock audio overlay */}
        {audioLocked && (
          <button
            onClick={unlockAudio}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/55 backdrop-blur-[2px] transition-opacity"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
              </svg>
            </div>
            <p className="text-white/90 text-[13px] font-medium">Tap to enable audio</p>
          </button>
        )}

        {/* Idle placeholder */}
        {!isActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-linear-to-b from-bg-tertiary to-bg-secondary">
            <div className="relative">
              <div className="w-[100px] h-[100px] rounded-full bg-linear-to-br from-accent/15 to-accent/5 border border-accent/15 flex items-center justify-center">
                <svg className="w-10 h-10 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              {/* Dashed orbit ring */}
              <div className="absolute inset-[-14px] rounded-full border border-dashed border-accent/15 animate-spin-slow" />
            </div>

            {error ? (
              <p className="text-[12px] text-[#ef4444] text-center max-w-[220px] leading-relaxed px-4">{error}</p>
            ) : (
              <p className="text-[12px] text-text-muted text-center max-w-[200px] leading-relaxed">
                Start a session to connect with the AI Avatar
              </p>
            )}
          </div>
        )}

        {/* Speaking waveform badge */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-2 rounded-full bg-bg-card/80 backdrop-blur-md border border-border-subtle shadow-lg pointer-events-none transition-all duration-300
            ${isSpeaking ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
        >
          <div className="flex items-end gap-[3px] h-3.5">
            {[0, 0.15, 0.3, 0.45, 0.6].map((delay, i) => (
              <span
                key={i}
                className="w-[3px] rounded-[2px] bg-accent animate-bar-bounce"
                style={{ height: [6, 12, 8, 14, 6][i], animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-text-primary">Speaking</span>
        </div>
      </div>

      {/* Controls */}
      <SessionControls
        isActive={isActive}
        isLoading={isLoading}
        isMicActive={isMicActive}
        onStart={handleStart}
        onEnd={handleEnd}
        onToggleMic={toggleMic}
      />
    </section>
  );
}
