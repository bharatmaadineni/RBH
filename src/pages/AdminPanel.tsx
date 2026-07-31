/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sliders, Plus, BarChart2, ShieldAlert, Music, Users, 
  Trash2, Edit3, Settings, Play, CheckCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Track } from '../types';

export const AdminPanel: React.FC = () => {
  const { tracks, setTracks, showToast } = useApp();

  // Stats summary mock
  const statsSummary = [
    { label: 'Platform Streams', count: '1,248,530', percentage: '+12%', icon: BarChart2 },
    { label: 'Authorized Listeners', count: '45,392', percentage: '+8%', icon: Users },
    { label: 'Tracks Loaded', count: tracks.length.toString(), percentage: 'All nodes green', icon: Music },
  ];

  // Upload Form states
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [genre, setGenre] = useState('Synthwave');
  const [duration, setDuration] = useState(240);
  const [audioUrl, setAudioUrl] = useState('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80');

  const handleUploadTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artistName.trim()) {
      showToast('Title and Artist are required', 'error');
      return;
    }

    const newTrack: Track = {
      id: 'tr_' + Date.now(),
      title,
      artistId: 'art_1', // default Retrowave
      artistName,
      albumId: 'alb_1',
      albumName: albumName || 'Single Wave',
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      audioUrl: audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: Number(duration),
      genre,
      playCount: 1500,
      likes: 25,
      isPremium: false,
    };

    const updated = [...tracks, newTrack];
    setTracks(updated);
    window.localStorage.setItem('aura_tracks', JSON.stringify(updated));
    showToast(`Track "${title}" successfully cataloged!`, 'success');

    // Reset Form
    setTitle('');
    setArtistName('');
    setAlbumName('');
  };

  const handleDeleteTrack = (id: string) => {
    const updated = tracks.filter(t => t.id !== id);
    setTracks(updated);
    window.localStorage.setItem('aura_tracks', JSON.stringify(updated));
    showToast('Track removed from catalog database', 'success');
  };

  return (
    <div id="admin-panel" className="space-y-8 pb-32 text-left p-6 overflow-y-auto h-full scrollbar-none">
      
      {/* Platform security banner header */}
      <div className="p-4 bg-rose-500/10 border border-solid border-rose-500/25 rounded-2xl flex items-center gap-3" id="admin-security-banner">
        <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 animate-pulse" />
        <div className="text-left">
          <p className="text-xs font-black text-white">System Security Clearance: Authorized</p>
          <p className="text-[10px] text-rose-400 mt-0.5">Clearing catalog deletions or track metadata insertions will modify global storage keys instantly.</p>
        </div>
      </div>

      {/* Analytics widgets metrics rows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="admin-metrics-row">
        {statsSummary.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="p-5 bg-neutral-900/50 border border-solid border-white/5 rounded-2xl flex items-center justify-between"
              id={`metric-box-${idx}`}
            >
              <div className="text-left">
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-white mt-1.5">{stat.count}</p>
                <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-md font-bold mt-1 inline-block">
                  {stat.percentage}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl text-neutral-400">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Form Song Upload + Database ledger list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="admin-grid-row">
        
        {/* Upload Track Form */}
        <div className="lg:col-span-1 p-6 bg-neutral-900/40 border border-solid border-white/5 rounded-2xl text-left" id="admin-upload-block">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Upload New Song Track</span>
          </h3>

          <form onSubmit={handleUploadTrack} className="space-y-4" id="upload-track-form">
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5">Track Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Midnight Driver"
                className="w-full px-3.5 py-2 bg-black/40 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5">Artist Name</label>
              <input
                type="text"
                required
                value={artistName}
                onChange={e => setArtistName(e.target.value)}
                placeholder="The Retro Wave"
                className="w-full px-3.5 py-2 bg-black/40 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5">Album / Single Name</label>
              <input
                type="text"
                value={albumName}
                onChange={e => setAlbumName(e.target.value)}
                placeholder="Neon Horizon"
                className="w-full px-3.5 py-2 bg-black/40 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5">Genre Wave</label>
                <select
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Synthwave">Synthwave</option>
                  <option value="Lo-fi Chill">Lo-fi Chill</option>
                  <option value="Acoustic">Acoustic</option>
                  <option value="House">House</option>
                  <option value="Electronic">Electronic</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5">Duration (Seconds)</label>
                <input
                  type="number"
                  required
                  value={duration}
                  onChange={e => setDuration(Number(e.target.value))}
                  placeholder="240"
                  className="w-full px-3.5 py-2 bg-black/40 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5">Streaming Audio URL</label>
              <input
                type="text"
                required
                value={audioUrl}
                onChange={e => setAudioUrl(e.target.value)}
                placeholder="https://example.com/stream.mp3"
                className="w-full px-3.5 py-2 bg-black/40 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 text-left truncate"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5">Artwork Cover URL</label>
              <input
                type="text"
                required
                value={coverUrl}
                onChange={e => setCoverUrl(e.target.value)}
                className="w-full px-3.5 py-2 bg-black/40 border border-solid border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 text-left truncate"
              />
            </div>



            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-extrabold text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_16px_rgba(34,211,238,0.25)]"
            >
              Insert Track to Ledger
            </button>
          </form>
        </div>

        {/* Database Catalog Ledger list */}
        <div className="lg:col-span-2 p-6 bg-neutral-900/40 border border-solid border-white/5 rounded-2xl flex flex-col justify-between" id="admin-ledger-block">
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 border-b border-solid border-white/5 pb-2">Catalog Database Ledger</h3>
            
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1" id="ledger-tracks-scroll">
              {tracks.map(tr => (
                <div
                  key={tr.id}
                  className="flex items-center justify-between p-3 bg-neutral-950/40 rounded-xl border border-solid border-white/5"
                  id={`ledger-track-row-${tr.id}`}
                >
                  <div className="flex items-center gap-3 text-left min-w-0">
                    <img src={tr.coverUrl} alt={tr.title} className="w-9 h-9 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                        {tr.title}
                      </p>
                      <p className="text-[10px] text-neutral-400 truncate mt-0.5">{tr.artistName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-neutral-400 font-bold uppercase">
                      {tr.genre}
                    </span>
                    <button
                      onClick={() => handleDeleteTrack(tr.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Track"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-neutral-600 mt-4">
            ⚡️ System synchronized. Total active catalog nodes: {tracks.length} tracks.
          </p>
        </div>

      </div>

    </div>
  );
};
