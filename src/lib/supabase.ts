import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env;
export const DEFAULT_SUPABASE_URL = 'https://nrulbonahqvdopqlbcen.supabase.co';

const supabaseUrl = env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder'
);

export function isSupabaseConfigured(): boolean {
  return (
    Boolean(supabaseUrl) &&
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    Boolean(supabaseAnonKey) &&
    supabaseAnonKey.trim() !== '' &&
    !supabaseAnonKey.includes('placeholder')
  );
}

export async function fetchSupabaseSongs() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const { data: songs, error } = await supabase
      .from("songs")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      if (error.message?.includes("Invalid API key") || error.code === "PGRST301") {
        console.warn("Supabase API key is invalid or missing. Please configure VITE_SUPABASE_ANON_KEY.");
      } else {
        console.warn("Supabase query notice:", error.message || error);
      }
      return null;
    } else if (songs) {
      return songs;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function addSupabaseSong(song: { title: string; artist?: string; audio_url: string }) {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data, error } = await supabase
      .from("songs")
      .insert([
        {
          title: song.title,
          artist: song.artist || 'Unknown Artist',
          audio_url: song.audio_url,
        }
      ])
      .select();

    if (error) {
      console.warn("Error inserting song into Supabase:", error.message || error);
      return null;
    }
    return data;
  } catch (err) {
    return null;
  }
}

export function subscribeToSupabaseSongs(onUpdate: (songs: any[]) => void) {
  if (!isSupabaseConfigured()) return () => {};

  try {
    const channel = supabase
      .channel('public:songs_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'songs' },
        async () => {
          const updated = await fetchSupabaseSongs();
          if (updated) {
            onUpdate(updated);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    return () => {};
  }
}

