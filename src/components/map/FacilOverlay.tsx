import { Dispatch } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

type FacilOverlayProps = {
  facilSearchResult: kakao.maps.services.PlacesSearchResult | [];
  selectedFacilMarker: kakao.maps.services.PlacesSearchResultItem | null;
  setSelectedFacilMarker: Dispatch<kakao.maps.services.PlacesSearchResultItem | null>;
};

const FacilOverlay = ({
  facilSearchResult,
  selectedFacilMarker,
  setSelectedFacilMarker,
}: FacilOverlayProps) => {
  return facilSearchResult!.map((result) => {
    if (selectedFacilMarker === result) {
      return (
        <CustomOverlayMap
          key={`${result.place_name}-${{ lat: result.y, lng: result.x }}`}
          position={{ lat: Number(result.y), lng: Number(result.x) }}
        >
          <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-[400px] w-full">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center justify-center max-h-[350px] max-w-full px-2">
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  이름 :{' '}
                  <span className="font-normal">{result.place_name}</span>
                </p>
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  주소 :{' '}
                  <span className="font-normal">{result.address_name}</span>
                </p>
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  종류 :{' '}
                  <span className="font-normal">{result.category_name}</span>
                </p>
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  전화번호 :{' '}
                  <span className="font-normal">
                    {result.phone.length ? result.phone : '전화번호 없음'}
                  </span>
                </p>
              </div>
            </div>
            <div
              className="absolute top-1 right-2 cursor-pointer"
              onClick={() => setSelectedFacilMarker(null)}
            >
              ❌
            </div>
          </div>
        </CustomOverlayMap>
      );
    }
  });
};
export default FacilOverlay;
