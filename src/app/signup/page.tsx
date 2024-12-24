'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { signup } from '../login/actions';
import Input from '@/components/login/Input';
import { SignupFormData } from '@/types/SignupFormData';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData): Promise<void> => {
    await signup(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-20px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-black">회원가입</h1>

        <Input
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
          register={register}
          error={errors.nickname?.message as string}
          validation={{ required: '닉네임을 입력해주세요.' }}
        />

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

        <Input
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          register={register}
          error={errors.passwordConfirm?.message as string}
          validation={{
            required: '비밀번호 확인을 입력해주세요.',
            validate: {
              matchPassword: (value: string) => {
                const { password } = getValues();
                return password === value || '비밀번호가 일치하지 않습니다';
              },
            },
          }}
        />

        <Button text={'회원가입'} />

        <p className="text-sm text-gray-600 mt-4">
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

export default SignUp;
