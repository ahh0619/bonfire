'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

const LikeButton = ({ initialLikes = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    // 낙관적 업데이트 적용
    const updatedLikes = liked ? likes - 1 : likes + 1;

    setLiked((prev) => !prev);
    setLikes(updatedLikes);

    // 낙관적 업데이트 부분 필요
    // TODO: 추후 추가 예정
  };

  return (
    <button onClick={toggleLike} className="flex flex-col items-center">
      <Heart
        className={`transition-colors ${
          liked ? 'fill-red-500 text-red-500' : 'fill-none'
        }`}
      />
      <p>{likes}</p>
    </button>
  );
};

export default LikeButton;
