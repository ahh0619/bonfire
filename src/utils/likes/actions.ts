'use server';

import { Likes } from '@/types/Likes';
import { createClient } from '@/utils/supabase/server';

export const addLike = async (userId: string, placeId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('likes')
    .insert([{ user_id: userId, place_id: placeId }]);

  if (error) {
    throw new Error(`Failed to add like: ${error.message}`);
  }

  return data;
};

export const removeLike = async (userId: string, placeId: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('likes')
    .delete()
    .match({ user_id: userId, place_id: placeId });

  if (error) {
    throw new Error(`Failed to remove like: ${error.message}`);
  }
};

export const getLikeCount = async (placeId: string) => {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('place_id', placeId);

  if (error) {
    throw new Error(`Failed to fetch like count: ${error.message}`);
  }

  return count || 0;
};

export const fetchLikedPlaces = async (userId: string): Promise<Likes[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to fetch liked places: ${error.message}`);
  }

  return data;
};
