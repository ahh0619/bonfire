'user server';

import { createClient } from '@/utils/supabase/server';

// 장소가 받은 총 좋아요 수 받아오는 로직
export const fetchInitialLikes = async (placeName: string): Promise<number> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('place_name', placeName);

  if (error) {
    throw new Error(`좋아요 수 받기 실패: ${error.message}`);
  }

  return data.length;
};

// 유저가 장소를 좋아요 했는지 확인하는 로직
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
		throw new Error(`좋아요 정보를 가져오는데 실패했습니다: ${error.message}`)
	}

  return !!data;
};
