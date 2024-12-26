'use client';

import React from 'react';

type ErrorFallbackProps = {
  message?: string; // 기본 에러 메시지
  errorDetail?: string; // 에러 상세 정보
  onRetry: () => void; // 재시도 버튼 클릭 시 호출할 함수
  retryLabel?: string; // 재시도 버튼 라벨
  backgroundClass?: string; // 배경 색상 클래스 (옵션)
};

export const ErrorFallback = ({
  message = '오류가 발생했습니다.',
  errorDetail,
  onRetry,
  retryLabel = '다시 시도',
  backgroundClass = 'bg-red-50 border border-red-200',
}: ErrorFallbackProps) => (
  <div
    className={`flex flex-col items-center justify-center h-64 text-center rounded-lg ${backgroundClass}`}
  >
    <p className="text-red-500 text-lg mb-4">{message}</p>
    {errorDetail && <p className="text-gray-500 text-sm mb-4">{errorDetail}</p>}
    <button
      onClick={onRetry}
      className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      {retryLabel}
    </button>
  </div>
);
