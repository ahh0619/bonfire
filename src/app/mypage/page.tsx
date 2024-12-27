import { Metadata } from 'next';
import { ProfileCard } from '@/components/mypage/ProfileCard';
import { FavoritePlaces } from '@/components/mypage/FavoritePlaces';

export const metadata: Metadata = {
  title: 'BonFire - 마이페이지',
  description: '내 프로필 정보와 즐겨찾는 장소를 확인하세요.',
  openGraph: {
    title: 'BonFire - 마이페이지',
    description: '내 프로필 정보와 즐겨찾는 장소를 확인하세요.',
    url: 'http://localhost:3000/mypage',
  },
};

const MyPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <main className="container mx-auto max-w-7xl p-20">
        <ProfileCard />
        <FavoritePlaces />
      </main>
    </div>
  );
};

export default MyPage;
