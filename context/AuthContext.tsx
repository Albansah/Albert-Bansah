import * as React from 'react';
import type { User } from '../types';
import { supabase } from '../lib/supabaseClient';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface AuthResult {
  success: boolean;
  error?: string;
}

// FIX: Added the 'login' function to AuthContextType and implemented it in the AuthProvider to handle user sign-ins.
interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<AuthResult>;
  signup: (email: string, role: 'client' | 'freelancer', password?: string) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUserAndProfile = async (session: Session | null) => {
      if (session?.user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, stripe_onboarding_complete, static_profile_id, onboarding_complete, full_name')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: profile?.role || 'client',
            stripe_onboarding_complete: profile?.stripe_onboarding_complete || false,
            onboarding_complete: profile?.onboarding_complete || false,
            full_name: profile?.full_name || '',
            static_profile_id: profile?.static_profile_id || undefined,
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    // Check for initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchUserAndProfile(session);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        fetchUserAndProfile(session);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string): Promise<AuthResult> => {
    if (!password) return { success: false, error: 'Password is required.' };
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      const friendlyMessage = error.message.includes('Invalid login credentials')
        ? 'Invalid email or password. Please try again.'
        : 'Could not log in. Please try again later.';
      return { success: false, error: friendlyMessage };
    }

    // Supabase's onAuthStateChange will handle setting the user state.
    return { success: true };
  };

  const signup = async (email: string, role: 'client' | 'freelancer', password?: string): Promise<AuthResult> => {
    if (!password) return { success: false, error: 'Password is required.' };
    
    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Signup error:', error.message);
       const friendlyMessage = error.message.includes('User already registered')
        ? 'An account with this email already exists. Please log in.'
        : 'Could not create account. Please try again.';
      return { success: false, error: friendlyMessage };
    }

    if (data.user) {
      // Insert role into our public profiles table.
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, role: role, email: email, stripe_onboarding_complete: false, onboarding_complete: false });

      if (profileError) {
        console.error('Error creating profile:', profileError.message);
        // In a real app, you might want to handle this more gracefully,
        // e.g., by deleting the created auth user.
        return { success: false, error: 'Could not set up user profile. Please contact support.' };
      }

      // Supabase's onAuthStateChange will handle setting the user state.
      return { success: true };
    }

    return { success: false, error: 'An unknown error occurred during signup.'};
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.hash = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};