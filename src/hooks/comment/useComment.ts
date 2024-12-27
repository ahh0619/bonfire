import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, updateComment } from '@/app/detail/actions';

export const useComments = (placeName: string) => {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', placeName] });
    },
    onError: (error) => {
      console.error('댓글 등록 실패:', error);
    },
  });

  // 삭제 mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      await deleteComment(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', placeName] });
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', placeName] });
    },
    onError: (error) => {
      console.error('댓글 수정 실패:', error);
    },
  });

  return {
    addComment: addCommentMutation.mutate,
    isAdding: addCommentMutation.isPending,
    deleteComment: deleteCommentMutation.mutate,
    isDeleting: deleteCommentMutation.isPending,
    updateComment: updateCommentMutation.mutate,
    isUpdating: updateCommentMutation.isPending,
  };
};
