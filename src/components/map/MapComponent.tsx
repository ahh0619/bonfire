'use client';

import KakaoMap from '@/components/map/KakaoMap';
import { Camping } from '@/types/Camping';

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
>[]
  geoData: coords | null;
};

const MapComponent = ({ radiusCampList, geoData }: MapComponentProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="p-3">캠핑장 찾기</p>
        <div className="w-[1200px]">
          <main className="flex flex-col items-center w-[1200px] h-[600px]">
            <KakaoMap radiusCampList={radiusCampList} geoData={geoData} />
          </main>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
