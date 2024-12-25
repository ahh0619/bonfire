import { PawPrint, Phone } from 'lucide-react';
import LikeButton from './LikeButton';
import { Camping } from '@/types/Camping';
import DetailMap from './DetailMap';

type PlaceDetailProps = {
  details: Camping;
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
        </p>
        <p className="mb-2 mt-8 text-gray-500 flex flex-row gap-2">
          <PawPrint />
          {` `}애완 동물: {details.animalCmgCl ? '출입 가능' : '출입 불가능'}
        </p>
        <div className="flex flex-row justify-between mb-2 mt-4 items-center">
          <p className=" text-gray-500 flex flex-row gap-2">
            <Phone /> {details.tel || '전화번호 없음'}
          </p>
          {/* 유저 아이디 주는 방법? */}
          {/* firstImgUrl이 없는 경우의 기본 이미지가 필요합니다. */}
          <LikeButton
            userId={'MashedPotato'}
            placeImgUrl={details.firstImageUrl}
            placeName={details.facltNm}
            addressName={details.addr1}
            phoneNumber={details.tel}
            locationX={Number(details.mapX)}
            locationY={Number(details.mapY)}
          />
        </div>
      </div>

      {/* 지도 부분 */}
      <div className="justify-items-center align-items-center mobile:max-w-[200px] sm:aspect-square sm:max-w-[340px] overflow-hidden rounded-lg">
        <DetailMap
          latitude={parseFloat(details.mapY)}
          longitude={parseFloat(details.mapX)}
          level={3}
          width="350px"
          height="350px"
        />
      </div>
    </div>
  );
};

export default PlaceDetail;
