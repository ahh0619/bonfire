'use client';
import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
const defaultCampImage = '/images/banner.png';

import { useEffect, useState } from 'react';
import MapComponent from '../map/MapComponent';

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
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Scrollbar, Scrollbar, Autoplay]}
        loop={true} // 슬라이드 루프
        spaceBetween={30} // 슬라이스 사이 간격
        slidesPerView={3} // 보여질 슬라이스 수
        navigation={true} // prev, next button
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
      >
        {radiusCampList?.map((camp) => (
          <SwiperSlide
            key={camp.contentId}
            className="p-8 flex justify-center items-center border border-gray-300 shadow-lg rounded-lg"
          >
            <Link href={`/detail/${camp.facltNm}`}>
              {camp.firstImageUrl ? (
                <Image
                  src={camp.firstImageUrl}
                  alt={camp.facltNm}
                  width={350}
                  height={320}
                  className="h-[200px]"
                />
              ) : (
                <Image
                  src={defaultCampImage}
                  alt={camp.facltNm}
                  width={350}
                  height={320}
                  className="h-[200px]"
                />
              )}

              <p className="font-bold text-lg">{camp.facltNm}</p>
              <p className="text-gray-600">{camp.addr1}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <MapComponent radiusCampList={radiusCampList} geoData={geoData} />
    </div>
  );
};
export default RadiusCampList;
