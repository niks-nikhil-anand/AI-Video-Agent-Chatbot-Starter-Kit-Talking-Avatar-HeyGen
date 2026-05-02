'use client';

import React from 'react';

/**
 * Avatar component renders the LiveAvatar video stream.
 * It will handle WebRTC connection and video rendering.
 */
export default function Avatar() {
  return (
    <div className="w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-white/50 text-sm flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
        LiveAvatar Stream Placeholder
      </div>
      {/* WebRTC Video element will be injected here during integration */}
    </div>
  );
}
