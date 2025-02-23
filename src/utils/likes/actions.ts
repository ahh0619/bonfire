'use server';

import { createClient } from '@/utils/supabase/server';
import { Database, Tables } from '@/types/supabase';

type LikesInsert = Database['public']['Tables']['likes']['Insert'];
type LikesRow = Tables<'likes'>;

export const addLike = async (like: LikesInsert) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('likes').insert([like]);

  if (error) {
    throw new Error(`Failed to add like: ${error.message}`);
  }

  return data;
};

export const removeLike = async (userId: string, placeName: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('likes')
    .delete()
    .match({ user_id: userId, place_name: placeName });

  if (error) {
    throw new Error(`Failed to remove like: ${error.message}`);
  }
};

export const getLikeCount = async (placeName: string) => {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('place_name', placeName);

  if (error) {
    throw new Error(`Failed to fetch like count: ${error.message}`);
  }

  return count || 0;
};

export const fetchLikedPlaces = async (userId: string): Promise<LikesRow[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to fetch liked places: ${error.message}`);
  }

  return data || [];
};

export const isUserLikedPlace = async (
  userId: string,
  placeName: string,
): Promise<boolean> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('place_name', placeName)
    .maybeSingle();

  if (error) {
    throw new Error(`좋아요 정보를 가져오는데 실패했습니다: ${error.message}`);
  }

  return !!data;
};