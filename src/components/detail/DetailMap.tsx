'use client';

import Script from 'next/script';
import { useState } from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';
import useSdkLoad from '@/hooks/map/useSdkLoad';
import { Camping } from '@/types/Camping';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

type DetailMapProps = {
  details: Camping;
  width: string;
  height: string;
};

const DetailMap = ({ details, width, height }: DetailMapProps) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  useSdkLoad(setIsSdkLoaded);

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="afterInteractive" />
      {isSdkLoaded ? (
        <StaticMap
          center={{ lat: Number(details.mapY), lng: Number(details.mapY) }}
          style={{
            // 지도의 크기
            width,
            height,
          }}
          level={3}
          marker={{
            position: { lat: Number(details.mapY), lng: Number(details.mapY) },
          }}
          id="detailmap"
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
