'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { addLike, removeLike } from '@/utils/likes/actions'; // 서버 액션 import

type LikeButtonProps = {
  userId: string; // 사용자 ID
  placeId: string; // 장소 ID
  initialLikes: number;
  initialLiked: boolean; // 초기 좋아요 상태
};

const LikeButton = ({
  userId,
  placeId,
  initialLikes,
  initialLiked,
}: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = async () => {
    const updatedLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(updatedLikes);

    try {
      if (liked) {
        await removeLike(userId, placeId); // 좋아요 취소
      } else {
        await addLike(userId, placeId); // 좋아요 추가
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
      <p>{likes}</p>
    </button>
  );
};

export default LikeButton;
