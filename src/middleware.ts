import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export const middleware = async (request: NextRequest) => {
  console.log('미들웨어가 동작한다');
  return await updateSession(request);
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
