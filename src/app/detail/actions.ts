'use server';

import { Database, Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';

// 상세 페이지 댓글 관련 actions 모음
// -> 댓글 기능을 상세 페이지에서만 사용
type CommentsInsert = Database['public']['Tables']['comments']['Insert'];

// 댓글 추가 받아온 formData 사용
export const addComment = async (comment: CommentsInsert) => {
  const supabase = await createClient();

  const { error } = await supabase.from('comments').insert([comment]);

  if (error) {
    throw new Error(`댓글 등록에 실패했습니다: ${error!.message}`);
  }
};

// 모든 댓글 읽어들이기 (SSR 필요)
export const fetchComments = async (placeName: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('comments')
    .select(`id, content, created_at, user_id, users(nickname, profile_image)`)
    .eq('place_name', placeName);

  if (error) {
    throw new Error(`댓글 불러오기에 실패했습니다: ${error!.message}`);
  }

  return data.map((comment) => ({
    id: comment.id,
    content: comment.content,
    created_at: comment.created_at,
    user_id: comment.user_id,
    user: comment.users, // 닉네임과 프로필 이미지 첨부
  }));
};

// 댓글 삭제 기능
export const deleteComment = async (commentId: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    throw new Error(`댓글 삭제에 실패했습니다: ${error!.message}`);
  }
};

// 댓글 수정 기능
export const updateComment = async (commentId: string, content: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from('comments').update({ content }).eq('id', commentId);
  
  if (error) {
    throw new Error(`댓글 수정에 실패했습니다: ${error!.message}`);
  }
};

