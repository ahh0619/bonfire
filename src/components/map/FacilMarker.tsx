import { Camping } from '@/types/Camping';
import { Dispatch, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

type FacilMarkerType = {
  facilSearchResult: kakao.maps.services.PlacesSearchResult | [];
  facilCode: 'HP8' | 'PM9' | 'CS2' | '';
  setSelectedFacilMarker: Dispatch<kakao.maps.services.PlacesSearchResultItem | null>;
};

const FacilMarker = ({
  facilSearchResult,
  facilCode,
  setSelectedFacilMarker,
}: FacilMarkerType) => {
  let imgUrl;
  const FACIL_CODE_MAPPING = {
    HP8: '/images/hospital_marker.png',
    PM9: '/images/pharmacy_marker.png',
    CS2: '/images/convenience_store_marker.png',
    '': 'default',
  };
  imgUrl = FACIL_CODE_MAPPING[facilCode];
  return facilSearchResult!.map((result) => (
    <MapMarker
      key={`${result.place_name}-${{ lat: result.y, lng: result.x }}`}
      position={{ lat: Number(result.y), lng: Number(result.x) }} // 마커를 표시할 위치
      image={{
        src: `${imgUrl}`,
        size: {
          width: 35,
          height: 35,
        }, // 마커이미지의 크기입니다
      }}
      title={result.place_name} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      onClick={() => setSelectedFacilMarker(result)}
    />
  ));
};
export default FacilMarker;
