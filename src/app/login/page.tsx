import LoginPage from '@/components/login/LoginPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BonFire - 로그인',
  description: 'BonFire - 로그인 페이지입니다.',
};

const Page = () => {
  return <LoginPage />;
};

export default Page;
