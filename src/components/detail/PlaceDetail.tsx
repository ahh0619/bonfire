// TODO: PR 전에 제거 바람
"use client"

import { PawPrint } from 'lucide-react';
import LikeButton from './LikeButton';

type PlaceDetailProps = {
  details: {
    name: string;
    address: string;
    facilities: string[];
    nearbyFacilities: string[];
    petAllowed: boolean;
    tel: string;
    rating: number;
  };
};

const PlaceDetail = ({ details }: PlaceDetailProps) => {
  return (
    <div className="flex flex-col items-center sm:flex-row gap-8 border justify-around align-center border-black rounded-xl p-6 mb-6">
      <h1></h1>
      {/* 장소 상세 정보 */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-4">{details.name}</h2>
        <p className="mb-2 text-gray-500">{details.address}</p>
        <p className="mb-2 text-gray-500">
          부대 시설: {details.facilities.join(', ')}
        </p>
        <p className="mb-2 text-gray-500">
          주변 이용 가능 시설: {details.nearbyFacilities.join(', ')}
        </p>
        <p className="mb-2 mt-8 text-gray-500 flex flex-row gap-1">
          <PawPrint />
          {` `}애완 동물 출입 여부: {details.petAllowed ? '가능' : '불가능'}
        </p>
        <div className="flex flex-row justify-between mb-2 mt-4 items-center">
					<p className="text-gray-500">tel: {details.tel}</p>
					<LikeButton />
        </div>
      </div>
      <div className="bg-gray-300 w-[320px] aspect-square sm:w-[360px] sm:h-[360px]"></div>
    </div>
  );
};

export default PlaceDetail;
