'use client';

import { fetchCampingList } from '@/app/api/campingApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const CampingList = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['campingList'],
    queryFn: fetchCampingList,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error:{error.message}</p>;
  }

  const campingPlaces = data?.response.body.items.item || [];
  return (
    <div key={campingPlaces[0].contentId}>
      {campingPlaces[0].firstImageUrl ? (
        <Image
          src={campingPlaces[0].firstImageUrl}
          alt={campingPlaces[0].facltNm}
          width={120}
          height={120}
        />
      ) : (
        <p>사진 없음</p>
      )}

      <p>입지:{campingPlaces[0].lctCl}</p>
      <p>캠핑장명:{campingPlaces[0].facltNm}</p>
      <p>한줄소개:{campingPlaces[0].lineIntro}</p>
      <p>소개:{campingPlaces[0].intro}</p>
      <p>주소:{campingPlaces[0].addr1}</p>
      <p>업종:{campingPlaces[0].induty}</p>
      <p>경도:{campingPlaces[0].mapX}</p>
      <p>위도:{campingPlaces[0].mapY}</p>
      <p>오는길 :{campingPlaces[0].direction}</p>
      <p>전화 :{campingPlaces[0].tel}</p>
      <p>홈페이지:{campingPlaces[0].homepage}</p>
      <p>툴팁 :{campingPlaces[0].tooltip}</p>
      <p>카라반내부시설 :{campingPlaces[0].caravInnerFclty}</p>
      <p>애완동물여부:{campingPlaces[0].animalCmgCl}</p>
      <p>부대시설 :{campingPlaces[0].sbrsEtc}</p>
    </div>
  );
};

export default CampingList;
