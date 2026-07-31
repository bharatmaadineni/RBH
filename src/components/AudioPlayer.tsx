/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, 
  Volume2, VolumeX, ListMusic, Clock, Sliders, Maximize2, 
  Sparkles, QrCode, Heart, Eye, ListCollapse, Volume, CheckCircle, ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Visualizer } from './Visualizer';
import { 
  LyricsModal, SleepTimerModal, EqualizerModal, ShareModal 
} from './Modals';

export const AudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    progress,
    duration,
    seek,
    volume,
    setVolume,
    shuffle,
    toggleShuffle,
    repeat,
    toggleRepeat,
    equalizer,
    sleepTimer,
    queue,
    queueIndex,
    favorites,
    toggleLikeTrack,
    showToast
  } = useApp();

  // Modals visibility state
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isSleepOpen, setIsSleepOpen] = useState(false);
  const [isEqOpen, setIsEqOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  // Fullscreen theater mode toggle
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQueueInPlayer, setShowQueueInPlayer] = useState(false);

  if (!currentTrack) return null;

  // Formatting helpers
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isLiked = favorites.includes(currentTrack.id);

  return (
    <>
      {/* 1. Main Bottom Sticky Audio Player (Z-Index 40) */}
      <div 
        id="bottom-sticky-player"
        onClick={() => setIsFullscreen(true)}
        className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-[#121212] border-t border-solid border-white/10 px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between gap-3 h-20 md:h-24 shadow-2xl select-none cursor-pointer hover:bg-[#181818] transition-colors"
      >
        {/* Track Details (Left Block) */}
        <div className="flex items-center gap-3 w-auto md:w-1/4 max-w-[240px] md:max-w-none min-w-0" id="player-track-info">
          <div className="relative shrink-0">
            <img 
              src={currentTrack.coverUrl} 
              alt={currentTrack.title} 
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover shadow-md"
            />
          </div>
          
          <div className="text-left min-w-0 flex-1">
            <h4 className="text-xs md:text-sm font-bold text-white truncate flex items-center gap-1.5">
              <span>{currentTrack.title}</span>
              <CheckCircle className="w-3.5 h-3.5 text-[#1DB954] fill-[#1DB954]/20 shrink-0" />
            </h4>
            <p className="text-[11px] text-[#A7A7A7] truncate mt-0.5">{currentTrack.artistName}</p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); toggleLikeTrack(currentTrack.id); }}
            className={`p-1.5 hover:scale-105 transition-transform cursor-pointer shrink-0 ml-1 ${isLiked ? 'text-[#1DB954]' : 'text-[#A7A7A7] hover:text-white'}`}
            id="player-like-btn"
            title="Save to Liked Songs"
          >
            <Heart className={`w-4.5 h-4.5 ${isLiked ? 'fill-[#1DB954]' : ''}`} />
          </button>
        </div>

        {/* Audio Controls Core (Center Block) */}
        <div className="flex flex-col items-center w-full md:w-2/4 max-w-2xl px-2" id="player-core-controls">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Shuffle */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleShuffle(); }}
              className={`p-1 hover:scale-105 transition-transform cursor-pointer ${shuffle ? 'text-[#1DB954]' : 'text-[#A7A7A7] hover:text-white'}`}
              id="player-shuffle-btn"
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevTrack(); }}
              className="p-1 text-[#A7A7A7] hover:text-white hover:scale-105 transition-transform cursor-pointer"
              id="player-prev-btn"
              title="Previous"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="w-9 h-9 md:w-10 md:h-10 bg-white hover:scale-105 active:scale-95 text-black rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg"
              id="player-play-pause-btn"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-black fill-black" /> : <Play className="w-5 h-5 text-black fill-black ml-0.5" />}
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextTrack(); }}
              className="p-1 text-[#A7A7A7] hover:text-white hover:scale-105 transition-transform cursor-pointer"
              id="player-next-btn"
              title="Next"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            {/* Repeat */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleRepeat(); }}
              className={`p-1 hover:scale-105 transition-transform relative cursor-pointer ${repeat !== 'none' ? 'text-[#1DB954]' : 'text-[#A7A7A7] hover:text-white'}`}
              id="player-repeat-btn"
              title={`Repeat: ${repeat}`}
            >
              <Repeat className="w-4 h-4" />
              {repeat === 'one' && <span className="absolute -top-1 -right-1 text-[8px] font-black bg-[#1DB954] text-black rounded-full px-1">1</span>}
            </button>
          </div>

          {/* Timeline slider */}
          <div className="hidden sm:flex items-center gap-2.5 w-full mt-1.5" id="player-timeline-slider" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] text-[#A7A7A7] font-semibold w-8 text-right">{formatTime(progress)}</span>
            
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={e => { e.stopPropagation(); seek(Number(e.target.value)); }}
              onClick={e => e.stopPropagation()}
              className="flex-1 h-1 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-white outline-none transition-colors"
              id="timeline-input-range"
            />
            
            <span className="text-[10px] text-[#A7A7A7] font-semibold w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Utility Controls (Right Block) */}
        <div className="hidden md:flex items-center justify-end w-1/4 gap-3 text-[#A7A7A7]" id="player-utility-controls">
          <button
            onClick={(e) => { e.stopPropagation(); setIsLyricsOpen(true); }}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            title="Lyrics"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setIsSleepOpen(true); }}
            className={`p-1.5 hover:text-white transition-colors cursor-pointer relative ${sleepTimer !== null ? 'text-[#FF3B5C]' : ''}`}
            title={sleepTimer !== null ? `Sleep Timer: ${sleepTimer}m remaining` : 'Sleep Timer'}
          >
            <Clock className="w-4 h-4" />
            {sleepTimer !== null && (
              <span className="absolute -top-1 -right-1 text-[8px] font-black bg-[#FF3B5C] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                z
              </span>
            )}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setIsEqOpen(true); }}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            title="Equalizer"
          >
            <Sliders className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
            className="p-1.5 hover:text-white transition-colors cursor-pointer"
            title="Fullscreen player"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Volume control block */}
          <div className="flex items-center gap-2" id="player-volume-block" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => { e.stopPropagation(); setVolume(volume > 0 ? 0 : 0.8); }}
              className="hover:text-white transition-colors cursor-pointer"
              id="player-volume-mute-btn"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={e => { e.stopPropagation(); setVolume(Number(e.target.value)); }}
              onClick={e => e.stopPropagation()}
              className="w-20 h-1 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-white outline-none"
              id="volume-input-range"
            />
          </div>
        </div>
      </div>

      {/* 2. Full Immersive Fullscreen Theater Overlay Mode */}
      {isFullscreen && (
        <div 
          id="theater-overlay-screen"
          className="fixed inset-0 z-50 bg-neutral-950 flex flex-col justify-between p-6 select-none overflow-hidden"
        >
          {/* Dynamic space nebulae backdrop effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FF3B5C]/10 blur-[130px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FF6B81]/10 blur-[130px] animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF3B5C]/5 blur-[150px]" />
          </div>

          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-solid border-white/5 pb-4 z-10" id="theater-header">
            <button 
              onClick={() => setIsFullscreen(false)}
              className="p-2.5 bg-white/5 hover:bg-white/10 active:scale-95 rounded-xl text-white border border-solid border-white/10 transition-all flex items-center justify-center cursor-pointer"
              id="close-theater-btn"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF3B5C] animate-pulse" />
              <p className="text-xs font-black tracking-widest text-neutral-400">RBH IMMERSIVE HIGH-FIDELITY</p>
            </div>

            <button 
              onClick={() => setIsSleepOpen(true)}
              className={`px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-solid border-white/10 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${sleepTimer !== null ? 'text-[#FF3B5C] border-[#FF3B5C]/30 bg-[#FF3B5C]/10' : 'text-neutral-300'}`}
              title="Sleep Timer"
            >
              <Clock className="w-4 h-4" />
              <span>{sleepTimer !== null ? `${sleepTimer}m` : 'Sleep Timer'}</span>
            </button>
          </div>

          {/* Immersive Contents (Album Art + Visualizer + Lyrics Sync) */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto w-full py-8 overflow-hidden z-10" id="theater-grid">
            
            {/* Left side: Massive rotating album cover + equalizers */}
            <div className="flex flex-col items-center justify-center text-center space-y-6" id="theater-left-panel">
              <div className="relative">
                {/* Glowing border ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF3B5C] to-[#FF6B81] blur-2xl opacity-40 animate-pulse" />
                <img 
                  src={currentTrack.coverUrl} 
                  alt={currentTrack.title} 
                  className={`w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-solid border-white/15 shadow-2xl relative ${isPlaying ? 'animate-spin-slow' : ''}`}
                />
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{currentTrack.title}</h2>
                <p className="text-sm text-[#FF3B5C] font-bold mt-1.5">{currentTrack.artistName}</p>
                <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">{currentTrack.albumName}</p>
              </div>

              {/* High precision visualizer wave */}
              <div className="w-full">
                <Visualizer isPlaying={isPlaying} type="full" equalizerPreset={equalizer} volumeMultiplier={volume} />
              </div>
            </div>

            {/* Right side: Synchronized lyrics panel or track queue */}
            <div className="h-full flex flex-col justify-between overflow-hidden p-4 bg-black/30 border border-solid border-white/5 rounded-2xl backdrop-blur-md relative" id="theater-right-panel">
              <div className="flex border-b border-solid border-white/5 pb-3 justify-between items-center mb-4">
                <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest">
                  {showQueueInPlayer ? 'Next In Queue' : 'Synced Lyrics'}
                </span>
                <button
                  onClick={() => setShowQueueInPlayer(!showQueueInPlayer)}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-solid border-white/5 rounded-lg text-[10px] font-bold text-neutral-300 transition-colors"
                >
                  {showQueueInPlayer ? 'View Lyrics' : 'View Queue'}
                </button>
              </div>

              {/* Mode A: Lyrics display */}
              {!showQueueInPlayer ? (
                <div className="flex-1 overflow-y-auto space-y-4 my-2 select-none scrollbar-none text-left" id="theater-lyrics-scroller">
                  {currentTrack.lyrics && currentTrack.lyrics.length > 0 ? (
                    currentTrack.lyrics.map((line, idx) => {
                      // Find active line
                      const isLineActive = progress >= line.time && (idx === currentTrack.lyrics!.length - 1 || progress < currentTrack.lyrics![idx + 1].time);
                      return (
                        <p
                          key={idx}
                          className={`text-lg md:text-xl font-extrabold transition-all duration-300 leading-relaxed cursor-pointer ${
                            isLineActive 
                              ? 'text-[#FF3B5C] scale-[1.02] drop-shadow-[0_0_16px_rgba(255,59,92,0.4)] font-black' 
                              : 'text-neutral-500 hover:text-neutral-400'
                          }`}
                          onClick={() => seek(line.time)}
                        >
                          {line.text}
                        </p>
                      );
                    })
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <Sparkles className="w-8 h-8 text-neutral-600 mb-2 animate-pulse" />
                      <p className="text-xs text-neutral-400">Synchronized lyrics not compiled. Press the AI Lyrics synchronizer in bottom player to align vocals.</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Mode B: Queue list */
                <div className="flex-1 overflow-y-auto space-y-2 pr-1" id="theater-queue-scroller">
                  {queue.slice(queueIndex + 1, queueIndex + 6).map((qTrack, qIdx) => (
                    <div key={qIdx} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-xl border border-solid border-transparent hover:border-white/5 text-left">
                      <div className="flex items-center gap-3">
                        <img src={qTrack.coverUrl} alt={qTrack.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white">{qTrack.title}</p>
                          <p className="text-[10px] text-neutral-400">{qTrack.artistName}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-bold">{formatTime(qTrack.duration)}</span>
                    </div>
                  ))}
                  {queue.length - queueIndex <= 1 && (
                    <p className="text-xs text-neutral-500 italic text-center py-8">Queue ends after this track</p>
                  )}
                </div>
              )}

              {/* Status details */}
              <div className="border-t border-solid border-white/5 pt-3 mt-4 text-left">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">RBH Digital Equalizer Preset</p>
                <div className="flex gap-2 items-center mt-2">
                  <span className="px-2 py-1 bg-[#FF3B5C]/10 border border-solid border-[#FF3B5C]/30 rounded text-[9px] text-[#FF3B5C] font-extrabold uppercase">
                    {equalizer} Preset shaping
                  </span>
                  {sleepTimer !== null && (
                    <span className="px-2 py-1 bg-[#FF3B5C]/10 border border-solid border-[#FF3B5C]/30 rounded text-[9px] text-[#FF3B5C] font-extrabold">
                      💤 Pausing in {sleepTimer}m
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Floating Controls Overlay (Theater Floor) */}
          <div className="border-t border-solid border-white/5 pt-6 z-10" id="theater-footer-controls">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto w-full">
              {/* Back button */}
              <div className="text-left w-full md:w-1/4">
                <p className="text-[10px] text-neutral-500 font-extrabold tracking-widest">PLAYING NOW</p>
                <p className="text-xs font-black text-white truncate max-w-xs">{currentTrack.title}</p>
              </div>

              {/* Center controls duplication */}
              <div className="flex flex-col items-center w-full md:w-2/4 gap-2">
                <div className="flex items-center gap-6">
                  <button onClick={toggleShuffle} className={`p-1.5 cursor-pointer ${shuffle ? 'text-[#FF3B5C]' : 'text-neutral-400 hover:text-white'}`}>
                    <Shuffle className="w-5 h-5" />
                  </button>
                  <button onClick={prevTrack} className="p-1.5 text-neutral-400 hover:text-white cursor-pointer">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button onClick={togglePlay} className="w-12 h-12 bg-white text-black hover:scale-105 active:scale-95 rounded-full flex items-center justify-center transition-all cursor-pointer">
                    {isPlaying ? <Pause className="w-6 h-6 text-black fill-black" /> : <Play className="w-6 h-6 text-black fill-black ml-0.5" />}
                  </button>
                  <button onClick={nextTrack} className="p-1.5 text-neutral-400 hover:text-white cursor-pointer">
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button onClick={toggleRepeat} className={`p-1.5 cursor-pointer ${repeat !== 'none' ? 'text-[#FF3B5C]' : 'text-neutral-400 hover:text-white'}`}>
                    <Repeat className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full max-w-xl">
                  <span className="text-[9px] text-neutral-400 font-extrabold">{formatTime(progress)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={progress}
                    onChange={e => seek(Number(e.target.value))}
                    className="flex-1 h-1 bg-white/10 hover:bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF3B5C] outline-none"
                  />
                  <span className="text-[9px] text-neutral-400 font-extrabold">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume dial */}
              <div className="flex items-center gap-3 justify-end w-full md:w-1/4">
                <button onClick={() => setVolume(volume > 0 ? 0 : 0.8)} className="text-neutral-400 hover:text-white cursor-pointer">
                  {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="w-24 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#FF3B5C] outline-none"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Auxiliary Modals backing player operations */}
      <LyricsModal isOpen={isLyricsOpen} onClose={() => setIsLyricsOpen(false)} track={currentTrack} progress={progress} />
      <SleepTimerModal isOpen={isSleepOpen} onClose={() => setIsSleepOpen(false)} />
      <EqualizerModal isOpen={isEqOpen} onClose={() => setIsEqOpen(false)} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} itemType="track" itemName={currentTrack.title} />
    </>
  );
};

// SVG icons
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
);
