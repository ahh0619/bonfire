import { Star } from 'lucide-react';

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
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">{details.name}</h2>
      <p className="mb-2">{details.address}</p>
      <p className="mb-2">부대 시설: {details.facilities.join(', ')}</p>
      <p className="mb-2">
        주변 이용 가능 시설: {details.nearbyFacilities.join(', ')}
      </p>
      <p className="mb-2">
        애완 동물 출입 여부: {details.petAllowed ? '가능' : '불가능'}
      </p>
      <p className="mb-2">tel: {details.tel}</p>
      <div className="flex items-center">
        <span className="mr-2">평점:</span>
        {[...Array(details.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </div>
  );
};

export default PlaceDetail;
