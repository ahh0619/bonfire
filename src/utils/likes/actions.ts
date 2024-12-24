'use server';

import { createClient } from '@/utils/supabase/server';

export async function addLike(userId: string, placeId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('likes')
    .insert([{ user_id: userId, place_id: placeId }]);

  if (error) {
    throw new Error(`Failed to add like: ${error.message}`);
  }

  return data;
}

export async function removeLike(userId: string, placeId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('likes')
    .delete()
    .match({ user_id: userId, place_id: placeId });

  if (error) {
    throw new Error(`Failed to remove like: ${error.message}`);
  }
}

export async function getLikeCount(placeId: string) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('place_id', placeId);

  if (error) {
    throw new Error(`Failed to fetch like count: ${error.message}`);
  }

  return count || 0;
}
