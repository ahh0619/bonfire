'use server';

import { createClient } from '@/utils/supabase/server';

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
