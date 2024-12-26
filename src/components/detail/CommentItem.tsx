'use client';

import { useComments } from '@/hooks/comment/useComment';
import { useAuthStore } from '@/store/authStore';
import { PenLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type CommentProps = {
  userId: string;
  nickname: string;
  profileImage: string | null;
  content: string;
  commentId: string;
  placeName: string;
};

const Comment = ({ userId, nickname, profileImage, content, commentId, placeName }: CommentProps) => {
  const { user: currentUser } = useAuthStore();
  const { deleteComment, isDeleting } = useComments(placeName);
  const allowedToChange = currentUser?.[0]?.id === userId;
  const router = useRouter();

  const handleDelete = () => {
    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      deleteComment(commentId, {
        onSuccess: () => {
          router.refresh();
        } 
      });
    }
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
      <div className="border rounded-xl px-3 py-4 my-4">{content}</div>
      <div className="flex flex-row place-self-end gap-2">
        {allowedToChange && (
          <>
            <button>
              <PenLine />
            </button>
            <button onClick={handleDelete} disabled={isDeleting}>
              <Trash2 />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
