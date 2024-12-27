import { Camping } from '@/types/Camping';
import { Dispatch } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

type CurrentMarkerType = {
  coords: coords;
};

const CurrentMarker = ({ coords }: CurrentMarkerType) => {
  if (coords) {
    return (
      <MapMarker
        position={{
          lat: Number(coords.latitude),
          lng: Number(coords.longitude),
        }} // 마커를 표시할 위치
        image={{
          src: '/images/current_marker.png',
          size: {
            width: 25,
            height: 40,
          }, // 마커이미지의 크기입니다
        }}
        title="현 위치" // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      />
    );
  }
};
export default CurrentMarker;
