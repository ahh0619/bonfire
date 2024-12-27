import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addComment,
  deleteComment,
  fetchComments,
  updateComment,
} from '@/app/detail/actions';
import { useAuthStore } from '@/store/authStore';
import { Comment } from '@/types/Comment';

export const useComments = (placeName: string) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuthStore();

  const { data: comments, isPending: isCommentsPending } = useQuery({
    queryKey: ['comments', placeName],
    queryFn: async () => {
      return await fetchComments(placeName);
    },
    initialData: [],
  });

  // 추가 mutation
  const addCommentMutation = useMutation({
    mutationFn: async ({
      content,
      userId,
    }: {
      content: string;
      userId: string;
    }) => {
      await addComment({
        content,
        place_name: placeName,
        user_id: userId,
      });
    },
    onMutate: async ({ content, userId }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', placeName] });
      const previousComments = queryClient.getQueryData([
        'comments',
        placeName,
      ]);

      queryClient.setQueryData(
        ['comments', placeName],
        (oldComments: Comment[]) => [
          ...oldComments,
          {
            id: `temp-${Date.now()}`,
            content,
            user_id: userId,
            user: {
              nickname: currentUser![0].nickname,
              profile_image: currentUser![0].profile_image,
            },
          },
        ],
      );

      return { previousComments };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', placeName] });
    },
    onError: (error, _, context) => {
      console.error('댓글 등록 실패:', error);
      if (context?.previousComments) {
        queryClient.setQueryData(
          ['comments', placeName],
          context.previousComments,
        );
      }
    },
  });

  // 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      await deleteComment(commentId);
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['comments', placeName] });
      const previousComments = queryClient.getQueryData([
        'comments',
        placeName,
      ]);

      queryClient.setQueryData(
        ['comments', placeName],
        (oldComments: Comment[]) =>
          oldComments.filter((comment) => comment.id !== commentId),
      );

      return { previousComments };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', placeName] });
    },
    onError: (error, _, context) => {
      console.error('댓글 삭제 실패:', error);
      if (context?.previousComments) {
        queryClient.setQueryData(
          ['comments', placeName],
          context.previousComments,
        );
      }
    },
  });

  // 수정 mutation
  const updateCommentMutation = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      await updateComment(commentId, content);
    },
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', placeName] });
      const previousComments = queryClient.getQueryData([
        'comments',
        placeName,
      ]);

      queryClient.setQueryData(
        ['comments', placeName],
        (oldComments: Comment[]) =>
          oldComments.map((comment) =>
            comment.id === commentId ? { ...comment, content } : comment,
          ),
      );

      return { previousComments };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', placeName] });
    },
    onError: (error, _, context) => {
      console.error('댓글 수정 실패:', error);
      if (context?.previousComments) {
        queryClient.setQueryData(
          ['comments', placeName],
          context.previousComments,
        );
      }
    },
  });

  return {
    comments,
    isCommentsPending,
    addComment: addCommentMutation.mutate,
    isAdding: addCommentMutation.isPending,
    deleteComment: deleteCommentMutation.mutate,
    isDeleting: deleteCommentMutation.isPending,
    updateComment: updateCommentMutation.mutate,
    isUpdating: updateCommentMutation.isPending,
  };
};
