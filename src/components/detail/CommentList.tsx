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
          comment={comment}
          placeName={placeName}
        />
      ))}
    </div>
  );
};

export default CommentList;
