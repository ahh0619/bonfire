'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { CommentInput } from './CommentInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '@/app/detail/actions';
import { useAuthStore } from '@/store/authStore';

type CommentFormProps = {
  placeName: string;
  commentNum: number;
};

const CommentForm = ({ placeName, commentNum }: CommentFormProps) => {
  const { user: currentUser } = useAuthStore();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      // TODO: 에러 처리보다는 로그인으로 유도하는 것이 필요해보입니다
      // 인증된 유저가 아닌 경우 에러 처리
      if (!currentUser) {
        throw new Error('댓글 입력을 위해서는 로그인이 필요합니다');
      }

      // DB로 전송 (서버 액션)
      await addComment({
        content: comment,
        place_name: placeName,
        user_id: currentUser[0].id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', placeName] });
      setComment('');
      router.refresh();
    },
    onError: (error) => {
      console.error('댓글 등록 실패:', error);
      // TODO: alert 말고 다른것으로 바꾸기
      alert('댓글 등록에 실패했습니다.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 댓글 (빈 댓글 받으면 안됨)
    if (!comment.trim()) {
      // TODO: alert 말고 다른 것
      alert('댓글 입력창이 비어있습니다.');
      return;
    }
    mutation.mutate();
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
        {mutation.isPending ? '작성 중...' : '작성하기'}
      </button>
    </form>
  );
};

export default CommentForm;
