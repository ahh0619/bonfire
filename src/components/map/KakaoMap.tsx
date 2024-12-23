'use Client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import Image from 'next/image';
import { MapComponentProps } from './MapComponent';
import WeatherInfo from '../weather/WeatherInfo';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

const KakaoMap = ({ radiusCampList, geoData }: MapComponentProps) => {
  const [goCampingData, setgoCampingData] = useState<goCampingData[] | null>(
    null,
  );
  const [error, setError] = useState<Error>();
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [map, setMap] = useState<any>(null); // Map 객체 저장
  console.log(radiusCampList[0].mapX);
  useEffect(() => {
    if (map && radiusCampList) {
      const bounds = new kakao.maps.LatLngBounds();
      // 모든 마커 좌표를 경계에 추가
      radiusCampList.forEach((list: any) => {
        bounds.extend(new kakao.maps.LatLng(list.mapY, list.mapX));
      });

      // 맵의 경계를 설정
      map.setBounds(bounds);
    }
  }, [map, radiusCampList]);

  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    const checkSdkLoaded = () => {
      if (window.kakao && window.kakao.maps) {
        setIsSdkLoaded(true);
      }
    };
    const interval = setInterval(checkSdkLoaded, 100);
    return () => clearInterval(interval);
  }, []);

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
          {radiusCampList!.map((list) => (
            <MapMarker
              key={`${list.facltNm}-${{ lat: list.mapY, lng: list.mapX }}`}
              position={{ lat: Number(list.mapY), lng: Number(list.mapX) }} // 마커를 표시할 위치
              image={{
                src: '/images/custom_marker.png',
                size: {
                  width: 35,
                  height: 35,
                }, // 마커이미지의 크기입니다
              }}
              title={list.facltNm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              onClick={() => setSelectedMarker(list)}
            />
          ))}
          {radiusCampList!.map((list) => {
            if (selectedMarker === list) {
              return (
                <CustomOverlayMap
                  key={`${list.facltNm}-${{ lat: list.mapY, lng: list.mapX }}`}
                  position={{ lat: Number(list.mapY), lng: Number(list.mapX) }}
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
                    <WeatherInfo lat={list.mapY} lon={list.mapX}/>
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
