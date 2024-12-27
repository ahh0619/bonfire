import PlaceDetail from '@/components/detail/PlaceDetail';
import { fetchOneCampSite } from '@/app/api/campingApi';
import CommentSection from '@/components/detail/CommentSection';
import { Metadata } from 'next';
import WeatherInfo from '@/components/weather/WeatherInfo';
import { Suspense } from 'react';
import WeatherInfoSkeleton from '@/components/weather/WeatherInfoSkeleton';

export const generateMetadata = async ({
  params,
}: PlaceDetailPageProps): Promise<Metadata> => {
  const facltNm = decodeURIComponent(params.id);

  return {
    title: `BonFire - ${facltNm} 상세 정보`,
    description: `${facltNm}의 캠핑장 상세 정보를 확인하세요.`,
    openGraph: {
      title: `BonFire - ${facltNm} 상세 정보`,
      description: `${facltNm}의 캠핑장 상세 정보를 확인하세요.`,
      url: `http://localhost:3000/detail/${params.id}`,
    },
  };
};

type PlaceDetailPageProps = {
  params: {
    id: string;
  };
};

// 페이지 컴포넌트
const PlaceDetailPage = async ({ params }: PlaceDetailPageProps) => {
  const facltNm = decodeURIComponent(params.id);
  const placeDetails = await fetchOneCampSite(facltNm);

  return (
    <div className="container min-h-screen xl:w-[1024px] mx-auto px-4 py-8">
      <div className=" mb-6">
        <h1 className="text-3xl font-bold mb-3">캠핑장 상세정보</h1>
        <Suspense fallback={<WeatherInfoSkeleton />}>
          <WeatherInfo lat={placeDetails.mapY} lon={placeDetails.mapX} />
        </Suspense>
      </div>

      <PlaceDetail details={placeDetails} />
      <CommentSection facltNm={facltNm} />
    </div>
  );
};

export default PlaceDetailPage;
