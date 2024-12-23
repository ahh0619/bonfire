import { Suspense } from 'react';
import PlaceDetail from '@/components/detail/PlaceDetail';
import CommentForm from '@/components/detail/CommentForm';
import Comments from '@/components/detail/Comments';
export const revalidate = 3600; // 1 시간 마다 

async function getPlaceDetails(id: string) {
	// API 들어갈 자리

  return {
    name: '무수아취',
    address: '서울 도봉구 도봉로169길 249 (도봉동)',
    facilities: ['전기', '무선인터넷', '온수', '물놀이장', '마트.편의점'],
    nearbyFacilities: ['계곡 물놀이', '산책로', '운동장'],
    petAllowed: false,
    tel: '02-1234-5678',
    rating: 5,
  };
}

export default async function PlaceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const placeDetails = await getPlaceDetails(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">상세 페이지</h1>
      <PlaceDetail details={placeDetails} />
      <CommentForm placeId={params.id} />
      <Suspense fallback={<div>댓글 로딩 중...</div>}>
        <Comments placeId={params.id} />
      </Suspense>
    </div>
  );
}
