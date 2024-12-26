import { Camping } from '@/types/Camping';
import { Dispatch, useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

type FacilMarkerType = {
  facilSearchResult: kakao.maps.services.PlacesSearchResult | [];
  facilCode: string;
  setSelectedFacilMarker: Dispatch<kakao.maps.services.PlacesSearchResultItem | null>;
};

const FacilMarker = ({
  facilSearchResult,
  facilCode,
  setSelectedFacilMarker,
}: FacilMarkerType) => {
  let imgUrl: string;
  switch (facilCode) {
    case 'HP8':
      imgUrl = '/images/hospital_marker.png';
      break;
    case 'PM9':
      imgUrl = '/images/pharmacy_marker.png';
      break;
    case 'CS2':
      imgUrl = '/images/convenience_store_marker.png';
      break;

    default:
      break;
  }
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
