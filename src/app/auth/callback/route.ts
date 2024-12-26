import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log('route user:', user);

      if (userError || !user) {
        // console.error('failed to authenticated user:', userError?.message);
        throw new Error('failed to authenticated user');
        // return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      const defaultprofileImage = '/images/leader_github_logo.png';

      // const { error: dbError } = await supabase.from('users').upsert({
      //   id: user.id,
      //   // email: user.email,
      //   nickname: user.user_metadata.full_name || 'Guest',
      //   profile_image: user.user_metadata.avatar_url || defaultprofileImage,
      // });

      // if (dbError) {
      //   throw new Error('Failed to upsert user');
      //   // return NextResponse.json(
      //   //   { error: 'Failed to upsert user' },
      //   //   { status: 500 },
      //   // );
      // }

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  throw new Error('failed to google login');
}
