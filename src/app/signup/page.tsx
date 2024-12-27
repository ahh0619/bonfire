import SignUpPage from '@/components/login/SignUpPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BonFire - 회원가입 ',
  description: 'BonFire - 회원가입 페이지입니다.',
};

const Page = () => {
  return <SignUpPage />;
};

export default Page;
