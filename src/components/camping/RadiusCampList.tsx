'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';

import MapComponent from '../map/MapComponent';
import CampingListSkeleton from './CampingListSkeleton';
import useCampingList from '@/hooks/camping/useCampingList';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const defaultCampImage = '/images/default_icon.png';

const RadiusCampList = () => {
  const {
    geoData,
    radiusCampList,
    isCampListPending,
    isCampListError,
    campListError,
  } = useCampingList();

  if (isCampListPending) {
    return (
      <div className="px-[30px] max-w-[1900px] mx-auto overflow-hidden">
        <p className="font-extrabold text-4xl py-[60px] text-center">
          근처 캠핑장 loading...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <CampingListSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (isCampListError) {
    return <p>Error:{campListError!.message}</p>;
  }

  return (
    <div className="px-[30px] max-w-[1900px] mx-auto overflow-hidden">
      <p className="font-extrabold text-4xl py-[60px] text-center">
        근처 캠핑장 ({radiusCampList.length}건)
      </p>
      {radiusCampList.length !== 0 ? (
        <Swiper
          modules={[Navigation, Scrollbar, Autoplay]}
          loop={true} // 슬라이드 루프
          spaceBetween={30} // 슬라이스 사이 간격
          slidesPerView={3} // 보여질 슬라이스 수
          navigation={true} // prev, next button
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
          }}
          breakpoints={{
            // 반응형 설정
            320: {
              slidesPerView: 1, // 작은 화면에서 1개
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2, // 중간 화면에서 2개
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3, // 큰 화면에서 3개
              spaceBetween: 30,
            },
            1920: {
              slidesPerView: 3, // 초대형 화면에서 4개
              spaceBetween: 40,
            },
          }}
          className="w-full"
        >
          {radiusCampList?.map((camp) => (
            <SwiperSlide
              key={camp.contentId}
              className="py-8 flex flex-col justify-center items-center border border-gray-300 shadow-lg rounded-lg"
            >
              <Link
                href={`/detail/${camp.facltNm}`}
                className="flex flex-col items-center"
              >
                {camp.firstImageUrl ? (
                  <Image
                    src={camp.firstImageUrl}
                    alt={camp.facltNm}
                    width={400}
                    height={250}
                    className="h-[250px] rounded-lg"
                  />
                ) : (
                  <Image
                    src={defaultCampImage}
                    alt={camp.facltNm}
                    width={400}
                    height={250}
                    className="h-[250px]"
                  />
                )}

                <p className="font-bold text-lg mt-8">{camp.facltNm}</p>
                <p className="text-gray-600">{camp.addr1}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="font-bold text-lg text-center">근처 캠핑장이 없습니다.</p>
      )}

      <MapComponent radiusCampList={radiusCampList} geoData={geoData} />
    </div>
  );
};
export default RadiusCampList;
