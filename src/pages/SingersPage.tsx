/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Search, UserCheck, UserPlus, Sparkles, Music, Star, Play, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Artist } from '../types';

export const SingersPage: React.FC = () => {
  const { 
    artists, 
    followedArtists, 
    toggleFollowArtist, 
    setShowFavoriteSingersModal,
    navigate,
    tracks,
    playTrack
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'telugu' | 'tamil' | 'composers' | 'following'>('all');

  // Filter singers
  const filteredSingers = artists.filter(singer => {
    // Search query filter
    const matchesSearch = singer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      singer.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'following') {
      return followedArtists.includes(singer.id);
    }
    if (selectedFilter === 'telugu') {
      return singer.genres.some(g => g.toLowerCase().includes('telugu') || g.toLowerCase().includes('carnatic'));
    }
    if (selectedFilter === 'tamil') {
      return singer.genres.some(g => g.toLowerCase().includes('tamil') || g.toLowerCase().includes('kollywood'));
    }
    if (selectedFilter === 'composers') {
      return singer.genres.some(g => g.toLowerCase().includes('composer') || g.toLowerCase().includes('film score'));
    }

    return true;
  });

  const handlePlaySingerPopularTrack = (singer: Artist) => {
    // Find track matching singer name or artist
    const match = tracks.find(t => 
      t.artistName.toLowerCase().includes(singer.name.toLowerCase()) || 
      t.title.toLowerCase().includes(singer.name.toLowerCase())
    );
    if (match) {
      playTrack(match);
    } else {
      // Navigate to search with singer name
      navigate('search', { query: singer.name });
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto pb-28 text-left" id="singers-page-view">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-stone-900 to-[#181818] border border-solid border-white/10 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-80 h-80 bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-solid border-cyan-500/30 rounded-full text-[11px] font-black text-cyan-400 uppercase tracking-widest">
              <Mic className="w-3.5 h-3.5" />
              <span>South Indian Playback Legends</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Top Telugu & Tamil Singers
            </h1>
            <p className="text-sm text-neutral-300 font-medium leading-relaxed">
              Explore iconic playback vocalists, composers, and melody queens from Tollywood and Kollywood. Select your favorite 5 singers to customize your recommendations!
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => setShowFavoriteSingersModal(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-400 hover:brightness-110 active:scale-95 text-black font-black text-xs sm:text-sm rounded-2xl transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2.5 cursor-pointer"
              id="open-favorite-5-singers-btn"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>⭐ Select Your 5 Favorite Singers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" id="singers-filter-pills">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-solid border-white/10'
            }`}
          >
            All Singers ({artists.length})
          </button>

          <button
            onClick={() => setSelectedFilter('telugu')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'telugu'
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-solid border-white/10'
            }`}
          >
            Telugu Vocalists
          </button>

          <button
            onClick={() => setSelectedFilter('tamil')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'tamil'
                ? 'bg-cyan-400 text-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-solid border-white/10'
            }`}
          >
            Tamil Vocalists
          </button>

          <button
            onClick={() => setSelectedFilter('composers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'composers'
                ? 'bg-[#E50914] text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-solid border-white/10'
            }`}
          >
            Composers
          </button>

          <button
            onClick={() => setSelectedFilter('following')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'following'
                ? 'bg-emerald-400 text-black shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-solid border-white/10'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Following ({followedArtists.length})</span>
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search singers by name..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
            id="singer-search-input"
          />
        </div>
      </div>

      {/* Singers Cards Grid */}
      {filteredSingers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" id="singers-cards-grid">
          {filteredSingers.map(singer => {
            const isFollowing = followedArtists.includes(singer.id);
            return (
              <motion.div
                key={singer.id}
                whileHover={{ y: -4 }}
                className="bg-[#181818] border border-solid border-white/10 hover:border-white/20 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-lg group relative overflow-hidden"
                id={`singer-card-${singer.id}`}
              >
                <div>
                  {/* Singer Avatar */}
                  <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 border-2 border-solid border-white/10 group-hover:border-cyan-400 transition-colors shadow-md">
                    <img 
                      src={singer.avatarUrl} 
                      alt={singer.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    
                    {/* Hover Quick Play Button */}
                    <button
                      onClick={() => handlePlaySingerPopularTrack(singer)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white"
                      title={`Play songs by ${singer.name}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </button>
                  </div>

                  {/* Singer Details */}
                  <div className="text-center space-y-1">
                    <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-1" title={singer.name}>
                      {singer.name}
                    </h3>

                    {/* Genres Badges */}
                    <div className="flex flex-wrap gap-1 justify-center py-1">
                      {singer.genres.slice(0, 2).map((genre, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white/5 border border-solid border-white/10 rounded-md text-[10px] text-neutral-300 font-medium">
                          {genre}
                        </span>
                      ))}
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-2 pt-1 leading-normal">
                      {singer.bio}
                    </p>
                  </div>
                </div>

                {/* Follow Button Action */}
                <div className="mt-5 pt-3 border-t border-solid border-white/5 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-neutral-500 font-bold">
                    {(singer.followers / 1000).toFixed(0)}K followers
                  </span>

                  <button
                    onClick={() => toggleFollowArtist(singer.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isFollowing
                        ? 'bg-emerald-500/20 text-emerald-400 border border-solid border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/40'
                        : 'bg-white text-black hover:bg-neutral-200 shadow-md'
                    }`}
                    id={`follow-btn-${singer.id}`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-[#181818] border border-solid border-white/10 rounded-3xl p-8 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-solid border-white/10 flex items-center justify-center mx-auto text-neutral-400">
            <Mic className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No singers found</h3>
          <p className="text-xs text-neutral-400">
            {selectedFilter === 'following' 
              ? "You haven't followed any singers yet. Select your 5 favorite singers to get started!"
              : "No singers matched your filter query."}
          </p>
          <button
            onClick={() => setShowFavoriteSingersModal(true)}
            className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer"
          >
            ⭐ Pick 5 Favorite Singers
          </button>
        </div>
      )}
    </div>
  );
};
