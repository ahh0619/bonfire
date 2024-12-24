'use client';
import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import WeatherInfo from '../weather/WeatherInfo';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
    | 'tel'
  >[] = radiusCampData?.response.body.items.item || [];

  const settings = {
    dots: false, // 하단 네비게이션 점 표시
    infinite: true, // 무한 루프
    speed: 500, // 슬라이드 전환 속도(ms)
    slidesToShow: 3, // 한 번에 표시할 슬라이드 수
    slidesToScroll: 3, // 한 번에 이동할 슬라이드 수
    arrows: true, // 좌우 화살표 표시
  };

  return (
    <div className="w-full mx-auto">
      <Slider {...settings}>
        {radiusCampList?.map((camp) => (
          <div
            key={camp.contentId}
            className="p-4 flex flex-col items-center border border-gray-300 shadow-lg rounded-lg"
          >
            {camp.firstImageUrl ? (
              <Image
                src={camp.firstImageUrl}
                alt={camp.facltNm}
                width={320}
                height={320}
                className=""
              />
            ) : (
              <p>사진 없음</p>
            )}
            <p className="font-bold text-lg">{camp.facltNm}</p>
            <p className="text-gray-600">{camp.addr1}</p>
            <WeatherInfo lat={camp.mapY} lon={camp.mapX} />
          </div>
        ))}
      </Slider>
      <MapComponent radiusCampList={radiusCampList} geoData={geoData} />
    </div>
  );
};
export default RadiusCampList;
