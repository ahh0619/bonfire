'use client';

import { useComments } from '@/hooks/comment/useComment';
import { useAuthStore } from '@/store/authStore';
import { PenLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CommentInput } from '@/components/detail/CommentInput';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Comment } from '@/types/Comment';

type CommentProps = {
  comment: Comment;
  placeName: string;
};

const CommentItem = ({ comment, placeName }: CommentProps) => {
  const { user: currentUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { deleteComment, isDeleting, updateComment, isUpdating } =
    useComments(placeName);
  const allowedToChange = currentUser?.[0]?.id === comment.user_id;

  const handleDelete = () => {
    // 삭제 할건지 한 번만 더 확인
    Swal.fire({
      icon: 'warning',
      iconColor: '#FD470E',
      text: '이 댓글을 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      confirmButtonColor: '#FD470E',
      cancelButtonColor: '#6c757d',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        deleteComment(comment.id);
      }
    });
  };

  const handleUpdate = () => {
    if (!editedContent.trim()) {
      Swal.fire({
        icon: 'warning',
        text: '수정하는 댓글의 내용이 비어있습니다.',
        confirmButtonColor: '#FD470E',
        iconColor: '#FD470E',
      });
      setEditedContent(comment.content);
      return;
    }

    if (comment.content === editedContent.trim()) {
      setIsEditing(false);
      return;
    }

    updateComment({ commentId: comment.id, content: editedContent });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        {/* 유저 프로필 이미지 부분 */}
        {comment.user.profile_image ? (
          <Image
            src={comment.user.profile_image}
            alt={`${comment.user.nickname}'s profile`}
            width={40}
            height={40}
            className="rounded-full w-10 aspect-square object-cover"
            // placeholder="blur"
          />
        ) : (
          <div className="bg-gray-300 rounded-full w-10 aspect-square"></div>
        )}
        <p>{comment.user.nickname}</p>
      </div>

      {isEditing ? (
        <CommentInput
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          disabled={isUpdating}
        />
      ) : (
        <div className="border rounded-xl px-3 py-4 my-4">
          {comment.content}
        </div>
      )}

      <div className="flex flex-row place-self-end gap-2">
        {allowedToChange && (
          <>
            {isEditing ? (
              <button
                className={`px-4 py-2 rounded-lg text-white mb-0 font-semibold place-self-end ${
                  isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FFB200]'
                }`}
                disabled={isUpdating}
                onClick={handleUpdate}
              >
                {isUpdating ? '수정 중...' : '수정하기'}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                disabled={isUpdating}
                className="py-2"
              >
                <PenLine />
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="py-2"
            >
              <Trash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
