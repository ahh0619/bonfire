'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';

import MapComponent from '@/components/map/MapComponent';
import CampingListSkeleton from '@/components/camping/CampingListSkeleton';
import useCampingList from '@/hooks/camping/useCampingList';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ErrorFallback } from '@/components/common/ErrorFallback';
import Loading from '@/components/common/Loading';

// 캠핑장 이미지가 없는 캠핑장 기본 이미지
const defaultCampImage = '/images/default_icon.webp';

const RadiusCampList = () => {
  const {
    geoData, // 사용자의 현재 위치정보
    radiusCampList, // 주변 캠핑장 리스트 데이터
    isCampListPending,
    isCampListError,
    campListError,
    refetch,
  } = useCampingList();

  if (isCampListPending) {
    // 로딩 중 스켈레톤 UI 적용
    return (
      <div className="px-[30px] max-w-[1900px] mx-auto overflow-hidden">
        <div className="flex flex-row align-center justify-center">
          <p className="font-extrabold text-4xl py-[60px] text-center">
            근처 캠핑장
          </p>
          <div className="py-[60px] pl-2">
            <Loading />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <CampingListSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (isCampListError) {
    return (
      <ErrorFallback
        message="주변 캠핑장 데이터를 불러오는 중 오류가 발생했습니다."
        errorDetail={campListError?.message}
        onRetry={refetch}
        retryLabel="다시 시도"
      />
    );
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
              slidesPerView: 3, // 초대형 화면에서 3개
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
              {/* 클릭 시 캠핑장 디테일 페이지로 이동 */}
              <Link
                href={`/detail/${camp.facltNm}`}
                className="flex flex-col items-center"
              >
                {/* 캠핑장 이미지 */}
                <div className="w-full px-10">
                  {camp.firstImageUrl ? (
                    <Image
                      src={camp.firstImageUrl}
                      alt={camp.facltNm}
                      width={500}
                      height={250}
                      className="h-[250px] object-cover mx-auto"
                    />
                  ) : (
                    // 캠핑장 디폴트 이미지
                    <Image
                      src={defaultCampImage}
                      alt={camp.facltNm}
                      width={500}
                      height={250}
                      className="h-[250px]"
                    />
                  )}
                </div>
                {/* 캠핑장 명, 캠핑장 주소 */}
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
