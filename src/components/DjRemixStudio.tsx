/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Headphones, 
  FolderPlus,
  Sliders,
  Activity,
  RotateCcw,
  Music,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Track } from '../types';

export const DjRemixStudio: React.FC = () => {
  const { 
    tracks, 
    currentTrack, 
    isPlaying, 
    volume,
    setVolume,
    isFullBass,
    toggleFullBass,
    setEqualizer,
    showToast 
  } = useApp();

  // Selected Track State (Total named as SONG)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(currentTrack || tracks[0] || null);
  const [isTrackMenuOpen, setIsTrackMenuOpen] = useState<boolean>(false);
  const [crossfader, setCrossfader] = useState<number>(50); // 0 = Left, 100 = Right
  const [pitchValue, setPitchValue] = useState<number>(0);

  // 7-Band Graphic Equalizer (EQ 1) Bands in dB (-12dB to +12dB)
  const [eqBands, setEqBands] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [isSubBassActive, setIsSubBassActive] = useState<boolean>(false);
  const eqFrequencies = ['60Hz', '150Hz', '400Hz', '1kHz', '2.5kHz', '6.3kHz', '16kHz'];

  // Sync currentTrack if changed in app
  useEffect(() => {
    if (currentTrack) {
      setSelectedTrack(currentTrack);
    }
  }, [currentTrack]);

  const handleBandChange = (index: number, val: number) => {
    setEqBands(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const resetEq1 = () => {
    setEqBands([0, 0, 0, 0, 0, 0, 0]);
    setIsSubBassActive(false);
    showToast('Reset EQ 1 & Connected EQ 2 to Flat 0dB', 'info');
  };

  const applyEq1Preset = (presetName: string, bands: number[]) => {
    setEqBands(bands);
    if (presetName === 'Sub Bass') {
      setIsSubBassActive(true);
      if (!isFullBass) {
        toggleFullBass();
      }
      setEqualizer('fullbass');
      
      // Trigger haptic vibration if supported on device
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([150, 50, 150, 50, 300]);
        } catch (e) {
          // ignore
        }
      }
      showToast('🔥 SUB BASS ACTIVATED ON EQ 1 & EQ 2!', 'success');
    } else {
      setIsSubBassActive(false);
      showToast(`EQ 1 Preset Applied: ${presetName} (Synced to EQ 2)`, 'success');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#07070a] text-white p-3 sm:p-5 select-none font-sans text-left pb-28" id="dj-music-studio-horizontal-app">
      
      {/* TOP HEADER: "DJ Music Studio & Dual Connected EQ Console" */}
      <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 mb-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
              <Headphones className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 uppercase">
              DJ Music Studio & Dual Connected EQ Console
            </h1>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-bold">Pro Remix Console & Synchronized Graphic Equalizers</p>
          </div>
        </div>

        {/* Master Control Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleFullBass}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
              isFullBass
                ? 'bg-gradient-to-r from-[#FF3B5C] to-rose-600 text-white border-rose-400 shadow-[0_0_20px_rgba(255,59,92,0.7)] animate-pulse'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
            title="Toggle Full Bass Boost Version (+18dB Subwoofer Gain)"
          >
            <span>🔥</span>
            <span className="hidden sm:inline">FULL BASS</span>
          </button>

          <button
            onClick={() => setVolume(volume >= 2.5 ? 1.0 : 2.5)}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
              volume > 1.0
                ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.8)]'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
            title="Toggle 250% Maximum Volume Boost"
          >
            <Volume2 className="w-4 h-4" />
            <span>{Math.round(volume * 100)}% {volume > 1.0 ? 'BOOST 🔥' : ''}</span>
          </button>
        </div>
      </div>

      {/* TOP SONG HEADER / SELECTION (TOTAL NAMED AS SONG) */}
      <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4 shadow-xl mb-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
              {selectedTrack?.coverUrl ? (
                <img src={selectedTrack.coverUrl} alt={selectedTrack.title} className="w-full h-full rounded-[10px] object-cover" />
              ) : (
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <Music className="w-6 h-6 text-amber-400" />
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded uppercase">SONG DECK</span>
                {isPlaying && (
                  <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    PLAYING
                  </span>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-black text-white truncate mt-0.5">
                {selectedTrack ? selectedTrack.title : 'No Song Loaded'}
              </h2>
              <p className="text-xs text-zinc-400 font-bold truncate">
                {selectedTrack ? `${selectedTrack.movie} • ${selectedTrack.artistName}` : 'Select a song from library'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackMenuOpen(!isTrackMenuOpen)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 border border-amber-300"
          >
            <FolderPlus className="w-4 h-4" />
            <span>LOAD SONG</span>
          </button>
        </div>

        {/* Song Selection Menu Drawer */}
        {isTrackMenuOpen && (
          <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {tracks.map(t => (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTrack(t);
                  setIsTrackMenuOpen(false);
                  showToast(`Loaded Song: "${t.title}"`, 'success');
                }}
                className={`p-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 border ${
                  selectedTrack?.id === t.id 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md' 
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                }`}
              >
                <img src={t.coverUrl} alt={t.title} className="w-8 h-8 rounded-lg object-cover" />
                <div className="truncate">
                  <p className="truncate font-black text-white">{t.title}</p>
                  <p className="text-[10px] text-zinc-400 truncate">{t.artistName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DUAL EQUALIZERS CONSOLE: EQ 1 & EQ 2 CONNECTED HORIZONTALLY */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 bg-[#0d0d12] border-2 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300 ${
        isSubBassActive && isPlaying 
          ? 'border-rose-500/80 shadow-[0_0_40px_rgba(244,63,94,0.4)]' 
          : 'border-zinc-800'
      }`}>
        
        {/* ======================================================================= */}
        {/* 1. LEFT PANEL: STUDIO GRAPHIC EQUALIZER 1 (EQ 1)                          */}
        {/* ======================================================================= */}
        <div className="bg-[#121218] border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-xl min-h-[320px]">
          
          <div className="flex items-center justify-between bg-black/80 p-2.5 rounded-xl border border-zinc-800 mb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">EQ 1 (STUDIO GRAPHIC EQUALIZER)</span>
            </div>
            <button
              onClick={resetEq1}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer border border-zinc-700"
              title="Reset EQ 1 & EQ 2 to Flat 0dB"
            >
              <RotateCcw className="w-3 h-3" />
              <span>FLAT</span>
            </button>
          </div>

          {isSubBassActive && (
            <div className="flex items-center justify-between bg-gradient-to-r from-rose-950 via-amber-950 to-rose-950 border border-rose-500/60 p-2 rounded-xl text-rose-300 text-[10px] font-black uppercase tracking-wider mb-2 animate-pulse">
              <span className="flex items-center gap-1">
                <span>📳 BASS VIBRATION: ON</span>
              </span>
              <span className="text-[9px] text-amber-300 font-extrabold">ACTIVE</span>
            </div>
          )}

          {/* Quick Presets for EQ 1 */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
            {[
              { 
                name: 'Sub Bass', 
                label: '🔥 SUB BASS',
                values: [12, 10, 5, 6, 5, 2, 3] 
              },
              { name: 'Vocal', label: 'VOCAL', values: [-2, 0, 4, 6, 5, 2, 0] },
              { name: 'Club EDM', label: 'CLUB EDM', values: [6, 4, 0, -2, 2, 5, 6] },
              { name: 'Sparkle', label: 'SPARKLE', values: [0, 0, -1, 1, 3, 7, 8] },
            ].map(p => (
              <button
                key={p.name}
                onClick={() => applyEq1Preset(p.name, p.values)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold cursor-pointer shrink-0 transition-all border ${
                  p.name === 'Sub Bass' && isSubBassActive
                    ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse'
                    : 'bg-zinc-800 hover:bg-amber-950 hover:text-amber-300 text-zinc-300 border-zinc-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* 7-Band Vertical Fader Sliders for EQ 1 */}
          <div className="bg-black/60 p-3 rounded-xl border border-zinc-800/80 flex items-center justify-around gap-1 my-1">
            {eqFrequencies.map((freq, idx) => (
              <div key={freq} className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-bold text-amber-400">{eqBands[idx] > 0 ? `+${eqBands[idx]}` : eqBands[idx]}dB</span>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="1"
                  value={eqBands[idx]}
                  onChange={e => handleBandChange(idx, Number(e.target.value))}
                  className="h-28 accent-amber-400 cursor-pointer"
                  style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                />
                <span className="text-[9px] font-extrabold text-zinc-400">{freq}</span>
              </div>
            ))}
          </div>

          {/* Animated Spectrum Display for EQ 1 */}
          <div className="w-full bg-black/80 p-2 rounded-xl border border-zinc-800 flex items-center justify-between gap-1 h-12 px-3 mt-2">
            <span className="text-[9px] font-black text-amber-400 uppercase flex items-center gap-1">
              <Activity className="w-3 h-3 text-amber-400" />
              EQ 1 OUTPUT
            </span>
            <div className="flex items-end gap-1 h-full py-1 w-full justify-around pl-2">
              {eqBands.map((val, i) => {
                const baseH = 14 + (val + 12) * 1.5;
                const dynamicH = Math.min(36, isPlaying ? baseH + Math.random() * 8 : baseH);
                return (
                  <div
                    key={i}
                    className="w-3 bg-gradient-to-t from-cyan-500 via-amber-400 to-rose-500 rounded-t-sm transition-all duration-100"
                    style={{ height: `${dynamicH}px` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Pitch Slider Bar for EQ 1 */}
          <div className="flex items-center justify-between bg-black/70 p-2.5 rounded-xl border border-zinc-800 mt-3">
            <span className="text-[10px] font-black text-amber-400 uppercase">PITCH (-)</span>
            <input
              type="range"
              min="-10"
              max="10"
              value={pitchValue}
              onChange={e => setPitchValue(Number(e.target.value))}
              className="w-1/2 h-2 accent-amber-400 cursor-pointer"
            />
            <span className="text-[10px] font-black text-amber-400 uppercase">(+) {pitchValue > 0 ? `+${pitchValue}` : pitchValue}%</span>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* 2. RIGHT PANEL: EQ 2 (CONNECTED DIRECTLY TO EQ 1 IN REAL-TIME)           */}
        {/* ======================================================================= */}
        <div className="bg-[#121218] border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-xl min-h-[320px]">
          
          <div className="flex items-center justify-between bg-black/80 p-2.5 rounded-xl border border-zinc-800 mb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-black text-yellow-400 uppercase tracking-wider">EQ 2 (CONNECTED MASTER EQUALIZER)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 border border-amber-400/50 text-amber-300 rounded-lg text-[10px] font-extrabold">
              <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>CONNECTED TO EQ 1</span>
            </div>
          </div>

          {/* Connected Real-Time EQ 2 Mirror Band Displays */}
          <div className="bg-black/60 p-3 rounded-xl border border-zinc-800/80 flex items-center justify-around gap-1 my-1">
            {eqFrequencies.map((freq, idx) => {
              const value = eqBands[idx]; // DIRECT CONNECTION TO EQ 1!
              return (
                <div key={freq} className="flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-yellow-400">{value > 0 ? `+${value}` : value}dB</span>
                  {/* Mirror Fader Bar (Synchronized with EQ 1) */}
                  <div className="h-28 w-4 bg-zinc-900 border border-zinc-800 rounded-full p-0.5 flex flex-col-reverse justify-start items-center relative overflow-hidden">
                    <div 
                      className="w-full bg-gradient-to-t from-amber-500 to-yellow-300 rounded-sm transition-all duration-200"
                      style={{ height: `${((value + 12) / 24) * 100}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-extrabold text-zinc-400">{freq}</span>
                </div>
              );
            })}
          </div>

          {/* Connected 28-Band Master Frequency Spectrum Bar for EQ 2 */}
          <div className="w-full bg-black/60 p-3 rounded-xl border border-zinc-800 flex flex-col justify-between h-36 px-3 my-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-amber-400 uppercase flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                EQ 2 SPECTRUM (SYNCED TO EQ 1)
              </span>
              <span className="text-[9px] font-bold text-zinc-400">28 BANDS LIVE</span>
            </div>
            <div className="flex items-end gap-1 h-full py-1 w-full justify-around">
              {Array.from({ length: 28 }).map((_, i) => {
                // Map each bar to one of the 7 EQ1 bands (4 bars per band group)
                const bandIndex = Math.min(6, Math.floor(i / 4));
                const bandGain = eqBands[bandIndex];
                const baseH = 12 + ((bandGain + 12) / 24) * 28;
                const dynamicH = isPlaying 
                  ? Math.min(50, Math.max(6, baseH + Math.sin(i * 0.5) * 12 + Math.random() * 8))
                  : Math.max(6, baseH);

                return (
                  <div
                    key={i}
                    className="w-2 bg-gradient-to-t from-cyan-500 via-amber-400 to-rose-500 rounded-t-sm transition-all duration-100"
                    style={{ height: `${dynamicH}px` }}
                  />
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* MASTER CROSSFADER */}
      <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4 shadow-2xl mt-4 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          
          <div className="flex items-center justify-between text-xs font-black uppercase text-zinc-400">
            <span className="text-amber-400 flex items-center gap-1">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>EQ 1</span>
            </span>
            <span className="text-amber-400 tracking-widest flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>CONNECTED MASTER CROSSFADER</span>
            </span>
            <span className="text-yellow-400 flex items-center gap-1">
              <Sliders className="w-4 h-4 text-yellow-400" />
              <span>EQ 2</span>
            </span>
          </div>

          {/* Crossfader Bar */}
          <div className="bg-black/90 p-3 rounded-xl border border-zinc-800 shadow-inner">
            <input
              type="range"
              min="0"
              max="100"
              value={crossfader}
              onChange={e => setCrossfader(Number(e.target.value))}
              className="w-full h-3 accent-amber-400 cursor-pointer"
            />
          </div>

        </div>
      </div>

    </div>
  );
};
