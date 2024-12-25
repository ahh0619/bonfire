'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/login/Input';
import { LoginFormData } from '@/types/LoginFormData';
import { loginFields } from '@/components/login/formFields';
import { login } from './actions';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/\bvalidations/loginSchema';

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      logIn();
    } catch (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
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

        <p className="text-sm text-gray-600 mt-4 text-center">
          계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-green-500 font-semibold hover:underline"
          >
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
