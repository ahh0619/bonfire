'use server';

import { createClient } from '@/utils/supabase/server';

export const getUserProfile = async () => {
  const supabase = await createClient();

  // 인증된 유저의 정보 가져오기
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error(`유저 인증 실패: ${authError!.message}`);
  }

  // 유저 ID로 프로필 정보 가져오기
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id) // 인증된 유저의 ID 사용
    .single();

  if (profileError) {
    throw new Error(
      `프로필 정보를 가져오는 데 실패했습니다: ${profileError.message}`,
    );
  }

  return profile;
};

export const updateUserProfile = async (formData: FormData) => {
  const supabase = await createClient();

  const userId = formData.get('userId') as string;
  const nickname = formData.get('nickname') as string;
  const file = formData.get('file') as File;

  let publicUrl: string | null = null;

  if (file) {
    const fileBuffer = await file.arrayBuffer();
    const fileName = `public/${userId}-${Date.now()}.png`;

    // 파일 업로드
    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, Buffer.from(fileBuffer), {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
    }

    // 공개 URL 생성
    const { data: urlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    publicUrl = urlData?.publicUrl;
  }

  // 유저 데이터 업데이트
  const updates: { nickname: string; profile_image?: string } = { nickname };
  if (publicUrl) updates.profile_image = publicUrl;

  const { error: updateError } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (updateError) {
    throw new Error(`프로필 업데이트 실패: ${updateError.message}`);
  }
};
