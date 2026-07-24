/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Search, Library, Plus, Disc, Award, Settings, User, Download, Heart, Music } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PlaylistCreateModal } from './Modals';

export const Sidebar: React.FC = () => {
  const { 
    activeView, 
    navigate, 
    playlists, 
    isLoggedIn, 
    user,
    showToast
  } = useApp();

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const mainNav = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handlePlaylistCreateClick = () => {
    if (!isLoggedIn) {
      showToast('Please login to create custom playlists!', 'warning');
      navigate('auth');
      return;
    }
    setIsPlaylistModalOpen(true);
  };

  const handleInstallApp = () => {
    showToast('✨ RBH Music desktop launcher installed successfully!', 'success');
  };

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside 
        id="desktop-sidebar"
        className="hidden md:flex flex-col w-64 bg-[#121212] border-r border-solid border-white/10 h-full p-4 justify-between select-none z-20 shrink-0 text-left"
      >
        <div className="space-y-5">
          {/* Circular Red Music Icon & Brand Text */}
          <div 
            onClick={() => navigate('home')} 
            className="flex items-center gap-3 cursor-pointer group px-2 py-1"
            id="sidebar-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Music className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1" id="app-brand-name">
                <span>RBH</span>
                <span className="font-normal text-white/90">music</span>
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 pt-2 relative" id="sidebar-main-nav">
            {mainNav.map(item => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              return (
                <button
                   key={item.id}
                   id={`sidebar-link-${item.id}`}
                   onClick={() => navigate(item.id)}
                   className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-xs font-bold transition-colors text-left relative z-10 ${
                     isActive
                       ? 'text-white'
                       : 'text-[#A7A7A7] hover:text-white hover:bg-white/5'
                   }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active-nav"
                      className="absolute inset-0 bg-[#282828] rounded-lg -z-10 border border-solid border-white/10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#E50914]' : 'text-[#A7A7A7]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Playlists Header & List with Covers */}
          <div className="pt-4 border-t border-solid border-white/10" id="sidebar-playlist-section">
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[10px] font-black text-[#A7A7A7] uppercase tracking-widest">PLAYLISTS</span>
              <button 
                onClick={handlePlaylistCreateClick}
                className="p-1 hover:bg-white/10 rounded-full text-[#A7A7A7] hover:text-white transition-colors cursor-pointer"
                id="create-playlist-btn"
                title="Create playlist"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1 scrollbar-none" id="sidebar-playlist-list">
              {/* Liked Songs Special Cover Item */}
              <button
                onClick={() => navigate('library')}
                className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition-all group"
                id="sidebar-liked-songs-item"
              >
                <div className="w-9 h-9 rounded bg-[#8C52FF] flex items-center justify-center shadow-md shrink-0">
                  <Heart className="w-4.5 h-4.5 text-white fill-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white group-hover:text-white transition-colors truncate">Liked Songs</p>
                  <p className="text-[10px] font-medium text-[#A7A7A7] mt-0.5">182 songs</p>
                </div>
              </button>

              {/* Dynamic Database Playlists with Covers */}
              {playlists.map(pl => {
                return (
                  <button
                    key={pl.id}
                    onClick={() => navigate('playlist', { playlistId: pl.id })}
                    className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition-all group"
                  >
                    <img 
                      src={pl.coverUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80'} 
                      alt={pl.name} 
                      className="w-9 h-9 rounded object-cover border border-solid border-white/5 shrink-0" 
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white group-hover:text-white transition-colors truncate">{pl.name}</p>
                      <p className="text-[10px] font-medium text-[#A7A7A7] mt-0.5">Playlist • RBH music</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Area with User Profile and Install App Button */}
        <div className="space-y-3 pt-2" id="sidebar-footer">
          {/* Install App Button */}
          <button
            onClick={handleInstallApp}
            className="w-full flex items-center gap-2.5 py-2 px-2 hover:text-white rounded-lg text-xs font-bold text-[#A7A7A7] transition-all cursor-pointer text-left"
            id="install-app-btn"
          >
            <div className="w-5 h-5 rounded-full border border-solid border-[#A7A7A7] flex items-center justify-center shrink-0">
              <Download className="w-3 h-3 text-[#A7A7A7]" />
            </div>
            <span>Install App</span>
          </button>

          {isLoggedIn && user ? (
            <div 
              onClick={() => navigate('profile')}
              className="p-2 bg-white/5 border border-solid border-white/10 rounded-lg flex items-center gap-2.5 cursor-pointer transition-all hover:bg-white/10"
              id="sidebar-user-card"
            >
              <img src={user.avatarUrl} alt={user.username} className="w-7 h-7 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-extrabold text-white truncate">{user.username}</p>
                <span className="flex items-center gap-1 mt-0.5">
                  <Award className={`w-3 h-3 ${user.subscriptionStatus === 'premium' ? 'text-amber-400' : 'text-white/40'}`} />
                  <span className="text-[9px] uppercase font-bold text-[#A7A7A7]">
                    {user.subscriptionStatus === 'premium' ? 'RBH Premium' : 'Free Member'}
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('auth')}
              className="w-full py-2 bg-[#E50914] hover:bg-[#E50914]/90 text-white font-bold text-xs rounded-full transition-all shadow-md cursor-pointer"
              id="sidebar-login-btn"
            >
              Sign In
            </button>
          )}

          {/* Admin Panel Gateway */}
          {isLoggedIn && (
            <button
              onClick={() => navigate('admin')}
              className="w-full flex items-center gap-2 justify-center py-1.5 border border-solid border-white/10 hover:bg-white/5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-[#A7A7A7] transition-all"
              id="sidebar-admin-btn"
            >
              <Settings className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Touch Targets >44px) */}
      <nav 
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121212]/95 border-t border-solid border-white/10 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around h-16 select-none"
      >
        {mainNav.map(item => {
          const isActive = activeView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => navigate(item.id)}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 h-12 rounded-xl text-xs font-bold transition-colors z-10 ${
                isActive ? 'text-white' : 'text-[#A7A7A7] hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-nav"
                  className="absolute inset-0 bg-white/10 rounded-xl -z-10 border border-solid border-white/15 shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#E50914]' : 'text-[#A7A7A7]'}`} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals */}
      <PlaylistCreateModal isOpen={isPlaylistModalOpen} onClose={() => setIsPlaylistModalOpen(false)} />
    </>
  );
};
