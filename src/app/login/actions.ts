'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { SignupFormData } from '@/types/SignupFormData';
import { LoginFormData } from '@/types/LoginFormData';
import { Tables } from '@/types/supabase';

export const login = async (formData: LoginFormData): Promise<void> => {
  const supabase = await createClient();

  const { email, password } = formData;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error('supabase auth failed');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const signup = async (formData: SignupFormData): Promise<void> => {
  const { email, nickname, password } = formData;

  await createAccount(email, password, nickname);

  revalidatePath('/', 'layout');
  redirect('/');
};

const createAccount = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const supabase = await createClient();
  const profileImageUrl = '/images/leader_github_logo.png';

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: nickname,
        avatar_url: profileImageUrl,
      },
    },
  });

  if (signUpError) {
    throw new Error('SignUp failed');
  }
  return signUpData.user?.id;
};

export const logout = async (): Promise<void> => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
};

export const getUser = async (): Promise<Tables<'users'>[] | null> => {
  const supabase = await createClient();
  const { data: userData, error: userDataError } =
    await supabase.auth.getUser();

  if (userDataError || !userData.user) {
    return null;
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userData.user.id);

  if (error) {
    return null;
  }

  return user;
};
