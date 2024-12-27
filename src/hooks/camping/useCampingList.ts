import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useCampingList = () => {
  // 사용자의 위치 정보 상태
  const [geoData, setGeoData] = useState<coords | null>(null);
  // 사용자의 위치 정보 불러오기
  const Swal = require('sweetalert2');

  useEffect(() => {
    const getGeoData = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          },
        );
        setGeoData(position.coords); // 위치 정보 저장
      } catch (error) {
        console.error('Error fetching location:', error);
        Swal.fire({
          icon: 'error',
          text: '위치 정보를 가져올 수 없습니다. 설정에서 위치 권한을 허용해주세요.',
          confirmButtonColor: '#FD470E',
        });
      }
    };

    getGeoData();
  }, []);
  // 사용자 위치 정보를 바탕으로 캠핑장 정보 불러오기

  const {
    data: radiusCampData, // 사용자 주변 반경 20km 내 캠핑장 데이터
    isPending: isCampListPending,
    isError: isCampListError,
    error: campListError,
    refetch,
  } = useQuery<CampingResponse>({
    queryKey: ['radiusCampData'],
    queryFn: () => fetchRadiusCampList(geoData!.latitude, geoData!.longitude),
    enabled: !!geoData,
  });

  const radiusCampList: Pick<
    Camping,
    | 'contentId' // 캠핑장 ID
    | 'firstImageUrl' // 캠핑장 이미지
    | 'facltNm' // 캠핑장 명
    | 'addr1' // 캠핑장 주소
    | 'induty' // 캠핑장 업종
    | 'mapY' // 캠핑장 위도
    | 'mapX' // 캠핑장 경도
    | 'tel' // 캠핑장 전화번호
  >[] = radiusCampData?.response.body.items.item || [];
  return {
    geoData,
    setGeoData,
    radiusCampList,
    isCampListPending,
    isCampListError,
    campListError,
    refetch,
  };
};

export default useCampingList;
