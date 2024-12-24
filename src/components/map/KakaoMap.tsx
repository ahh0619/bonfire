'use Client';

import Script from 'next/script';
import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { MapComponentProps } from './MapComponent';
import MapMarkerComponent from './MapMarker';
import CustomOverlay from './CustomOverlay';
import { Camping } from '@/types/Camping';
import useSetMapBounds from '@/hooks/map/useSetMapBounds';
import useSdkLoad from '@/hooks/map/useSdkLoad';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

const KakaoMap = ({ radiusCampList, geoData }: MapComponentProps) => {
  const [selectedMarker, setSelectedMarker] = useState<Pick<
    Camping,
    | 'contentId'
    | 'firstImageUrl'
    | 'facltNm'
    | 'addr1'
    | 'induty'
    | 'mapY'
    | 'mapX'
    | 'tel'
  > | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // Map 객체 저장
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  useSetMapBounds(map, radiusCampList);
  useSdkLoad(setIsSdkLoaded);
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="afterInteractive" />
      {isSdkLoaded && geoData ? (
        <Map
          center={{
            lat: geoData.latitude,
            lng: geoData.longitude,
          }}
          className="w-full h-full"
          level={3}
          onCreate={setMap}
        >
          <MapMarkerComponent
            radiusCampList={radiusCampList}
            setSelectedMarker={setSelectedMarker}
          />
          <CustomOverlay
            radiusCampList={radiusCampList}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
          />
        </Map>
      ) : (
        <p>로딩 중입니다.</p>
      )}
    </>
  );
};

export default KakaoMap;
