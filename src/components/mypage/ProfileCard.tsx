'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProfileModal } from './ProfileModal';
import { ProfileSkeleton } from '@/components/mypage/ProfileSkeleton'; // 스켈레톤 UI
import { ErrorFallback } from '@/components/common/ErrorFallback';
import { getUser } from '@/app/login/actions';

export const ProfileCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: userProfile,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const data = await getUser();
      if (!data) {
        throw new Error('User is not available');
      }
      return data[0]; // 서버 액션에서 인증된 유저의 프로필 가져오기
    },
  });

  if (isPending) return <ProfileSkeleton />;

  if (isError) {
    return (
      <ErrorFallback
        message="유저 정보를 가져오는 중 오류가 발생했습니다."
        errorDetail={error.message}
        onRetry={refetch}
        retryLabel="다시 시도"
      />
    );
  }

  if (!userProfile) {
    return (
      <ErrorFallback
        message="유저 정보를 불러올 수 없습니다."
        onRetry={refetch}
        retryLabel="다시 시도"
        backgroundClass="bg-blue-50 border border-blue-200"
      />
    );
  }

  return (
    <div className="flex items-center">
      {/* 유저 프로필 이미지 */}
      <Image
        src={userProfile.profile_image || '/images/leader_github_logo.png'}
        alt="프로필 사진"
        className="rounded-full mb-4 aspect-square object-cover"
        width={100}
        height={100}
      />
      <div className="h-24 ml-5">
        {/* 유저 닉네임 */}
        <h2 className="text-2xl font-semibold mb-4">{userProfile.nickname}</h2>
        <button
          className="px-4 py-2 text-sm border border-black text-black rounded-3xl hover:bg-black hover:text-white"
          onClick={() => setModalOpen(true)}
        >
          프로필 수정
        </button>
      </div>
      {/* 프로필 수정 모달 */}
      {modalOpen && (
        <ProfileModal
          onClose={() => setModalOpen(false)}
          userId={userProfile.id}
          currentImage={userProfile.profile_image}
          currentNickname={userProfile.nickname}
        />
      )}
    </div>
  );
};
