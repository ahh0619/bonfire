'use client';

import { useQuery } from '@tanstack/react-query';
import { FavoriteSkeleton } from '@/components/mypage/FavoriteSkeleton';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import useFetchLikedPlaces from '@/hooks/mypage/useFetchLikedPlaces ';

type LikesRow = Tables<'likes'>;

export const FavoritePlaces = () => {
  const fetchLikedPlacesData = useFetchLikedPlaces();
  const { data, isPending, isError, error, refetch } = useQuery<
    LikesRow[],
    Error
  >({
    queryKey: ['likedPlaces'],
    queryFn: fetchLikedPlacesData,
  });

  return (
    <section className="mt-20 w-full">
      <h3 className="text-2xl font-bold border-b-2 border-gray-300 pb-3">
        좋아요한 곳
      </h3>
      {isError ? (
        <ErrorFallback
          message="좋아요한 장소를 가져오는 중 오류가 발생했습니다."
          errorDetail={error?.message}
          onRetry={refetch}
          retryLabel="다시 시도"
        />
      ) : isPending ? (
        <FavoriteSkeleton />
      ) : !data || data.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">좋아요한 장소가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {data.map((place) => (
            <Link href={`/detail/${place.place_name}`} key={place.id}>
              <div
                key={place.id}
                className="bg-white min-h-[200px] shadow rounded-lg p-4 flex hover:scale-105 cursor-pointer flex-col"
              >
                {/* 이미지 컨테이너 */}
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden mb-4">
                  <Image
                    src={place.place_image || '/images/default_icon.webp'}
                    alt={place.place_name}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                {/* 텍스트 영역 */}
                <div className="flex flex-col justify-between flex-grow">
                  <h4 className="text-lg font-semibold text-black truncate">
                    {place.place_name}
                  </h4>
                  <p className="text-md text-gray-600 truncate">
                    {place.address_name}
                  </p>
                  <p className="text-md text-gray-600">
                    {place.phone_number || '전화번호 없음'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
