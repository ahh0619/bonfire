'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CommentForm = ({ placeId }: { placeId: string }) => {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		// 댓글 제출 기능
		console.log(`닉네임: ${nickname}\n댓글: ${comment}\nplaceId: ${placeId}`);

    setNickname('');
    setComment('');
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">작성하기</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default CommentForm;
