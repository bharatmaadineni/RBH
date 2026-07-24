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
    name: 'The Retro Wave',
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
    description: 'A nostalgic high-octane journey down a neon-lit cyber highway.',
    tracks: ['tr_1', 'tr_2', 'tr_3'],
  },
  {
    id: 'alb_2',
    title: 'Forest Whispers',
    artistId: 'art_2',
    artistName: 'Luna Echoes',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80',
    releaseDate: '2025-11-20',
    genre: 'Lo-fi Chill',
    description: 'Organic textures and soothing lo-fi field recordings to study, work, and relax to.',
    tracks: ['tr_4', 'tr_5'],
  },
  {
    id: 'alb_3',
    title: 'Starlight Memories',
    artistId: 'art_3',
    artistName: 'Acoustic Dreams',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
    releaseDate: '2026-02-14',
    genre: 'Acoustic',
    description: 'Intimate fireplace recordings capturing pure guitar resonance and deep introspective themes.',
    tracks: ['tr_6', 'tr_7', 'tr_8'],
  },
  {
    id: 'alb_4',
    title: 'Midnight Gridlock',
    artistId: 'art_4',
    artistName: 'Vibe Selector',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    releaseDate: '2026-06-30',
    genre: 'House',
    description: 'Pulsing rhythms and baseline grooves designed for the peak-hour underground experience.',
    tracks: ['tr_9', 'tr_10'],
  },
];

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'tr_1',
    title: 'Midnight Driver',
    artistId: 'art_1',
    artistName: 'The Retro Wave',
    albumId: 'alb_1',
    albumName: 'Neon Horizon',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    audioUrl: TRACK_URLS[0],
    duration: 372,
    genre: 'Synthwave',
    playCount: 125430,
    likes: 5430,
    lyrics: [
      { time: 0, text: "[Instrumental Synth Intro]" },
      { time: 15, text: "Glow in the dark, we're driving fast" },
      { time: 22, text: "Chasing the shadows of our retro past" },
      { time: 30, text: "Neon lights cut through the night sky" },
      { time: 38, text: "Nothing can stop us as we cruise by" },
      { time: 45, text: "[Chorus]" },
      { time: 46, text: "Midnight driver, speed of sound" },
      { time: 54, text: "We never let our wheels touch the ground" },
      { time: 61, text: "In the grid, we are forever free" },
      { time: 68, text: "Just you, the neon, and me" },
      { time: 76, text: "[Instrumental Synth Solo]" },
    ],
  },
  {
    id: 'tr_2',
    title: 'Cyber Highway',
    artistId: 'art_1',
    artistName: 'The Retro Wave',
    albumId: 'alb_1',
    albumName: 'Neon Horizon',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    audioUrl: TRACK_URLS[1],
    duration: 423,
    genre: 'Synthwave',
    playCount: 94820,
    likes: 4120,
    lyrics: [
      { time: 0, text: "[Electronic Beats]" },
      { time: 10, text: "Data streams flowing through my brain" },
      { time: 18, text: "Riding the waves of this cyber highway again" },
      { time: 26, text: "Grid coordinates locked in place" },
      { time: 34, text: "Lost in the binary, floating in space" },
    ],
  },
  {
    id: 'tr_3',
    title: 'Retro Dreamer',
    artistId: 'art_1',
    artistName: 'The Retro Wave',
    albumId: 'alb_1',
    albumName: 'Neon Horizon',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    audioUrl: TRACK_URLS[2],
    duration: 312,
    genre: 'Synthwave',
    playCount: 74210,
    likes: 3120,
    isPremium: true,
  },
  {
    id: 'tr_4',
    title: 'Lost in Leaves',
    artistId: 'art_2',
    artistName: 'Luna Echoes',
    albumId: 'alb_2',
    albumName: 'Forest Whispers',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80',
    audioUrl: TRACK_URLS[3],
    duration: 254,
    genre: 'Lo-fi Chill',
    playCount: 245000,
    likes: 12400,
    lyrics: [
      { time: 0, text: "[Rain sound and vinyl crackle]" },
      { time: 12, text: "Falling leaves, rustle in the breeze..." },
      { time: 24, text: "Calm your mind, put yourself at ease" },
      { time: 36, text: "No more worries, no more rush" },
      { time: 48, text: "Just the forest and this sacred hush" },
    ],
  },
  {
    id: 'tr_5',
    title: 'Raindrops & Coffee',
    artistId: 'art_2',
    artistName: 'Luna Echoes',
    albumId: 'alb_2',
    albumName: 'Forest Whispers',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80',
    audioUrl: TRACK_URLS[4],
    duration: 198,
    genre: 'Lo-fi Chill',
    playCount: 312450,
    likes: 15300,
  },
  {
    id: 'tr_6',
    title: 'Fireplace Chords',
    artistId: 'art_3',
    artistName: 'Acoustic Dreams',
    albumId: 'alb_3',
    albumName: 'Starlight Memories',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
    audioUrl: TRACK_URLS[5],
    duration: 215,
    genre: 'Acoustic',
    playCount: 45200,
    likes: 1840,
    lyrics: [
      { time: 0, text: "[Acoustic Guitar Fingerpicking]" },
      { time: 8, text: "Warm flames dance in your eyes" },
      { time: 16, text: "Underneath these silent winter skies" },
      { time: 24, text: "Fingers tracking down the wooden neck" },
      { time: 32, text: "Giving feelings that I never checked" },
    ],
  },
  {
    id: 'tr_7',
    title: 'Guitar Under the Moon',
    artistId: 'art_3',
    artistName: 'Acoustic Dreams',
    albumId: 'alb_3',
    albumName: 'Starlight Memories',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
    audioUrl: TRACK_URLS[6],
    duration: 248,
    genre: 'Acoustic',
    playCount: 68120,
    likes: 2940,
  },
  {
    id: 'tr_8',
    title: 'Starlight Memories',
    artistId: 'art_3',
    artistName: 'Acoustic Dreams',
    albumId: 'alb_3',
    albumName: 'Starlight Memories',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
    audioUrl: TRACK_URLS[7],
    duration: 289,
    genre: 'Acoustic',
    playCount: 110430,
    likes: 5800,
    isPremium: true,
  },
  {
    id: 'tr_9',
    title: 'Subway Beats',
    artistId: 'art_4',
    artistName: 'Vibe Selector',
    albumId: 'alb_4',
    albumName: 'Midnight Gridlock',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    audioUrl: TRACK_URLS[8],
    duration: 322,
    genre: 'House',
    playCount: 521000,
    likes: 21500,
    lyrics: [
      { time: 0, text: "[Four on the Floor House Intro]" },
      { time: 16, text: "Feel the rumble of the subway line" },
      { time: 24, text: "Dancing in the shadows, losing track of time" },
      { time: 32, text: "Heavy bass pumping through the floor" },
      { time: 40, text: "You can hear the people crying out for more" },
    ],
  },
  {
    id: 'tr_10',
    title: 'Midnight Grooves',
    artistId: 'art_4',
    artistName: 'Vibe Selector',
    albumId: 'alb_4',
    albumName: 'Midnight Gridlock',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    audioUrl: TRACK_URLS[9],
    duration: 354,
    genre: 'House',
    playCount: 632000,
    likes: 28400,
  },
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl_1',
    name: 'Chill Vibes',
    description: 'Perfect lofi beats, atmospheric ambient textures, and soft acoustics.',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80',
    tracks: ['tr_4', 'tr_5', 'tr_6', 'tr_7'],
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
    tracks: ['tr_1', 'tr_2', 'tr_9', 'tr_10'],
    isPublic: true,
    isCollaborative: true,
    createdBy: 'system',
    createdAt: '2026-02-01T00:00:00.000Z',
  },
  {
    id: 'pl_3',
    name: 'Workout Hits',
    description: 'High octane progressive electronic and bass rhythms to drive energy.',
    coverUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80',
    tracks: ['tr_1', 'tr_3', 'tr_9'],
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
    tracks: ['tr_5', 'tr_7'],
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

// Initial User Profile
const DEFAULT_USER: UserProfile = {
  uid: 'user_default',
  username: 'RBH Listener',
  email: 'bharatmaadineni3267@gmail.com',
  subscriptionStatus: 'free',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
  listeningStreak: 5,
  listeningTime: 1240,
  streakLastUpdated: '2026-07-21',
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
  getUser: (): UserProfile => getLocalStorage<UserProfile>(KEYS.USER, DEFAULT_USER),
  setUser: (user: UserProfile) => setLocalStorage<UserProfile>(KEYS.USER, user),
  
  // Tracks
  getTracks: (): Track[] => getLocalStorage<Track[]>(KEYS.TRACKS, INITIAL_TRACKS),
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
  getAlbums: (): Album[] => getLocalStorage<Album[]>(KEYS.ALBUMS, INITIAL_ALBUMS),
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
  getPlaylists: (): Playlist[] => getLocalStorage<Playlist[]>(KEYS.PLAYLISTS, INITIAL_PLAYLISTS),
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
  getFavorites: (): string[] => getLocalStorage<string[]>(KEYS.FAVORITES, ['tr_1', 'tr_4', 'tr_6']), // Track IDs
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
  getSearchHistory: (): string[] => getLocalStorage<string[]>(KEYS.SEARCH_HISTORY, ['Midnight', 'Acoustic', 'Luna']),
  addSearchHistory: (query: string) => {
    const history = db.getSearchHistory().filter(q => q.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    db.setSearchHistory(history.slice(0, 10)); // Keep top 10
  },
  setSearchHistory: (history: string[]) => setLocalStorage<string[]>(KEYS.SEARCH_HISTORY, history),
  clearSearchHistory: () => setLocalStorage<string[]>(KEYS.SEARCH_HISTORY, []),

  // Listening History
  getHistory: (): { trackId: string; playedAt: string }[] => 
    getLocalStorage<{ trackId: string; playedAt: string }[]>(KEYS.HISTORY, [
      { trackId: 'tr_1', playedAt: '2026-07-21T08:30:00.000Z' },
      { trackId: 'tr_4', playedAt: '2026-07-21T08:00:00.000Z' },
      { trackId: 'tr_9', playedAt: '2026-07-20T21:00:00.000Z' },
    ]),
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
