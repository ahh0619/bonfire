const CommentListSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col animate-pulse">
          {/* 프로필 이미지/닉네임 */}
          <div className="flex flex-row items-center gap-2">
            <div className="bg-gray-300 rounded-full w-10 h-10"></div>
            <div className="bg-gray-300 w-24 h-6 rounded"></div>
          </div>

          {/* 내용 */}
          <div className="bg-gray-300 border rounded-xl px-3 py-4 my-4 w-full h-16"></div>
        </div>
      ))}
    </div>
  );
};

export default CommentListSkeleton;
