'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { CommentInput } from './CommentInput';

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
      className="flex flex-col mb-6"
    >
      <div className="flex flex-row gap-2">
        <MessageSquare className="fill-black text-black" />
        <p>(0)</p>
      </div>

      <hr className="border border-gray-500 my-4" />
      <div className="mb-4">
        <CommentInput
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-[#FFB200] px-4 py-2 rounded-lg text-white font-semibold place-self-end"
      >
        작성하기
      </button>
    </form>
  );
};

export default CommentForm;
