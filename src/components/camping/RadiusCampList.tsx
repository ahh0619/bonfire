'use client';
import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import WeatherInfo from '../weather/WeatherInfo';
import MapComponent from '../map/MapComponent';
import { useEffect, useState } from 'react';
const RadiusCampList = () => {
  const [goCampingData, setgoCampingData] = useState<goCampingData[] | null>(
    null,
  );
  const [geoData, setGeoData] = useState<coords | null>(null);
  useEffect(() => {
    const getGeoData = async () => {
      navigator.geolocation.getCurrentPosition((res) => {
        setGeoData(res.coords);
      });
    };
    getGeoData();
  }, []);
  const {
    data: radiusCampData,
    isPending: isCampListPending,
    isError: isCampListError,
    error: campListError,
  } = useQuery<CampingResponse>({
    queryKey: ['radiusCampData'],
    queryFn: () => fetchRadiusCampList(geoData!.latitude, geoData!.longitude),
  });
  if (isCampListPending) {
    return <p>Loading...</p>;
  }
  if (isCampListError) {
    return <p>Error:{campListError.message}</p>;
  }
  const radiusCampList: Pick<
    Camping,
    | 'contentId'
    | 'firstImageUrl'
    | 'facltNm'
    | 'addr1'
    | 'induty'
    | 'mapY'
    | 'mapX'
  >[] = radiusCampData?.response.body.items.item || [];
  return (
    <div>
      {radiusCampList.map((camp) => (
        <div key={camp.contentId}>
          {camp.firstImageUrl ? (
            <div>
              <Image
                src={camp.firstImageUrl}
                alt={camp.facltNm}
                width={320}
                height={320}
                className=""
              />
            </div>
          ) : (
            <div>
              <p>사진 없음</p>
            </div>
          )}
          <div>
            {' '}
            <p>{camp.facltNm}</p>
            <p>{camp.addr1}</p>
            <WeatherInfo lat={camp.mapY} lon={camp.mapX} />
          </div>
        </div>
      ))}
      <MapComponent radiusCampList={radiusCampList} geoData={geoData} />
    </div>
  );
};
export default RadiusCampList;
