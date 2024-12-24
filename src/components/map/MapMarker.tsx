import { Camping } from '@/types/Camping';
import { Dispatch } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

type MapMarkerType = {
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
  setSelectedMarker: Dispatch<any>;
};

const MapMarkerComponent = ({
  radiusCampList,
  setSelectedMarker,
}: MapMarkerType) => {
  return radiusCampList!.map((list) => (
    <MapMarker
      key={`${list.facltNm}-${{ lat: list.mapY, lng: list.mapX }}`}
      position={{ lat: Number(list.mapY), lng: Number(list.mapX) }} // 마커를 표시할 위치
      image={{
        src: '/images/custom_marker.png',
        size: {
          width: 35,
          height: 35,
        }, // 마커이미지의 크기입니다
      }}
      title={list.facltNm} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      onClick={() => setSelectedMarker(list)}
    />
  ));
};
export default MapMarkerComponent;
