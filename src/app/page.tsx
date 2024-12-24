import RadiusCampList from '@/components/camping/RadiusCampList';
import { createClient } from '@/utils/supabase/server';

import Image from 'next/image';
const bannerImage = '/images/banner.png';

export default function Home() {
  console.log('홈페이지가 동작한다');

  return (
    <main className="max-w-[1920px] mx-auto">
      <Image src={bannerImage} alt={'banner-image'} width={1920} height={800} />
      <RadiusCampList />
    </main>
  );
}
