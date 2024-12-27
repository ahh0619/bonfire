'use client';

import { fetchCampingList } from '@/app/api/campingApi';
import { Camping, CampingResponse } from '@/types/Camping';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const CampingList = () => {
  const { data, isPending, isError, error } = useQuery<CampingResponse>({
    queryKey: ['campingList'],
    queryFn: fetchCampingList,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error:{error.message}</p>;
  }

  const campingList: Pick<
    Camping,
    'contentId' | 'firstImageUrl' | 'facltNm' | 'addr1' | 'induty'
  >[] = data?.response.body.items.item || [];
  return (
    <div>
      {campingList.map((camp) => (
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
          <p>캠핑장명:{camp.facltNm}</p>
          <p>주소:{camp.addr1}</p>
          <p>업종:{camp.induty}</p>
        </div>
      ))}
    </div>
  );
};

export default CampingList;
