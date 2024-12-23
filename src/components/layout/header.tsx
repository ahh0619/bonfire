import { fetchSession, logout } from '@/app/login/actions';
import Link from 'next/link';
import { Anonymous_Pro } from 'next/font/google';

const anonymousPro = Anonymous_Pro({
  subsets: ['latin'],
  weight: ['700'],
});

const Header = async () => {
  const user = await fetchSession();

  return (
    <header
      className="flex justify-between items-center p-5 border-b fixed top-0 bg-white w-full z-50"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      }}
    >
      <Link href="/">
        <h1 className={`${anonymousPro.className} text-2xl`}>🔥BornFire</h1>
      </Link>
      <nav>
        <ul className="flex gap-4">
          {user ? (
            <>
              <li>
                <Link href="/mypage">마이페이지</Link>
              </li>
              <li>
                <form action={logout} method="POST">
                  <button type="submit" className="hover:underline">
                    로그아웃
                  </button>
                </form>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">로그인</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
