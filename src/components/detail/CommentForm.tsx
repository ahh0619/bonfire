'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';

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
      className="border border-black rounded-lg p-6 mb-6"
    >
			<MessageSquare className='fill-gray-500 text-gray-500' />
			<hr className='border border-gray-500 my-4'/>
      <div className="mb-4">
        <input
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">작성하기</button>
    </form>
  );
};

export default CommentForm;
