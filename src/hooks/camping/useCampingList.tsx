import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useCampingList = () => {
  const [geoData, setGeoData] = useState<coords | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
          confirmButtonColor: "#FD470E",
        });
      } finally {
        setIsLoading(false); // 로딩 상태 업데이트
      }
    };

    getGeoData();
  }, []); // 컴포넌트가 마운트될 때 실행

  const {
    data: radiusCampData,
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
    | 'contentId'
    | 'firstImageUrl'
    | 'facltNm'
    | 'addr1'
    | 'induty'
    | 'mapY'
    | 'mapX'
    | 'tel'
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
