import {
  addLike,
  getLikeCount,
  isUserLikedPlace,
  removeLike,
} from '@/utils/likes/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useLikes = (placeName: string, userId?: string) => {
  const queryClient = useQueryClient();

  // 총 좋아요수 읽어오기
  const { data: likes, isPending: isLikesPending } = useQuery({
    queryKey: ['likes', placeName],
    queryFn: async () => {
      return await getLikeCount(placeName);
    },
    initialData: null,
  });

  // 유저가 좋아요 했는지 읽어오기
  const { data: liked, isPending: isLikedPending } = useQuery({
    queryKey: ['userLiked', userId, placeName],
    queryFn: async () => {
      if (!userId) return null;
      return await isUserLikedPlace(userId, placeName);
    },
    enabled: !!userId, // userId가 존재할때만 실행!
    initialData: null,
  });

  // 좋아요 추가 mutation
  const addLikeMutation = useMutation({
    mutationFn: async ({
      placeImage,
      addressName,
      phoneNumber,
      locationX,
      locationY,
    }: {
      placeImage: string;
      addressName: string;
      phoneNumber: string;
      locationX: number;
      locationY: number;
    }) => {
      if (!userId) throw new Error('User not logged in');
      return await addLike({
        user_id: userId,
        place_name: placeName,
        place_image: placeImage,
        address_name: addressName,
        phone_number: phoneNumber,
        location_x: locationX,
        location_y: locationY,
      });
    },
    onMutate: async ({
      placeImage,
      addressName,
      phoneNumber,
      locationX,
      locationY,
    }) => {
      await queryClient.cancelQueries({ queryKey: ['likes', placeName] });
      await queryClient.cancelQueries({
        queryKey: ['userLiked', userId, placeName],
      });

      const previousLikes = queryClient.getQueryData(['likes', placeName]);
      const previousLiked = queryClient.getQueryData([
        'userLiked',
        userId,
        placeName,
      ]);

      queryClient.setQueryData(
        ['likes', placeName],
        (oldLikes: number) => (oldLikes ?? 0) + 1,
      );
      queryClient.setQueryData(['userLiked', userId, placeName], true);

      return { previousLikes, previousLiked };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', placeName] });
      queryClient.invalidateQueries({
        queryKey: ['userLiked', userId, placeName],
      });
    },
    onError: (error, _, context) => {
      console.error('Failed to add like:', error);
      if (context?.previousLikes !== undefined) {
        queryClient.setQueryData(['likes', placeName], context.previousLikes);
      }

      if (context?.previousLiked !== undefined) {
        queryClient.setQueryData(
          ['userLiked', userId, placeName],
          context.previousLiked,
        );
      }
    },
  });

  // 좋아요 취소(제거) mutation
  const removeLikeMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not logged in');
      return await removeLike(userId, placeName);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', placeName] });
      queryClient.invalidateQueries({
        queryKey: ['userLiked', userId, placeName],
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['likes', placeName] });
      await queryClient.cancelQueries({
        queryKey: ['userLiked', userId, placeName],
      });

      const previousLikes = queryClient.getQueryData(['likes', placeName]);
      const previousLiked = queryClient.getQueryData([
        'userLiked',
        userId,
        placeName,
      ]);

      queryClient.setQueryData(['likes', placeName], (oldLikes: number) =>
        Math.max((oldLikes ?? 0) - 1, 0),
      );
      queryClient.setQueryData(['userLiked', userId, placeName], false);

      return { previousLikes, previousLiked };
    },
    onError: (error) => {
      console.error('Failed to remove like:', error);
    },
  });

  return {
    likes,
    liked,
    isLikesPending,
    isLikedPending,
    isAdding: addLikeMutation.isPending,
    isRemoving: removeLikeMutation.isPending,
    addLike: addLikeMutation.mutate,
    removeLike: removeLikeMutation.mutate,
  };
};
