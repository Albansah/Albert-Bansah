import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdaryqdlvjhauktzdxli.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYXJ5cWRsdmpoYXVrdHpkeGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MTI4MTAsImV4cCI6MjA3ODQ4ODgxMH0.4U269P9jlMj5VUQeddRPl2aeGYb9zp0SxL-GP6OBVFg';

if (!supabaseUrl || !supabaseAnonKey) {
  const message = 'Supabase URL or anon key is missing. The application will not work correctly.';
  throw new Error(message);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});