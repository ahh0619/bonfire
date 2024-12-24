'use client';

import Script from 'next/script';
import { useState } from 'react';
import Image from 'next/image';
import { Map, StaticMap } from 'react-kakao-maps-sdk';
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
        <div>
          <StaticMap
            center={{ lat: latitude, lng: longitude }}

            level={level}
						marker={{ position: { lat: latitude, lng: longitude }}}
          />
        </div>
      ) : (
        <p>로딩 중입니다.</p>
      )}
    </>
  );
};

export default DetailMap;
