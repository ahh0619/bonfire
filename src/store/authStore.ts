import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: null;
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
