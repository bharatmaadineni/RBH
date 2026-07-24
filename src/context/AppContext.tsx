/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Track, Album, Artist, Playlist, UserProfile, FriendActivity, ChatMessage, ListeningStats } from '../types';
import { db } from '../data/mockDb';

// Define Context structure
interface AppContextType {
  // Navigation & Views
  activeView: string;
  activeParams: any;
  navigationHistory: { view: string; params: any }[];
  navigate: (view: string, params?: any) => void;
  goBack: () => void;

  // Audio Playback State
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  queueIndex: number;
  volume: number;
  progress: number;
  duration: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
  equalizer: 'flat' | 'bass' | 'treble' | 'electronic' | 'vocal' | 'chill';
  crossfade: boolean;
  sleepTimer: number | null; // minutes remaining

  // Audio Actions
  playTrack: (track: Track, customQueue?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setEqualizer: (mode: 'flat' | 'bass' | 'treble' | 'electronic' | 'vocal' | 'chill') => void;
  setCrossfade: (enabled: boolean) => void;
  setSleepTimer: (minutes: number | null) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;

  // User & Authentication
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  skipGuest: () => void;
  logout: () => void;
  register: (username: string, email: string) => void;
  upgradeSubscription: (plan: 'premium' | 'free') => void;
  updateUserProfile: (username: string, avatarUrl: string) => void;

  // Music DB state
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  favorites: string[];
  savedAlbums: string[];
  followedArtists: string[];
  refreshMusicDb: () => void;

  // Interaction features
  toggleLikeTrack: (trackId: string) => void;
  toggleSaveAlbum: (albumId: string) => void;
  toggleFollowArtist: (artistId: string) => void;
  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  friendActivity: FriendActivity[];

  // Toast notifications
  toast: { message: string; type: 'success' | 'info' | 'error' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
  clearToast: () => void;

  // AI & Voice Helpers
  triggerVoiceCommand: (transcript: string) => Promise<void>;
  generateAiLyrics: (track: Track) => Promise<void>;
  getAiRecommendations: (prompt: string, mood: string) => Promise<{ genres: string[]; reason: string }>;
  getStats: () => ListeningStats;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<string>('auth');
  const [activeParams, setActiveParams] = useState<any>(null);
  const [navigationHistory, setNavigationHistory] = useState<{ view: string; params: any }[]>([]);

  // Audio Playback
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(-1);
  const [volume, _setVolume] = useState<number>(0.8);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<'none' | 'one' | 'all'>('none');
  const [equalizer, _setEqualizer] = useState<'flat' | 'bass' | 'treble' | 'electronic' | 'vocal' | 'chill'>('flat');
  const [crossfade, setCrossfadeState] = useState<boolean>(true);
  const [sleepTimer, _setSleepTimer] = useState<number | null>(null);

  // User & Auth
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Db State
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedAlbums, setSavedAlbums] = useState<string[]>([]);
  const [followedArtists, setFollowedArtists] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [friendActivity, setFriendActivity] = useState<FriendActivity[]>([]);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' | 'warning' } | null>(null);

  // HTML5 Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sleepTimerIdRef = useRef<any>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Helper to safely play the audio element and catch expected AbortErrors (interruptions)
  const safePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    let playPromise: Promise<void> | null = null;
    try {
      playPromise = audio.play();
      playPromiseRef.current = playPromise;
      await playPromise;
      if (playPromiseRef.current === playPromise) {
        playPromiseRef.current = null;
      }
    } catch (err: any) {
      if (playPromise && playPromiseRef.current === playPromise) {
        playPromiseRef.current = null;
      }
      
      // Silence expected AbortError when a play request is canceled by another play/pause
      if (err?.name === 'AbortError') {
        console.log('Audio playback play() request was interrupted by a pause or track change (expected behavior).');
      } else if (err?.name === 'NotAllowedError') {
        console.warn('Playback blocked by browser autoplay policy. User interaction required.');
        showToast('Playback blocked. Click play to start listening.', 'warning');
      } else {
        console.warn('Audio playback start failed:', err);
      }
    }
  };

  // Helper to safely pause the audio element to prevent play/pause race conditions
  const safePause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          audio.pause();
        })
        .catch(() => {
          audio.pause();
        });
    } else {
      audio.pause();
    }
  };

  // Initialize DB and load settings
  const refreshMusicDb = () => {
    setTracks(db.getTracks());
    setAlbums(db.getAlbums());
    setArtists(db.getArtists());
    setPlaylists(db.getPlaylists());
    setFavorites(db.getFavorites());
    setSavedAlbums(db.getSavedAlbums());
    setFollowedArtists(db.getFollowedArtists());
    setSearchHistory(db.getSearchHistory());
    setChatMessages(db.getChatMessages());
    setFriendActivity(db.getFriendActivity());
  };

  useEffect(() => {
    // Check if user is logged in
    const cachedUser = db.getUser();
    if (cachedUser && cachedUser.uid !== 'guest') {
      setUser(cachedUser);
      setIsLoggedIn(true);
      setActiveView('home');
      db.incrementListeningStreak();
    } else {
      setActiveView('auth');
    }
    refreshMusicDb();

    // Create global audio element
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (sleepTimerIdRef.current) {
        clearInterval(sleepTimerIdRef.current);
      }
    };
  }, []);

  // Sync volume
  const setVolume = (vol: number) => {
    _setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  // Toast management
  const showToast = (message: string, type: 'success' | 'info' | 'error' | 'warning' = 'info') => {
    setToast({ message, type });
  };

  const clearToast = () => setToast(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Audio Playback Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };
    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    // Sophisticated Crossfade + Ended behavior
    const handleEnded = () => {
      if (repeat === 'one') {
        audio.currentTime = 0;
        safePlay();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, queueIndex, repeat, shuffle]);

  // Handle source changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const wasPlaying = isPlaying;
    audio.src = currentTrack.audioUrl;
    audio.load();

    if (wasPlaying) {
      safePlay().then(() => {
        // Increment streak or listen time
        db.addListeningTime(0.1); // Add a small fraction
      });
    } else {
      setProgress(0);
    }
  }, [currentTrack]);

  // Navigation Logic
  const navigate = (view: string, params: any = null) => {
    // If not logged in, restrict views to auth pages
    const publicViews = ['auth', 'login', 'register'];
    if (!isLoggedIn && !publicViews.includes(view)) {
      showToast('Please login to explore all music features!', 'warning');
      setActiveView('auth');
      return;
    }

    setNavigationHistory(prev => [...prev, { view: activeView, params: activeParams }]);
    setActiveView(view);
    setActiveParams(params);
  };

  const goBack = () => {
    if (navigationHistory.length === 0) return;
    setNavigationHistory(prev => {
      const historyCopy = [...prev];
      const previous = historyCopy.pop();
      if (previous) {
        setActiveView(previous.view);
        setActiveParams(previous.params);
      }
      return historyCopy;
    });
  };

  // Playback Control Actions
  const playTrack = (track: Track, customQueue?: Track[]) => {
    if (track.isPremium && (!user || user.subscriptionStatus !== 'premium')) {
      showToast('⭐️ "Aura Premium" Required to stream high-fidelity track!', 'warning');
      navigate('profile');
      return;
    }

    const currentTracksList = customQueue && customQueue.length > 0 ? customQueue : tracks;
    
    // Find index
    let idx = currentTracksList.findIndex(t => t.id === track.id);
    if (idx === -1) {
      // track is not in currentTracksList, inject it
      const newQueue = [track, ...currentTracksList];
      setQueue(newQueue);
      setQueueIndex(0);
    } else {
      setQueue(currentTracksList);
      setQueueIndex(idx);
    }

    if (currentTrack && track.id === currentTrack.id) {
      setIsPlaying(true);
      safePlay();
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);
    db.addToHistory(track.id);
    db.addListeningTime(0.5); // log some listening minutes

    // Update friend activity mock
    if (user) {
      const activities = db.getFriendActivity().map((act, i) => {
        if (i === 0) { // simulate active synchronization
          return {
            ...act,
            status: 'listening' as const,
            trackTitle: track.title,
            trackArtist: track.artistName
          };
        }
        return act;
      });
      db.setFriendActivity(activities);
      setFriendActivity(activities);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentTrack && tracks.length > 0) {
      // play first song
      playTrack(tracks[0]);
      return;
    }

    if (isPlaying) {
      safePause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      safePlay();
    }
  };

  const nextTrack = () => {
    if (queue.length === 0) return;

    let nextIdx = queueIndex + 1;
    if (shuffle) {
      nextIdx = Math.floor(Math.random() * queue.length);
    } else if (nextIdx >= queue.length) {
      nextIdx = repeat === 'all' ? 0 : queueIndex;
    }

    if (nextIdx !== queueIndex && nextIdx < queue.length && nextIdx >= 0) {
      setQueueIndex(nextIdx);
      const track = queue[nextIdx];
      if (track.isPremium && (!user || user.subscriptionStatus !== 'premium')) {
        // Find next non-premium or skip
        const nonPremiumIndex = queue.findIndex((t, index) => index > nextIdx && !t.isPremium);
        if (nonPremiumIndex !== -1) {
          setQueueIndex(nonPremiumIndex);
          setCurrentTrack(queue[nonPremiumIndex]);
          db.addToHistory(queue[nonPremiumIndex].id);
        } else {
          showToast('Reached premium songs only queue limits!', 'info');
          setIsPlaying(false);
        }
      } else {
        setCurrentTrack(track);
        db.addToHistory(track.id);
      }
    } else {
      showToast('Queue complete', 'info');
      setIsPlaying(false);
    }
  };

  const prevTrack = () => {
    if (queue.length === 0) return;

    let prevIdx = queueIndex - 1;
    if (progress > 5) {
      // Restart current track
      seek(0);
      return;
    }

    if (prevIdx < 0) {
      prevIdx = repeat === 'all' ? queue.length - 1 : 0;
    }

    if (prevIdx !== queueIndex && prevIdx >= 0) {
      setQueueIndex(prevIdx);
      const track = queue[prevIdx];
      if (track.isPremium && (!user || user.subscriptionStatus !== 'premium')) {
        showToast('⭐️ Aura Premium track skipped', 'warning');
        nextTrack();
      } else {
        setCurrentTrack(track);
        db.addToHistory(track.id);
      }
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  const toggleShuffle = () => {
    setShuffle(prev => !prev);
    showToast(shuffle ? 'Shuffle Off' : 'Shuffle On', 'info');
  };

  const toggleRepeat = () => {
    setRepeat(prev => {
      const map: Record<'none' | 'one' | 'all', 'none' | 'one' | 'all'> = {
        none: 'all',
        all: 'one',
        one: 'none'
      };
      const next = map[prev];
      showToast(`Repeat mode: ${next.toUpperCase()}`, 'info');
      return next;
    });
  };

  const setEqualizer = (mode: 'flat' | 'bass' | 'treble' | 'electronic' | 'vocal' | 'chill') => {
    _setEqualizer(mode);
    showToast(`Equalizer Preset: ${mode.toUpperCase()}`, 'success');
  };

  const setCrossfade = (enabled: boolean) => {
    setCrossfadeState(enabled);
    showToast(enabled ? 'Crossfade Enabled (5s)' : 'Crossfade Disabled', 'info');
  };

  const setSleepTimer = (minutes: number | null) => {
    _setSleepTimer(minutes);
    if (sleepTimerIdRef.current) {
      clearInterval(sleepTimerIdRef.current);
    }

    if (minutes === null) {
      showToast('Sleep timer cancelled', 'info');
      return;
    }

    showToast(`Sleep timer set for ${minutes} minutes`, 'success');
    let remainingMinutes = minutes;
    
    sleepTimerIdRef.current = setInterval(() => {
      remainingMinutes -= 1;
      _setSleepTimer(remainingMinutes);
      
      if (remainingMinutes <= 0) {
        clearInterval(sleepTimerIdRef.current);
        _setSleepTimer(null);
        if (audioRef.current) {
          safePause();
          setIsPlaying(false);
          showToast('💤 Sleep timer completed. Goodnight!', 'info');
        }
      }
    }, 60000); // Check every minute
  };

  const addToQueue = (track: Track) => {
    setQueue(prev => {
      const alreadyIn = prev.some(t => t.id === track.id);
      if (alreadyIn) return prev;
      return [...prev, track];
    });
    showToast(`"${track.title}" added to queue`, 'success');
  };

  const removeFromQueue = (trackId: string) => {
    setQueue(prev => prev.filter(t => t.id !== trackId));
    showToast('Track removed from queue', 'info');
  };

  // Auth / User Handlers
  const login = (email: string) => {
    const cachedUser = db.getUser();
    const updatedUser = {
      ...cachedUser,
      email,
      username: email.split('@')[0],
      uid: 'user_' + Math.random().toString(36).substring(2, 9),
    };
    db.setUser(updatedUser);
    setUser(updatedUser);
    setIsLoggedIn(true);
    showToast('Welcome back, ' + updatedUser.username + '!', 'success');
    navigate('home');
  };

  const skipGuest = () => {
    const guestUser: UserProfile = {
      uid: 'guest',
      username: 'Guest Listener',
      email: '',
      subscriptionStatus: 'free',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
      listeningStreak: 0,
      listeningTime: 0,
    };
    setUser(guestUser);
    setIsLoggedIn(true);
    setActiveView('home');
  };

  const logout = () => {
    if (audioRef.current) {
      safePause();
      setIsPlaying(false);
    }
    const guestUser: UserProfile = {
      uid: 'guest',
      username: 'Guest Listener',
      email: '',
      subscriptionStatus: 'free',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
      listeningStreak: 0,
      listeningTime: 0,
    };
    db.setUser(guestUser);
    setUser(null);
    setIsLoggedIn(false);
    showToast('Logged out successfully', 'info');
    setActiveView('auth');
  };

  const register = (username: string, email: string) => {
    const newUser: UserProfile = {
      uid: 'user_' + Math.random().toString(36).substring(2, 9),
      username,
      email,
      subscriptionStatus: 'free',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
      listeningStreak: 1,
      listeningTime: 0,
      streakLastUpdated: new Date().toISOString().split('T')[0]
    };
    db.setUser(newUser);
    setUser(newUser);
    setIsLoggedIn(true);
    showToast(`Account created! Welcome, ${username}!`, 'success');
    navigate('home');
  };

  const upgradeSubscription = (plan: 'premium' | 'free') => {
    if (!user) return;
    const updated = { ...user, subscriptionStatus: plan };
    db.setUser(updated);
    setUser(updated);
    showToast(plan === 'premium' ? '🎉 Welcome to Aura Premium! Enjoy limitless high-fidelity audio!' : 'Subscription adjusted', 'success');
  };

  const updateUserProfile = (username: string, avatarUrl: string) => {
    if (!user) return;
    const updated = { ...user, username, avatarUrl };
    db.setUser(updated);
    setUser(updated);
    showToast('Profile updated successfully!', 'success');
  };

  // Interactions
  const toggleLikeTrack = (trackId: string) => {
    const isLiked = db.toggleFavorite(trackId);
    setFavorites(db.getFavorites());
    showToast(isLiked ? 'Added to Liked Songs' : 'Removed from Liked Songs', 'success');
  };

  const toggleSaveAlbum = (albumId: string) => {
    const isSaved = db.toggleSavedAlbum(albumId);
    setSavedAlbums(db.getSavedAlbums());
    showToast(isSaved ? 'Album saved to your library' : 'Album removed from library', 'success');
  };

  const toggleFollowArtist = (artistId: string) => {
    const isFollowing = db.toggleFollowArtist(artistId);
    setFollowedArtists(db.getFollowedArtists());
    showToast(isFollowing ? 'Following artist' : 'Unfollowed artist', 'success');
  };

  const addSearchHistory = (query: string) => {
    db.addSearchHistory(query);
    setSearchHistory(db.getSearchHistory());
  };

  const clearSearchHistory = () => {
    db.clearSearchHistory();
    setSearchHistory([]);
  };

  const sendChatMessage = (text: string) => {
    if (!user) return;
    const newMsg: ChatMessage = {
      id: 'chat_' + Date.now(),
      userId: user.uid,
      username: user.username,
      avatarUrl: user.avatarUrl,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    db.addChatMessage(newMsg);
    setChatMessages(db.getChatMessages());
    
    // Simulate smart automated response from a random friend after 1.5 seconds!
    setTimeout(() => {
      const friends = db.getFriendActivity();
      const randomFriend = friends[Math.floor(Math.random() * friends.length)];
      if (randomFriend.status === 'listening') {
        const automatedResponses = [
          `That track is amazing! Adding it to my queue!`,
          `Have you tried using the Voice Command button yet? It actually works really well!`,
          `Love listening to lo-fi while coding. Aura's equalizer presets sound pristine on Bass Boost! 🔊`,
          `Just upgraded to Aura Premium. No regrets! ⭐️`,
        ];
        const randomText = automatedResponses[Math.floor(Math.random() * automatedResponses.length)];
        
        const autoMsg: ChatMessage = {
          id: 'chat_auto_' + Date.now(),
          userId: randomFriend.userId,
          username: randomFriend.username,
          avatarUrl: randomFriend.avatarUrl,
          text: randomText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        db.addChatMessage(autoMsg);
        setChatMessages(db.getChatMessages());
      }
    }, 2000);
  };

  // AI & Voice Services Backend Calls
  const triggerVoiceCommand = async (transcript: string) => {
    try {
      showToast(`🎙️ Aura AI analyzing: "${transcript}"...`, 'info');
      const res = await fetch('/api/ai/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      
      if (data.success) {
        showToast(data.message, 'success');
        
        // Execute dynamic mapped actions on frontend!
        const action = data.action;
        const param = data.param;

        if (action === 'navigate') {
          navigate(param);
        } else if (action === 'genre') {
          navigate('search', { activeGenre: param });
        } else if (action === 'play') {
          // Try to find track
          const matchedTrack = tracks.find(t => 
            t.title.toLowerCase().includes(param.toLowerCase()) || 
            t.artistName.toLowerCase().includes(param.toLowerCase())
          );
          if (matchedTrack) {
            playTrack(matchedTrack);
          } else {
            // Find any track
            showToast(`Could not find track matching "${param}". Searching for you...`, 'info');
            navigate('search', { query: param });
          }
        } else if (action === 'search') {
          navigate('search', { query: param });
        }
      }
    } catch (err) {
      console.error('Voice command failed:', err);
      showToast('AI Voice understanding failed', 'error');
    }
  };

  const generateAiLyrics = async (track: Track) => {
    try {
      showToast('✨ AI synchronizing lyrics...', 'info');
      const res = await fetch('/api/ai/lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: track.title, artist: track.artistName }),
      });
      const data = await res.json();
      if (data.success && data.lyrics) {
        // Inject lyrics into track db
        const updatedTracks = tracks.map(t => {
          if (t.id === track.id) {
            return { ...t, lyrics: data.lyrics };
          }
          return t;
        });
        setTracks(updatedTracks);
        db.setTracks(updatedTracks);
        
        // Sync current track
        if (currentTrack && currentTrack.id === track.id) {
          setCurrentTrack({ ...currentTrack, lyrics: data.lyrics });
        }
        showToast('✨ Lyrics synced successfully!', 'success');
      }
    } catch (err) {
      console.error('Failed to sync lyrics:', err);
      showToast('AI Lyric engine offline', 'error');
    }
  };

  const getAiRecommendations = async (prompt: string, mood: string) => {
    try {
      showToast('🧠 Consultating Aura recommendation brain...', 'info');
      const res = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mood }),
      });
      const data = await res.json();
      return {
        genres: data.recommendedGenres || [],
        reason: data.reason || 'AI recommendation compiled.'
      };
    } catch (err) {
      console.error('AI Recommendations failed:', err);
      showToast('AI Brain currently offline', 'error');
      return { genres: [], reason: 'Failed to communicate with AI model.' };
    }
  };

  const getStats = (): ListeningStats => {
    return db.getStats();
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        activeParams,
        navigationHistory,
        navigate,
        goBack,
        currentTrack,
        isPlaying,
        queue,
        queueIndex,
        volume,
        progress,
        duration,
        shuffle,
        repeat,
        equalizer,
        crossfade,
        sleepTimer,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        seek,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        setEqualizer,
        setCrossfade,
        setSleepTimer,
        addToQueue,
        removeFromQueue,
        user,
        isLoggedIn,
        login,
        skipGuest,
        logout,
        register,
        upgradeSubscription,
        updateUserProfile,
        tracks,
        albums,
        artists,
        playlists,
        favorites,
        savedAlbums,
        followedArtists,
        refreshMusicDb,
        toggleLikeTrack,
        toggleSaveAlbum,
        toggleFollowArtist,
        searchHistory,
        addSearchHistory,
        clearSearchHistory,
        chatMessages,
        sendChatMessage,
        friendActivity,
        toast,
        showToast,
        clearToast,
        triggerVoiceCommand,
        generateAiLyrics,
        getAiRecommendations,
        getStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
