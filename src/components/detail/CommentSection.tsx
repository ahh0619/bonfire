import React, { Suspense } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { fetchComments } from '@/app/detail/actions';
import { Comment } from '@/types/Comment';
import CommentListSkeleton from './CommentListSkeleton';

type CommentSectionProps = {
  userId: string;
  facltNm: string;
};

const CommentSection = async ({ userId, facltNm }: CommentSectionProps) => {
	const commentList: Comment[] = await fetchComments(facltNm);
  return (
    <div className="flex flex-col border rounded-xl border-black p-8">
      <CommentForm
        userId={userId}
        placeName={facltNm}
        commentNum={commentList.length}
      />
      <Suspense fallback={<CommentListSkeleton />}>
        <CommentList commentList={commentList} />
      </Suspense>
    </div>
  );
};

export default CommentSection;
