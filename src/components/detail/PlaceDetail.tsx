import { PawPrint, Phone } from 'lucide-react';
import LikeButton from './LikeButton';
import { Camping } from '@/types/Camping';

type PlaceDetailProps = {
  details: Camping
};

const PlaceDetail = ({ details }: PlaceDetailProps) => {
  return (
    <div className="flex flex-col items-center sm:flex-row gap-8 border justify-between align-center border-black rounded-xl px-10 py-8 mb-6">
      {/* 장소 상세 정보 */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-4">{details.facltNm}</h2>
        <p className="mb-2 text-gray-500">{details.addr1}</p>
        <p className="mb-2 text-gray-500">
          부대 시설: {details.sbrsCl || '해당 사항 없음'}
        </p>
        <p className="mb-2 text-gray-500">
          주변이용 가능 시설: {details.posblFcltyCl || '해당 사항 없음'}
          {/* 주변 이용 가능 시설: {details.nearbyFacilities.join(', ')} */}
        </p>
        <p className="mb-2 mt-8 text-gray-500 flex flex-row gap-2">
          <PawPrint />
          {` `}애완 동물 출입 여부: {details.animalCmgCl ? '가능' : '불가능'}
        </p>
        <div className="flex flex-row justify-between mb-2 mt-4 items-center">
          <p className="text-gray-500 flex flex-row gap-2">
            <Phone /> {details.tel || '전화번호 없음'}
          </p>
          <LikeButton />
        </div>
      </div>
      <div className="bg-gray-300 w-[320px] aspect-square rounded-xl sm:w-[360px] sm:h-[360px]"></div>
    </div>
  );
};

export default PlaceDetail;
