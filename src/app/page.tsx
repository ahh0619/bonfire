import RadiusCampList from '@/components/camping/RadiusCampList';
import { Metadata } from 'next';

import Image from 'next/image';
const bannerImage = '/images/banner.webp';

export const metadata: Metadata = {
  title: 'BonFire - 홈 페이지',
  description:
    '사용자 위치 기준 반경 20km내 캠핑장 리스트를 확인하실 수 있습니다.',
  openGraph: {
    title: 'BonFire - 홈 페이지',
    description:
      '사용자 위치 기준 반경 20km내 캠핑장 리스트를 확인하실 수 있습니다.',
    url: 'http://localhost:3000',
  },
};

export default function Home() {
  return (
    <main className="max-w-[1920px] mt-[200px] mx-auto">
      <Image src={bannerImage} alt={'banner-image'} width={1920} height={800} />
      <RadiusCampList />
    </main>
  );
}
