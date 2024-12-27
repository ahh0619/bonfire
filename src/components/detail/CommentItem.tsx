'use client';

import { useComments } from '@/hooks/comment/useComment';
import { useAuthStore } from '@/store/authStore';
import { PenLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CommentInput } from './CommentInput';
import Swal, { SweetAlertResult } from 'sweetalert2';

type CommentProps = {
  userId: string;
  nickname: string;
  profileImage: string | null;
  content: string;
  commentId: string;
  placeName: string;
};

const Comment = ({
  userId,
  nickname,
  profileImage,
  content,
  commentId,
  placeName,
}: CommentProps) => {
  const { user: currentUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState(content);
  const { deleteComment, isDeleting, updateComment, isUpdating } =
    useComments(placeName);
  const allowedToChange = currentUser?.[0]?.id === userId;
  const router = useRouter();

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
        deleteComment(commentId, {
          onSuccess: () => {
            router.refresh();
          },
        });
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
    setEditedContent(content);
    return;
  }

  if (content === editedContent.trim()) {
    setIsEditing(false);
    return;
  }

    // TODO: 낙관적 업데이트 필요해보임
    // 댓글이 미리 업데이트 되고 나서 리프레시도 진행하는 걸로 
  updateComment(
    { commentId, content: editedContent },
    {
      onSuccess: () => {
        setIsEditing(false);
        router.refresh();
      },
    },
  );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        {/* 유저 프로필 이미지 부분 */}
        {profileImage ? (
          <Image
            src={profileImage}
            alt={`${nickname}'s profile`}
            width={40}
            height={40}
            className="rounded-full w-10 aspect-square object-cover"
          />
        ) : (
          <div className="bg-gray-300 rounded-full w-10 aspect-square"></div>
        )}
        <p>{nickname}</p>
      </div>

      {isEditing ? (
        <CommentInput
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          disabled={isUpdating}
        />
      ) : (
        <div className="border rounded-xl px-3 py-4 my-4">{content}</div>
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

export default Comment;
