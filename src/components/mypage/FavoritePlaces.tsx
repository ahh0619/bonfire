'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/app/mypage/actions'; // 서버 액션 호출
import { fetchLikedPlaces } from '@/utils/likes/actions'; // 좋아요 데이터 가져오는 함수
import { FavoriteSkeleton } from '@/components/mypage/FavoriteSkeleton'; // 스켈레톤 UI
import { Tables } from '@/types/supabase';
import Image from 'next/image';

type LikesRow = Tables<'likes'>;

export const FavoritePlaces = () => {
  const { data, isPending, isError, error } = useQuery<LikesRow[], Error>({
    queryKey: ['likedPlaces'],
    queryFn: async () => {
      const userProfile = await getUserProfile();
      if (!userProfile?.id) {
        throw new Error('User ID is not available');
      }
      const likedPlaces = await fetchLikedPlaces(userProfile.id);
      return likedPlaces;
    },
  });

  return (
    <section className="mt-20 w-full">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2">
        좋아요한 곳
      </h3>
      {isError && <div>오류 발생: {error?.message}</div>}
      {isPending ? (
        <FavoriteSkeleton />
      ) : !data || data.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">좋아요한 장소가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {data.map((place) => (
            <div
              key={place.id}
              className="bg-white h-auto shadow rounded-lg p-4 flex hover:scale-105 cursor-pointer"
            >
              <div className="bg-gray-300 w-1/2 rounded-md mr-4">
                <Image
                  src={place.place_image}
                  alt={place.place_name}
                  width={300}
                  height={300}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col justify-between w-1/2">
                <h4 className="text-lg font-semibold text-black">
                  {place.place_name}
                </h4>
                <p className="text-md text-gray-600">{place.address_name}</p>
                <p className="text-md text-gray-600">{place.phone_number}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
