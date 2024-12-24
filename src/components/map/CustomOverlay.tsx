import Image from 'next/image';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import WeatherInfo from '../weather/WeatherInfo';
import { Camping } from '@/types/Camping';
import { Dispatch } from 'react';

type CustomOverlayProps = {
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
  selectedMarker: Pick<
    Camping,
    | 'contentId'
    | 'firstImageUrl'
    | 'facltNm'
    | 'addr1'
    | 'induty'
    | 'mapY'
    | 'mapX'
    | 'tel'
  > | null;
  setSelectedMarker: Dispatch<any>;
};

const CustomOverlay = ({
  radiusCampList,
  selectedMarker,
  setSelectedMarker,
}: CustomOverlayProps) => {
  return radiusCampList!.map((list) => {
    if (selectedMarker === list) {
      return (
        <CustomOverlayMap
          key={`${list.facltNm}-${{ lat: list.mapY, lng: list.mapX }}`}
          position={{ lat: Number(list.mapY), lng: Number(list.mapX) }}
        >
          <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-[400px] w-full">
            <div className="flex flex-col gap-4">
              {list.firstImageUrl.length ? (
                <Image
                  src={`${list.firstImageUrl}`}
                  alt="Example Image"
                  width={300} // 이미지 너비
                  height={300} // 이미지 높이
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src="/images/default_icon.png" // public 폴더 안의 이미지 경로
                  alt="Example Image"
                  width={300} // 이미지 너비
                  height={300} // 이미지 높이
                  className="object-cover w-full h-full"
                />
              )}
              <div className="max-h-[200px] max-w-full px-2">
                <p className="w-[350px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  이름 : <span className="font-normal">{list.facltNm}</span>
                </p>
                <p className="w-[350px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  주소 : <span className="font-normal">{list.addr1}</span>
                </p>
                <p className="w-[350px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  종류 : <span className="font-normal">{list.induty}</span>
                </p>
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  전화번호 :{' '}
                  <span className="font-normal">
                    {list.tel.length ? list.tel : '전화번호 없음'}
                  </span>
                </p>
              </div>
            </div>
            <WeatherInfo lat={list.mapY} lon={list.mapX} />
            <div
              className="absolute top-1 right-2 cursor-pointer"
              onClick={() => setSelectedMarker(null)}
            >
              ❌
            </div>
          </div>
        </CustomOverlayMap>
      );
    }
  });
};
export default CustomOverlay;
