'use client';

import { useComments } from '@/hooks/comment/useComment';
import { useAuthStore } from '@/store/authStore';
import { PenLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CommentInput } from './CommentInput';

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
    // TODO: sweetalert로 할 수 있다면 변경하기
    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      deleteComment(commentId, {
        onSuccess: () => {
          router.refresh();
        },
      });
    }
  };

  const handleUpdate = () => {
    if (!editedContent.trim()) {
      // TODO: alert
      alert('수정하는 댓글의 내용이 비어있습니다.');
      return;
    }

    if (content === editedContent.trim()) {
      setIsEditing(false);
      return;
    }

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
