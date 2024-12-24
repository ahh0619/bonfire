import { PenLine, Trash2 } from 'lucide-react';

type CommentProps = {
  nickname: string;
  content: string;
};

const Comment = ({ nickname, content }: CommentProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <div className="bg-gray-300 rounded-full w-10 aspect-square"></div>
        <p>{nickname}</p>
      </div>
      <div className="border rounded-xl px-3 py-4 my-4">{content}</div>
      <div className="flex flex-row place-self-end gap-2">
        <button>
          <PenLine />
        </button>
        <button>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default Comment;
