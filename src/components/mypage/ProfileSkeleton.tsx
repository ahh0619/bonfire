'use client';

export const ProfileSkeleton = () => {
  return (
    <div className="flex items-center animate-pulse">
      {/* 프로필 이미지 스켈레톤 */}
      <div className="rounded-full bg-gray-300 w-24 h-24"></div>
      <div className="ml-6">
        {/* 닉네임 스켈레톤 */}
        <div className="bg-gray-300 h-6 w-32 mb-4 rounded"></div>
        {/* 버튼 스켈레톤 */}
        <div className="bg-gray-300 h-10 w-24 rounded"></div>
      </div>
    </div>
  );
};
