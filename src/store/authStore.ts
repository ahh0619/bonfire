import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      logIn: () => set({ isLoggedIn: true }),
      logOut: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
