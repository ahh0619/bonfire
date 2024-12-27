'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input from '@/components/login/Input';
import { SignupFormData } from '@/types/SignupFormData';
import { signupFields } from '@/components/login/formFields';
import { getUser, signup } from '../login/actions';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/validations/signUpSchema';

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

        <button
          type="submit"
          className="bg-[#FD470E] text-white text-base font-semibold w-full py-2 rounded-md hover:bg-[#e0400e] transition-colors mb-4"
        >
          회원가입
        </button>

        <p className="text-sm text-gray-600 mt-3 text-center">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="text-green-500 font-semibold hover:underline ml-2"
          >
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
