'use client';

import React, { useState } from 'react';

/**
 * ChatPanel component handles the text-based conversation interface.
 * Displays message history and provides text input.
 */
export default function ChatPanel() {
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-[500px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <h3 className="text-white font-medium text-sm">Conversation History</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar">
        {/* Messages Placeholder */}
        <div className="text-white/20 text-center text-xs py-10 italic">
          Your conversation with the AI agent will appear here...
        </div>
      </div>

      <div className="flex gap-2 items-center bg-white/5 rounded-xl p-1.5 border border-white/5 focus-within:border-blue-500/50 transition-all">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..." 
          className="flex-1 bg-transparent px-3 py-2 text-white text-sm outline-none placeholder:text-white/30"
        />
        <button 
          className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-all active:scale-95 disabled:opacity-50"
          disabled={!input.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
