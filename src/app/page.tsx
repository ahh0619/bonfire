import CampingList from '@/components/camping/CampingList';
import RadiusCampList from '@/components/camping/RadiusCampList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RadiusCampList />
      <CampingList />
    </main>
  );
}
