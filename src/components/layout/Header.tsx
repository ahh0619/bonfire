'use client';

import Link from 'next/link';
import Nav from './Nav';
import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { getUser } from '@/app/login/actions';

const Header = () => {
  const { user, logIn } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const fetchSession = async () => {
      const userData = await getUser();
      logIn(userData);
    };

    document.addEventListener('mousedown', handleClickOutside);
    fetchSession();
    setIsReady(true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className="flex justify-between items-center p-5 border-b fixed top-0 bg-white w-full z-50"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
    >
      <Link href="/">
        <h1 className="text-2xl">🔥BonFire</h1>
      </Link>

      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-700 p-2 rounded-lg hover:bg-gray-200 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="hidden md:block">
        <Nav user={user} isReady={isReady} closeMenu={() => {}} />
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-5 mt-2 w-48 bg-white border rounded-lg shadow-lg p-4 md:hidden"
        >
          <Nav user={user} isReady={isReady} closeMenu={closeMenu} />
        </div>
      )}
    </header>
  );
};

export default Header;
