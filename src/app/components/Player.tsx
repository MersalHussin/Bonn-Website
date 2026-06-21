'use client';

import React from 'react';
import '@videojs/react/video/skin.css';
import { createPlayer, videoFeatures } from '@videojs/react';
import { VideoSkin, Video } from '@videojs/react/video';
import { Play } from 'lucide-react';

const Player = createPlayer({ features: videoFeatures });

interface MyPlayerProps {
  src: string;
}

const VideoContainer = ({ src }: MyPlayerProps) => {
  const store = Player.usePlayer();
  const started = Player.usePlayer((s: any) => s.started);
  const paused = Player.usePlayer((s: any) => s.paused);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.play();
  };

  return (
    <div 
      className={`relative group w-full aspect-video rounded-[30px] overflow-hidden  shadow-lg   transition-all duration-300 ${
        !started || paused ? 'hide-videojs-controls' : ''
      }`}
    >
      <VideoSkin>
        <Video src={src} playsInline className="w-full h-full object-cover" />
      </VideoSkin>

      {/* Center Play Button Overlay */}
      {(!started || paused) && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/35 z-20 cursor-pointer transition-all duration-300"
          onClick={handlePlayClick}
        >
          <button
            type="button"
            onClick={handlePlayClick}
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-main/90 hover:bg-main hover:scale-115 text-white shadow-2xl transition-all duration-300 border border-white/20 backdrop-blur-sm cursor-pointer"
          >
            <Play className="w-7 h-7 md:w-9 md:h-9 text-white fill-white translate-x-[2px]" />
          </button>
        </div>
      )}
    </div>
  );
};

export const MyPlayer = ({ src }: MyPlayerProps) => {
  return (
    <Player.Provider>
      <VideoContainer src={src} />
    </Player.Provider>
  );
};