/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumName: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // in seconds
  genre: string;
  playCount: number;
  likes: number;
  isPremium?: boolean;
  lyrics?: { time: number; text: string }[];
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverUrl: string;
  releaseDate: string;
  genre: string;
  description?: string;
  tracks: string[]; // List of track IDs
}

export interface Artist {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  genres: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: string[]; // Track IDs
  isPublic: boolean;
  isCollaborative: boolean;
  createdBy: string; // userId or 'system'
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  subscriptionStatus: 'free' | 'premium';
  avatarUrl: string;
  listeningStreak: number;
  listeningTime: number; // in minutes
  streakLastUpdated?: string;
}

export interface FriendActivity {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  status: 'listening' | 'offline';
  trackTitle?: string;
  trackArtist?: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  timestamp: string;
}

export interface ListeningStats {
  topGenres: { name: string; percentage: number }[];
  weeklyMinutes: number[];
  monthlyPlays: number;
  streak: number;
}
