'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fetchSessionToken, stopSessionOnServer } from '../lib/liveavatar';
import type { LiveAvatarSession } from '@heygen/liveavatar-web-sdk';

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // true when the stream is live but browser autoplay policy is blocking audio
  const [audioLocked, setAudioLocked] = useState(false);

  const sessionRef = useRef<LiveAvatarSession | null>(null);
  const sessionTokenRef = useRef<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Guard against React Strict Mode double-invoke
  const startingRef = useRef(false);

  // Keep-alive every 2 min while session is live
  useEffect(() => {
    if (!isActive) return;
    keepAliveRef.current = setInterval(async () => {
      try { await sessionRef.current?.keepAlive(); } catch {}
    }, 120_000);
    return () => { if (keepAliveRef.current) clearInterval(keepAliveRef.current); };
  }, [isActive]);

  // Cleanup on unmount
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
        // React's muted={false} is broken — set via DOM ref, then attempt play()
        video.muted = false;
        video.play().catch(() => {
          // Autoplay policy blocked audio — show tap-to-unmute overlay
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
      session.on(AgentEventsEnum.AVATAR_SPEAK_ENDED, () => setIsSpeaking(false));

      session.on(AgentEventsEnum.USER_TRANSCRIPTION, (event) => {
        onUserTranscription?.(event.text);
      });

      session.on(AgentEventsEnum.AVATAR_TRANSCRIPTION, (event) => {
        onAvatarTranscription?.(event.text);
      });

      session.on(AgentEventsEnum.SESSION_STOPPED, () => {
        setIsMicActive(false);
        setIsSpeaking(false);
        setAudioLocked(false);
      });

      await session.start();

      // voiceChat.start() triggers the browser mic permission prompt.
      // Isolated try/catch so a denial doesn't kill the video session.
      try {
        await session.voiceChat.start();
        setIsMicActive(true);
      } catch (vcErr) {
        console.error('[LiveAvatar] voiceChat.start() failed:', vcErr);
      }

      onSessionReady?.((text: string) => session.message(text));
      onStart();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start session';
      setError(message);
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
    <div
      className={`flex flex-col items-center justify-center relative bg-bg-primary overflow-hidden p-6 transition-all duration-1000 ${
        isActive
          ? 'before:content-[""] before:absolute before:top-1/2 before:left-1/2 before:w-[500px] before:h-[500px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] before:pointer-events-none before:opacity-100'
          : 'before:opacity-0'
      }`}
    >
      <div
        className={`relative w-full max-w-[440px] aspect-[3/4] max-h-[calc(100dvh-380px)] rounded-3xl overflow-hidden bg-bg-tertiary border border-border-subtle shadow-2xl transition-all duration-300 ${
          isActive ? 'border-border-active shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_40px_rgba(99,102,241,0.15)]' : ''
        }`}
      >
        {/* Video stream — muted prop omitted intentionally; we control muted via DOM ref */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover block"
          id="avatarVideo"
          autoPlay
          playsInline
        />

        {/* Tap-to-enable-audio overlay — appears when browser autoplay policy blocks audio */}
        {audioLocked && (
          <button
            onClick={unlockAudio}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm z-10 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
              </svg>
            </div>
            <p className="text-white text-sm font-medium">Tap to enable audio</p>
          </button>
        )}

        {/* Idle placeholder */}
        {!isActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-linear-to-b from-bg-tertiary to-bg-secondary transition-opacity duration-300">
            <div className="w-[160px] h-[160px] rounded-full bg-linear-to-br from-accent/10 to-accent/5 border-2 border-accent/15 flex items-center justify-center relative after:content-[''] after:absolute after:inset-[-10px] after:rounded-full after:border after:border-dashed after:border-accent/15 after:animate-spin-slow">
              <svg className="w-16 h-16 text-accent opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            {error ? (
              <p className="text-sm text-[#ef4444] text-center max-w-[240px] leading-relaxed px-2">{error}</p>
            ) : (
              <p className="text-sm text-text-muted text-center max-w-[220px] leading-relaxed">
                Start a session to connect with the AI Avatar
              </p>
            )}
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
            onClick={handleStart}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent border border-accent text-white rounded-full text-[13px] font-semibold cursor-pointer transition-all hover:bg-[#5558e6] hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)] active:scale-95 shadow-[0_2px_12px_rgba(99,102,241,0.15)] disabled:opacity-60 disabled:cursor-wait"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
            {isLoading ? 'Connecting...' : 'Start Session'}
          </button>
        ) : (
          <>
            <button
              onClick={handleEnd}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ef4444] border border-[#ef4444] text-white rounded-full text-[13px] font-semibold cursor-pointer transition-all hover:bg-[#dc2626] active:scale-95 shadow-[0_2px_12px_rgba(239,68,68,0.15)]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              End Session
            </button>
            <button
              onClick={toggleMic}
              className={`w-11 h-11 flex items-center justify-center rounded-full bg-surface-glass border border-border-subtle text-text-secondary cursor-pointer transition-all hover:bg-surface-glass-hover hover:text-text-primary active:scale-95 ${isMicActive ? 'bg-red/15 border-red/40 text-[#ef4444] animate-mic-pulse' : ''}`}
              title={isMicActive ? 'Mute mic' : 'Enable mic'}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          </>
        )}
      </div>
    </div>
  );
}
