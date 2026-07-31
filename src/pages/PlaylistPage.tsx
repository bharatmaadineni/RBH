/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, Edit, Play, Share2, Shuffle,
  Lock, Eye, Users, Music, Clock 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PlaylistCreateModal, ShareModal } from '../components/Modals';

export const PlaylistPage: React.FC = () => {
  const { 
    activeParams, 
    playlists, 
    tracks, 
    playTrack, 
    shufflePlay,
    navigate
  } = useApp();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Retrieve selected playlist from params
  const playlistId = activeParams?.playlistId;
  const playlist = playlists.find(p => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-400 p-6">
        <Music className="w-12 h-12 text-neutral-600 mb-4 animate-pulse" />
        <h3 className="font-extrabold text-sm text-neutral-200">Playlist not found</h3>
        <p className="text-xs text-neutral-500 mt-1">This directory node does not exist or has been deleted.</p>
        <button onClick={() => navigate('home')} className="mt-4 px-4 py-2 bg-white/5 border border-solid border-white/10 rounded-xl text-xs font-bold text-white">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const isFavouriteMusic = playlist.id === 'pl_dm1' || playlist.name.toUpperCase().includes('FAVOURITE') || playlist.name.toUpperCase().includes('FAVORITE');

  const plTracks = tracks.filter(t => playlist.tracks.includes(t.id));

  // Compute total duration
  const totalDurationSec = plTracks.reduce((sum, t) => sum + t.duration, 0);
  const totalMins = Math.floor(totalDurationSec / 60);
  const totalSecs = totalDurationSec % 60;

  const formatMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m} min ${s < 10 ? '0' : ''}${s} sec`;
  };

  return (
    <div id="playlist-view" className="space-y-6 pb-32 text-left p-6 overflow-y-auto h-full scrollbar-none">
      
      {/* 1. Header Information Block */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-neutral-900/40 border border-solid border-white/5 rounded-3xl" id="playlist-overview-banner">
        <img src={playlist.coverUrl} alt={playlist.name} className="w-40 h-40 rounded-2xl object-cover border border-solid border-white/15" />
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400">Custom Compilation</span>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">{playlist.name}</h2>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">{playlist.description}</p>
          
          <div className="flex items-center gap-3 justify-center md:justify-start pt-2 flex-wrap text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
            <span>{plTracks.length} tracks loaded</span>
            {!isFavouriteMusic && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                <span className="flex items-center gap-1 text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{totalMins} min {totalSecs < 10 ? '0' : ''}{totalSecs} sec total</span>
                </span>
              </>
            )}
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span className="flex items-center gap-1">
              {playlist.isPublic ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3.5 h-3.5 text-rose-400" />}
              <span>{playlist.isPublic ? 'Public Playlist' : 'Private Playlist'}</span>
            </span>
            {playlist.isCollaborative && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                <span className="flex items-center gap-1 text-violet-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>Collaborative</span>
                </span>
              </>
            )}
          </div>

          {/* Controls button ribbon */}
          <div className="flex gap-2.5 pt-4 justify-center md:justify-start">
            {plTracks.length > 0 && (
              <>
                <button
                  onClick={() => playTrack(plTracks[0], plTracks)}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 text-black fill-black" />
                  <span>Play All</span>
                </button>
                <button
                  onClick={() => shufflePlay(plTracks)}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-transform hover:scale-105 border border-solid border-white/10"
                >
                  <Shuffle className="w-4 h-4 text-white" />
                  <span>Shuffle</span>
                </button>
              </>
            )}

            {playlist.id !== 'pl_dm1' && playlist.createdBy !== 'system' && (
              <button
                onClick={() => setIsEditOpen(true)}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-solid border-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors"
                title="Edit Playlist Settings"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsShareOpen(true)}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-solid border-white/10 rounded-xl text-neutral-400 hover:text-cyan-400 transition-colors"
              title="Share QR Code"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Track List Grid */}
      <section className="space-y-4" id="playlist-tracklist-section">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400 border-b border-solid border-white/5 pb-2">Tracklist</h3>

        {plTracks.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900/20 rounded-2xl border border-solid border-dashed border-white/5">
            <Music className="w-8 h-8 text-neutral-700 mx-auto mb-2 animate-pulse" />
            <p className="text-xs text-neutral-500 italic">No songs loaded inside this compilation yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {plTracks.map((tr, idx) => (
              <div
                key={tr.id}
                className="flex items-center justify-between p-2.5 bg-neutral-900/30 hover:bg-white/5 border border-solid border-white/5 rounded-xl transition-all group"
                id={`playlist-track-${tr.id}`}
              >
                <div className="flex items-center gap-3 text-left min-w-0 flex-1">
                  <span className="text-xs font-bold text-neutral-500 w-4">{idx + 1}</span>
                  <div className="relative flex-shrink-0">
                    <img src={tr.coverUrl} alt={tr.title} className="w-10 h-10 rounded-lg object-cover" />
                    <button
                      onClick={() => playTrack(tr, plTracks)}
                      className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-5 h-5 text-cyan-400 fill-cyan-400 ml-0.5" />
                    </button>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate flex items-center gap-1">
                      {tr.title}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5">{tr.artistName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  {!isFavouriteMusic && (
                    <div className="flex items-center gap-2">
                      {/* Duration badge: Exact Minutes and Seconds */}
                      <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 bg-cyan-950/40 border border-solid border-cyan-500/20 px-2.5 py-1 rounded-lg shrink-0">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{formatMinSec(tr.duration)}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal overlays */}
      <PlaylistCreateModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} editingPlaylist={playlist} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} itemType="playlist" itemName={playlist.name} />

    </div>
  );
};
