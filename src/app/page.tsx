import RadiusCampList from '@/components/camping/RadiusCampList';

export default function Home() {
  console.log('홈페이지가 동작한다');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RadiusCampList />
      <h1>home</h1>
    </main>
  );
}
