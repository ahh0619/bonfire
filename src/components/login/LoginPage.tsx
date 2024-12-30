'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input from '@/components/login/Input';
import { LoginFormData } from '@/types/LoginFormData';
import { loginFields } from '@/components/login/formFields';
import { getUser, handleSignIn, login } from '@/app/login/actions';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validations/loginSchema';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
const googleImage = '/images/google_logo.png';

const LoginPage = () => {
  const { logIn } = useAuthStore();
  const router = useRouter();

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
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: '로그인에 실패했습니다. 다시 시도해주세요.',
      });
    }
  };

  // const onSubmit = async (data: LoginFormData) => {
  //   try {
  //     const data2 = await login(data); //서버액션
  //     console.log('dat2 ', data2);
  //     const userData = await getUser(); //슈퍼베이스 유저
  //     logIn(userData); //주스탠드에 유저 정보넣기
  //     router.push('/');
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: '로그인 실패',
  //       text: '아이디 또는 비밀번호가 잘못 되었습니다.',
  //     });
  //   }
  // };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      logIn(result.user);
      router.push('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: '아이디 또는 비밀번호가 잘못되었습니다.',
      });
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

          <button
            type="submit"
            className="bg-[#FD470E] text-white text-base font-semibold w-full py-2 rounded-md hover:bg-[#e0400e] transition-colors mb-4"
          >
            로그인
          </button>
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

        <p className="text-sm text-gray-600 mt-6 text-center">
          계정이 없으신가요?
          <Link
            href="/signup"
            className="text-green-500 font-semibold hover:underline ml-2"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
