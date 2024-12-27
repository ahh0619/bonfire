'use client';

import KakaoMap from '@/components/map/KakaoMap';
import { Camping, CampingResponse } from '@/types/Camping';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Dispatch } from 'react';

export type MapComponentProps = {
  radiusCampList: Pick<
    Camping,
    | 'contentId'
    | 'firstImageUrl'
    | 'facltNm'
    | 'addr1'
    | 'induty'
    | 'mapY'
    | 'mapX'
    | 'tel'
  >[];
  geoData: coords | null;
  setGeoData: Dispatch<coords>
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<CampingResponse, Error>>
};

const MapComponent = ({ radiusCampList, geoData, setGeoData, refetch }: MapComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto mb-10">
      <p className="font-extrabold text-4xl py-[60px] text-center">
        캠핑장 찾기
      </p>
      <div className="w-full max-w-[1920px] h-[1000px] aspect-[16/5] transition-all duration-500 ease-in-out">
        <main className="flex flex-col items-center w-full h-full">
          <KakaoMap radiusCampList={radiusCampList} geoData={geoData} setGeoData={setGeoData} refetch={refetch} />
        </main>
      </div>
    </div>
  );
};

export default MapComponent;
