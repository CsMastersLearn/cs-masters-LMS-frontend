import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (url, options) => {
      return fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
        },
      });
    },
  },
});

export default supabase;

export const auth = supabase.auth;
export const storage = supabase.storage;
export const db = supabase.from;
