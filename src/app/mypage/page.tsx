import { ProfileCard } from '@/components/mypage/ProfileCard';
import { FavoritePlaces } from '@/components/mypage/FavoritePlaces';

const MyPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="container mx-auto max-w-5xl px-4 py-20">
        <ProfileCard />
        <FavoritePlaces />
      </main>
    </div>
  );
};

export default MyPage;
