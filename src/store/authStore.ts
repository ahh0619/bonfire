import { createClient } from '@/utils/supabase/client';
import { Subscription, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: User | null;
  logIn: (userData: any) => void;
  logOut: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      logIn: (userData: any) => set({ user: userData }),
      logOut: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
