'use client';

import Script from 'next/script';
import { useState } from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';
import useSdkLoad from '@/hooks/map/useSdkLoad';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

type DetailMapProps = {
  latitude: number;
  longitude: number;
  level?: number;
  width?: string;
  height?: string;
};

const DetailMap = ({
  latitude,
  longitude,
  level = 3,
  width = '100%',
  height = '300px',
}: DetailMapProps) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  useSdkLoad(setIsSdkLoaded);

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="afterInteractive" />
      {isSdkLoaded ? (
        <StaticMap
          center={{ lat: latitude, lng: longitude }}
          style={{
            // 지도의 크기
            width,
            height,
          }}
          level={level}
          marker={{ position: { lat: latitude, lng: longitude } }}
        />
      ) : (
        <div
          style={{ width, height }}
          className="animate-pulse bg-gray-300"
        ></div>
      )}
    </>
  );
};

export default DetailMap;