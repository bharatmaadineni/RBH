/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Disc, Music, UserCheck, Play, Plus, ChevronRight, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LibraryPage: React.FC = () => {
  const { 
    tracks, 
    albums, 
    artists, 
    favorites, 
    savedAlbums, 
    followedArtists, 
    playTrack, 
    addToQueue, 
    toggleLikeTrack,
    toggleSaveAlbum,
    toggleFollowArtist
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tracks' | 'albums' | 'artists'>('tracks');

  const likedTracksList = tracks.filter(t => favorites.includes(t.id));
  const savedAlbumsList = albums.filter(a => savedAlbums.includes(a.id));
  const followedArtistsList = artists.filter(art => followedArtists.includes(art.id));

  return (
    <div id="library-view" className="space-y-6 pb-32 text-left p-6 overflow-y-auto h-full scrollbar-none">
      
      {/* Header Tabs Navigation */}
      <div className="flex border-b border-solid border-white/5 pb-2 justify-between items-end flex-wrap gap-4" id="library-header">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('tracks')}
            className={`text-lg font-black tracking-tight transition-all cursor-pointer ${
              activeTab === 'tracks' ? 'text-white border-b-2 border-solid border-cyan-400 pb-1.5' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Liked Songs
          </button>
          <button
            onClick={() => setActiveTab('albums')}
            className={`text-lg font-black tracking-tight transition-all cursor-pointer ${
              activeTab === 'albums' ? 'text-white border-b-2 border-solid border-cyan-400 pb-1.5' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Saved Albums
          </button>
          <button
            onClick={() => setActiveTab('artists')}
            className={`text-lg font-black tracking-tight transition-all cursor-pointer ${
              activeTab === 'artists' ? 'text-white border-b-2 border-solid border-cyan-400 pb-1.5' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Followed Artists
          </button>
        </div>
      </div>

      {/* 1. Liked Tracks list */}
      {activeTab === 'tracks' && (
        <div className="space-y-3" id="liked-tracks-list">
          {likedTracksList.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-neutral-700 mx-auto mb-4 animate-pulse" />
              <p className="text-sm font-bold text-neutral-300">Your liked catalog is empty</p>
              <p className="text-xs text-neutral-500 mt-1">Tap the heart icon on any track to save it here.</p>
            </div>
          ) : (
            likedTracksList.map((tr, idx) => (
              <div
                key={tr.id}
                className="flex items-center justify-between p-2.5 bg-neutral-900/30 hover:bg-white/5 border border-solid border-white/5 rounded-xl transition-all group"
                id={`liked-track-${tr.id}`}
              >
                <div className="flex items-center gap-4 text-left min-w-0 flex-1">
                  <span className="text-xs font-bold text-neutral-500 w-4">{idx + 1}</span>
                  <div className="relative flex-shrink-0">
                    <img src={tr.coverUrl} alt={tr.title} className="w-10 h-10 rounded-lg object-cover" />
                    <button
                      onClick={() => playTrack(tr, likedTracksList)}
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

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleLikeTrack(tr.id)}
                    className="p-1.5 text-rose-500 hover:text-neutral-400 transition-colors"
                    title="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </button>
                  <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/40 border border-solid border-cyan-500/20 px-2 py-0.5 rounded">
                    {Math.floor(tr.duration / 60)} min {(tr.duration % 60) < 10 ? '0' : ''}{tr.duration % 60} sec
                  </span>
                  <button
                    onClick={() => addToQueue(tr)}
                    className="p-1.5 hover:bg-white/5 rounded-lg text-neutral-500 hover:text-cyan-400 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. Saved Albums List */}
      {activeTab === 'albums' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6" id="saved-albums-grid">
          {savedAlbumsList.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <Disc className="w-12 h-12 text-neutral-700 mx-auto mb-4 animate-pulse" />
              <p className="text-sm font-bold text-neutral-300">No albums saved yet</p>
              <p className="text-xs text-neutral-500 mt-1">Visit an album details page to add one to your library.</p>
            </div>
          ) : (
            savedAlbumsList.map(alb => (
              <div
                key={alb.id}
                className="group cursor-pointer bg-neutral-900/30 hover:bg-white/5 p-4 border border-solid border-white/5 rounded-2xl text-left transition-all relative"
                id={`saved-album-${alb.id}`}
              >
                <div className="relative rounded-xl overflow-hidden aspect-square mb-3">
                  <img src={alb.coverUrl} alt={alb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const albTracks = tracks.filter(t => alb.tracks.includes(t.id));
                        if (albTracks.length > 0) playTrack(albTracks[0], albTracks);
                      }}
                      className="w-11 h-11 bg-cyan-400 text-black rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-xs text-white truncate">{alb.title}</h4>
                <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{alb.artistName}</p>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleSaveAlbum(alb.id); }}
                  className="absolute top-6 right-6 p-1.5 bg-black/60 rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove album"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. Followed Artists List */}
      {activeTab === 'artists' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6" id="followed-artists-grid">
          {followedArtistsList.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <UserCheck className="w-12 h-12 text-neutral-700 mx-auto mb-4 animate-pulse" />
              <p className="text-sm font-bold text-neutral-300">No followed artists</p>
              <p className="text-xs text-neutral-500 mt-1">Connect with musicians across Aura directories to build your collection.</p>
            </div>
          ) : (
            followedArtistsList.map(art => (
              <div
                key={art.id}
                className="group p-4 bg-neutral-900/30 hover:bg-white/5 rounded-2xl text-center border border-solid border-white/5 transition-all relative"
                id={`followed-artist-${art.id}`}
              >
                <img src={art.avatarUrl} alt={art.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border border-solid border-white/15" />
                <h4 className="font-bold text-xs text-white truncate">{art.name}</h4>
                <p className="text-[9px] text-neutral-500 mt-1 uppercase tracking-widest">{art.genres[0]}</p>

                <button
                  onClick={() => toggleFollowArtist(art.id)}
                  className="mt-3 px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-solid border-cyan-500/20 text-[10px] font-black text-cyan-400 rounded-lg transition-colors w-full"
                >
                  Following
                </button>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
