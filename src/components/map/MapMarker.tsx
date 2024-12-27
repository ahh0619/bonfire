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
  setSelectedMarker: Dispatch<
    Pick<
      Camping,
      | 'contentId'
      | 'firstImageUrl'
      | 'facltNm'
      | 'addr1'
      | 'induty'
      | 'mapY'
      | 'mapX'
      | 'tel'
    >
  >;
};

const MapMarkerComponent = ({
  radiusCampList,
  setSelectedMarker,
}: MapMarkerType) => {
  return radiusCampList!.map((list) => (
    <MapMarker
      key={`${list.facltNm}-${{ lat: list.mapY, lng: list.mapX }}`}
      position={{ lat: Number(list.mapY), lng: Number(list.mapX) }}
      image={{
        src: '/images/custom_marker.png',
        size: {
          width: 35,
          height: 35,
        },
      }}
      title={list.facltNm}
      onClick={() => setSelectedMarker(list)}
    />
  ));
};
export default MapMarkerComponent;
