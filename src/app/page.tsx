import RadiusCampList from '@/components/camping/RadiusCampList';
import Image from 'next/image';
const bannerImage = '/images/banner.png';
export default function Home() {
  console.log('홈페이지가 동작한다');

  return (
    <main className="w-full">
      <Image src={bannerImage} alt={'banner-image'} width={1920} height={800} />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <RadiusCampList />
        <h1>home</h1>
      </div>
    </main>
  );
}
