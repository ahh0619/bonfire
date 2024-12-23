'use client';
import Link from 'next/link';
import { signup } from '../login/actions';
import InputField from '@/components/login/InputField';
import Button from '@/components/common/Button';

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-20px]">
      <form
        action={signup}
        className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-black">회원가입</h1>

        {/* 재사용 가능한 InputField 컴포넌트 사용 */}
        <InputField
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="ID를 입력해주세요"
        />
        <InputField
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        <InputField
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <InputField
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        />

        {/* 회원가입 버튼 */}
        <Button text={'회원가입'} />

        {/* 로그인 링크 */}
        <p className="text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="text-green-500 font-semibold hover:underline"
          >
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
