import { Tables } from '@/types/supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: Tables<'users'>[] | null;
  logIn: (userData: Tables<'users'>[] | null) => void;
  logOut: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      logIn: (userData) => set({ user: userData }),
      logOut: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
