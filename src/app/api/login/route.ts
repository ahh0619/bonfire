import { NextResponse } from 'next/server';
import { login } from '@/app/login/actions';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const data = await login(formData);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
