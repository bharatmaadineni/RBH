/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Check, Sparkles, X, Heart, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FavoriteSingersModal: React.FC = () => {
  const { 
    showFavoriteSingersModal, 
    setShowFavoriteSingersModal, 
    artists, 
    followedArtists, 
    batchFollowArtists 
  } = useApp();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pre-populate with followed artists if user already has some, or reset on open
  useEffect(() => {
    if (showFavoriteSingersModal) {
      if (followedArtists.length >= 5) {
        setSelectedIds(followedArtists.slice(0, 5));
      } else {
        setSelectedIds([...followedArtists]);
      }
    }
  }, [showFavoriteSingersModal, followedArtists]);

  const toggleSelectSinger = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      if (selectedIds.length >= 5) {
        // Replace oldest or limit
        setSelectedIds(prev => [...prev.slice(1), id]);
      } else {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedIds.length !== 5) return;
    batchFollowArtists(selectedIds);
    setShowFavoriteSingersModal(false);
  };

  const isCountValid = selectedIds.length === 5;

  return (
    <AnimatePresence>
      {showFavoriteSingersModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          id="favorite-singers-modal-overlay"
        >
          {/* Ambient background blur circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#E50914]/15 blur-[120px]" />
          </div>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            className="w-full max-w-3xl my-auto bg-[#141414] border border-solid border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left overflow-hidden"
            id="favorite-singers-modal-box"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-solid border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-[#E50914] flex items-center justify-center shadow-lg shrink-0">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>Select 5 Favorite Singers</span>
                    <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Choose your top 5 Telugu & Tamil playback vocalists to customize your feed & follow list.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowFavoriteSingersModal(false)}
                className="p-1.5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                id="close-favorite-singers-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selection Progress Bar */}
            <div className="bg-white/5 border border-solid border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4" id="selection-counter-banner">
              <div className="w-full sm:w-auto">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Your Favorites Selected</span>
                  </span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                    isCountValid 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-solid border-emerald-500/40' 
                      : 'bg-cyan-500/20 text-cyan-400 border border-solid border-cyan-500/40'
                  }`}>
                    {selectedIds.length} / 5 Selected
                  </span>
                </div>
                
                {/* Progress bar line */}
                <div className="w-full sm:w-64 h-2 bg-black/60 rounded-full overflow-hidden border border-solid border-white/10 mt-2">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      isCountValid 
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400' 
                        : 'bg-gradient-to-r from-cyan-500 to-[#E50914]'
                    }`}
                    style={{ width: `${(selectedIds.length / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="w-full sm:w-auto text-right">
                {!isCountValid ? (
                  <p className="text-xs text-amber-400 font-bold flex items-center gap-1 justify-center sm:justify-end">
                    <span>Select {5 - selectedIds.length} more singer{5 - selectedIds.length > 1 ? 's' : ''}</span>
                  </p>
                ) : (
                  <p className="text-xs text-emerald-400 font-bold flex items-center gap-1 justify-center sm:justify-end">
                    <Check className="w-4 h-4" />
                    <span>Ready to confirm!</span>
                  </p>
                )}
              </div>
            </div>

            {/* Singers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[50vh] overflow-y-auto pr-1 scrollbar-none mb-6" id="favorite-singers-modal-grid">
              {artists.map(art => {
                const isSelected = selectedIds.includes(art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => toggleSelectSinger(art.id)}
                    className={`relative group p-3.5 rounded-2xl text-center border border-solid transition-all cursor-pointer select-none flex flex-col items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.02]'
                        : 'bg-[#1D1D1D] border-white/10 hover:border-white/25 hover:bg-white/5'
                    }`}
                    id={`modal-singer-card-${art.id}`}
                  >
                    {/* Badge Checkmark */}
                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-cyan-400 text-black scale-100 font-black shadow-md' 
                        : 'bg-black/40 text-white/30 scale-90 border border-solid border-white/10'
                    }`}>
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Star className="w-3 h-3" />}
                    </div>

                    <div className="w-16 h-16 rounded-full overflow-hidden mb-2.5 border-2 border-solid transition-all group-hover:scale-105"
                      style={{ borderColor: isSelected ? '#22d3ee' : 'rgba(255,255,255,0.1)' }}
                    >
                      <img src={art.avatarUrl} alt={art.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full text-center">
                      <p className={`text-xs font-black truncate w-full ${isSelected ? 'text-cyan-300' : 'text-white'}`} title={art.name}>
                        {art.name}
                      </p>
                      <p className="text-[9px] text-neutral-400 mt-0.5 truncate w-full font-medium">
                        {art.genres[0]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-solid border-white/10">
              <button
                onClick={() => setShowFavoriteSingersModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 hover:bg-white/10 rounded-xl text-xs font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
              >
                Skip for Now
              </button>

              <button
                onClick={handleConfirm}
                disabled={!isCountValid}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-400 hover:brightness-110 active:scale-95 disabled:opacity-40 text-black font-black text-xs rounded-xl transition-all shadow-[0_4px_20px_rgba(6,182,212,0.35)] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                id="confirm-favorite-singers-btn"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Confirm 5 Favorite Singers</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
