'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { logout } from '@/app/login/actions';
import { useEffect, useState } from 'react';

const Nav = () => {
  const { isLoggedIn, logOut } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1);

    return () => clearTimeout(timer);
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
        {isLoggedIn ? (
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
