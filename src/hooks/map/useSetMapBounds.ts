import { Camping } from '@/types/Camping';
import { useEffect } from 'react';

const useSetMapBounds = (
  map: kakao.maps.Map | null,
  radiusCampList:
    | Pick<
        Camping,
        | 'contentId'
        | 'firstImageUrl'
        | 'facltNm'
        | 'addr1'
        | 'induty'
        | 'mapY'
        | 'mapX'
        | 'tel'
      >[]
    | null,
) => {
  useEffect(() => {
    if (map && radiusCampList) {
      const bounds = new kakao.maps.LatLngBounds();
      radiusCampList.forEach((list: any) => {
        bounds.extend(new kakao.maps.LatLng(list.mapY, list.mapX));
      });
      map.setBounds(bounds);
    }
  }, [map, radiusCampList]);
};
export default useSetMapBounds;
