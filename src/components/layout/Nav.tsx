'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { getUser, logout } from '@/app/login/actions';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const Nav = () => {
  const { user, logIn, logOut } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const userData = await getUser();
      console.log('nav userData: ', userData);
      logIn(userData);
    };

    fetchSession();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    logOut();
  };

  return (
    <nav>
      <ul className="flex gap-4">
        {user ? (
          <>
            <li>
              <Link href="/mypage">마이페이지</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:underline">
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">로그인</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
