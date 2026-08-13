/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Play, Plus, SlidersHorizontal, Heart, Disc, Music } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_GENRES } from '../data/mockDb';
import { Track } from '../types';

export const SearchPage: React.FC = () => {
  const { 
    tracks, 
    albums, 
    artists, 
    playlists, 
    playTrack, 
    addToQueue, 
    favorites, 
    toggleLikeTrack,
    followedArtists,
    toggleFollowArtist,
    activeParams
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filterType, setFilterType] = useState<'all' | 'songs' | 'albums' | 'artists' | 'playlists'>('all');

  // Handle cross-navigation genre filters
  useEffect(() => {
    if (activeParams) {
      if (activeParams.query) {
        setQuery(activeParams.query);
      }
      if (activeParams.activeGenre) {
        setSelectedGenre(activeParams.activeGenre);
      }
    }
  }, [activeParams]);

  // Live filter results
  const filteredTracks = tracks.filter(t => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return selectedGenre === 'All' || t.genre.toLowerCase() === selectedGenre.toLowerCase();
    }

    const matchesDirect = 
      t.title.toLowerCase().includes(q) || 
      t.artistName.toLowerCase().includes(q) ||
      (t.albumName && t.albumName.toLowerCase().includes(q)) ||
      (t.genre && t.genre.toLowerCase().includes(q));

    const isDevaraQuery = q.includes('devara') || q.includes('devra');
    const isDevaraTrack = 
      t.id.startsWith('tr_devara') || 
      (t.albumName && t.albumName.toLowerCase().includes('devara')) ||
      ['fear', 'all hail the tiger', 'chuttamalle', 'red sea'].some(name => t.title.toLowerCase().includes(name));

    const isDhurandharQuery = 
      q.includes('dhurandhar') || 
      q.includes('dhurander') || 
      q.includes('dhurandar') || 
      q.includes('dhurandher') ||
      q.includes('durandhar') ||
      q.includes('durander');

    const dhurandharTrackIds = [
      'tr_didi', 'tr_phir_se', 'tr_aakhri_ishq', 'tr_aari_aari', 
      'tr_jaan_se_guzarte_hain', 'tr_jaiye_sanjana', 'tr_main_aur_tu', 
      'tr_mann_atkeya', 'tr_vaari_jaavan', 'tr_wild_ride',
      'tr_rang_de_lal', 'tr_hum_pyaar', 'tr_shararat'
    ];

    const isDhurandharTrack = 
      dhurandharTrackIds.includes(t.id) ||
      (t.albumName && t.albumName.toLowerCase().includes('dhurandhar')) ||
      ['didi', 'phir se', 'aakhri ishq', 'aari aari', 'jaan se', 'jaiye', 'jayiye', 'main aur', 'vaari jaavan', 'wild ride', 'mann atkeya', 'rang de lal', 'hum pyaar', 'shararat'].some(name => t.title.toLowerCase().includes(name));

    const matchesQuery = matchesDirect || (isDevaraQuery && isDevaraTrack) || (isDhurandharQuery && isDhurandharTrack);
    const matchesGenre = selectedGenre === 'All' || t.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesQuery && matchesGenre;
  });

  const filteredAlbums = albums.filter(a => {
    const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase()) || a.artistName.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || a.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesQuery && matchesGenre;
  });

  const filteredArtists = artists.filter(art => {
    const matchesQuery = art.name.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || art.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase());
    return matchesQuery && matchesGenre;
  });

  const filteredPlaylists = playlists.filter(p => {
    return p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
  });

  // Color map for aesthetic genre cards
  const genreColors = [
    'from-cyan-500 to-blue-600 shadow-[0_4px_16px_rgba(6,182,212,0.25)]',
    'from-violet-500 to-purple-600 shadow-[0_4px_16px_rgba(139,92,246,0.25)]',
    'from-pink-500 to-rose-600 shadow-[0_4px_16px_rgba(236,72,153,0.25)]',
    'from-amber-400 to-orange-500 shadow-[0_4px_16px_rgba(245,158,11,0.25)]',
    'from-emerald-400 to-teal-500 shadow-[0_4px_16px_rgba(16,185,129,0.25)]',
    'from-blue-600 to-indigo-700 shadow-[0_4px_16px_rgba(37,99,235,0.25)]',
  ];

  return (
    <div id="search-view" className="space-y-6 pb-32 text-left p-6 overflow-y-auto h-full scrollbar-none">
      
      {/* Search Input Bar */}
      <div className="relative w-full max-w-xl" id="search-bar-block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search songs, artists, albums, playlists..."
          className="w-full pl-12 pr-4 py-3 bg-neutral-900/50 border border-solid border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-cyan-500 focus:bg-neutral-900/90 transition-all"
        />
      </div>

      {/* Filter Chips Type selector */}
      <div className="flex flex-wrap gap-2 items-center" id="search-filter-chips">
        <SlidersHorizontal className="w-4 h-4 text-neutral-500 mr-1" />
        
        {(['all', 'songs', 'albums', 'artists', 'playlists'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-solid transition-all cursor-pointer ${
              filterType === type
                ? 'bg-cyan-500 text-black border-cyan-500 font-extrabold'
                : 'bg-white/5 border-transparent text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Main Filter Results block */}
      {query.trim() !== '' || selectedGenre !== 'All' ? (
        <div className="space-y-8" id="search-results-list">
          
          {/* Songs results */}
          {(filterType === 'all' || filterType === 'songs') && filteredTracks.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400">Tracks Matches</h3>
              <div className="space-y-2">
                {filteredTracks.map(tr => {
                  const isLiked = favorites.includes(tr.id);
                  return (
                    <div
                      key={tr.id}
                      className="flex items-center justify-between p-2.5 bg-neutral-900/30 hover:bg-white/5 border border-solid border-white/5 rounded-xl transition-all group"
                      id={`search-track-${tr.id}`}
                    >
                      <div className="flex items-center gap-3 text-left min-w-0 flex-1">
                        <div className="relative flex-shrink-0">
                          <img src={tr.coverUrl} alt={tr.title} className="w-10 h-10 rounded-lg object-cover" />
                          <button
                            onClick={() => playTrack(tr, filteredTracks)}
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
                          className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors ${isLiked ? 'text-rose-500' : 'text-neutral-500 hover:text-white'}`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                        </button>
                        <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/40 border border-solid border-cyan-500/20 px-2 py-0.5 rounded">
                          {Math.floor(tr.duration / 60)} min {(tr.duration % 60) < 10 ? '0' : ''}{tr.duration % 60} sec
                        </span>
                        <button
                          onClick={() => addToQueue(tr)}
                          className="p-1.5 hover:bg-white/5 rounded-lg text-neutral-500 hover:text-cyan-400 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Albums results */}
          {(filterType === 'all' || filterType === 'albums') && filteredAlbums.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400">Album Matches</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredAlbums.map(alb => (
                  <div
                    key={alb.id}
                    onClick={() => {
                      const albTracks = tracks.filter(t => alb.tracks.includes(t.id));
                      if (albTracks.length > 0) playTrack(albTracks[0], albTracks);
                    }}
                    className="group cursor-pointer p-4 bg-neutral-900/30 hover:bg-white/5 rounded-2xl text-left border border-solid border-transparent hover:border-white/5 transition-all"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                      <img src={alb.coverUrl} alt={alb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-8 h-8 text-cyan-400 fill-cyan-400" />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-white line-clamp-1 truncate">{alb.title}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{alb.artistName}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Artists results */}
          {(filterType === 'all' || filterType === 'artists') && filteredArtists.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400">Artists Matches</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredArtists.map(art => {
                  const isFollowing = followedArtists.includes(art.id);
                  return (
                    <div
                      key={art.id}
                      className="p-4 bg-neutral-900/30 rounded-2xl text-center border border-solid border-transparent hover:border-white/5 hover:bg-white/5 transition-all"
                    >
                      <img src={art.avatarUrl} alt={art.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border border-solid border-white/10" />
                      <p className="text-xs font-bold text-white truncate">{art.name}</p>
                      <p className="text-[9px] text-neutral-500 mt-0.5 uppercase tracking-wider">{art.genres[0]}</p>
                      <button
                        onClick={() => toggleFollowArtist(art.id)}
                        className={`mt-3 px-3 py-1 text-[10px] font-black rounded-lg transition-colors w-full cursor-pointer ${
                          isFollowing 
                            ? 'bg-cyan-500/10 border border-solid border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20' 
                            : 'bg-white/10 border border-solid border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Playlists results */}
          {(filterType === 'all' || filterType === 'playlists') && filteredPlaylists.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-neutral-400">Playlist Matches</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredPlaylists.map(pl => (
                  <div
                    key={pl.id}
                    className="p-4 bg-neutral-900/30 rounded-2xl text-left border border-solid border-transparent hover:border-white/5 hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <img src={pl.coverUrl} alt={pl.name} className="w-full aspect-square rounded-xl object-cover mb-3" />
                    <p className="text-xs font-bold text-white truncate">{pl.name}</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5 truncate line-clamp-1">{pl.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredTracks.length === 0 && filteredAlbums.length === 0 && filteredArtists.length === 0 && (
            <div className="text-center py-12">
              <Music className="w-10 h-10 text-neutral-600 mx-auto mb-3 animate-pulse" />
              <p className="text-xs text-neutral-400 font-bold">No exact matches found inside Aura catalog</p>
              <button
                onClick={() => { setQuery(''); setSelectedGenre('All'); }}
                className="mt-3 px-4 py-1.5 bg-white/5 border border-solid border-white/10 rounded-lg text-[10px] font-bold text-neutral-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Genre Cards Explorer Panel (Shown when search is empty) */
        <div className="space-y-6" id="genre-explorer-panel">
          <div className="flex items-center justify-between border-b border-solid border-white/5 pb-2">
            <h3 className="text-lg font-black text-white font-serif">Explore Music Genres</h3>
            <span className="text-[10px] text-neutral-400 font-bold">12 acoustic genres</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {MOCK_GENRES.filter(g => g !== 'All').map((genre, idx) => {
              const bgGradient = genreColors[idx % genreColors.length];
              return (
                <div
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${bgGradient} text-left cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden h-28 group`}
                  id={`genre-block-${genre.toLowerCase().replace(/ /g, '-')}`}
                >
                  <p className="text-sm font-extrabold text-black uppercase tracking-widest relative z-10">{genre}</p>
                  
                  {/* Absolute positioning background element simulation */}
                  <Disc className="absolute right-[-15px] bottom-[-15px] w-20 h-20 text-black/10 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
