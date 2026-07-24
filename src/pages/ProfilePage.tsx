/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, Zap, Edit2, BarChart3, Clock, Image as ImageIcon, Upload, Plus, Trash2, Maximize2, CheckCircle2, UserCheck, X, Sparkles, Camera, Heart, Check, Music } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: string;
  createdAt: string;
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal_1',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    caption: 'Neon Main Stage Live',
    category: 'Concert',
    createdAt: '2026-07-20',
  },
  {
    id: 'gal_2',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    caption: 'Late Night Studio Jam',
    category: 'Studio',
    createdAt: '2026-07-18',
  },
  {
    id: 'gal_3',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    caption: 'Classic Vinyl Collection',
    category: 'Aesthetic',
    createdAt: '2026-07-15',
  },
  {
    id: 'gal_4',
    url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    caption: 'Acoustic Guitar Vibrations',
    category: 'Acoustic',
    createdAt: '2026-07-10',
  },
  {
    id: 'gal_5',
    url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    caption: 'Electric Summer Festival',
    category: 'Festival',
    createdAt: '2026-07-05',
  },
  {
    id: 'gal_6',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    caption: 'Cyberpunk Synthwave Cover',
    category: 'Artwork',
    createdAt: '2026-07-01',
  },
];

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80',
];

export const ProfilePage: React.FC = () => {
  const { 
    user, 
    updateUserProfile, 
    upgradeSubscription, 
    getStats,
    showToast
  } = useApp();

  const [username, setUsername] = useState(user?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [bio, setBio] = useState(() => localStorage.getItem('rbh_user_bio') || 'Listening to high-fidelity audio on RBH Music 🎧');
  const [favoriteGenre, setFavoriteGenre] = useState(() => localStorage.getItem('rbh_user_genre') || 'Synthwave & Electronic');
  const [isEditing, setIsEditing] = useState(false);

  // Gallery state with persistence
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const stored = localStorage.getItem('rbh_user_gallery');
    if (stored) {
      try { return JSON.parse(stored); } catch { /* ignore error */ }
    }
    return DEFAULT_GALLERY_ITEMS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Image Form state
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState('Concert');

  // Save gallery to local storage
  useEffect(() => {
    localStorage.setItem('rbh_user_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  // Load listening stats
  const stats = getStats();
  const maxWeeklyMins = Math.max(...stats.weeklyMinutes, 1);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      showToast('Username cannot be empty', 'error');
      return;
    }
    updateUserProfile(username.trim(), avatarUrl);
    localStorage.setItem('rbh_user_bio', bio.trim());
    localStorage.setItem('rbh_user_genre', favoriteGenre);
    setIsEditing(false);
  };

  const handleSubToggle = () => {
    if (!user) return;
    const current = user.subscriptionStatus;
    const target = current === 'premium' ? 'free' : 'premium';
    upgradeSubscription(target);
  };

  // Upload local file image
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isForAvatar = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (isForAvatar) {
        setAvatarUrl(dataUrl);
        showToast('Avatar image loaded!', 'success');
      } else {
        setNewImageUrl(dataUrl);
        showToast('Photo uploaded ready to add!', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      showToast('Please upload an image or provide an image URL', 'error');
      return;
    }

    const newItem: GalleryItem = {
      id: 'gal_' + Date.now(),
      url: newImageUrl.trim(),
      caption: newCaption.trim() || 'Music Moment',
      category: newCategory,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setGalleryItems(prev => [newItem, ...prev]);
    showToast('Photo added to your gallery!', 'success');
    setNewImageUrl('');
    setNewCaption('');
    setShowAddModal(false);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    if (lightboxItem?.id === id) setLightboxItem(null);
    showToast('Photo removed from gallery', 'info');
  };

  const handleSetAvatarFromGallery = (url: string) => {
    setAvatarUrl(url);
    updateUserProfile(username || user?.username || 'User', url);
    showToast('Profile picture updated from gallery photo!', 'success');
  };

  // Categories list
  const categories = ['All', 'Concert', 'Studio', 'Aesthetic', 'Acoustic', 'Festival', 'Artwork'];

  const filteredGallery = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Weekdays label map
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div id="profile-view" className="space-y-8 pb-32 text-left p-4 sm:p-6 overflow-y-auto h-full scrollbar-none max-w-7xl mx-auto">
      
      {/* 1. Main Profile Header / Form Card */}
      <div className="relative overflow-hidden bg-neutral-900/70 border border-solid border-white/10 rounded-3xl p-6 sm:p-8" id="profile-details-card">
        {/* Background glow banner */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-[#E50914]/20 via-[#FF3B5C]/15 to-violet-900/30 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar Picture with Camera Badge */}
          <div className="relative group">
            <img 
              src={avatarUrl || user?.avatarUrl} 
              alt={username} 
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-solid border-black shadow-2xl ring-2 ring-white/10" 
            />
            <button
              onClick={() => setIsEditing(prev => !prev)}
              className="absolute bottom-1 right-1 p-2.5 bg-[#E50914] hover:bg-[#FF3B5C] text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              id="edit-profile-trigger"
              title="Edit Profile & Avatar"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left w-full">
            {!isEditing ? (
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{username || user?.username}</h2>
                    <p className="text-xs text-neutral-400 mt-0.5">{user?.email || 'listener@rbhmusic.com'}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="self-center sm:self-auto px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-solid border-white/15 text-white font-bold text-xs rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <p className="text-xs text-neutral-300 italic bg-black/30 p-2.5 rounded-xl border border-white/5 max-w-xl">
                  "{bio}"
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-3 justify-center sm:justify-start">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-solid ${
                    user?.subscriptionStatus === 'premium' 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                      : 'bg-white/5 border-white/10 text-neutral-400'
                  }`}>
                    <Award className="w-3.5 h-3.5" />
                    <span>{user?.subscriptionStatus === 'premium' ? 'VIP Premium Listener' : 'Free Standard Listener'}</span>
                  </span>

                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                    <Music className="w-3.5 h-3.5" />
                    <span>{favoriteGenre}</span>
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProfileSave} className="mt-2 space-y-4 max-w-lg" id="profile-editor-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full px-3.5 py-2 bg-black/60 border border-solid border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">Favorite Genre</label>
                    <input
                      type="text"
                      value={favoriteGenre}
                      onChange={e => setFavoriteGenre(e.target.value)}
                      className="w-full px-3.5 py-2 bg-black/60 border border-solid border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#E50914]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">Status / Bio</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Tell other listeners what you love..."
                    className="w-full px-3.5 py-2 bg-black/60 border border-solid border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#E50914] resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider">Select Avatar or Upload Custom Image</label>
                    <label className="cursor-pointer text-[10px] font-bold text-[#E50914] hover:underline flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                      <input type="file" accept="image/*" onChange={e => handleFileUpload(e, true)} className="hidden" />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    {PRESET_AVATARS.map((av, idx) => {
                      const isSel = avatarUrl === av;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(av)}
                          className={`relative rounded-full p-0.5 border-2 border-solid transition-transform hover:scale-110 cursor-pointer ${
                            isSel ? 'border-[#E50914] scale-105' : 'border-transparent'
                          }`}
                        >
                          <img src={av} alt="avatar preset" className="w-9 h-9 rounded-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#E50914] hover:bg-[#FF3B5C] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-[#E50914]/20"
                  >
                    Save Profile Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-solid border-white/10 text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. Gallery & Music Moments Section */}
      <div className="bg-neutral-900/50 border border-solid border-white/10 rounded-3xl p-6 space-y-6" id="user-gallery-section">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#E50914]" />
              <span>Your Photo Gallery</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300">
                {galleryItems.length}
              </span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Upload and showcase your favorite concert memories, album cover art, and music moments.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#E50914] hover:bg-[#FF3B5C] text-white font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#E50914]/20 self-start sm:self-auto"
            id="add-gallery-photo-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo to Gallery</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="gallery-category-bar">
          {categories.map(cat => {
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  isSel
                    ? 'bg-[#E50914] text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl p-6">
            <ImageIcon className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-neutral-400">No photos found in this category</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Add First Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" id="gallery-photo-grid">
            {filteredGallery.map(item => {
              const isCurrentAvatar = avatarUrl === item.url;
              return (
                <div 
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden aspect-square bg-black border border-solid border-white/10 hover:border-white/30 transition-all duration-300 shadow-md"
                >
                  <img 
                    src={item.url} 
                    alt={item.caption} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />

                  {/* Active Avatar Badge */}
                  {isCurrentAvatar && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#E50914] text-white text-[9px] font-black uppercase tracking-wider rounded-md shadow-md flex items-center gap-1 z-10">
                      <Check className="w-3 h-3" />
                      <span>Current Avatar</span>
                    </div>
                  )}

                  {/* Category Tag */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md text-white/80 text-[9px] font-bold rounded-md z-10">
                    {item.category}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-end gap-2">
                    <p className="text-xs font-bold text-white truncate">{item.caption}</p>
                    
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => handleSetAvatarFromGallery(item.url)}
                        className="flex-1 py-1 px-2 bg-white/20 hover:bg-[#E50914] text-white text-[10px] font-extrabold rounded-lg transition-colors flex items-center justify-center gap-1"
                        title="Set as Avatar"
                      >
                        <UserCheck className="w-3 h-3" />
                        <span>Use Avatar</span>
                      </button>

                      <button
                        onClick={() => setLightboxItem(item)}
                        className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-colors"
                        title="View Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-1.5 bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg transition-colors"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Interactive Subscription Control card */}
      <div className="p-6 bg-gradient-to-br from-violet-950/20 to-neutral-900 border border-solid border-violet-500/20 rounded-3xl" id="subscription-control-card">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-2 max-w-xl">
            <h3 className="text-lg font-black text-white flex items-center gap-1.5">
              <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
              <span>Subscription Desk</span>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Toggle your subscription status below to experience standard sandbox boundaries or unlock pristine VIP pro tracks, real-time scrolling lyrics, and intelligent voice command routing.
            </p>
          </div>

          <button
            onClick={handleSubToggle}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              user?.subscriptionStatus === 'premium'
                ? 'bg-rose-500/10 hover:bg-rose-500/20 border border-solid border-rose-500/30 text-rose-400'
                : 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-black shadow-[0_4px_16px_rgba(245,158,11,0.25)]'
            }`}
            id="sub-desk-toggle"
          >
            {user?.subscriptionStatus === 'premium' ? 'Downgrade to Standard' : 'Activate Free Premium'}
          </button>
        </div>
      </div>

      {/* 4. Immersive Listening Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="stats-dashboard-row">
        
        {/* Weekly listening time bar charts */}
        <div className="md:col-span-2 p-6 bg-neutral-900/50 border border-solid border-white/5 rounded-2xl" id="stats-weekly-chart">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-4.5 h-4.5 text-[#E50914]" />
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-neutral-300">Acoustic Activity (Minutes)</h4>
          </div>

          <div className="flex items-end justify-between h-40 gap-4 mt-8 px-4" id="visual-stats-grid">
            {stats.weeklyMinutes.map((mins, idx) => {
              const barHeightPercentage = (mins / maxWeeklyMins) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="text-[9px] font-bold text-neutral-400">{mins}m</div>
                  <div className="w-full relative group h-full flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-[#E50914] to-violet-500 rounded-lg group-hover:brightness-110 transition-all duration-300"
                      style={{ height: `${barHeightPercentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-black text-neutral-500 uppercase tracking-wider">{weekdays[idx]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Favorite genres breakdown */}
        <div className="p-6 bg-neutral-900/50 border border-solid border-white/5 rounded-2xl text-left" id="stats-genres-pie">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-4.5 h-4.5 text-violet-400" />
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-neutral-300">Wavelength Genres</h4>
          </div>

          <div className="space-y-4" id="stats-genre-percent-list">
            {stats.topGenres.map((g, idx) => {
              const colors = ['bg-[#E50914]', 'bg-violet-500', 'bg-pink-500', 'bg-amber-400'];
              const color = colors[idx % colors.length];
              return (
                <div key={idx} className="space-y-1.5" id={`percent-card-${idx}`}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-neutral-300">{g.name}</span>
                    <span className="text-neutral-500">{g.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className={`${color} h-full rounded-full`} style={{ width: `${g.percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MODAL: Add New Photo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-solid border-white/15 rounded-2xl p-6 w-full max-w-md text-left relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-white rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-[#E50914]" />
              <span>Add Photo to Gallery</span>
            </h3>

            <form onSubmit={handleAddGalleryImage} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">
                  Upload Image File
                </label>
                <div className="border-2 border-dashed border-white/15 hover:border-[#E50914] rounded-xl p-4 text-center cursor-pointer transition-colors bg-black/30">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, false)}
                    className="hidden"
                    id="modal-file-input"
                  />
                  <label htmlFor="modal-file-input" className="cursor-pointer flex flex-col items-center gap-1.5">
                    <Upload className="w-6 h-6 text-[#E50914]" />
                    <span className="text-xs font-bold text-neutral-300">Choose file from your computer</span>
                    <span className="text-[10px] text-neutral-500">Supports PNG, JPG, WEBP</span>
                  </label>
                </div>
              </div>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-[#181818] px-2 text-[10px] text-neutral-500 font-bold uppercase">Or paste URL</span>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">
                  Image Web URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={e => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-black/50 border border-solid border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">
                  Photo Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rocking live at Madison Square Garden"
                  value={newCaption}
                  onChange={e => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2 bg-black/50 border border-solid border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#E50914]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-black/50 border border-solid border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-[#E50914]"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/20 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E50914] text-white text-xs font-black rounded-xl hover:bg-[#FF3B5C] cursor-pointer shadow-md shadow-[#E50914]/20"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIGHTBOX: Fullscreen Image View */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full flex flex-col items-center">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <img 
              src={lightboxItem.url} 
              alt={lightboxItem.caption} 
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain border border-solid border-white/10 shadow-2xl" 
            />

            <div className="w-full mt-4 flex items-center justify-between text-left px-2">
              <div>
                <h4 className="text-lg font-black text-white">{lightboxItem.caption}</h4>
                <p className="text-xs text-neutral-400">Category: {lightboxItem.category} • Added {lightboxItem.createdAt}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleSetAvatarFromGallery(lightboxItem.url);
                    setLightboxItem(null);
                  }}
                  className="px-4 py-2 bg-[#E50914] hover:bg-[#FF3B5C] text-white text-xs font-black rounded-xl cursor-pointer flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Set as Profile Avatar</span>
                </button>

                <button
                  onClick={() => handleDeleteGalleryItem(lightboxItem.id)}
                  className="p-2 bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

