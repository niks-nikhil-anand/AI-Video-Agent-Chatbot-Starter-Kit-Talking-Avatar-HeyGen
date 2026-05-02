'use client';

import React, { useState } from 'react';

/**
 * VoiceInput component handles microphone access and speech-to-text triggers.
 */
export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-4 rounded-full border border-white/10 shadow-lg">
      <button 
        onClick={() => setIsListening(!isListening)}
        className={`p-4 rounded-full transition-all relative group ${
          isListening 
            ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
            : 'bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]'
        } text-white`}
      >
        {isListening && (
          <div className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20" />
        )}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
      </button>
      
      <div className="flex flex-col">
        <span className={`text-sm font-semibold transition-colors ${isListening ? 'text-red-400' : 'text-white'}`}>
          {isListening ? 'AI is listening...' : 'Ready to talk?'}
        </span>
        <span className="text-white/40 text-xs">
          {isListening ? 'Speak clearly into your mic' : 'Click the mic to start'}
        </span>
      </div>
    </div>
  );
}
