/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Mic, Search, Zap, LogIn, LogOut, Sparkles, Bell, Music, Menu, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    activeView, 
    goBack, 
    navigationHistory, 
    isLoggedIn, 
    user, 
    logout, 
    navigate,
    triggerVoiceCommand,
    showToast
  } = useApp();

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleVoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceQuery.trim()) return;
    setIsVoiceOpen(false);
    await triggerVoiceCommand(voiceQuery);
    setVoiceQuery('');
  };

  // Mock auto voice commands helper list
  const voiceSuggestions = [
    "play Midnight Driver",
    "chill vibes lofi",
    "filter by House genre",
    "open library page",
    "show acoustic music",
  ];

  return (
    <>
      <header 
        id="top-navbar"
        className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#121212]/80 border-b border-solid border-white/5 backdrop-blur-xl sticky top-0 z-30 select-none"
      >
        {/* Navigation History & Mobile Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Logo Branding (visible on small screens) */}
          <div 
            onClick={() => navigate('home')}
            className="md:hidden flex items-center gap-2 mr-1 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#E50914] flex items-center justify-center shadow-sm">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-white text-sm tracking-tight flex items-center gap-0.5">
              <span>RBH</span>
              <span className="font-normal text-white/80">music</span>
            </span>
          </div>

          <button
            onClick={goBack}
            disabled={navigationHistory.length === 0}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center disabled:opacity-30 transition-all cursor-pointer"
            id="nav-back-btn"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-30 cursor-not-allowed hidden sm:flex"
            id="nav-forward-btn"
            disabled
            title="Go forward"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* AI Voice Assistant trigger */}
          {isLoggedIn && (
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-solid border-white/10 rounded-full text-xs text-white font-bold transition-all hover:scale-105"
              id="voice-command-btn"
            >
              <Mic className="w-3.5 h-3.5 text-[#E50914] animate-pulse" />
              <span>Voice</span>
            </button>
          )}
        </div>

        {/* Right side controls: Bell Notification, Three-bar Menu */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification Bell Button */}
          <button 
            onClick={() => showToast('🔔 No new notifications', 'info')}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
            id="nav-bell-btn"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-white" />
          </button>

          {/* Three Bar Lines Menu Option */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className={`w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-solid ${
                isMenuOpen ? 'border-[#E50914] text-[#E50914]' : 'border-white/10 hover:border-white/30'
              }`}
              id="top-menu-bar-btn"
              title="Menu Options"
            >
              <Menu className="w-4 h-4 text-white" />
            </button>

            {/* Dropdown menu showing Settings and Logout options */}
            {isMenuOpen && (
              <>
                {/* Backdrop to close menu when clicking outside */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsMenuOpen(false)} 
                />

                <div 
                  className="absolute right-0 mt-2 w-44 bg-[#181818] border border-solid border-white/10 rounded-xl shadow-2xl py-2 z-50 text-left"
                  id="top-right-dropdown-menu"
                >
                  <div className="px-3 py-1.5 border-b border-solid border-white/5 mb-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Options</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('profile');
                    }}
                    className="w-full px-3.5 py-2 flex items-center gap-2.5 text-xs font-bold text-white/90 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer"
                    id="menu-settings-btn"
                  >
                    <Settings className="w-4 h-4 text-cyan-400" />
                    <span>Settings</span>
                  </button>

                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                      }}
                      className="w-full px-3.5 py-2 flex items-center gap-2.5 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
                      id="menu-logout-btn"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('auth');
                      }}
                      className="w-full px-3.5 py-2 flex items-center gap-2.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors text-left cursor-pointer"
                      id="menu-login-btn"
                    >
                      <LogIn className="w-4 h-4 text-emerald-400" />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Voice Assistant Speech-Command overlay */}
      {isVoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" id="voice-overlay-console">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#FF3B5C]/10 blur-[100px] animate-pulse" />
          </div>

          <div className="bg-[#181818] border border-solid border-[#FF3B5C]/20 rounded-2xl p-6 w-full max-w-md text-center shadow-[0_0_50px_rgba(255,59,92,0.25)] relative">
            <button 
              onClick={() => setIsVoiceOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white p-1 hover:bg-white/5 rounded-lg"
            >
              <X className="w-5 h-5" id="voice-modal-close" />
            </button>

            <div className="w-16 h-16 bg-[#FF3B5C]/10 border border-solid border-[#FF3B5C]/30 rounded-full flex items-center justify-center text-[#FF3B5C] mx-auto mb-4 animate-bounce">
              <Mic className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-black text-white">RBH Voice Command Console</h3>
            <p className="text-xs text-white/60 mt-1 mb-6">Ask RBH Music to play music, search genres, or navigate tabs.</p>

            <form onSubmit={handleVoiceSubmit} className="space-y-4">
              <input
                type="text"
                value={voiceQuery}
                onChange={e => setVoiceQuery(e.target.value)}
                placeholder='Try: "play Midnight Driver" or "chill lofi"'
                autoFocus
                className="w-full px-4 py-3 bg-white/5 border border-solid border-[#FF3B5C]/40 rounded-xl text-sm text-white text-center focus:outline-none focus:border-[#FF3B5C] focus:shadow-[0_0_12px_rgba(255,59,92,0.3)] transition-all"
              />

              <div className="flex gap-2 justify-center">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF3B5C] text-white font-extrabold text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Send Voice Command
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-solid border-white/10 text-left">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF3B5C]" />
                Suggested Commands:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {voiceSuggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setVoiceQuery(s)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 hover:text-[#FF3B5C] rounded-lg text-[10px] font-medium text-white/80 transition-all border border-solid border-transparent hover:border-[#FF3B5C]/20"
                  >
                    "{s}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Simple helper icon
const X: React.FC<{ className?: string; id?: string }> = ({ className, id }) => (
  <svg id={id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
