'use client';

import { Heart } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';
import { useLikes } from '@/hooks/like/useLikes';

type LikeButtonProps = {
  placeImgUrl: string; // 장소 이미지
  placeName: string; // 장소 이름
  addressName: string; // 주소
  phoneNumber: string; // 전화번호
  locationX?: number; // 위치 X 좌표
  locationY?: number; // 위치 Y 좌표
};

const LikeButton = ({
  placeImgUrl,
  placeName,
  addressName,
  phoneNumber,
  locationX,
  locationY,
}: LikeButtonProps) => {
  const { user: currentUser } = useAuthStore();
  const userId = currentUser?.[0]?.id;
  const { likes, liked, isLikesPending, isLikedPending, addLike, removeLike } =
    useLikes(placeName, userId);
  const isPending = isLikesPending || isLikedPending;

  const handleToggleLike = async () => {
    if (!currentUser) {
      Swal.fire({
        icon: 'warning',
        iconColor: '#FD470E',
        title: '로그인이 필요합니다',
        text: '좋아요 기능 사용을 위해서는 로그인이 필요합니다',
        showCancelButton: true,
        cancelButtonText: '돌아가기',
        cancelButtonColor: '#AAAAAA',
        confirmButtonText: '로그인하기',
        confirmButtonColor: '#FD470E',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }
    // 데이터 로딩 중 토글 방지
    if (liked === null || likes === null) return;

    if (liked) {
      // 좋아요 취소
      removeLike();
    } else {
      // 좋아요 추가
      addLike({
        placeImage: placeImgUrl,
        addressName,
        phoneNumber,
        locationX: locationX ?? 0,
        locationY: locationY ?? 0,
      });
    }
  };

  return (
    <button onClick={handleToggleLike} className="flex flex-col items-center">
      <Heart
        className={`transition-colors ${
          liked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'
        }`}
      />
      {!isPending && <p>{likes ?? 0}</p>}
    </button>
  );
};

export default LikeButton;
