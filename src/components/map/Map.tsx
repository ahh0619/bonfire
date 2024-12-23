'use Client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import tempImg from 'leader_github_logo.png';
import Image from 'next/image';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';

type coords = {
  latitude: number;
  longitude: number;
};

type latlng = {
  lat: number;
  lng: number;
};

type goCampingData = {
  title: string;
  latlng: latlng;
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

const KakaoMap = () => {
  const {
    data: radiusCampData,
    isPending: isCampListPending,
    isError: isCampListError,
    error: campListError,
  } = useQuery<CampingResponse>({
    queryKey: ['radiusCampData'],
    queryFn: fetchRadiusCampList,
  });
  const radiusCampList: Pick<
    Camping,
    'contentId' | 'firstImageUrl' | 'facltNm' | 'addr1' | 'induty'
  >[] = radiusCampData?.response.body.items.item || [];

  console.log(radiusCampList);

  const [goCampingData, setgoCampingData] = useState<goCampingData[] | null>(
    null,
  );
  const [error, setError] = useState<Error>();
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [geoData, setGeoData] = useState<coords | null>(null);
  const [map, setMap] = useState<any>(null); // Map 객체 저장
  useEffect(() => {
    const getGeoData = async () => {
      navigator.geolocation.getCurrentPosition((res) => {
        setGeoData(res.coords);
      });
    };
    getGeoData();
    setgoCampingData([
      {
        title: '파주 캠핑장',
        latlng: { lat: 37.79774498308247, lng: 126.72195005905982 },
      },
      {
        title: '청라캠핑파크',
        latlng: { lat: 37.53808, lng: 126.61677 },
      },
      {
        title: '강변글램핑',
        latlng: { lat: 37.6516116, lng: 126.7008778 },
      },
      {
        title: '자유로캠핑장',
        latlng: { lat: 37.8291163, lng: 126.7207168 },
      },
      {
        title: '디엠지라운지(DMZ LOUNGE)',
        latlng: { lat: 37.8004048, lng: 126.6835875 },
      },
    ]);
  }, []);

  useEffect(() => {
    if (map && goCampingData) {
      const bounds = new kakao.maps.LatLngBounds();

      // 모든 마커 좌표를 경계에 추가
      goCampingData.forEach((position: any) => {
        bounds.extend(
          new kakao.maps.LatLng(position.latlng.lat, position.latlng.lng),
        );
      });

      // 맵의 경계를 설정
      map.setBounds(bounds);
    }
  }, [map, goCampingData]);

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      {geoData ? (
        <Map
          center={{
            lat: geoData.latitude,
            lng: geoData.longitude,
          }}
          className="w-full h-full"
          level={3}
          onCreate={setMap}
        >
          {goCampingData!.map((position, index) => (
            <MapMarker
              key={`${position.title}-${position.latlng}`}
              position={position.latlng} // 마커를 표시할 위치
              image={{
                src: '/images/custom_marker.png',
                size: {
                  width: 35,
                  height: 35,
                }, // 마커이미지의 크기입니다
              }}
              title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              onClick={() => setSelectedMarker(position)}
            />
          ))}
          {goCampingData!.map((position) => {
            if (selectedMarker === position) {
              return (
                <CustomOverlayMap
                  key={`${position.title}-${position.latlng}`}
                  position={selectedMarker.latlng}
                >
                  <div className="flex flex-col bg-white p-[10px] rounded-lg">
                    <strong>{selectedMarker.title}</strong>
                    <div className="flex flex-row gap-5 justify-center items-center">
                      <Image
                        src="/images/leader_github_logo.png" // public 폴더 안의 이미지 경로
                        alt="Example Image"
                        width={100} // 이미지 너비
                        height={100} // 이미지 높이
                      />
                      <p className="max-w-[350px]">
                        여기에는 마커에 대한 추가 정보가 들어갑니다.
                      </p>
                    </div>

                    <div
                      className="absolute top-1 right-2 cursor-pointer"
                      onClick={() => setSelectedMarker(null)}
                    >
                      닫기
                    </div>
                  </div>
                </CustomOverlayMap>
              );
            }
          })}
        </Map>
      ) : (
        <p>로딩 중입니다.</p>
      )}
    </>
  );
};

export default KakaoMap;
