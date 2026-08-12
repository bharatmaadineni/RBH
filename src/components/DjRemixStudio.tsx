/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  FolderPlus,
  Sliders,
  Activity,
  RotateCcw,
  Music,
  Zap,
  Play,
  Pause
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Track } from '../types';

export const DjRemixStudio: React.FC = () => {
  const { 
    tracks, 
    currentTrack, 
    isPlaying,
    playTrack,
    togglePlay, 
    showToast 
  } = useApp();

  // Dual Song Decks State: Deck A & Deck B
  const [deckATrack, setDeckATrack] = useState<Track | null>(currentTrack || null);
  const [deckBTrack, setDeckBTrack] = useState<Track | null>(null);
  
  const [isTrackAMenuOpen, setIsTrackAMenuOpen] = useState<boolean>(false);
  const [isTrackBMenuOpen, setIsTrackBMenuOpen] = useState<boolean>(false);
  
  const [crossfader, setCrossfader] = useState<number>(50); // 0 = Deck A, 100 = Deck B

  // 7-Band Graphic Equalizer 1 (EQ 1 - Dedicated to Song Deck A)
  const [eq1Bands, setEq1Bands] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [pitchA, setPitchA] = useState<number>(0);

  // 7-Band Graphic Equalizer 2 (EQ 2 - Dedicated to Song Deck B)
  const [eq2Bands, setEq2Bands] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [pitchB, setPitchB] = useState<number>(0);

  const eqFrequencies = ['60Hz', '150Hz', '400Hz', '1kHz', '2.5kHz', '6.3kHz', '16kHz'];

  // Sync currentTrack if changed in main player to Deck A (if Deck A is empty)
  useEffect(() => {
    if (currentTrack && !deckATrack) {
      setDeckATrack(currentTrack);
    }
  }, [currentTrack]);

  // Deck A Play / Pause Controller
  const handleDeckAPlay = () => {
    if (!deckATrack) {
      if (tracks.length > 0) {
        setDeckATrack(tracks[0]);
        playTrack(tracks[0], tracks);
        showToast(`Playing Deck A: "${tracks[0].title}"`, 'success');
      } else {
        showToast('Load a song into Deck A first', 'info');
      }
      return;
    }

    if (currentTrack?.id === deckATrack.id) {
      togglePlay();
      showToast(isPlaying ? 'Paused Deck A' : `Playing Deck A: "${deckATrack.title}"`, 'info');
    } else {
      playTrack(deckATrack, tracks);
      showToast(`Playing Deck A: "${deckATrack.title}"`, 'success');
    }
  };

  // Deck B Play / Pause Controller
  const handleDeckBPlay = () => {
    if (!deckBTrack) {
      if (tracks.length > 0) {
        setDeckBTrack(tracks[0]);
        playTrack(tracks[0], tracks);
        showToast(`Playing Deck B: "${tracks[0].title}"`, 'success');
      } else {
        showToast('Load a song into Deck B first', 'info');
      }
      return;
    }

    if (currentTrack?.id === deckBTrack.id) {
      togglePlay();
      showToast(isPlaying ? 'Paused Deck B' : `Playing Deck B: "${deckBTrack.title}"`, 'info');
    } else {
      playTrack(deckBTrack, tracks);
      showToast(`Playing Deck B: "${deckBTrack.title}"`, 'success');
    }
  };

  // EQ 1 Band Handlers
  const handleEq1BandChange = (index: number, val: number) => {
    setEq1Bands(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const resetEq1 = () => {
    setEq1Bands([0, 0, 0, 0, 0, 0, 0]);
    showToast('Reset EQ 1 (Deck A) to Flat 0dB', 'info');
  };

  const applyEq1Preset = (presetName: string, bands: number[]) => {
    setEq1Bands(bands);
    showToast(`EQ 1 Preset: ${presetName}`, 'success');
  };

  // EQ 2 Band Handlers
  const handleEq2BandChange = (index: number, val: number) => {
    setEq2Bands(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const resetEq2 = () => {
    setEq2Bands([0, 0, 0, 0, 0, 0, 0]);
    showToast('Reset EQ 2 (Deck B) to Flat 0dB', 'info');
  };

  const applyEq2Preset = (presetName: string, bands: number[]) => {
    setEq2Bands(bands);
    showToast(`EQ 2 Preset: ${presetName}`, 'success');
  };

  const isDeckAPlaying = currentTrack?.id === deckATrack?.id && isPlaying;
  const isDeckBPlaying = currentTrack?.id === deckBTrack?.id && isPlaying;

  return (
    <div 
      className={`w-full min-h-screen text-white p-3 sm:p-5 select-none font-sans text-left pb-28 relative overflow-hidden transition-all duration-700 ${
        isPlaying ? 'rainbow-studio-bg-active' : 'bg-[#07070a]'
      }`} 
      id="dj-music-studio-horizontal-app"
    >
      <style>{`
        @keyframes rainbowStudioBgBlink {
          0% {
            background-color: #1a0508;
            box-shadow: inset 0 0 150px rgba(255, 0, 80, 0.3);
          }
          14% {
            background-color: #1a0f02;
            box-shadow: inset 0 0 150px rgba(255, 120, 0, 0.3);
          }
          28% {
            background-color: #1a1a02;
            box-shadow: inset 0 0 150px rgba(255, 230, 0, 0.3);
          }
          42% {
            background-color: #021a0d;
            box-shadow: inset 0 0 150px rgba(0, 255, 120, 0.3);
          }
          57% {
            background-color: #02141a;
            box-shadow: inset 0 0 150px rgba(0, 200, 255, 0.3);
          }
          71% {
            background-color: #0f021a;
            box-shadow: inset 0 0 150px rgba(150, 0, 255, 0.3);
          }
          85% {
            background-color: #1a0218;
            box-shadow: inset 0 0 150px rgba(255, 0, 200, 0.3);
          }
          100% {
            background-color: #1a0508;
            box-shadow: inset 0 0 150px rgba(255, 0, 80, 0.3);
          }
        }

        .rainbow-studio-bg-active {
          animation: rainbowStudioBgBlink 2.5s infinite linear;
        }
      `}</style>

      {/* Rainbow Ambient Background Blinking Lights */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-35">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500 blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      )}
      
      {/* TOP HEADER: "MY STUDIO" */}
      <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 mb-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
              <Headphones className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 uppercase">
              MY STUDIO
            </h1>
            <p className="text-[10px] sm:text-xs text-zinc-400 font-bold">Song Deck A (EQ 1) & Song Deck B (EQ 2) Dual Mixer</p>
          </div>
        </div>
      </div>

      {/* DUAL COLUMNS: LEFT (SONG DECK A + EQ 1) & RIGHT (SONG DECK B + EQ 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: SONG DECK A & EQ 1 (DECK A)                                */}
        {/* ======================================================================= */}
        <div className="flex flex-col gap-4">
          
          {/* SONG DECK A */}
          <div className="bg-[#121218] border border-amber-500/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div 
                  onClick={handleDeckAPlay}
                  className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0 cursor-pointer group relative overflow-hidden"
                  title={isDeckAPlaying ? 'Click to Pause Deck A' : 'Click to Play Deck A'}
                >
                  {deckATrack?.coverUrl ? (
                    <img src={deckATrack.coverUrl} alt={deckATrack.title} className="w-full h-full rounded-[10px] object-cover group-hover:opacity-60 transition-all" />
                  ) : (
                    <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                      <Music className="w-6 h-6 text-amber-400" />
                    </div>
                  )}
                  {/* Overlay Icon */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-[10px]">
                    {isDeckAPlaying ? (
                      <Pause className="w-6 h-6 text-white fill-white" />
                    ) : (
                      <Play className="w-6 h-6 text-amber-400 fill-amber-400 pl-0.5" />
                    )}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded uppercase">SONG DECK A</span>
                    {isDeckAPlaying ? (
                      <span className="text-[10px] font-extrabold text-emerald-400 flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        PLAYING
                      </span>
                    ) : deckATrack ? (
                      <span className="text-[10px] font-extrabold text-amber-300/80 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        READY / ON HOLD
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-sm font-black text-white truncate mt-0.5">
                    {deckATrack ? deckATrack.title : 'No Song Loaded'}
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-bold truncate">
                    {deckATrack ? `${deckATrack.movie} • ${deckATrack.artistName}` : 'Click "LOAD A" to select a song'}
                  </p>
                </div>
              </div>

              {/* Song Deck A Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={handleDeckAPlay}
                  className={`px-3 py-2 rounded-xl font-black text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                    isDeckAPlaying
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse'
                      : 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-black border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  }`}
                >
                  {isDeckAPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-black" />
                      <span>PAUSE A</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>PLAY A</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsTrackAMenuOpen(!isTrackAMenuOpen);
                    setIsTrackBMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border border-zinc-700"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>LOAD A</span>
                </button>
              </div>
            </div>

            {/* Song A Selection Drawer */}
            {isTrackAMenuOpen && (
              <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto">
                {tracks.map(t => (
                  <div
                    key={`deckA-${t.id}`}
                    onClick={() => {
                      setDeckATrack(t);
                      setIsTrackAMenuOpen(false);
                      showToast(`Loaded Deck A: "${t.title}" (Ready to Play)`, 'info');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-between gap-2 border ${
                      deckATrack?.id === t.id 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md' 
                        : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={t.coverUrl} alt={t.title} className="w-7 h-7 rounded-lg object-cover shrink-0" />
                      <div className="truncate">
                        <p className="truncate font-black text-white">{t.title}</p>
                        <p className="text-[9px] text-zinc-400 truncate">{t.artistName}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase shrink-0">
                      LOAD
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EQ 1 (SONG DECK A EQUALIZER) */}
          <div className="bg-[#121218] border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-xl min-h-[320px]">
            <div className="flex items-center justify-between bg-black/80 p-2.5 rounded-xl border border-zinc-800 mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">EQ 1 (SONG DECK A EQUALIZER)</span>
              </div>
              <button
                onClick={resetEq1}
                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer border border-zinc-700"
                title="Reset EQ 1 to Flat 0dB"
              >
                <RotateCcw className="w-3 h-3" />
                <span>FLAT</span>
              </button>
            </div>

            {/* Presets for EQ 1 */}
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
              {[
                { name: 'Bass Boost', label: 'BASS BOOST', values: [8, 6, 3, 1, 0, 0, 0] },
                { name: 'Vocal', label: 'VOCAL', values: [-2, 0, 4, 6, 5, 2, 0] },
                { name: 'Club EDM', label: 'CLUB EDM', values: [6, 4, 0, -2, 2, 5, 6] },
                { name: 'Sparkle', label: 'SPARKLE', values: [0, 0, -1, 1, 3, 7, 8] },
              ].map(p => (
                <button
                  key={`eq1-${p.name}`}
                  onClick={() => applyEq1Preset(p.name, p.values)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold cursor-pointer shrink-0 transition-all border bg-zinc-800 hover:bg-amber-950 hover:text-amber-300 text-zinc-300 border-zinc-700"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* 7-Band Vertical Faders for EQ 1 */}
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800/80 flex items-center justify-around gap-1 my-1">
              {eqFrequencies.map((freq, idx) => (
                <div key={`eq1-${freq}`} className="flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-amber-400">{eq1Bands[idx] > 0 ? `+${eq1Bands[idx]}` : eq1Bands[idx]}dB</span>
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={eq1Bands[idx]}
                    onChange={e => handleEq1BandChange(idx, Number(e.target.value))}
                    className="h-28 accent-amber-400 cursor-pointer"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                  />
                  <span className="text-[9px] font-extrabold text-zinc-400">{freq}</span>
                </div>
              ))}
            </div>

            {/* Spectrum Display for EQ 1 */}
            <div className="w-full bg-black/80 p-2 rounded-xl border border-zinc-800 flex items-center justify-between gap-1 h-12 px-3 mt-2">
              <span className="text-[9px] font-black text-amber-400 uppercase flex items-center gap-1">
                <Activity className="w-3 h-3 text-amber-400" />
                EQ 1 SPECTRUM (DECK A)
              </span>
              <div className="flex items-end gap-1 h-full py-1 w-full justify-around pl-2">
                {eq1Bands.map((val, i) => {
                  const baseH = 14 + (val + 12) * 1.5;
                  const dynamicH = Math.min(36, isDeckAPlaying ? baseH + Math.random() * 8 : baseH);
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

            {/* Pitch Slider for Deck A / EQ 1 */}
            <div className="flex items-center justify-between bg-black/70 p-2.5 rounded-xl border border-zinc-800 mt-3">
              <span className="text-[10px] font-black text-amber-400 uppercase">PITCH A (-)</span>
              <input
                type="range"
                min="-10"
                max="10"
                value={pitchA}
                onChange={e => setPitchA(Number(e.target.value))}
                className="w-1/2 h-2 accent-amber-400 cursor-pointer"
              />
              <span className="text-[10px] font-black text-amber-400 uppercase">(+) {pitchA > 0 ? `+${pitchA}` : pitchA}%</span>
            </div>
          </div>

        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: SONG DECK B & EQ 2 (DECK B)                               */}
        {/* ======================================================================= */}
        <div className="flex flex-col gap-4">
          
          {/* SONG DECK B */}
          <div className="bg-[#121218] border border-cyan-500/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div 
                  onClick={handleDeckBPlay}
                  className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-400 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0 cursor-pointer group relative overflow-hidden"
                  title={isDeckBPlaying ? 'Click to Pause Deck B' : 'Click to Play Deck B'}
                >
                  {deckBTrack?.coverUrl ? (
                    <img src={deckBTrack.coverUrl} alt={deckBTrack.title} className="w-full h-full rounded-[10px] object-cover group-hover:opacity-60 transition-all" />
                  ) : (
                    <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                      <Music className="w-6 h-6 text-cyan-400" />
                    </div>
                  )}
                  {/* Overlay Icon */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-[10px]">
                    {isDeckBPlaying ? (
                      <Pause className="w-6 h-6 text-white fill-white" />
                    ) : (
                      <Play className="w-6 h-6 text-cyan-400 fill-cyan-400 pl-0.5" />
                    )}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2 py-0.5 rounded uppercase">SONG DECK B</span>
                    {isDeckBPlaying ? (
                      <span className="text-[10px] font-extrabold text-cyan-400 flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        PLAYING
                      </span>
                    ) : deckBTrack ? (
                      <span className="text-[10px] font-extrabold text-cyan-300/80 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                        READY / ON HOLD
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-sm font-black text-white truncate mt-0.5">
                    {deckBTrack ? deckBTrack.title : 'No Song Loaded'}
                  </h2>
                  <p className="text-[11px] text-zinc-400 font-bold truncate">
                    {deckBTrack ? `${deckBTrack.movie} • ${deckBTrack.artistName}` : 'Click "LOAD B" to select a song'}
                  </p>
                </div>
              </div>

              {/* Song Deck B Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={handleDeckBPlay}
                  className={`px-3 py-2 rounded-xl font-black text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                    isDeckBPlaying
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse'
                      : 'bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-400 text-black border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  }`}
                >
                  {isDeckBPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-black" />
                      <span>PAUSE B</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>PLAY B</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsTrackBMenuOpen(!isTrackBMenuOpen);
                    setIsTrackAMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border border-zinc-700"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>LOAD B</span>
                </button>
              </div>
            </div>

            {/* Song B Selection Drawer */}
            {isTrackBMenuOpen && (
              <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto">
                {tracks.map(t => (
                  <div
                    key={`deckB-${t.id}`}
                    onClick={() => {
                      setDeckBTrack(t);
                      setIsTrackBMenuOpen(false);
                      showToast(`Loaded Deck B: "${t.title}" (Ready to Play)`, 'info');
                    }}
                    className={`p-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-between gap-2 border ${
                      deckBTrack?.id === t.id 
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md' 
                        : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={t.coverUrl} alt={t.title} className="w-7 h-7 rounded-lg object-cover shrink-0" />
                      <div className="truncate">
                        <p className="truncate font-black text-white">{t.title}</p>
                        <p className="text-[9px] text-zinc-400 truncate">{t.artistName}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 uppercase shrink-0">
                      LOAD
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EQ 2 (SONG DECK B EQUALIZER) */}
          <div className="bg-[#121218] border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-xl min-h-[320px]">
            <div className="flex items-center justify-between bg-black/80 p-2.5 rounded-xl border border-zinc-800 mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">EQ 2 (SONG DECK B EQUALIZER)</span>
              </div>
              <button
                onClick={resetEq2}
                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer border border-zinc-700"
                title="Reset EQ 2 to Flat 0dB"
              >
                <RotateCcw className="w-3 h-3" />
                <span>FLAT</span>
              </button>
            </div>

            {/* Presets for EQ 2 */}
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
              {[
                { name: 'Bass Boost', label: 'BASS BOOST', values: [8, 6, 3, 1, 0, 0, 0] },
                { name: 'Vocal', label: 'VOCAL', values: [-2, 0, 4, 6, 5, 2, 0] },
                { name: 'Club EDM', label: 'CLUB EDM', values: [6, 4, 0, -2, 2, 5, 6] },
                { name: 'Sparkle', label: 'SPARKLE', values: [0, 0, -1, 1, 3, 7, 8] },
              ].map(p => (
                <button
                  key={`eq2-${p.name}`}
                  onClick={() => applyEq2Preset(p.name, p.values)}
                  className="px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold cursor-pointer shrink-0 transition-all border bg-zinc-800 hover:bg-cyan-950 hover:text-cyan-300 text-zinc-300 border-zinc-700"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* 7-Band Vertical Faders for EQ 2 */}
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800/80 flex items-center justify-around gap-1 my-1">
              {eqFrequencies.map((freq, idx) => (
                <div key={`eq2-${freq}`} className="flex flex-col items-center gap-2">
                  <span className="text-[9px] font-bold text-cyan-400">{eq2Bands[idx] > 0 ? `+${eq2Bands[idx]}` : eq2Bands[idx]}dB</span>
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={eq2Bands[idx]}
                    onChange={e => handleEq2BandChange(idx, Number(e.target.value))}
                    className="h-28 accent-cyan-400 cursor-pointer"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                  />
                  <span className="text-[9px] font-extrabold text-zinc-400">{freq}</span>
                </div>
              ))}
            </div>

            {/* Spectrum Display for EQ 2 */}
            <div className="w-full bg-black/80 p-2 rounded-xl border border-zinc-800 flex items-center justify-between gap-1 h-12 px-3 mt-2">
              <span className="text-[9px] font-black text-cyan-400 uppercase flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                EQ 2 SPECTRUM (DECK B)
              </span>
              <div className="flex items-end gap-1 h-full py-1 w-full justify-around pl-2">
                {eq2Bands.map((val, i) => {
                  const baseH = 14 + (val + 12) * 1.5;
                  const dynamicH = Math.min(36, isDeckBPlaying ? baseH + Math.random() * 8 : baseH);
                  return (
                    <div
                      key={i}
                      className="w-3 bg-gradient-to-t from-cyan-400 via-teal-300 to-blue-500 rounded-t-sm transition-all duration-100"
                      style={{ height: `${dynamicH}px` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Pitch Slider for Deck B / EQ 2 */}
            <div className="flex items-center justify-between bg-black/70 p-2.5 rounded-xl border border-zinc-800 mt-3">
              <span className="text-[10px] font-black text-cyan-400 uppercase">PITCH B (-)</span>
              <input
                type="range"
                min="-10"
                max="10"
                value={pitchB}
                onChange={e => setPitchB(Number(e.target.value))}
                className="w-1/2 h-2 accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] font-black text-cyan-400 uppercase">(+) {pitchB > 0 ? `+${pitchB}` : pitchB}%</span>
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
              <span>DECK A (EQ 1)</span>
            </span>
            <span className="text-zinc-200 tracking-widest flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>MASTER CROSSFADER</span>
            </span>
            <span className="text-cyan-400 flex items-center gap-1">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>DECK B (EQ 2)</span>
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
            <div className="flex justify-between items-center text-[10px] font-extrabold mt-1 text-zinc-500">
              <span>{100 - crossfader}% DECK A</span>
              <span className="text-amber-400 font-black">CENTER 50 / 50</span>
              <span>{crossfader}% DECK B</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

