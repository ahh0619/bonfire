'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { CommentInput } from '@/components/detail/CommentInput';
import { useAuthStore } from '@/store/authStore';
import { useComments } from '@/hooks/comment/useComment';
import Swal from 'sweetalert2';

type CommentFormProps = {
  placeName: string;
  commentNum: number;
};

const CommentForm = ({ placeName, commentNum }: CommentFormProps) => {
  const { user: currentUser } = useAuthStore();
  const [comment, setComment] = useState('');
  const { addComment, isAdding } = useComments(placeName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 댓글이 비어 있는 경우 추가 X
    if (!comment.trim()) {
      Swal.fire({
        icon: 'warning',
        text: '댓글 입력창이 비어있습니다',
        confirmButtonColor: '#FD470E',
        iconColor: '#FD470E',
      });
      return;
    }

    if (currentUser) {
      addComment(
        { content: comment, userId: currentUser[0].id },
        {
          onSuccess: () => {
            setComment('');
          },
          onError: () => {
            Swal.fire({
              icon: 'error',
              text: '댓글 작성에 실패했습니다. 다시 시도해주세요.',
              confirmButtonColor: '#FD470E',
              iconColor: '#FD470E',
            });
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-6">
      <div className="flex flex-row gap-2">
        <h2>댓글</h2>
        <MessageSquare className="fill-black text-black" />
        <p>{`(${commentNum})`}</p>
      </div>

      <hr className="border border-gray-500 mt-4" />
      <CommentInput
        disabled={!currentUser}
        type="text"
        placeholder={!currentUser ? '로그인이 필요합니다' : '댓글을 입력하세요'}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
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
