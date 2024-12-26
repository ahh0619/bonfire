import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useCampingList = () => {
  // 사용자의 위치 정보 상태
  const [geoData, setGeoData] = useState<coords | null>(null);
  // 사용자의 위치 정보 불러오기
  useEffect(() => {
    const getGeoData = async () => {
      navigator.geolocation.getCurrentPosition((res) => {
        setGeoData(res.coords);
      });
    };
    getGeoData();
  }, []);
  // 사용자 위치 정보를 바탕으로 캠핑장 정보 불러오기
  const {
    data: radiusCampData, // 사용자 주변 반경 20km 내 캠핑장 데이터
    isPending: isCampListPending,
    isError: isCampListError,
    error: campListError,
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
    radiusCampList,
    isCampListPending,
    isCampListError,
    campListError,
  };
};

export default useCampingList;
