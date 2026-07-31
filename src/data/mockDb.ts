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
    name: 'S.P. Balasubrahmanyam',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    bio: 'Legendary Indian playback singer who recorded over 40,000 songs across Telugu, Tamil, and Kannada languages with 6 National Film Awards.',
    followers: 15200000,
    genres: ['Telugu Playback', 'Tamil Melody', 'Carnatic Classical'],
  },
  {
    id: 'art_2',
    name: 'Sid Sriram',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80',
    bio: 'Chart-topping Telugu & Tamil playback singer known for iconic hits like "Inkem Inkem", "Samajavaragamana", "Srivalli", and "Kadhaippoma".',
    followers: 12800000,
    genres: ['Telugu Pop', 'Tamil R&B', 'Carnatic Fusion'],
  },
  {
    id: 'art_3',
    name: 'Anirudh Ravichander',
    avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    bio: 'Rockstar Tamil & Telugu composer-singer behind global sensational soundtracks like Devara, Leo, Jailer, Vikram, and Master.',
    followers: 18500000,
    genres: ['Tamil Beats', 'Telugu Rock', 'EDM Fusion'],
  },
  {
    id: 'art_4',
    name: 'A. R. Rahman',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Oscar & Grammy winning maestro known as "The Mozart of Madras", redefining South Indian and global film music.',
    followers: 24000000,
    genres: ['Tamil Classical', 'Telugu Symphony', 'World Fusion'],
  },
  {
    id: 'art_5',
    name: 'Shreya Ghoshal',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    bio: 'Award-winning playback diva who has sung hundreds of legendary romantic melodies in Telugu and Tamil cinema.',
    followers: 16900000,
    genres: ['Telugu Romance', 'Tamil Melody', 'Indian Classical'],
  },
  {
    id: 'art_6',
    name: 'K. S. Chithra',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    bio: 'Six-time National Award-winning "Nightingale of South India" celebrated for timeless Telugu & Tamil classics.',
    followers: 9800000,
    genres: ['Telugu Classics', 'Tamil Devotional', 'South Folk'],
  },
  {
    id: 'art_7',
    name: 'Anurag Kulkarni',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Blockbuster Telugu playback singer famous for high-energy chart-busters including "Ramuloo Ramulaa", "Pilla Raa", and "Mahanati".',
    followers: 8400000,
    genres: ['Telugu Folk', 'Tollywood Beats', 'Commercial Pop'],
  },
  {
    id: 'art_8',
    name: 'Armaan Malik',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80',
    bio: 'Versatile playback star behind record-setting Telugu & Tamil hits like "Butta Bomma", "Anaganaga", and "Vinnane Vinnane".',
    followers: 14200000,
    genres: ['Telugu Pop', 'Tamil Romance', 'Acoustic'],
  },
  {
    id: 'art_9',
    name: 'Devi Sri Prasad (DSP)',
    avatarUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    bio: 'Rockstar composer & singer who delivered historic Telugu & Tamil dance anthems for Pushpa, Rangasthalam, and Singam.',
    followers: 11600000,
    genres: ['Tollywood Mass', 'Telugu Dance', 'Tamil Beats'],
  },
  {
    id: 'art_10',
    name: 'Ram Miriyala',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    bio: 'Sensational Telugu folk-fusion singer-composer known for soulful viral tracks like "Tillu Anna", "Oorugalle", and "Chitta".',
    followers: 6200000,
    genres: ['Telugu Folk', 'Indie Telugu', 'Acoustic Fusion'],
  },
  {
    id: 'art_11',
    name: 'Chinmayi Sripaada',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Acclaimed Tamil & Telugu playback singer renowned for mesmerising songs like "Kannathil Muthamittal", "Oohalu", and "Tere Bina".',
    followers: 7800000,
    genres: ['Tamil Melodies', 'Telugu Acoustic', 'Soul'],
  },
  {
    id: 'art_12',
    name: 'Hariharan',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Ghazal maestro and legendary playback singer famous for classic Tamil & Telugu duets like "Tu Hi Re", "Vennilave", and "Telangana".',
    followers: 8900000,
    genres: ['Ghazal', 'Tamil Melodies', 'Telugu Classical'],
  },
];

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'alb_1',
    title: 'Neon Horizon',
    artistId: 'art_1',
    artistName: 'Arijit Singh',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    releaseDate: '2025-05-12',
    genre: 'Bollywood Pop',
    description: 'A nostalgic high-octane journey featuring Meghallo.',
    tracks: ['tr_11'],
  },
  {
    id: 'alb_2',
    title: 'Forest Whispers',
    artistId: 'art_2',
    artistName: 'The Weeknd',
    coverUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80',
    releaseDate: '2025-11-20',
    genre: 'Synth-Pop',
    description: 'Organic textures and soothing synth layers.',
    tracks: ['tr_14'],
  },
  {
    id: 'alb_3',
    title: 'Starlight Memories',
    artistId: 'art_3',
    artistName: 'Taylor Swift',
    coverUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
    releaseDate: '2026-02-14',
    genre: 'Pop Folk',
    description: 'Intimate fireplace recordings capturing pure acoustic resonance.',
    tracks: ['tr_11'],
  },
  {
    id: 'alb_4',
    title: 'Midnight Gridlock',
    artistId: 'art_4',
    artistName: 'Ed Sheeran',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
    releaseDate: '2026-06-30',
    genre: 'Acoustic Pop',
    description: 'Pulsing rhythms and baseline grooves.',
    tracks: ['tr_11'],
  },
];

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'tr_11',
    title: 'Meghallo',
    artistId: 'art_1',
    artistName: 'Arijit Singh',
    albumId: 'alb_1',
    albumName: 'Neon Horizon',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    audioUrl: 'https://nrulbonahqvdopqlbcen.supabase.co/storage/v1/object/public/songs/Meghaallo-SenSongsMp3.Co(2).mp3',
    duration: 278,
    genre: 'Bollywood Pop',
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
    artistId: 'art_7',
    artistName: 'Sid Sriram',
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
    artistId: 'art_6',
    artistName: 'S.P. Balasubrahmanyam',
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
    artistId: 'art_2',
    artistName: 'The Weeknd',
    albumId: 'alb_2',
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
  ARTISTS: 'aura_artists_v3',
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

  getFollowedArtists: (): string[] => getLocalStorage<string[]>(KEYS.FOLLOWED_ARTISTS, []), // Artist IDs
  setFollowedArtists: (artists: string[]) => setLocalStorage<string[]>(KEYS.FOLLOWED_ARTISTS, artists),
  addFollowedArtistsBatch: (artistIds: string[]): string[] => {
    const current = db.getFollowedArtists();
    const updated = Array.from(new Set([...current, ...artistIds]));
    db.setFollowedArtists(updated);
    return updated;
  },
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
