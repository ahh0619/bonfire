'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  addLike,
  getLikeCount,
  isUserLikedPlace,
  removeLike,
} from '@/utils/likes/actions'; // 서버 액션 import
import { useAuthStore } from '@/store/authStore';

type LikeButtonProps = {
  placeImgUrl: string; // 장소 이미지
  placeName: string; // 장소 이름
  addressName: string; // 주소
  phoneNumber: string; // 전화번호
  locationX?: number; // 위치 X 좌표
  locationY?: number; // 위치 Y 좌표
};

const LikeButton = ({
  placeImgUrl,
  placeName,
  addressName,
  phoneNumber,
  locationX,
  locationY,
}: LikeButtonProps) => {
  const { user: currentUser } = useAuthStore();
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    console.log('currentUser', currentUser);
    console.log('like button', currentUser[0]?.id);

    const fetchData = async () => {
      try {
        const [totalLikes, userLiked] = await Promise.all([
          getLikeCount(placeName),
          isUserLikedPlace(currentUser[0].id, placeName),
        ]);

        console.log(totalLikes);
        setLikes(totalLikes);
        setLiked(userLiked);
      } catch (error) {
        console.error('Error fetching like data:', error);
      }
    };

    fetchData();
  }, [placeName, currentUser]);

  const toggleLike = async () => {
    if (!currentUser) {
      // TODO: sweet로 바꿔라ㅏㅏㅏ
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    // 데이터 로딩 중 토글 방지
    if (liked === null || likes === null) return;

    try {
      if (liked) {
        // 좋아요 취소
        await removeLike(currentUser[0]?.id, placeName);
        setLikes((prev) => (prev !== null ? prev - 1 : prev));
        setLiked(false);
      } else {
        // 좋아요 추가
        await addLike({
          user_id: currentUser[0].id,
          place_image: placeImgUrl,
          place_name: placeName,
          address_name: addressName,
          phone_number: phoneNumber,
          location_x: locationX!,
          location_y: locationY!,
        });
        setLikes((prev) => (prev !== null ? prev + 1 : prev));
        setLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setLiked(!liked); // 에러 발생 시 상태 복구
      setLikes(likes); // 에러 발생 시 카운트 복구
    }
  };

  return (
    <button onClick={toggleLike} className="flex flex-col items-center">
      <Heart
        className={`transition-colors ${
          liked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'
        }`}
      />
      <p>{likes === null || liked === null ? 0 : likes}</p>
    </button>
  );
};

export default LikeButton;
