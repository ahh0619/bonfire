'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <button onClick={toggleLike}>
      <Heart
        className={`transition-colors ${liked ? 'fill-red-500' : 'fill-none'}`}
      />
    </button>
  );
};

export default LikeButton;
