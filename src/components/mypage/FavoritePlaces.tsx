export const FavoritePlaces = () => {
  return (
    <section className="mt-20 w-full">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2">
        좋아요한 곳
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white h-auto shadow rounded-lg p-4 flex transform transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            <div className="bg-gray-300 w-1/2 rounded-md mr-4"></div>
            <div className="flex flex-col justify-between w-1/2">
              <h4 className="text-md font-semibold">멋진 캠프장</h4>
              <p className="text-xs text-gray-500">캠핑</p>
              <p className="text-xs text-gray-600">인천 부평구 길주남로...</p>
              <p className="text-xs text-gray-600">(지번) 부개동 12-126</p>
              <p className="text-xs text-gray-600">010-1234-5678</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
