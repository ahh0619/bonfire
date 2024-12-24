'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { login } from './actions';
import Button from '@/components/common/Button';
import Input from '@/components/login/Input';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-20px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          로그인
        </h1>

        <Input
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          register={register}
          error={errors.email?.message as string}
          validation={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '올바른 이메일 형식이 아닙니다',
            },
          }}
        />

        <Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register}
          error={errors.password?.message as string}
          validation={{
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
              message: '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요',
            },
          }}
        />

        <Button text={'로그인'} />

        <p className="text-sm text-gray-600 mt-4 text-center">
          계정이 없으신가요?{' '}
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
