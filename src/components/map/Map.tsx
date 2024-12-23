'use Client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

type coords = {
  latitude: number;
  longitude: number;
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

const KakaoMap = () => {
  const [goCampingData, setgoCampingData] = useState<any>(null);
  const [error, setError] = useState<Error>();
  const [geoData, setGeoData] = useState<coords | null>(null);
  useEffect(() => {
    const getGeoData = async () => {
      navigator.geolocation.getCurrentPosition((res) => {
        setGeoData(res.coords);
      });
    };
    const getGoCampingData = async () => {
      try {
        const response = await fetch(
          'http://apis.data.go.kr/B551011/GoCamping/locationBasedList?MobileOS=ETC&MobileApp=Bonfire&serviceKey=VzAcLxUOQFSDLe6azWFedhCb0glAttCpqBgQsDlyThebtKe7ppaA70JguXnbJzXM9f%2B1siLIWUOAyjQlX2kVkQ%3D%3D&mapX=126.7728384&mapY=37.6569856&radius=20000',
        );
        const text = await response.text();

        const parseString = require('xml2js').parseString;
        const xml = text;

        parseString(xml, function (err, result) {
          if (err) {
            console.error('XML Parsing Error:', err);
            return;
          }
          const {
            response: { body },
          } = result;
          const data = body[0].items[0].item;
          setgoCampingData(data);
        });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          setError(error);
        }
      }
    };
    getGeoData();
    getGoCampingData();
  }, []);
  console.log(goCampingData);
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      {geoData ? (
        <Map
          center={{
            lat: geoData.latitude,
            lng: geoData.longitude,
          }}
          style={{ width: '100%', height: '100%' }}
          level={7}
        ></Map>
      ) : (
        <p>로딩 중입니다.</p>
      )}
    </>
  );
};

export default KakaoMap;
