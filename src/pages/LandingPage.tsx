/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Disc, 
  Play, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Search, 
  Heart, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  ListMusic,
  Music,
  Pause
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHoveredPlay, setIsHoveredPlay] = useState<string | null>(null);
  const [isLikedBlinding, setIsLikedBlinding] = useState(false);
  const [isPlayingMock, setIsPlayingMock] = useState(false);

  // Six premium playlist cards matching the mock image exactly
  const premiumPlaylists = [
    {
      id: 'p_1',
      title: 'Chill Vibes',
      category: 'Playlist • RBH music',
      coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=500&q=80',
      glowColor: 'rgba(255, 59, 92, 0.4)',
    },
    {
      id: 'p_2',
      title: 'Top Hits 2024',
      category: 'Playlist • RBH music',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
      glowColor: 'rgba(255, 107, 129, 0.4)',
    },
    {
      id: 'p_3',
      title: 'Party Anthems',
      category: 'Playlist • RBH music',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80',
      glowColor: 'rgba(255, 59, 92, 0.4)',
    },
    {
      id: 'p_4',
      title: 'Peaceful Mind',
      category: 'Playlist • RBH music',
      coverUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&q=80',
      glowColor: 'rgba(255, 107, 129, 0.3)',
    },
    {
      id: 'p_5',
      title: 'Acoustic Love',
      category: 'Playlist • RBH music',
      coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80',
      glowColor: 'rgba(255, 59, 92, 0.3)',
    },
    {
      id: 'p_6',
      title: 'Gym Beats',
      category: 'Playlist • RBH music',
      coverUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80',
      glowColor: 'rgba(255, 107, 129, 0.4)',
    }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate('auth'); // Prompt user to authenticate for full application features
  };

  return (
    <div 
      id="landing-page-root" 
      className="w-full min-h-screen bg-[#0B0B0B] text-white flex flex-col relative overflow-x-hidden overflow-y-auto pb-32"
    >
      {/* Background ambient glowing orbs with RBH Red and Magenta colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-100px] left-[20%] w-[500px] h-[500px] rounded-full bg-[#FF3B5C]/10 blur-[140px] animate-pulse duration-[6000ms]" />
        <div className="absolute top-[20%] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#FF6B81]/10 blur-[150px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[10%] left-[-100px] w-[450px] h-[450px] rounded-full bg-[#FF3B5C]/5 blur-[120px]" />
      </div>

      {/* 1. Header Navigation Bar */}
      <header 
        id="landing-navbar" 
        className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-20 border-b border-solid border-[#2A2A2A]"
      >
        {/* RBH Music Brand Logo & Name */}
        <div 
          onClick={() => navigate('landing')} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-logo-container"
        >
          <div className="w-9 h-9 rounded-full bg-[#FF3B5C] flex items-center justify-center shadow-[0_0_15px_rgba(255,59,92,0.4)] group-hover:scale-105 transition-all">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span 
            className="text-lg font-black tracking-wider uppercase flex items-center gap-1"
            id="brand-name-text"
          >
            <span className="text-[#FF3B5C]">RBH</span>
            <span className="text-white font-normal lowercase">music</span>
          </span>
        </div>

        {/* Center Menu Links */}
        <nav className="hidden md:flex items-center gap-8" id="center-menu-navigation">
          {['Home', 'Explore', 'Albums', 'Artists', 'Playlists', 'Genres'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`text-xs font-bold tracking-wider uppercase transition-all relative py-1.5 cursor-pointer ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF3B5C] shadow-[0_1px_8px_rgba(255,59,92,0.8)]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Search */}
        <div className="flex items-center gap-4" id="right-navbar-elements">
          {/* Rounded Search Bar */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search for songs, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate('auth')}
              className="w-56 pl-4 pr-10 py-2 bg-[#181818] hover:bg-[#222222] border border-solid border-[#2A2A2A] rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF3B5C] focus:shadow-[0_0_12px_rgba(255,59,92,0.2)] transition-all"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-main">
        
        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-6 text-left space-y-6" id="hero-left-col">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF3B5C]/10 border border-solid border-[#FF3B5C]/20 rounded-full" id="eyebrow-badge">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3B5C]" />
            <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#FF3B5C]">
              FEEL THE MUSIC
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.1] text-white">
            Music for every <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3B5C] via-[#FF6B81] to-white drop-shadow-[0_2px_15px_rgba(255,59,92,0.3)]">
              moment of you.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed font-medium">
            Discover, stream, and enjoy millions of songs on RBH Music. Play the music you love with bespoke sound layouts and premium high-fidelity.
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4" id="cta-buttons-container">
            <button
              onClick={() => navigate('auth')}
              className="px-8 py-3.5 bg-gradient-to-r from-[#FF3B5C] to-[#FF6B81] hover:brightness-110 active:scale-95 text-white font-black text-xs rounded-full transition-all shadow-[0_4px_24px_rgba(255,59,92,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              id="hero-play-now-btn"
            >
              <Play className="w-3.5 h-3.5 text-white fill-white" />
              <span>Play Now</span>
            </button>
            <button
              onClick={() => navigate('auth')}
              className="px-8 py-3.5 bg-[#181818] hover:bg-[#222222] border border-solid border-[#2A2A2A] text-white font-black text-xs rounded-full transition-all hover:border-[#FF3B5C]/30 active:scale-95 flex items-center justify-center cursor-pointer"
              id="hero-explore-btn"
            >
              <span>Explore</span>
            </button>
          </div>
        </div>

        {/* Right Column: Stunning Headphone Portrait */}
        <div className="lg:col-span-6 relative flex justify-center items-center" id="hero-right-col">
          
          {/* Animated Waveform Visualization Glowing Behind Him */}
          <div className="absolute inset-0 flex items-end justify-center gap-[3px] px-8 py-4 opacity-30 blur-[1px] pointer-events-none" id="background-waveform">
            {Array.from({ length: 48 }).map((_, i) => {
              const heightValues = [30, 80, 50, 110, 40, 140, 70, 90, 120, 60, 150, 45, 100, 35, 130];
              const h = heightValues[i % heightValues.length];
              return (
                <div
                  key={i}
                  className="w-[3px] bg-gradient-to-t from-[#FF3B5C] to-[#FF6B81] rounded-full"
                  style={{
                    height: `${h}px`,
                    animation: `equalizerHeight 1.4s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              );
            })}
          </div>

          {/* Hologram Circle Music Icon */}
          <div className="absolute -top-4 left-6 z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF3B5C]/40 to-[#FF6B81]/40 backdrop-blur-xl border border-solid border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,59,92,0.3)] animate-bounce duration-[3000ms]">
            <Music className="w-5 h-5 text-[#FF6B81]" />
          </div>

          {/* Floating musical notes */}
          <div className="absolute top-1/4 right-8 z-20 text-[#FF3B5C]/80 animate-pulse pointer-events-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </div>
          <div className="absolute bottom-1/3 left-4 z-20 text-[#FF6B81]/80 animate-pulse pointer-events-none delay-500">
            <Music className="w-5 h-5" />
          </div>

          {/* Main Visual Image Wrapper */}
          <div 
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] p-2.5 bg-white/[0.03] border border-solid border-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            id="gorgeous-headphones-woman-wrapper"
          >
            {/* Young man wearing premium black headphones portrait with red ambient highlights */}
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" 
              alt="Man listening to music" 
              className="w-full h-full object-cover rounded-[24px] saturate-[1.1] brightness-[0.95] group-hover:scale-102 transition-transform duration-700"
            />
            {/* Radial overlay glow inside frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B5C]/15 via-transparent to-[#FF6B81]/15 pointer-events-none" />
          </div>
        </div>
      </main>

      {/* 3. Playlist Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12" id="playlists">
        {/* Playlist Section Header */}
        <div className="flex items-end justify-between mb-8 border-b border-solid border-[#2A2A2A] pb-4">
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight" id="playlists-section-heading">
              Top Picks For You
            </h2>
          </div>
          <button 
            onClick={() => navigate('auth')} 
            className="text-xs font-bold text-[#FF3B5C] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
            id="see-all-playlists-btn"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Scroll Grid of Six Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" id="playlist-cards-grid">
          {premiumPlaylists.map((pl) => {
            const isHovered = isHoveredPlay === pl.id;
            return (
              <div
                key={pl.id}
                onClick={() => navigate('auth')}
                onMouseEnter={() => setIsHoveredPlay(pl.id)}
                onMouseLeave={() => setIsHoveredPlay(null)}
                className="group cursor-pointer text-left bg-[#181818] border border-solid border-[#2A2A2A] hover:border-neutral-700 p-4 rounded-[20px] transition-all duration-300 relative overflow-hidden"
                style={{
                  boxShadow: isHovered ? `0 10px 30px -5px ${pl.glowColor}` : 'none',
                  transform: isHovered ? 'translateY(-4px)' : 'none'
                }}
                id={`landing-playlist-${pl.id}`}
              >
                {/* Playlist Art Cover */}
                <div className="relative overflow-hidden rounded-[14px] aspect-square mb-3 bg-neutral-900 shadow-lg">
                  <img 
                    src={pl.coverUrl} 
                    alt={pl.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Glowing Overlay Play icon on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300 hover:scale-105 active:scale-95">
                      <Play className="w-5 h-5 fill-black text-black ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info titles */}
                <h3 className="font-extrabold text-sm text-white line-clamp-1 truncate group-hover:text-[#FF3B5C] transition-colors">{pl.title}</h3>
                <p className="text-[10px] text-neutral-400 mt-0.5 font-bold tracking-wider uppercase">{pl.category}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom Music Player Console */}
      <footer 
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0B]/90 border-t border-solid border-[#2A2A2A] backdrop-blur-2xl py-3 px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]" 
        id="landing-sticky-player"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Album artwork, Title, Artist, Heart */}
          <div className="flex items-center gap-3.5 w-full md:w-1/4 justify-start" id="player-left-info">
            <div className="w-11 h-11 rounded-lg overflow-hidden bg-neutral-800 border border-solid border-white/10 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80" 
                alt="Blinding Lights Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left overflow-hidden min-w-0">
              <h4 className="font-bold text-xs text-white truncate hover:text-[#FF3B5C] cursor-pointer" onClick={() => navigate('auth')}>
                Blinding Lights
              </h4>
              <p className="text-[10px] text-neutral-400 truncate hover:text-white cursor-pointer" onClick={() => navigate('auth')}>
                The Weeknd
              </p>
            </div>
            <button 
              onClick={() => setIsLikedBlinding(!isLikedBlinding)}
              className="p-1 text-neutral-500 hover:text-[#FF3B5C] transition-colors cursor-pointer shrink-0"
            >
              <Heart className={`w-4 h-4 ${isLikedBlinding ? 'fill-[#FF3B5C] text-[#FF3B5C]' : ''}`} />
            </button>
          </div>

          {/* Center: Control Buttons & Progress slider */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4" id="player-center-controls">
            
            {/* Playback Buttons */}
            <div className="flex items-center gap-6 text-neutral-400">
              <button 
                onClick={() => navigate('auth')} 
                className="hover:text-[#FF3B5C] transition-colors cursor-pointer"
                title="Shuffle"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => navigate('auth')} 
                className="hover:text-[#FF3B5C] transition-colors cursor-pointer"
                title="Previous"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Large Glowing Play/Pause */}
              <button 
                onClick={() => setIsPlayingMock(!isPlayingMock)} 
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF3B5C] to-[#FF6B81] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(255,59,92,0.6)] cursor-pointer"
                title={isPlayingMock ? 'Pause' : 'Play'}
              >
                {isPlayingMock ? (
                  <Pause className="w-3.5 h-3.5 fill-white text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                )}
              </button>

              <button 
                onClick={() => navigate('auth')} 
                className="hover:text-[#FF3B5C] transition-colors cursor-pointer"
                title="Next"
              >
                <SkipForward className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('auth')} 
                className="hover:text-[#FF3B5C] transition-colors cursor-pointer"
                title="Repeat"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Slider Duration bar */}
            <div className="w-full flex items-center gap-3 text-[10px] text-neutral-500">
              <span className="w-7 text-right">01:24</span>
              <div 
                onClick={() => navigate('auth')}
                className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden group cursor-pointer"
              >
                {/* Simulated filled track bar */}
                <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#FF3B5C] to-[#FF6B81] w-[45%] rounded-full group-hover:brightness-110" />
                <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="w-7 text-left">03:20</span>
            </div>
          </div>

          {/* Right: Volume slider, Queue button */}
          <div className="hidden md:flex items-center gap-3 w-full md:w-1/4 justify-end text-neutral-400" id="player-right-extras">
            <button onClick={() => navigate('auth')} className="hover:text-[#FF3B5C] transition-colors cursor-pointer">
              <ListMusic className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <div 
                onClick={() => navigate('auth')}
                className="w-16 h-1 bg-white/15 hover:bg-white/20 rounded-full cursor-pointer relative overflow-hidden group"
              >
                <div className="absolute top-0 bottom-0 left-0 bg-[#FF3B5C] w-[70%]" />
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};
