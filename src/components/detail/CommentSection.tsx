import React, { Suspense } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { fetchComments } from '@/app/detail/actions';
import { Comment } from '@/types/Comment';
import CommentListSkeleton from './CommentListSkeleton';

type CommentSectionProps = {
  facltNm: string;
};

const CommentSection = async ({facltNm }: CommentSectionProps) => {
	const commentList: Comment[] = await fetchComments(facltNm);
  return (
    <div className="flex flex-col border rounded-xl border-black p-8">
      <CommentForm
        placeName={facltNm}
        commentNum={commentList.length}
      />
      <Suspense fallback={<CommentListSkeleton />}>
        <CommentList commentList={commentList} placeName={facltNm} />
      </Suspense>
    </div>
  );
};

export default CommentSection;
