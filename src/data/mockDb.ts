/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Track, Album, Artist, Playlist, UserProfile, FriendActivity, ChatMessage, ListeningStats } from '../types';

// Real stable HTML5 audio URLs
const TRACK_URLS = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'art_1',
    name: 'Rbh immersive high-fidelity',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    bio: 'Pioneering neon retro-wave collective blending nostalgic 80s synthesizers with modern cyberpunk basslines.',
    followers: 245300,
    genres: ['Synthwave', 'Electronic', 'Retrowave'],
  },
  {
    id: 'art_2',
    name: 'Luna Echoes',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    bio: 'Etherial indie producer crafting atmospheric chillwave and lo-fi textures for late-night dreamers.',
    followers: 189200,
    genres: ['Lo-fi Chill', 'Ambient', 'Downtempo'],
  },
  {
    id: 'art_3',
    name: 'Acoustic Dreams',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    bio: 'Singer-songwriter delivering raw emotion through minimalist acoustic guitar and soul-stirring storytelling.',
    followers: 98400,
    genres: ['Acoustic', 'Indie Folk', 'Singer-Songwriter'],
  },
  {
    id: 'art_4',
    name: 'Vibe Selector',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    bio: 'Global DJ duo pushing boundaries with deep house, tech-house, and high-energy progressive dance floor heaters.',
    followers: 412000,
    genres: ['House', 'Dance', 'Club'],
  },
];

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'alb_1',
    title: 'Neon Horizon',
    artistId: 'art_1',
    artistName: 'The Retro Wave',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    releaseDate: '2025-05-12',
    genre: 'Synthwave',
    description: 'A nostalgic high-octane journey featuring Meghallo.',
    tracks: ['tr_11'],
  },
  {
    id: 'alb_2',
    title: 'Forest Whispers',
    artistId: 'art_2',
    artistName: 'Luna Echoes',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80',
    releaseDate: '2025-11-20',
    genre: 'Lo-fi Chill',
    description: 'Organic textures and soothing field recordings.',
    tracks: ['tr_11'],
  },
  {
    id: 'alb_3',
    title: 'Starlight Memories',
    artistId: 'art_3',
    artistName: 'Acoustic Dreams',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
    releaseDate: '2026-02-14',
    genre: 'Acoustic',
    description: 'Intimate fireplace recordings capturing pure acoustic resonance.',
    tracks: ['tr_11'],
  },
  {
    id: 'alb_4',
    title: 'Midnight Gridlock',
    artistId: 'art_4',
    artistName: 'Vibe Selector',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    releaseDate: '2026-06-30',
    genre: 'House',
    description: 'Pulsing rhythms and baseline grooves.',
    tracks: ['tr_11'],
  },
];

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'tr_11',
    title: 'Meghallo',
    artistId: 'art_1',
    artistName: 'Rbh immersive high-fidelity',
    albumId: 'alb_1',
    albumName: 'Neon Horizon',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/Meghaallo-SenSongsMp3.Co(2).mp3',
    duration: 278,
    genre: 'Synthwave',
    playCount: 185000,
    likes: 9200,
    lyrics: [
      { time: 0, text: "[Melodic Intro]" },
      { time: 12, text: "Meghallo floating high above the clouds" },
      { time: 24, text: "Lost in the rhythm away from the crowds" },
      { time: 36, text: "Feel the breeze carrying our song tonight" },
      { time: 48, text: "Dancing in the warm golden light" },
    ],
  },
  {
    id: 'tr_12',
    title: 'DARSHANA',
    artistId: 'art_1',
    artistName: 'Rbh immersive high-fidelity',
    albumId: 'alb_1',
    albumName: 'Hridayam BGM',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/Darshana%20song%20bgm%20_%20hridayam%20bgm%20ringtone_best%20bgm%20_%20trending%20Telugu%20bgm%20ringtones%20_%209BgmMusic(2).m4a',
    duration: 180,
    genre: 'Soundtrack BGM',
    playCount: 210000,
    likes: 14500,
    lyrics: [
      { time: 0, text: "[Darshana Instrumental BGM Intro]" },
      { time: 15, text: "Feel the pulse of Hridayam melodies" },
      { time: 30, text: "Darshana reverberating in high-fidelity" },
    ],
  },
  {
    id: 'tr_13',
    title: 'anthinthom',
    artistId: 'art_1',
    artistName: 'Rbh immersive high-fidelity',
    albumId: 'alb_1',
    albumName: 'Vaishali Classic',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/Athinthom_-_S_P_Balasubrahmanyam_Vaishali(2).mp3',
    duration: 278,
    genre: 'Classic Melody',
    playCount: 235000,
    likes: 16800,
    lyrics: [
      { time: 0, text: "[Athinthom Classical Instrumental Intro]" },
      { time: 15, text: "Athinthom rhythm by S.P. Balasubrahmanyam" },
      { time: 30, text: "Timeless Vaishali melody in high-fidelity" },
    ],
  },
  {
    id: 'tr_14',
    title: 'karthikeya',
    artistId: 'art_1',
    artistName: 'Rbh immersive high-fidelity',
    albumId: 'alb_1',
    albumName: 'Karthikeya 2 BGM',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
    audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/karthikeya_2_flute_bgm.mp3',
    duration: 145,
    genre: 'Soundtrack BGM',
    playCount: 260000,
    likes: 19500,
    lyrics: [
      { time: 0, text: "[Karthikeya Flute BGM Theme Intro]" },
      { time: 12, text: "Mystic flute melody echoing with divine resonance" },
      { time: 28, text: "Karthikeya 2 theme in immersive high-fidelity" },
    ],
  },
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl_dm1',
    name: 'FAVOURITE MUSIC',
    description: 'Your curated favourite tracks featuring Meghallo, DARSHANA, anthinthom & karthikeya.',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80',
    tracks: ['tr_11', 'tr_12', 'tr_13', 'tr_14'],
    isPublic: true,
    isCollaborative: true,
    createdBy: 'system',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'pl_1',
    name: 'Chill Vibes',
    description: 'Perfect lofi beats, atmospheric ambient textures, and soft acoustics.',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80',
    tracks: ['tr_11'],
    isPublic: true,
    isCollaborative: false,
    createdBy: 'system',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'pl_2',
    name: "Today's Top Hits",
    description: 'The hottest tracks trending on the airwaves.',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    tracks: ['tr_11'],
    isPublic: true,
    isCollaborative: false,
    createdBy: 'system',
    createdAt: '2026-02-01T00:00:00.000Z',
  },
  {
    id: 'pl_3',
    name: 'Workout Hits',
    description: 'High octane progressive electronic and bass rhythms to drive energy.',
    coverUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80',
    tracks: ['tr_11'],
    isPublic: true,
    isCollaborative: false,
    createdBy: 'system',
    createdAt: '2026-03-01T00:00:00.000Z',
  },
  {
    id: 'pl_4',
    name: 'Peaceful Piano',
    description: 'Beautiful ambient classical keys and solo piano compositions.',
    coverUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&q=80',
    tracks: ['tr_11'],
    isPublic: true,
    isCollaborative: false,
    createdBy: 'system',
    createdAt: '2026-04-01T00:00:00.000Z',
  },
];

export const MOCK_GENRES = [
  'All',
  'Synthwave',
  'Lo-fi Chill',
  'Acoustic',
  'House',
  'Electronic',
  'Ambient',
  'Jazz',
  'Hip-Hop',
  'Rock',
];

// Helper to load/save state from local storage
const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

// State Store Keys
const KEYS = {
  USER: 'aura_user',
  TRACKS: 'aura_tracks',
  ALBUMS: 'aura_albums',
  ARTISTS: 'aura_artists',
  PLAYLISTS: 'aura_playlists',
  FAVORITES: 'aura_favorites',
  HISTORY: 'aura_history',
  CHAT: 'aura_chat_messages',
  STATS: 'aura_listening_stats',
  FRIENDS: 'aura_friends_activity',
  SEARCH_HISTORY: 'aura_search_history',
  FOLLOWED_ARTISTS: 'aura_followed_artists',
  SAVED_ALBUMS: 'aura_saved_albums',
};

// Initial User Profile (Default unauthenticated / guest)
const DEFAULT_USER: UserProfile = {
  uid: 'guest',
  username: 'Guest Listener',
  email: '',
  subscriptionStatus: 'free',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
  listeningStreak: 0,
  listeningTime: 0,
};

// Default Friend Activity
const DEFAULT_FRIENDS: FriendActivity[] = [
  {
    id: 'f_1',
    userId: 'u_friend_1',
    username: 'Zephyr_Tune',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=80',
    status: 'listening',
    trackTitle: 'Midnight Driver',
    trackArtist: 'The Retro Wave',
    timestamp: '2m ago',
  },
  {
    id: 'f_2',
    userId: 'u_friend_2',
    username: 'LoFi_Princess',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    status: 'listening',
    trackTitle: 'Raindrops & Coffee',
    trackArtist: 'Luna Echoes',
    timestamp: '5m ago',
  },
  {
    id: 'f_3',
    userId: 'u_friend_3',
    username: 'GuitarGeek',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80',
    status: 'offline',
    timestamp: '3h ago',
  },
];

// Default Chat Messages
const DEFAULT_CHAT: ChatMessage[] = [
  {
    id: 'c_1',
    userId: 'u_friend_1',
    username: 'Zephyr_Tune',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=80',
    text: 'RBH Music has the best lofi playlists for coding right now. Highly recommend Luna Echoes!',
    timestamp: '09:05 AM',
  },
  {
    id: 'c_2',
    userId: 'u_friend_2',
    username: 'LoFi_Princess',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    text: 'Yes! Rainforest sounds in Forest Whispers is so relaxing 🌲',
    timestamp: '09:07 AM',
  },
];

// Default Listening Stats
const DEFAULT_STATS: ListeningStats = {
  topGenres: [
    { name: 'Lo-fi Chill', percentage: 42 },
    { name: 'Synthwave', percentage: 28 },
    { name: 'House', percentage: 18 },
    { name: 'Acoustic', percentage: 12 },
  ],
  weeklyMinutes: [120, 180, 140, 220, 190, 240, 150],
  monthlyPlays: 248,
  streak: 5,
};

// Database class helper to export
export const db = {
  // Authentication / User Profile
  getUser: (): UserProfile => {
    const stored = getLocalStorage<UserProfile>(KEYS.USER, DEFAULT_USER);
    if (stored && stored.uid === 'user_default') {
      setLocalStorage<UserProfile>(KEYS.USER, DEFAULT_USER);
      return DEFAULT_USER;
    }
    return stored || DEFAULT_USER;
  },
  setUser: (user: UserProfile) => setLocalStorage<UserProfile>(KEYS.USER, user),
  
  // Tracks
  getTracks: (): Track[] => {
    const stored = getLocalStorage<Track[]>(KEYS.TRACKS, INITIAL_TRACKS);
    const storedIds = new Set(stored.map(t => t.id));
    const missingInitials = INITIAL_TRACKS.filter(t => !storedIds.has(t.id));
    let result = stored;
    if (missingInitials.length > 0) {
      result = [...stored, ...missingInitials];
    }
    // Filter to tr_11, tr_12, tr_13, tr_14 and matching titles
    result = result.filter(t => t.id === 'tr_11' || t.id === 'tr_12' || t.id === 'tr_13' || t.id === 'tr_14' || t.title.toLowerCase().includes('meghallo') || t.title.toLowerCase().includes('darshana') || t.title.toLowerCase().includes('anthinthom') || t.title.toLowerCase().includes('karthikeya'));
    if (!result.some(t => t.id === 'tr_12')) {
      const darshana = INITIAL_TRACKS.find(t => t.id === 'tr_12');
      if (darshana) result.push(darshana);
    }
    if (!result.some(t => t.id === 'tr_13')) {
      const anthinthom = INITIAL_TRACKS.find(t => t.id === 'tr_13');
      if (anthinthom) result.push(anthinthom);
    }
    if (!result.some(t => t.id === 'tr_14')) {
      const karthikeya = INITIAL_TRACKS.find(t => t.id === 'tr_14');
      if (karthikeya) result.push(karthikeya);
    }
    result = result.map(t => {
      if (t.id === 'tr_11') {
        return {
          ...t,
          title: 'Meghallo',
          audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/Meghaallo-SenSongsMp3.Co(2).mp3',
          artistName: 'Rbh immersive high-fidelity',
          fileSize: '10.6 MB',
        };
      }
      if (t.id === 'tr_12') {
        return {
          ...t,
          title: 'DARSHANA',
          audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/Darshana%20song%20bgm%20_%20hridayam%20bgm%20ringtone_best%20bgm%20_%20trending%20Telugu%20bgm%20ringtones%20_%209BgmMusic(2).m4a',
          artistName: 'Rbh immersive high-fidelity',
          fileSize: '6.9 MB',
        };
      }
      if (t.id === 'tr_13') {
        return {
          ...t,
          title: 'anthinthom',
          audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/Athinthom_-_S_P_Balasubrahmanyam_Vaishali(2).mp3',
          artistName: 'Rbh immersive high-fidelity',
          fileSize: '10.6 MB',
        };
      }
      if (t.id === 'tr_14') {
        return {
          ...t,
          title: 'karthikeya',
          audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/karthikeya_2_flute_bgm.mp3',
          artistName: 'Rbh immersive high-fidelity',
          fileSize: '5.8 MB',
        };
      }
      return t;
    });
    setLocalStorage<Track[]>(KEYS.TRACKS, result);
    return result;
  },
  setTracks: (tracks: Track[]) => setLocalStorage<Track[]>(KEYS.TRACKS, tracks),
  addTrack: (track: Track) => {
    const tracks = db.getTracks();
    tracks.push(track);
    db.setTracks(tracks);
  },
  updateTrack: (updated: Track) => {
    const tracks = db.getTracks().map(t => t.id === updated.id ? updated : t);
    db.setTracks(tracks);
  },
  deleteTrack: (id: string) => {
    const tracks = db.getTracks().filter(t => t.id !== id);
    db.setTracks(tracks);
  },

  // Albums
  getAlbums: (): Album[] => {
    const stored = getLocalStorage<Album[]>(KEYS.ALBUMS, INITIAL_ALBUMS);
    const updated = stored.map(a => ({
      ...a,
      tracks: ['tr_11'],
    }));
    setLocalStorage<Album[]>(KEYS.ALBUMS, updated);
    return updated;
  },
  setAlbums: (albums: Album[] = []) => setLocalStorage<Album[]>(KEYS.ALBUMS, albums),
  addAlbum: (album: Album) => {
    const albums = db.getAlbums();
    albums.push(album);
    db.setAlbums(albums);
  },
  updateAlbum: (updated: Album) => {
    const albums = db.getAlbums().map(a => a.id === updated.id ? updated : a);
    db.setAlbums(albums);
  },

  // Artists
  getArtists: (): Artist[] => getLocalStorage<Artist[]>(KEYS.ARTISTS, INITIAL_ARTISTS),
  setArtists: (artists: Artist[]) => setLocalStorage<Artist[]>(KEYS.ARTISTS, artists),
  addArtist: (artist: Artist) => {
    const artists = db.getArtists();
    artists.push(artist);
    db.setArtists(artists);
  },

  // Playlists
  getPlaylists: (): Playlist[] => {
    const stored = getLocalStorage<Playlist[]>(KEYS.PLAYLISTS, INITIAL_PLAYLISTS);
    const filtered = stored.filter(p => !['pl_dm2', 'pl_dm3', 'pl_dm4', 'pl_dm5', 'pl_dm6'].includes(p.id));
    const updated = filtered.map(p => {
      if (p.id === 'pl_dm1') {
        return {
          ...p,
          name: 'FAVOURITE MUSIC',
          description: 'Your curated favourite tracks featuring Meghallo, DARSHANA, anthinthom & karthikeya.',
          tracks: ['tr_11', 'tr_12', 'tr_13', 'tr_14'],
        };
      }
      return p;
    });
    setLocalStorage<Playlist[]>(KEYS.PLAYLISTS, updated);
    return updated;
  },
  setPlaylists: (playlists: Playlist[]) => setLocalStorage<Playlist[]>(KEYS.PLAYLISTS, playlists),
  createPlaylist: (playlist: Playlist) => {
    const playlists = db.getPlaylists();
    playlists.push(playlist);
    db.setPlaylists(playlists);
  },
  updatePlaylist: (updated: Playlist) => {
    const playlists = db.getPlaylists().map(p => p.id === updated.id ? updated : p);
    db.setPlaylists(playlists);
  },
  deletePlaylist: (id: string) => {
    const playlists = db.getPlaylists().filter(p => p.id !== id);
    db.setPlaylists(playlists);
  },

  // Liked / Saved state
  getFavorites: (): string[] => {
    return ['tr_11'];
  },
  setFavorites: (favorites: string[]) => setLocalStorage<string[]>(KEYS.FAVORITES, favorites),
  toggleFavorite: (trackId: string): boolean => {
    const favorites = db.getFavorites();
    const isFav = favorites.includes(trackId);
    let newFavs: string[];
    if (isFav) {
      newFavs = favorites.filter(id => id !== trackId);
    } else {
      newFavs = [...favorites, trackId];
    }
    db.setFavorites(newFavs);
    return !isFav;
  },

  getSavedAlbums: (): string[] => getLocalStorage<string[]>(KEYS.SAVED_ALBUMS, ['alb_1']), // Album IDs
  setSavedAlbums: (albums: string[]) => setLocalStorage<string[]>(KEYS.SAVED_ALBUMS, albums),
  toggleSavedAlbum: (albumId: string): boolean => {
    const albums = db.getSavedAlbums();
    const isSaved = albums.includes(albumId);
    let newSaved: string[];
    if (isSaved) {
      newSaved = albums.filter(id => id !== albumId);
    } else {
      newSaved = [...albums, albumId];
    }
    db.setSavedAlbums(newSaved);
    return !isSaved;
  },

  getFollowedArtists: (): string[] => getLocalStorage<string[]>(KEYS.FOLLOWED_ARTISTS, ['art_1', 'art_2']), // Artist IDs
  setFollowedArtists: (artists: string[]) => setLocalStorage<string[]>(KEYS.FOLLOWED_ARTISTS, artists),
  toggleFollowArtist: (artistId: string): boolean => {
    const artists = db.getFollowedArtists();
    const isFollowing = artists.includes(artistId);
    let newFollowed: string[];
    if (isFollowing) {
      newFollowed = artists.filter(id => id !== artistId);
    } else {
      newFollowed = [...artists, artistId];
    }
    db.setFollowedArtists(newFollowed);
    return !isFollowing;
  },

  // Search history
  getSearchHistory: (): string[] => getLocalStorage<string[]>(KEYS.SEARCH_HISTORY, ['Meghallo']),
  addSearchHistory: (query: string) => {
    const history = db.getSearchHistory().filter(q => q.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    db.setSearchHistory(history.slice(0, 10)); // Keep top 10
  },
  setSearchHistory: (history: string[]) => setLocalStorage<string[]>(KEYS.SEARCH_HISTORY, history),
  clearSearchHistory: () => setLocalStorage<string[]>(KEYS.SEARCH_HISTORY, []),

  // Listening History
  getHistory: (): { trackId: string; playedAt: string }[] => 
    [{ trackId: 'tr_11', playedAt: new Date().toISOString() }],
  addToHistory: (trackId: string) => {
    const history = db.getHistory();
    // Prepend to history
    history.unshift({ trackId, playedAt: new Date().toISOString() });
    // Limit to 50 items
    db.setHistory(history.slice(0, 50));
  },
  setHistory: (history: { trackId: string; playedAt: string }[]) => setLocalStorage(KEYS.HISTORY, history),

  // Chat
  getChatMessages: (): ChatMessage[] => getLocalStorage<ChatMessage[]>(KEYS.CHAT, DEFAULT_CHAT),
  addChatMessage: (msg: ChatMessage) => {
    const chat = db.getChatMessages();
    chat.push(msg);
    // Limit to 100
    db.setChatMessages(chat.slice(-100));
  },
  setChatMessages: (msgs: ChatMessage[]) => setLocalStorage<ChatMessage[]>(KEYS.CHAT, msgs),

  // Friend Activity
  getFriendActivity: (): FriendActivity[] => getLocalStorage<FriendActivity[]>(KEYS.FRIENDS, DEFAULT_FRIENDS),
  setFriendActivity: (friends: FriendActivity[]) => setLocalStorage<FriendActivity[]>(KEYS.FRIENDS, friends),

  // Listening Stats
  getStats: (): ListeningStats => getLocalStorage<ListeningStats>(KEYS.STATS, DEFAULT_STATS),
  setStats: (stats: ListeningStats) => setLocalStorage<ListeningStats>(KEYS.STATS, stats),
  incrementListeningStreak: () => {
    const user = db.getUser();
    const today = new Date().toISOString().split('T')[0];
    if (user.streakLastUpdated !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      let newStreak = user.listeningStreak;
      if (user.streakLastUpdated === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1; // reset if streak broken
      }
      db.setUser({
        ...user,
        listeningStreak: newStreak,
        streakLastUpdated: today
      });
    }
  },
  addListeningTime: (minutes: number) => {
    const user = db.getUser();
    db.setUser({
      ...user,
      listeningTime: user.listeningTime + minutes
    });
    // also update stats weekly minutes
    const stats = db.getStats();
    const todayDay = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    const updatedWeekly = [...stats.weeklyMinutes];
    updatedWeekly[todayDay] = (updatedWeekly[todayDay] || 0) + minutes;
    db.setStats({
      ...stats,
      weeklyMinutes: updatedWeekly
    });
  }
};
