'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { getUser, logout } from '@/app/login/actions';

type NavProps = {
  closeMenu: () => void;
};

const Nav = ({ closeMenu }: NavProps) => {
  const { user, logIn, logOut } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const userData = await getUser();
      logIn(userData);
    };

    fetchSession();
    setIsReady(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    logOut();
    closeMenu();
  };

  if (!isReady) {
    return null;
  }

  return (
    <ul className="flex flex-col md:flex-row gap-4">
      {user ? (
        <>
          <Link
            href="/mypage"
            onClick={(e) => {
              closeMenu();
            }}
          >
            <li className="hover:text-blue-600 transition">마이페이지</li>
          </Link>
          <li
            onClick={handleLogout}
            className="hover:text-red-600 transition cursor-pointer"
          >
            로그아웃
          </li>
        </>
      ) : (
        <Link
          href="/login"
          onClick={(e) => {
            closeMenu();
          }}
        >
          <li className="hover:text-blue-600 transition">로그인</li>
        </Link>
      )}
    </ul>
  );
};

export default Nav;
