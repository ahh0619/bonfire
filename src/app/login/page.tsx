'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/login/Input';
import { LoginFormData } from '@/types/LoginFormData';
import { loginFields } from '@/components/login/formFields';
import { getUser, login } from './actions';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validations/loginSchema';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
const googleImage = '/images/google_logo.png';

const LoginPage = () => {
  const { logIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const googleLogin = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      const userData = await getUser();
      logIn(userData);
    } catch (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-20px]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mb-6 text-center text-black">
            로그인
          </h1>

          {loginFields.map((field) => (
            <Input
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              register={register}
              error={errors[field.id]?.message}
            />
          ))}

          <Button text="로그인" />
        </form>

        <button
          onClick={googleLogin}
          className="text-base font-semibold w-full py-2 rounded-md hover:bg-gray-200 transition-colors mb-4 flex items-center justify-center border border-gray-300"
        >
          <Image
            src={googleImage}
            alt={'google-image'}
            width={25}
            height={25}
            onClick={googleLogin}
            className="mr-3"
          />
          구글로 로그인하기
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          계정이 없으신가요?
          <Link
            href="/signup"
            className="text-green-500 font-semibold hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
