'use client';

import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
  return (
    <header
      className="flex justify-between items-center p-5 border-b fixed top-0 bg-white w-full z-50"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
    >
      <Link href="/">
        <h1 className="text-2xl">🔥BonFire</h1>
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
