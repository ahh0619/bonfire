export function FavoriteSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white min-h-[200px] shadow rounded-lg p-4 flex flex-col animate-pulse"
        >
          {/* 이미지 영역 */}
          <div className="relative w-full aspect-[4/3] rounded-md bg-gray-300 mb-4"></div>
          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-between flex-grow">
            <div className="bg-gray-300 h-6 rounded mb-2"></div>
            <div className="bg-gray-300 h-4 rounded mb-1"></div>
            <div className="bg-gray-300 h-4 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
