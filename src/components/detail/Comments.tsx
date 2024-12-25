import { fetchComments } from '@/app/detail/actions';
import Comment from './Comment';

type CommentsProps = {
  placeName: string;
};

const Comments = async ({ placeName }: CommentsProps) => {
  const comments = await fetchComments(placeName);

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          nickname={comment.user?.nickname || 'Unknown User'}
          profileImage={comment.user?.profile_image || null}
          content={comment.content}
        />
      ))}
    </div>
  );
};

export default Comments;
