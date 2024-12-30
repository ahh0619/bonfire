import { NextResponse } from 'next/server';
import { getUser, login } from '@/app/login/actions';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const data = await login(formData);

    // 로그인 성공 시 유저 데이터 가져오기
    const user = await getUser();

    // 유저 데이터를 포함한 응답 반환
    return NextResponse.json({ success: true, data, user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
