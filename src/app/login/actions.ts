'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { SignupFormData } from '@/types/SignupFormData';
import { LoginFormData } from '@/types/LoginFormData';

export const login = async (formData: LoginFormData) => {
  const supabase = await createClient();

  const { email, password } = formData;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const signup = async (formData: SignupFormData): Promise<void> => {
  console.log('signup data: ', formData);
  const supabase = await createClient();

  const { email, nickname, password } = formData;

  const profileImageUrl = '/images/leader_github_logo.png';
  const userId = await createAccount(email, password);

  const { error: dbError } = await supabase.from('users').insert({
    id: userId,
    nickname,
    profile_image: profileImageUrl,
  });

  if (dbError) {
    throw new Error('Database insertion failed');
  }

  // revalidatePath('/login', 'layout');
  // redirect('/login');
};

const createAccount = async (email: string, password: string) => {
  const supabase = await createClient();
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    redirectWithError('Sign-up failed');
  }
  return signUpData.user?.id;
};

const redirectWithError = (message: string) => {
  redirect(`/error?message=${encodeURIComponent(message)}`);
};

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
};

// export const fetchSession = async (): Promise<any> => {
//   const supabase = await createClient();
//   const { data: user, error } = await supabase.auth.getUser();

//   if (error) {
//     return null;
//   }
//   return user;
// };
