'use Client';

import Script from 'next/script';
import { useCallback, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { MapComponentProps } from './MapComponent';
import MapMarkerComponent from './MapMarker';
import CustomOverlay from './CustomOverlay';
import { Camping } from '@/types/Camping';
import useSetMapBounds from '@/hooks/map/useSetMapBounds';
import useSdkLoad from '@/hooks/map/useSdkLoad';
import FacilMarker from './FacilMarker';
import FacilOverlay from './FacilOverlay';
import { fetchRadiusCampList } from '@/app/api/campingApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

const KakaoMap = ({
  radiusCampList,
  geoData,
  setGeoData,
  refetch,
}: MapComponentProps) => {
  const queryClient = useQueryClient();
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
  const [selectedFacilMarker, setSelectedFacilMarker] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // Map 객체 저장
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [facilSearchResult, setFacilSearchResult] = useState<
    kakao.maps.services.PlacesSearchResult | []
  >([]);
  const [facilCode, setFacilCode] = useState<string>('');
  useSetMapBounds(map, radiusCampList);
  useSdkLoad(setIsSdkLoaded);
  const handleCurrentPositionSearch = async () => {
    if (map) {
      const center = map.getCenter(); // 지도 중심 좌표 가져오기
      const latitude = center.getLat();
      const longitude = center.getLng();
      setGeoData({ latitude, longitude }); // 상태 업데이트
      await queryClient.invalidateQueries({ queryKey: ['radiusCampData'] });
      await refetch();
    }
  };
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
          <FacilMarker
            facilSearchResult={facilSearchResult}
            facilCode={facilCode}
            setSelectedFacilMarker={setSelectedFacilMarker}
          />
          <CustomOverlay
            radiusCampList={radiusCampList}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            setFacilSearchResult={setFacilSearchResult}
            setFacilCode={setFacilCode}
          />
          <FacilOverlay
            facilSearchResult={facilSearchResult}
            selectedFacilMarker={selectedFacilMarker}
            setSelectedFacilMarker={setSelectedFacilMarker}
          />
          {facilSearchResult.length ? (
            <button
              className="absolute bg-[#FD470E] text-white text-base font-semibold w-[200px] m-5 p-2 rounded-md hover:bg-[#e0400e] transition-all z-10"
              onClick={() => setFacilSearchResult([])}
            >
              돌아가기
            </button>
          ) : null}
          <div className="relative bottom-20 w-full flex justify-center z-10">
            <button
              className="bg-[#FD470E] text-white text-base font-semibold w-[200px] m-5 p-2 rounded-md hover:bg-[#e0400e] transition-all z-10"
              onClick={handleCurrentPositionSearch}
            >
              현 위치로 검색
            </button>
          </div>
          <div className="relative bottom-40 w-full flex justify-end z-10">
            <button
              className="bg-[#FD470E] text-white text-base font-semibold w-[200px] m-5 p-2 rounded-md hover:bg-[#e0400e] transition-all z-10"
              onClick={handleCurrentPositionSearch}
            >
              현 위치 표시
            </button>
          </div>
        </Map>
      ) : (
        <p>로딩 중입니다.</p>
      )}
    </>
  );
};

export default KakaoMap;
