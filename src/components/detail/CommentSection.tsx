import React, { Suspense } from 'react';
import CommentForm from './CommentForm';
import Comments from './Comments';
import { fetchComments } from '@/app/detail/actions';
import { Comment } from '@/types/Comment';

type CommentSectionProps = {
  userId: string;
  facltNm: string;
};

const CommentSection = async ({ userId, facltNm }: CommentSectionProps) => {
	const commentList: Comment[] = await fetchComments(facltNm);
  return (
    <div className="flex flex-col border rounded-xl border-black p-8">
      <CommentForm userId={userId} placeName={facltNm} commentNum={commentList.length}/>
      <Suspense fallback={<div>댓글 로딩 중...</div>}>
        <Comments commentList={commentList} />
      </Suspense>
    </div>
  );
};

export default CommentSection;
