import CommentItem from './CommentItem';
import { Comment } from '@/types/Comment';

type CommentsProps = {
  commentList: Comment[];
  placeName: string;
};

const CommentList = ({ commentList, placeName }: CommentsProps) => {
  return (
    <div>
      {commentList.map((comment) => (
        <CommentItem
          key={comment.id}
          nickname={comment.user?.nickname || 'Unknown User'}
          profileImage={comment.user?.profile_image || null}
          content={comment.content}
          userId={comment.user_id}
          commentId={comment.id}
          placeName={placeName}
        />
      ))}
    </div>
  );
};

export default CommentList;
