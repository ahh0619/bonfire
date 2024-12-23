'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '../../app/mypage/actions'; // 서버 액션 호출

type ProfileModalProps = {
  onClose: () => void; // 모달을 닫는 함수
  userId: string; // 유저 ID
  currentImage: string; // 현재 프로필 이미지 URL
  currentNickname: string; // 현재 닉네임
};

export function ProfileModal({
  onClose,
  userId,
  currentImage,
  currentNickname,
}: ProfileModalProps) {
  const [image, setImage] = useState(currentImage); // 미리보기 이미지 상태
  const [nickname, setNickname] = useState(currentNickname); // 닉네임 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 선택한 파일 상태
  const queryClient = useQueryClient();

  // 프로필 업데이트 Mutation
  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile); // 파일 추가
      }
      formData.append('userId', userId); // 유저 ID 추가
      formData.append('nickname', nickname); // 닉네임 추가

      // 서버 액션 호출 (FormData 사용)
      await updateUserProfile(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] }); // 쿼리 캐시 새로고침
      onClose(); // 모달 닫기
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패:', error); // 에러 로그 출력
      alert('프로필 업데이트에 실패했습니다.'); // 사용자 알림
    },
  });

  // 이미지 변경 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file); // 파일 상태 업데이트
      const imageUrl = URL.createObjectURL(file); // 미리보기 이미지 URL 생성
      setImage(imageUrl); // 미리보기 이미지 설정
    }
  };

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    mutation.mutate(); // Mutation 실행
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white w-full max-w-md p-10 rounded-xl relative flex flex-col items-center">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 hover:font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 모달 제목 */}
        <h3 className="text-xl font-semibold text-center mb-6">프로필 수정</h3>

        {/* 이미지 섹션 */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src={image}
            alt="프로필 사진"
            className="rounded-full mb-4 aspect-square object-cover"
            width={120}
            height={120}
          />
          <div className="flex space-x-4">
            <label
              htmlFor="image-upload"
              className="px-4 py-2 text-sm font-bold rounded-full border border-gray-300 cursor-pointer hover:bg-gray-200"
            >
              이미지 변경
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* 닉네임 입력 필드 */}
        <div className="w-3/4 mb-10">
          <label className="block font-bold text-sm text-gray-700 mb-1">
            닉네임
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="변경하실 닉네임을 입력해주세요."
            className="w-full border-b rounded-none py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 저장 버튼 */}
        <button
          type="button"
          onClick={handleSave}
          disabled={mutation.isPending}
          className={`w-1/3 py-2 text-white rounded-full font-bold ${
            mutation.isPending ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {mutation.isPending ? '업데이트 중...' : '수정 완료'}
        </button>
      </div>
    </div>
  );
}
