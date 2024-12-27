"use client"

import React from 'react';
import CommentForm from '@/components/detail/CommentForm';
import CommentList from '@/components/detail/CommentList';
import { useComments } from '@/hooks/comment/useComment';

type CommentSectionProps = {
  facltNm: string;
};

const CommentSection = ({ facltNm }: CommentSectionProps) => {
  const { comments: commentList, isCommentsPending } = useComments(facltNm);

  if (isCommentsPending) {
    return <p>댓글 로딩 중...</p>
  }

  return (
    <div className="flex flex-col border rounded-xl border-black p-8">
      {/* 댓글 입력 부분 */}
      <CommentForm placeName={facltNm} commentNum={commentList.length} />

      {/* 댓글 리스트 부분 */}
      {<CommentList commentList={commentList} placeName={facltNm} />}
    </div>
  );
};

export default CommentSection;
