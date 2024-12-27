import { LoginFormData } from '@/types/LoginFormData';
import { FormField } from '@/types/FormField';
import { SignupFormData } from '@/types/SignupFormData';

export const loginFields: FormField<LoginFormData>[] = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해주세요',
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
  },
];

export const signupFields: FormField<SignupFormData>[] = [
  {
    id: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요',
  },
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력해주세요',
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
  },
  {
    id: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 입력해주세요',
  },
];
