/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, Volume2, Plus, Share2, Sparkles, X, 
  Tv, Eye, EyeOff, Users, Link, Copy, Check,
  CreditCard, ShieldCheck, Zap, Music, VolumeX
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Playlist, Track } from '../types';
import { Visualizer } from './Visualizer';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. Sleep Timer Modal
export const SleepTimerModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { sleepTimer, setSleepTimer } = useApp();
  const presets = [5, 15, 30, 45, 60, 90];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" id="sleep-timer-modal">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-sm overflow-hidden bg-neutral-900 border border-solid border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF3B5C]" />
                <h3 className="text-lg font-bold text-neutral-100">Sleep Timer</h3>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-neutral-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sleepTimer !== null && (
              <div className="p-4 bg-[#FF3B5C]/10 border border-solid border-[#FF3B5C]/20 rounded-xl mb-6 text-center">
                <p className="text-xs text-[#FF3B5C] font-medium uppercase tracking-wider">Active Timer</p>
                <p className="text-2xl font-bold text-white mt-1">{sleepTimer} mins remaining</p>
                <button
                  onClick={() => { setSleepTimer(null); onClose(); }}
                  className="mt-3 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-solid border-rose-500/30 rounded-lg text-xs text-rose-400 font-medium transition-colors"
                >
                  Cancel Timer
                </button>
              </div>
            )}

            <p className="text-xs text-neutral-400 mb-4">Set a timer to automatically pause audio playback when you fall asleep.</p>
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              {presets.map(mins => (
                <button
                  key={mins}
                  onClick={() => { setSleepTimer(mins); onClose(); }}
                  className="py-3 bg-white/5 hover:bg-[#FF3B5C]/10 hover:border-[#FF3B5C]/40 border border-solid border-transparent rounded-xl text-sm font-semibold text-neutral-200 transition-all hover:text-[#FF3B5C]"
                >
                  {mins} min
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 2. Equalizer Preset Modal
export const EqualizerModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { equalizer, setEqualizer, isFullBass, toggleFullBass, volume, setVolume } = useApp();
  const presets = [
    { id: 'fullbass', name: '🔥 FULL BASS VERSION (Subwoofer Boost)', desc: 'Maximum +18dB low-end sub-bass resonance & heavy kick thump' },
    { id: 'bass', name: 'Bass Boost 🔊', desc: 'Deeper subwoofers and enhanced low-end kicks' },
    { id: 'flat', name: 'Flat (Default)', desc: 'Standard balanced frequency curve' },
    { id: 'treble', name: 'Treble Boost 🎼', desc: 'Sharper vocals, sparkling high hats and keys' },
    { id: 'electronic', name: 'Electronic Synth', desc: 'Pulsing dance frequencies, optimized for synths' },
    { id: 'vocal', name: 'Acoustic Vocal 🎤', desc: 'Brings voices and guitars straight to the center' },
    { id: 'chill', name: 'Midnight Chill 💤', desc: 'Smoothed-out highs and warm cozy mids' },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" id="equalizer-modal">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md overflow-hidden bg-neutral-900 border border-solid border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-[#FF3B5C]" />
                <h3 className="text-lg font-bold text-neutral-100">Audio Equalizer & Amplification</h3>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-neutral-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Boost Control Bar */}
            <div className="p-3 bg-gradient-to-r from-neutral-800 to-black border border-solid border-white/10 rounded-xl mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Volume Amplification (Up to 250%)
                </span>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded ${volume > 1.0 ? 'bg-[#FF3B5C] text-white shadow-[0_0_8px_rgba(255,59,92,0.8)]' : 'bg-white/10 text-neutral-300'}`}>
                  {Math.round(volume * 100)}% {volume > 1.0 ? '🔥' : ''}
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={2.5}
                step={0.05}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none mb-3 ${
                  volume > 1.0
                    ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-[#FF3B5C] accent-[#FF3B5C]'
                    : 'bg-white/20 accent-white'
                }`}
              />

              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: '100%', val: 1.0 },
                  { label: '150%', val: 1.5 },
                  { label: '200%', val: 2.0 },
                  { label: '🔥 250%', val: 2.5 },
                ].map((b) => (
                  <button
                    key={b.val}
                    onClick={() => setVolume(b.val)}
                    className={`py-1 rounded text-[10px] font-black transition-all cursor-pointer ${
                      Math.abs(volume - b.val) < 0.05
                        ? 'bg-[#FF3B5C] text-white shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Full Bass Toggle */}
            <button
              onClick={toggleFullBass}
              className={`w-full mb-4 p-3 rounded-xl border border-solid font-black text-xs transition-all flex items-center justify-between cursor-pointer ${
                isFullBass || equalizer === 'fullbass'
                  ? 'bg-gradient-to-r from-[#FF3B5C] to-rose-600 text-white border-[#FF3B5C] shadow-[0_0_16px_rgba(255,59,92,0.5)]'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🔥</span>
                <div className="text-left">
                  <p className="font-black text-sm">Full Bass Version Boost</p>
                  <p className="text-[10px] opacity-80 font-semibold">+18dB Subwoofer Low-End Frequency Pump</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${isFullBass || equalizer === 'fullbass' ? 'bg-black/30 text-white' : 'bg-white/10 text-neutral-400'}`}>
                {isFullBass || equalizer === 'fullbass' ? 'ENABLED' : 'OFF'}
              </span>
            </button>

            <p className="text-xs text-neutral-400 mb-2 font-bold uppercase tracking-wider">Preset Modes</p>
            
            <div className="space-y-2 mb-2 max-h-56 overflow-y-auto pr-1">
              {presets.map(preset => {
                const isSelected = equalizer === preset.id || (preset.id === 'fullbass' && isFullBass);
                return (
                  <button
                    key={preset.id}
                    onClick={() => { setEqualizer(preset.id); onClose(); }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border border-solid transition-all text-left cursor-pointer ${
                      isSelected 
                        ? 'bg-[#FF3B5C]/10 border-[#FF3B5C]/50 text-[#FF3B5C]' 
                        : 'bg-white/5 border-transparent hover:bg-white/10 text-neutral-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{preset.name}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{preset.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="flex gap-[2px] h-3 items-end">
                        <div className="w-[2px] h-3 bg-[#FF3B5C] animate-bounce" />
                        <div className="w-[2px] h-2 bg-[#FF3B5C] animate-bounce delay-100" />
                        <div className="w-[2px] h-3 bg-[#FF3B5C] animate-bounce delay-200" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 3. Playlist Create/Edit Modal
interface PlaylistModalProps extends ModalProps {
  editingPlaylist?: Playlist;
}
export const PlaylistCreateModal: React.FC<PlaylistModalProps> = ({ isOpen, onClose, editingPlaylist }) => {
  const { playlists, setPlaylists, showToast } = useApp();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isCollab, setIsCollab] = useState(false);

  useEffect(() => {
    if (editingPlaylist) {
      setName(editingPlaylist.name);
      setDesc(editingPlaylist.description);
      setCoverUrl(editingPlaylist.coverUrl);
      setIsPublic(editingPlaylist.isPublic);
      setIsCollab(editingPlaylist.isCollaborative);
    } else {
      setName('');
      setDesc('');
      setCoverUrl('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80');
      setIsPublic(true);
      setIsCollab(false);
    }
  }, [editingPlaylist, isOpen]);

  const handleSave = () => {
    if (!name.trim()) {
      showToast('Playlist name is required', 'error');
      return;
    }

    if (editingPlaylist) {
      // Edit
      const updated = playlists.map(p => {
        if (p.id === editingPlaylist.id) {
          return {
            ...p,
            name,
            description: desc,
            coverUrl: coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
            isPublic,
            isCollaborative: isCollab,
          };
        }
        return p;
      });
      setPlaylists(updated);
      window.localStorage.setItem('rbh_playlists', JSON.stringify(updated));
      showToast('Playlist updated successfully!', 'success');
    } else {
      // Create
      const newPlaylist: Playlist = {
        id: 'pl_' + Date.now(),
        name,
        description: desc,
        coverUrl: coverUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
        tracks: [],
        isPublic,
        isCollaborative: isCollab,
        createdBy: 'user',
        createdAt: new Date().toISOString(),
      };
      const updated = [...playlists, newPlaylist];
      setPlaylists(updated);
      window.localStorage.setItem('rbh_playlists', JSON.stringify(updated));
      showToast(`Playlist "${name}" created!`, 'success');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" id="playlist-create-modal">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md overflow-hidden bg-neutral-900 border border-solid border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-neutral-100">
                {editingPlaylist ? 'Edit Playlist Settings' : 'Create New Playlist'}
              </h3>
              <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-neutral-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Playlist Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="My awesome compilation"
                  className="w-full px-4 py-2.5 bg-white/5 border border-solid border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF3B5C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Description (Optional)</label>
                <textarea
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Give your playlist an elegant description..."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-white/5 border border-solid border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF3B5C] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Artwork Image URL</label>
                <input
                  type="text"
                  value={coverUrl}
                  onChange={e => setCoverUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-solid border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF3B5C] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPublic(prev => !prev)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border border-solid text-left transition-all ${
                    isPublic ? 'bg-[#FF3B5C]/10 border-[#FF3B5C]/30' : 'bg-white/5 border-transparent'
                  }`}
                >
                  {isPublic ? <Eye className="w-5 h-5 text-[#FF3B5C]" /> : <EyeOff className="w-5 h-5 text-neutral-500" />}
                  <div>
                    <p className="text-xs font-bold text-white">Visibility</p>
                    <p className="text-[10px] text-neutral-400">{isPublic ? 'Public Playlist' : 'Private Only'}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCollab(prev => !prev)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border border-solid text-left transition-all ${
                    isCollab ? 'bg-[#FF3B5C]/10 border-[#FF3B5C]/30' : 'bg-white/5 border-transparent'
                  }`}
                >
                  <Users className={`w-5 h-5 ${isCollab ? 'text-[#FF3B5C]' : 'text-neutral-500'}`} />
                  <div>
                    <p className="text-xs font-bold text-white">Collaboration</p>
                    <p className="text-[10px] text-neutral-400">{isCollab ? 'Friends can edit' : 'Owner only'}</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex gap-3 justify-end border-t border-solid border-white/5 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 hover:bg-white/5 rounded-xl text-sm font-semibold text-neutral-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#FF3B5C] hover:bg-[#FF6B81] active:scale-95 rounded-xl text-sm font-bold text-white transition-all shadow-[0_4px_16px_rgba(255,59,92,0.25)]"
              >
                {editingPlaylist ? 'Save Settings' : 'Create Playlist'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 4. Share QR Modal
interface ShareModalProps extends ModalProps {
  itemType: 'playlist' | 'track' | 'album';
  itemName: string;
}
export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, itemType, itemName }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const linkText = `https://rbh-music.stream/share/${itemType}/${itemName.toLowerCase().replace(/ /g, '-')}`;

  const copyLink = () => {
    navigator.clipboard.writeText(linkText);
    setCopied(true);
    showToast('RBH sharing link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" id="share-modal">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-sm overflow-hidden bg-neutral-900 border border-solid border-white/10 rounded-2xl p-6 shadow-2xl text-center"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#FF3B5C]" />
                <h3 className="text-lg font-bold text-neutral-100 text-left">Share {itemType}</h3>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-neutral-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 font-bold px-2 py-1 bg-white/5 rounded-lg inline-block mb-4">
              {itemName}
            </p>

            {/* Simulated QR Code Canvas mockup */}
            <div className="mx-auto w-48 h-48 bg-white p-4 rounded-xl shadow-inner relative flex flex-col items-center justify-center mb-6">
              <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-90">
                {Array.from({ length: 25 }).map((_, i) => {
                  const isCorner = i === 0 || i === 4 || i === 20 || i === 24;
                  return (
                    <div
                      key={i}
                      className={`rounded ${
                        isCorner 
                          ? 'bg-neutral-950 border-[3px] border-solid border-neutral-950 bg-transparent' 
                          : Math.random() > 0.4 ? 'bg-neutral-950' : 'bg-transparent'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black text-white px-2 py-1 rounded-md border-2 border-solid border-white text-[10px] font-black tracking-widest">
                  RBH
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 mb-6">
              Friends can scan this QR code with their camera to instantly load and listen in sync!
            </p>

            <div className="flex gap-2 bg-black/40 rounded-xl p-2 border border-solid border-white/5 items-center">
              <input
                type="text"
                readOnly
                value={linkText}
                className="bg-transparent text-left outline-none border-none text-[11px] text-neutral-400 flex-1 px-2 select-all overflow-hidden text-ellipsis whitespace-nowrap"
              />
              <button
                onClick={copyLink}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  copied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-[#FF3B5C] hover:bg-[#FF6B81] text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 5. Stripe Premium Subscription checkout simulation Modal
export const StripePremiumModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { upgradeSubscription, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'Premium Yearly' }),
      });
      const data = await res.json();
      if (data.success) {
        // Mock Stripe payment portal redirect animation
        setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      showToast('Stripe checkout simulation failed', 'error');
    }
  };

  const finalizeUpgrade = () => {
    upgradeSubscription('premium');
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="stripe-checkout-modal">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md overflow-hidden bg-neutral-900 border border-solid border-white/10 rounded-2xl p-6 shadow-2xl relative"
          >
            {!success ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#FF3B5C] fill-[#FF3B5C]" />
                    <h3 className="text-lg font-bold text-neutral-100">Upgrade to RBH Premium</h3>
                  </div>
                  <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-neutral-200">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center p-5 bg-gradient-to-br from-[#FF3B5C]/20 to-[#FF6B81]/20 rounded-2xl border border-solid border-white/5 mb-6">
                  <p className="text-xs text-[#FF3B5C] font-extrabold uppercase tracking-widest">RBH Premium</p>
                  <p className="text-4xl font-black text-white mt-1">$4.99<span className="text-sm font-semibold text-neutral-400">/mo</span></p>
                  <p className="text-xs text-neutral-400 mt-1">Unlock pristine listening dimensions</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-[#FF3B5C] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-300">
                      <strong className="text-white">Cognitive Audio</strong>: Stream special High-Fidelity VIP tracks marked with ⭐️.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-[#FF3B5C] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-300">
                      <strong className="text-white">AI Copilot Sync</strong>: Enjoy smart dynamic lyric scrolling and responsive AI-voice commands.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-[#FF3B5C] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-300">
                      <strong className="text-white">No Stream Thresholds</strong>: Endless skips, offline mock syncing, and zero ads forever.
                    </p>
                  </div>
                </div>

                <div className="border-t border-solid border-white/5 pt-4">
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF3B5C] hover:bg-[#FF6B81] active:scale-[0.98] disabled:opacity-50 text-white font-black text-sm rounded-xl transition-all shadow-[0_8px_24px_rgba(255,59,92,0.3)] cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-black fill-black" />
                        <span>Secure Checkout with Stripe</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-neutral-500 text-center mt-3 flex items-center justify-center gap-1">
                    🔒 SSL Encrypted Checkout. Simulated sandbox.
                  </p>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-center py-8"
              >
                <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-solid border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">Payment Successful!</h3>
                <p className="text-xs text-neutral-400 mt-2 px-4">
                  Stripe processed your subscription successfully. You are now authorized on the RBH network.
                </p>

                <button
                  onClick={finalizeUpgrade}
                  className="mt-8 px-6 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:brightness-110 rounded-xl text-xs font-bold text-black transition-all shadow-[0_4px_16px_rgba(16,185,129,0.3)]"
                >
                  Activate My Premium Portal
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 6. Lyrics Modal
interface LyricsModalProps extends ModalProps {
  track: Track;
  progress: number;
}
export const LyricsModal: React.FC<LyricsModalProps> = ({ isOpen, onClose, track, progress }) => {
  const { generateAiLyrics } = useApp();
  const [aiGenerating, setAiGenerating] = useState(false);
  const lyricContainerRef = useRef<HTMLDivElement | null>(null);

  const lyrics = track.lyrics || [];

  // Find active line
  const activeIndex = lyrics.findIndex((line, idx) => {
    const nextLine = lyrics[idx + 1];
    if (nextLine) {
      return progress >= line.time && progress < nextLine.time;
    }
    return progress >= line.time;
  });

  // Smooth scroll active lyric line into center view
  useEffect(() => {
    if (lyricContainerRef.current && activeIndex !== -1) {
      const activeElement = lyricContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        lyricContainerRef.current.scrollTo({
          top: activeElement.offsetTop - lyricContainerRef.current.clientHeight / 2 + activeElement.clientHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex, isOpen]);

  const handleAiLyrics = async () => {
    setAiGenerating(true);
    await generateAiLyrics(track);
    setAiGenerating(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" id="lyrics-fullscreen-modal">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FF3B5C]/10 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6B81]/10 blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="w-full max-w-2xl h-[80vh] flex flex-col justify-between p-6 z-10"
          >
            <div className="flex items-center justify-between border-b border-solid border-white/5 pb-4">
              <div className="flex items-center gap-4">
                <img src={track.coverUrl} alt={track.title} className="w-12 h-12 rounded-lg object-cover border border-solid border-white/10" />
                <div className="text-left">
                  <h3 className="font-extrabold text-white text-sm line-clamp-1">{track.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{track.artistName}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-neutral-200 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {lyrics.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <Music className="w-12 h-12 text-neutral-600 mb-4 animate-pulse" />
                <p className="text-sm font-bold text-neutral-200">No synchronized lyrics loaded</p>
                <p className="text-xs text-neutral-400 mt-1 mb-6">Let RBH cognitive engine align the lyrical frequencies in real-time.</p>
                <button
                  onClick={handleAiLyrics}
                  disabled={aiGenerating}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#FF3B5C] hover:bg-[#FF6B81] rounded-xl text-xs font-black text-white transition-all cursor-pointer disabled:opacity-50"
                >
                  {aiGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      <span>Synchronizing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate AI Synced Lyrics</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div 
                ref={lyricContainerRef}
                className="flex-1 overflow-y-auto my-6 py-12 scrollbar-none space-y-6 select-none"
              >
                {lyrics.map((line, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <p
                      key={idx}
                      className={`text-xl md:text-2xl font-black text-center transition-all duration-300 leading-relaxed cursor-pointer py-1 ${
                        isActive 
                          ? 'text-white scale-105 drop-shadow-[0_0_24px_rgba(255,59,92,0.5)]' 
                          : 'text-neutral-600 hover:text-neutral-400'
                      }`}
                    >
                      {line.text}
                    </p>
                  );
                })}
              </div>
            )}

            <div className="border-t border-solid border-white/5 pt-4">
              <Visualizer isPlaying={true} type="compact" equalizerPreset="chill" />
              <p className="text-[10px] text-neutral-500 text-center mt-2">
                ⚡️ RBH Cognitive Lyric System v1.0. Scrolling automated.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
