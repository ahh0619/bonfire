'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { logout } from '@/app/login/actions';
import { Tables } from '@/types/supabase';
import NavSkeleton from './NavSkeleton';

type NavProps = {
  user: Tables<'users'>[] | null;
  isReady: boolean;
  closeMenu: () => void;
};

const Nav = ({ user, isReady, closeMenu }: NavProps) => {
  const { logOut } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    logOut();
    closeMenu();
  };

  if (!isReady) {
    return <NavSkeleton />;
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
