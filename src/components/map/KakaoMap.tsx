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
import FacilMarker from './FacilMarker';
import FacilOverlay from './FacilOverlay';
import { useQueryClient } from '@tanstack/react-query';
import CurrentMarker from './CurrentMarker';

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
  const [map, setMap] = useState<kakao.maps.Map | null>(null); 
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [facilSearchResult, setFacilSearchResult] = useState<
    kakao.maps.services.PlacesSearchResult | []
  >([]);
  const [facilCode, setFacilCode] = useState<"HP8" | "PM9" | "CS2" | ''>('');
  const [current, setCurrent] = useState<any>();
  useSetMapBounds(map, radiusCampList);
  useSdkLoad(setIsSdkLoaded);

  const handleCurrentPositionSearch = async () => {
    if (map) {
      const center = map.getCenter(); 
      const latitude = center.getLat();
      const longitude = center.getLng();
      setGeoData({ latitude, longitude }); 
      await queryClient.invalidateQueries({ queryKey: ['radiusCampData'] });
      await refetch();
    }
  };

  const handlecurrentPosition = async () => {
    const getGeoData = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          },
        );
        setCurrent(position.coords);
        return position;
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    const position = await getGeoData();
    if (position && map) {
      const newCenter = new kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude,
      ); 
      map.setCenter(newCenter); 
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
          className="flex w-full h-full z-10"
          level={3}
          onCreate={setMap}
        >
          <MapMarkerComponent
            radiusCampList={radiusCampList}
            setSelectedMarker={setSelectedMarker}
          />
          <CurrentMarker coords={current} />
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
          <div className="absolute mt-96 w-full flex justify-center">
            <button
              className=" relative top-96 mt-40 bg-[#FD470E] text-white text-base font-semibold w-[200px] m-5 p-2 rounded-md hover:bg-[#e0400e] transition-all z-10"
              onClick={handleCurrentPositionSearch}
            >
              현 위치로 검색
            </button>
          </div>
          <div className="absolute mt-96 mr-16 max-w-[1920px] w-full flex justify-end">
            <button
              className="relative top-96 mt-32 bg-[#FD470E] text-white text-base font-semibold h-[80px] w-[80px] m-5 p-2 rounded-full hover:bg-[#e0400e] transition-all z-10"
              onClick={handlecurrentPosition}
            >
              내 위치
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
