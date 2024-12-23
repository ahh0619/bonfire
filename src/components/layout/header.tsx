import { fetchSession, logout } from '@/app/login/actions';
import Link from 'next/link';

const Header = async () => {
  const user = await fetchSession();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">MyApp</h1>
      <nav>
        <ul className="flex gap-4">
          {user ? (
            <>
              <li>
                <Link href={'/mypage'}>My Page</Link>
              </li>
              <li>
                <form action={logout} method="POST">
                  <button type="submit" className="hover:underline">
                    Logout
                  </button>
                </form>
              </li>
            </>
          ) : (
            <li>
              <Link href={'/login'}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
