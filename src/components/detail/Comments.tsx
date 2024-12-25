import { fetchComments } from "@/app/detail/actions";
import Comment from "./Comment";

type CommentsProps = {
  placeName: string
}

const Comments = async ({ placeName }: CommentsProps) => {
  const comments = await fetchComments(placeName);
  console.log(comments)

  return (
    <div>
      {/* {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))} */}
    </div>
  );
};

export default Comments
