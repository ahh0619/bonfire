'use client';

import KakaoMap from '@/components/map/Map';
import { useEffect, useState } from 'react';

const MapPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="p-3">캠핑장 찾기</p>
        <div className="w-[1200px]">
          <main className="flex flex-col items-center w-[1200px] h-[600px]">
            <KakaoMap />
          </main>
        </div>
      </div>
    </>
  );
};

export default MapPage;
