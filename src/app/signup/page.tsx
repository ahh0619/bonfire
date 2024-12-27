'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/login/Input';
import { SignupFormData } from '@/types/SignupFormData';
import { signupFields } from '@/components/login/formFields';
import { getUser, signup } from '../login/actions';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/validations/signUpSchema';
import Head from 'next/head';

const SignUp = () => {
  const { logIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
      const session = await getUser();
      logIn(session);
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Head>
        <title>BonFire - 회원가입</title>
        <meta
          name="description"
          content="회원가입을 통해 BonFire의 모든 기능을 즐기세요."
        />
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-20px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-black">
            회원가입
          </h1>

          {signupFields.map((field) => (
            <Input
              key={field.id as string}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              register={register}
              error={errors[field.id]?.message as string}
            />
          ))}

          <Button text="회원가입" />

          <p className="text-sm text-gray-600 mt-4 text-center">
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
    </>
  );
};

export default SignUp;
