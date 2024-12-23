'use client';

import { fetchRadiusCampList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const RadiusCampList = () => {
  const {
    data: radiusCampData,
    isPending: isCampListPending,
    isError: isCampListError,
    error: campListError,
  } = useQuery<CampingResponse>({
    queryKey: ['radiusCampData'],
    queryFn: fetchRadiusCampList,
  });

  if (isCampListPending) {
    return <p>Loading...</p>;
  }

  if (isCampListError) {
    return <p>Error:{campListError.message}</p>;
  }

  const radiusCampList: Pick<
    Camping,
    'contentId' | 'firstImageUrl' | 'facltNm' | 'addr1' | 'induty'
  >[] = radiusCampData?.response.body.items.item || [];

  return (
    <div>
      {radiusCampList.map((camp) => (
        <div key={camp.contentId} className="flex">
          {camp.firstImageUrl ? (
            <Image
              src={camp.firstImageUrl}
              alt={camp.facltNm}
              width={320}
              height={320}
              className=""
            />
          ) : (
            <p>사진 없음</p>
          )}
          {/* <p>입지:{camp.lctCl}</p> */}
          <p>캠핑장명:{camp.facltNm}</p>
          {/* <p>한줄소개:{camp.lineIntro}</p>
          <p>소개:{camp.intro}</p> */}
          <p>주소:{camp.addr1}</p>
          <p>업종:{camp.induty}</p>
          {/* <p>경도:{camp.mapX}</p>
          <p>위도:{camp.mapY}</p>
          <p>오는길 :{camp.direction}</p>
          <p>전화 :{camp.tel}</p>
          <p>홈페이지:{camp.homepage}</p> */}
          {/* <p>툴팁 :{camp.tooltip}</p>
          <p>카라반내부시설 :{camp.caravInnerFclty}</p>
          <p>애완동물여부:{camp.animalCmgCl}</p>
          <p>부대시설 :{camp.sbrsEtc}</p> */}
        </div>
      ))}
    </div>
  );
};

export default RadiusCampList;
