'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export const login = async (formData: FormData) => {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const signup = async (formData: FormData) => {
  const supabase = await createClient();

  const { email, nickname, password, passwordConfirm, profileImage } =
    Object.fromEntries(formData.entries());

  if (
    typeof email !== 'string' ||
    typeof nickname !== 'string' ||
    typeof password !== 'string' ||
    typeof passwordConfirm !== 'string'
  ) {
    redirect('/error?message=Invalid input');
  }

  if (password !== passwordConfirm) {
    redirect('/error?message=Passwords do not match');
  }

  const profileImageUrl = await profileImageUpload(profileImage);
  const userId = await createAccount(email, password);

  const { error: dbError } = await supabase.from('users').insert({
    id: userId,
    nickname,
    profile_image: profileImageUrl,
  });

  if (dbError) {
    redirect('/error?message=Database insertion failed');
  }

  revalidatePath('/login', 'layout');
  redirect('/login');
};

const profileImageUpload = async (profileImage: FormDataEntryValue | null) => {
  const supabase = await createClient();
  if (profileImage && profileImage instanceof File) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(`public/${uuidv4()}.png`, profileImage);

    if (uploadError) {
      redirectWithError('Image upload failed');
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(uploadData.path);

    return publicUrlData.publicUrl;
  }

  return null;
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
