/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Sparkles, 
  Plus, 
  Award, 
  Star, 
  Clock, 
  Music, 
  Compass, 
  Heart, 
  Library, 
  Podcast, 
  Zap,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Track } from '../types';

export const Dashboard: React.FC = () => {
  const { 
    user, 
    tracks, 
    albums, 
    artists, 
    playlists, 
    followedArtists,
    toggleFollowArtist,
    playTrack, 
    addToQueue, 
    addTrackToPlaylist,
    getAiRecommendations,
    showToast,
    navigate
  } = useApp();

  const [greeting, setGreeting] = useState('Welcome');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ genres: string[]; reason: string } | null>(null);

  // Set greeting based on time of day
  useEffect(() => {
    const hr = new Date().getHours();
    if (hr < 12) setGreeting('Good morning');
    else if (hr < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleAiRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    
    setAiLoading(true);
    setAiResult(null);

    const result = await getAiRecommendations(aiPrompt, 'custom');
    setAiLoading(false);
    
    if (result && result.genres.length > 0) {
      setAiResult(result);
      showToast('✨ Curated soundscapes matching your mood are ready!', 'success');
    }
  };

  const playRecommendedGenre = (genre: string) => {
    const matchingTracks = tracks.filter(t => t.genre.toLowerCase() === genre.toLowerCase());
    if (matchingTracks.length > 0) {
      playTrack(matchingTracks[0], matchingTracks);
      showToast(`Streaming curated "${genre}" wave`, 'success');
    } else {
      showToast('No active streams matching this category', 'info');
    }
  };

  // Play custom curated selections for FAVOURITE MUSIC
  const playDailyMix = (mixNumber: number = 1) => {
    const dmPlaylist = playlists.find(p => p.id === 'pl_dm1');
    if (dmPlaylist && dmPlaylist.tracks.length > 0) {
      const dmTracks = dmPlaylist.tracks.map(id => tracks.find(t => t.id === id)).filter(Boolean) as Track[];
      if (dmTracks.length > 0) {
        playTrack(dmTracks[0], dmTracks);
        showToast('Playing FAVOURITE MUSIC', 'success');
        return;
      }
    }
    playTrack(tracks[0], tracks);
    showToast('Playing FAVOURITE MUSIC', 'success');
  };

  // Curated FAVOURITE MUSIC playlist card definition
  const dailyMixData = [
    {
      num: 1,
      name: 'FAVOURITE MUSIC',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80',
      bgColor: '#16A34A', // vibrant green
      textColor: '#FFFFFF'
    }
  ];

  return (
    <div id="dashboard-view" className="space-y-8 pb-36 text-left p-4 sm:p-6 md:p-8 overflow-y-auto h-full scrollbar-none select-none z-10 relative bg-[#121212]">
      
      {/* Good Evening Hero Banner */}
      <div 
        className="bg-[#181818] border border-solid border-white/5 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl min-h-[340px]" 
        id="dashboard-greeting-banner"
      >
        {/* Ambient Red Rim Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-[#E50914]/15 blur-[120px]" />
        </div>

        {/* Left Hero Main Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" id="greeting-title">
              {greeting}
            </h2>
            <p className="text-[#A7A7A7] text-sm sm:text-base font-medium mt-2">Play the music you love.</p>
          </div>

          {/* 4 Quick Access Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-8 w-full">
            
            {/* 1. Discover */}
            <div 
              onClick={() => navigate('search')}
              className="bg-[#242424]/60 hover:bg-[#282828] border border-solid border-white/5 p-3 rounded-2xl transition-all duration-300 group cursor-pointer text-left flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-transparent border-2 border-solid border-[#1DB954] text-[#1DB954] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-[#1DB954]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-white truncate">Discover</h4>
                <p className="text-[10px] text-[#A7A7A7] mt-0.5 truncate">New music for you</p>
              </div>
            </div>

            {/* 2. Liked Songs */}
            <div 
              onClick={() => navigate('library')}
              className="bg-[#242424]/60 hover:bg-[#282828] border border-solid border-white/5 p-3 rounded-2xl transition-all duration-300 group cursor-pointer text-left flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#8C52FF] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-white truncate">Liked Songs</h4>
              </div>
            </div>

            {/* 3. Your Library */}
            <div 
              onClick={() => navigate('library')}
              className="bg-[#242424]/60 hover:bg-[#282828] border border-solid border-white/5 p-3 rounded-2xl transition-all duration-300 group cursor-pointer text-left flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1DB954] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-white truncate">Your Library</h4>
                <p className="text-[10px] text-[#A7A7A7] mt-0.5 truncate">Playlists & albums</p>
              </div>
            </div>

            {/* 4. Podcasts */}
            <div 
              onClick={() => {
                showToast('Podcast directory connected with RBH music feed.', 'info');
              }}
              className="bg-[#242424]/60 hover:bg-[#282828] border border-solid border-white/5 p-3 rounded-2xl transition-all duration-300 group cursor-pointer text-left flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EA580C] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                <Podcast className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-white truncate">Podcasts</h4>
                <p className="text-[10px] text-[#A7A7A7] mt-0.5 truncate">New episodes</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Portrait Column with Red Rim Lighting */}
        <div className="hidden lg:block lg:w-[380px] shrink-0 relative overflow-hidden border-l border-solid border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&q=80" 
            alt="Listener wearing headphones" 
            className="w-full h-full object-cover object-top filter grayscale contrast-[1.1]"
          />
          {/* Subtle gradient overlays to soften photo transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818] via-[#181818]/20 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-[#E50914]/20 mix-blend-color-dodge pointer-events-none" />
        </div>
      </div>

      {/* Made for you Section (Six Daily Mix cards with colorful waves) */}
      <section className="space-y-4" id="made-for-you-section">
        <div className="flex items-center justify-between pb-1">
          <h3 className="text-xl font-extrabold text-white tracking-tight">Made for you</h3>
          <button 
            onClick={() => showToast('Displaying all curated Daily Mixes', 'info')}
            className="text-xs font-bold text-[#A7A7A7] hover:text-white transition-colors cursor-pointer"
          >
            Show all
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {dailyMixData.map(mix => (
            <div
              key={mix.num}
              onClick={() => navigate('playlist', { playlistId: `pl_dm${mix.num}` })}
              className="bg-[#181818] hover:bg-[#282828] p-3 rounded-2xl transition-all duration-300 group cursor-pointer text-left flex flex-col border border-solid border-white/5"
              id={`daily-mix-card-${mix.num}`}
            >
              {/* Cover Image + Wave Graphic Box */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#121212] flex flex-col justify-end shadow-md mb-3">
                
                {/* Artist Photo */}
                <img 
                  src={mix.image} 
                  alt={`Daily Mix ${mix.num}`} 
                  className="absolute top-0 left-0 w-full h-[68%] object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-500 z-0 group-hover:scale-105" 
                />
                
                {/* Colored wave bottom block */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-[46%] flex flex-col justify-end p-2.5 z-10" 
                  style={{ backgroundColor: mix.bgColor }}
                >
                  {/* Organic wave SVG boundary */}
                  <div className="absolute -top-4 left-0 right-0 h-5 overflow-hidden pointer-events-none" style={{ fill: mix.bgColor }}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
                      <path d="M-12.13,38.98 C144.18,-54.76 270.59,150.48 512.13,-1.47 L512.13,151.47 L-12.13,151.47 Z" fill={mix.bgColor}></path>
                    </svg>
                  </div>
                  
                  {/* Text on wave */}
                  <div className="relative z-20">
                    <h4 className="text-xs font-black tracking-tight text-black truncate">
                      {mix.name}
                    </h4>
                  </div>
                </div>

                {/* Hover Play Button */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    playDailyMix(mix.num);
                  }}
                  className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 text-black flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 z-30"
                  title={`Play ${mix.name}`}
                >
                  <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                </div>
              </div>

              {/* Title and Subtitle below card */}
              <h4 className="text-xs font-bold text-white truncate">{mix.name}</h4>
              <p className="text-[10px] text-[#A7A7A7] mt-0.5 truncate">Click to view playlist</p>
            </div>
          ))}
        </div>
      </section>


      {/* Featured Playlists */}
      <section className="space-y-4" id="trending-playlists-section">
        <div className="flex items-end justify-between border-b border-solid border-[#2A2A2A] pb-2">
          <h3 className="text-lg font-black text-white">Trending Playlists</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {playlists.map(pl => (
            <div
              key={pl.id}
              onClick={() => {
                const plTracks = tracks.filter(t => pl.tracks.includes(t.id));
                if (plTracks.length > 0) {
                  playTrack(plTracks[0], plTracks);
                  showToast(`⚡️ Streaming playlist ${pl.name}`, 'success');
                } else {
                  showToast('This playlist has no songs loaded', 'info');
                }
              }}
              className="group cursor-pointer bg-[#181818] p-4 border border-solid border-[#2A2A2A] hover:border-[#FF3B5C]/30 hover:bg-[#181818]/80 rounded-2xl text-left transition-all"
              id={`playlist-card-${pl.id}`}
            >
              <div className="relative rounded-xl overflow-hidden aspect-square mb-3">
                <img src={pl.coverUrl} alt={pl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 bg-[#FF3B5C] text-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-xs text-white line-clamp-1 truncate">{pl.name}</h4>
              <p className="text-[10px] text-[#B3B3B3]/60 mt-1 line-clamp-2">{pl.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Telugu & Tamil Singers */}
      <section className="space-y-4" id="top-telugu-tamil-singers-section">
        <div className="flex items-end justify-between border-b border-solid border-[#2A2A2A] pb-2">
          <div>
            <h3 className="text-lg font-black text-white">Top Telugu & Tamil Singers</h3>
            <p className="text-xs text-[#A7A7A7] mt-0.5">Popular South Indian playback vocalists & composers</p>
          </div>
          <button 
            onClick={() => navigate('singers')} 
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Explore All Singers
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map(art => {
            const isFollowing = followedArtists.includes(art.id);
            return (
              <div
                key={art.id}
                className="group p-4 bg-[#181818] rounded-2xl text-center border border-solid border-[#2A2A2A] hover:border-cyan-500/30 hover:bg-[#181818]/90 transition-all flex flex-col items-center justify-between"
                id={`telugu-tamil-singer-card-${art.id}`}
              >
                <div 
                  onClick={() => navigate('singers')}
                  className="w-20 h-20 rounded-full overflow-hidden mb-3 cursor-pointer border-2 border-solid border-white/10 group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-md relative"
                  title={`View singer ${art.name}`}
                >
                  <img src={art.avatarUrl} alt={art.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full text-center">
                  <p className="text-xs font-black text-white truncate w-full" title={art.name}>{art.name}</p>
                  <p className="text-[9px] text-cyan-400/90 font-bold mt-0.5 truncate w-full">{art.genres[0]}</p>
                  <p className="text-[9px] text-[#A7A7A7] mt-0.5">{(art.followers / 1000000).toFixed(1)}M Followers</p>
                </div>
                <button
                  onClick={() => toggleFollowArtist(art.id)}
                  className={`mt-3 px-3 py-1.5 text-[10px] font-black rounded-xl transition-all w-full cursor-pointer ${
                    isFollowing
                      ? 'bg-cyan-500/10 border border-solid border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
                      : 'bg-white/10 border border-solid border-white/20 text-white hover:bg-cyan-500 hover:text-black hover:border-cyan-500'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Playlists section ends */}
    </div>
  );
};
