import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  class: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await loadUserProfile(session.user);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: User) => {
    try {
      const { data: profiles, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id);

      if (error) {
        console.error('Error loading user profile:', error);
        setUser(null);
        return;
      }

      if (profiles && profiles.length > 0) {
        const profile = profiles[0];
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email || authUser.email || '',
          class: profile.class
        });
      } else {
        // No profile found in users table
        setUser(null);
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      setUser(null);
    }
  };

  const signUp = async (name: string, email: string, password: string, className: string) => {
    try {
      setLoading(true);

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            name: name.trim(),
            class: className
          }
        }
      });

      if (authError) {
        return { user: null, error: authError };
      }

      if (!authData.user) {
        return { user: null, error: new Error('Failed to create user account') };
      }

      // Create user profile in our users table
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          class: className
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Sign out the partially created user to maintain consistency
        await supabase.auth.signOut();
        return { user: null, error: new Error('Failed to create user profile. Please try again.') };
      }

      // Load the user profile
      await loadUserProfile(authData.user);

      return { user: authData.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        return { user: null, error };
      }

      if (!data.user) {
        return { user: null, error: new Error('Failed to sign in') };
      }

      // User profile will be loaded automatically by the auth state change listener
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error };
      }
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };
};