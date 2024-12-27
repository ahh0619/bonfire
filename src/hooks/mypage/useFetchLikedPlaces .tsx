import { getUser } from '@/app/login/actions';
import { fetchLikedPlaces } from '@/utils/likes/actions';
import { useCallback } from 'react';

const useFetchLikedPlaces = () => {
  const fetchLikedPlacesData = useCallback(async () => {
    const userProfile = await getUser();
    if (!userProfile[0]?.id) {
      throw new Error('User ID is not available');
    }
    const likedPlaces = await fetchLikedPlaces(userProfile[0].id);
    return likedPlaces;
  }, []);

  return fetchLikedPlacesData;
};

export default useFetchLikedPlaces;
