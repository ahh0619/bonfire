'use client';

import Link from 'next/link';
import { login } from './actions';
import InputField from '@/components/login/InputField';
import Button from '@/components/common/Button';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-20px]">
      <form
        action={login}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          로그인
        </h1>

        {/* 이메일 입력 */}
        <InputField
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
        />

        {/* 비밀번호 입력 */}
        <InputField
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />

        {/* 로그인 버튼 */}
        <Button text={'로그인'} />

        {/* 회원가입 링크 */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/signup"
            className="text-[#FD470E] font-semibold hover:underline"
          >
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
