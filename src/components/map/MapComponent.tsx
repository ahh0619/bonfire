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
  >[];
  geoData: coords | null;
};

const MapComponent = ({ radiusCampList, geoData }: MapComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto pt-10 mb-10">
      <p className="font-extrabold text-4xl py-[60px] text-center">
        캠핑장 찾기
      </p>

      {/* 화면 크기에 따라 유동적으로 크기가 줄어드는 div */}
      <div className="w-full max-w-[1920px] h-[1000px] aspect-[16/5] transition-all duration-500 ease-in-out">
        <main className="flex flex-col items-center w-full h-full">
          <KakaoMap radiusCampList={radiusCampList} geoData={geoData} />
        </main>
      </div>
    </div>
  );
};

export default MapComponent;
