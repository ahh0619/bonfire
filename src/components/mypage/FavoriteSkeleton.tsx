export function FavoriteSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white h-auto shadow rounded-lg p-4 flex transform transition-transform duration-200 cursor-pointer"
        >
          <div className="bg-gray-300 w-1/2 rounded-md mr-4 animate-pulse h-24"></div>
          <div className="flex flex-col justify-between w-1/2">
            <div className="bg-gray-300 h-6 rounded animate-pulse mb-2"></div>
            <div className="bg-gray-300 h-4 rounded animate-pulse mb-1"></div>
            <div className="bg-gray-300 h-4 rounded animate-pulse mb-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
