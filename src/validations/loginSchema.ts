import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: '이메일을 입력해주세요',
    })
    .email({ message: '유효한 이메일 형식이 아닙니다' }),

  password: z
    .string()
    .regex(
      new RegExp(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      ),
      '영문, 숫자, 특수문자 포함 6 ~ 20자로 입력해주세요',
    ),
});
