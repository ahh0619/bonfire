import { createClient } from '@/utils/supabase/client';
import { Subscription, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type listernProps = {
  subscription: Subscription;
};

type AuthState = {
  user: User | null;
  logIn: (userData: any) => void;
  logOut: () => void;
  // listenToAuthChanges: () => listernProps;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      logIn: (userData: any) => set({ user: userData }),
      logOut: () => set({ user: null }),
      // 로그인 상태 변경 감지
      // listenToAuthChanges: () => {
      //   const supabase = createClient();
      //   const { data: listener } = supabase.auth.onAuthStateChange(
      //     (event, session) => {
      //       console.log('setssion: ', session);
      //       set({ user: session ? session.user : null });
      //     },
      //   );
      //   return listener;
      // },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
