import Image from 'next/image';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import WeatherInfo from '../weather/WeatherInfo';
import { Camping } from '@/types/Camping';
import { Dispatch } from 'react';
import { facilSearch } from '@/utils/map/facilSearch';
import FacilSearchBtn from './FacilSearchBtn';

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
  setFacilSearchResult: Dispatch<any>;
  setFacilCode: Dispatch<any>;
};

const CustomOverlay = ({
  radiusCampList,
  selectedMarker,
  setSelectedMarker,
  setFacilSearchResult,
  setFacilCode,
}: CustomOverlayProps) => {
  const facilClickHandler = (
    lat: number,
    lon: number,
    code: `${kakao.maps.CategoryCode}`,
  ) => {
    setFacilSearchResult([]);
    facilSearch(lat, lon, setFacilSearchResult, code);
    setSelectedMarker(null);
    setFacilCode(code);
  };

  return radiusCampList!.map((list) => {
    if (selectedMarker === list) {
      return (
        <CustomOverlayMap
          key={`${list.facltNm}-${{ lat: list.mapY, lng: list.mapX }}`}
          position={{ lat: Number(list.mapY), lng: Number(list.mapX) }}
        >
          <div
            className="relative bg-white shadow-lg rounded-lg p-8 max-w-[400px] w-full"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center justify-center max-h-[350px] max-w-full px-2">
                {list.firstImageUrl.length ? (
                  <a href={`/detail/${list.facltNm}`}>
                    <Image
                      src={`${list.firstImageUrl}`}
                      alt="Example Image"
                      width={300} 
                      height={300} 
                      className="object-cover w-[300px] h-[150px] cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                ) : (
                  <a href={`/detail/${list.facltNm}`}>
                    <Image
                      src="/images/default_icon.webp" 
                      alt="Example Image"
                      width={300}
                      height={300} 
                      className="object-cover w-[300px] h-[150px] cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                )}
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  이름 : <span className="font-normal">{list.facltNm}</span>
                </p>
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  주소 : <span className="font-normal">{list.addr1}</span>
                </p>
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  종류 : <span className="font-normal">{list.induty}</span>
                </p>
                <p className="w-[300px] whitespace-normal text-sm font-bold text-gray-600 leading-6">
                  전화번호 :{' '}
                  <span className="font-normal">
                    {list.tel.length ? list.tel : '전화번호 없음'}
                  </span>
                </p>
                <WeatherInfo lat={list.mapY} lon={list.mapX} />
                <div className="flex flex-row items-start gap-1 mt-3">
                  <FacilSearchBtn
                    facil={'병원'}
                    facilClickHandler={facilClickHandler}
                    list={list}
                  />
                  <FacilSearchBtn
                    facil={'약국'}
                    facilClickHandler={facilClickHandler}
                    list={list}
                  />
                  <FacilSearchBtn
                    facil={'편의점'}
                    facilClickHandler={facilClickHandler}
                    list={list}
                  />
                </div>
              </div>
            </div>
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
