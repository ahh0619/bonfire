import PlaceDetail from '@/components/detail/PlaceDetail';
import { fetchOneCampSite } from '@/app/api/campingApi';
import { getCurrentUserId } from '../actions';
import CommentSection from '@/components/detail/CommentSection';

// ISR 설정: 페이지가 1시간마다 재생성
export const revalidate = 3600; // 1시간

type PlaceDetailPageProps = {
  params: {
    id: string;
  };
};

// 동적 라우트의 params를 build 때 생성
export async function generateStaticParams() {
  // 유저가 어떠한 장소를 넣어도 이후에 generate 됨
  return [];
}

// 페이지 컴포넌트
const PlaceDetailPage = async ({ params }: PlaceDetailPageProps) => {
  const facltNm = decodeURIComponent(params.id);
  const placeDetails = await fetchOneCampSite(facltNm);
  const userId = await getCurrentUserId();

  return (
    <div className="container min-h-screen xl:w-[1024px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">상세 페이지</h1>
      <PlaceDetail details={placeDetails} />
      <CommentSection userId={userId} facltNm={facltNm} />
    </div>
  );
};

export default PlaceDetailPage;
