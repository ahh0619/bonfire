import { Dispatch } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

type FacilMarkerType = {
  facilSearchResult: kakao.maps.services.PlacesSearchResult | [];
  facilCode: `${kakao.maps.CategoryCode}`;
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
  } as Record<kakao.maps.CategoryCode, string>;
  imgUrl = FACIL_CODE_MAPPING[facilCode];
  return facilSearchResult!.map((result) => (
    <MapMarker
      key={`${result.place_name}-${{ lat: result.y, lng: result.x }}`}
      position={{ lat: Number(result.y), lng: Number(result.x) }} 
      image={{
        src: `${imgUrl}`,
        size: {
          width: 35,
          height: 35,
        }, 
      }}
      title={result.place_name} 
      onClick={() => setSelectedFacilMarker(result)}
    />
  ));
};
export default FacilMarker;
