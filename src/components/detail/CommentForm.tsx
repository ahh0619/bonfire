'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { CommentInput } from './CommentInput';
import { useAuthStore } from '@/store/authStore';
import { useComments } from '@/hooks/comment/useComment';

type CommentFormProps = {
  placeName: string;
  commentNum: number;
};

const CommentForm = ({ placeName, commentNum }: CommentFormProps) => {
  const { user: currentUser } = useAuthStore();
  const [comment, setComment] = useState('');
  const { addComment, isAdding } = useComments(placeName);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty comments
    if (!comment.trim()) {
      alert('댓글 입력창이 비어있습니다.');
      return;
    }

    if (currentUser) {
      addComment(
        { content: comment, userId: currentUser[0].id },
        {
          onSuccess: () => {
            setComment('');
            router.refresh();
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-6">
      <div className="flex flex-row gap-2">
        <h1>댓글</h1>
        <MessageSquare className="fill-black text-black" />
        <p>{`(${commentNum})`}</p>
      </div>

      <hr className="border border-gray-500 my-4" />
      <div className="mb-4">
        <CommentInput
          disabled={!currentUser}
          placeholder={
            !currentUser ? '로그인이 필요합니다' : '댓글을 입력하세요'
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      {currentUser && (
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white font-semibold place-self-end ${
            isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FFB200]'
          }`}
          disabled={isAdding}
        >
          {isAdding ? '작성 중...' : '작성하기'}
        </button>
      )}
    </form>
  );
};

export default CommentForm;
