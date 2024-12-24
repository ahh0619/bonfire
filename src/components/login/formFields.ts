import { LoginFormData } from '@/types/LoginFormData';
import { FormField } from '@/types/FormField';
import { SignupFormData } from '@/types/SignupFormData';

export const loginFields: FormField<LoginFormData>[] = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해주세요',
    validation: {
      required: '이메일을 입력해주세요.',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '올바른 이메일 형식이 아닙니다',
      },
    },
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    validation: {
      required: '비밀번호를 입력해주세요.',
      pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
        message: '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요',
      },
    },
  },
];

export const signupFields: FormField<SignupFormData>[] = [
  {
    id: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요',
    validation: { required: '닉네임을 입력해주세요.' },
  },
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해주세요',
    validation: {
      required: '이메일을 입력해주세요.',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '올바른 이메일 형식이 아닙니다',
      },
    },
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    validation: {
      required: '비밀번호를 입력해주세요.',
      pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
        message: '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요',
      },
    },
  },
  {
    id: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 입력해주세요',
    validation: {
      required: '비밀번호 확인을 입력해주세요.',
      validate: {
        matchPassword: (value: string, { password }: SignupFormData) =>
          value === password || '비밀번호가 일치하지 않습니다',
      },
    },
  },
];
