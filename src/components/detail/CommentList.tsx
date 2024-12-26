import CommentItem from './CommentItem';
import { Comment } from '@/types/Comment';

type CommentsProps = {
  commentList: Comment[];
};

const CommentList = ({ commentList }: CommentsProps) => {
  return (
    <div>
      {commentList.map((comment) => (
        <CommentItem
          key={comment.id}
          nickname={comment.user?.nickname || 'Unknown User'}
          profileImage={comment.user?.profile_image || null}
          content={comment.content}
          userId={comment.user_id}
        />
      ))}
    </div>
  );
};

export default CommentList;
