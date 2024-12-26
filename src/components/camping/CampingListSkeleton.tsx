const CampingListSkeleton = () => {
  return (
    <div className="py-8 flex flex-col justify-center items-center border border-gray-300 shadow-lg rounded-lg animate-pulse">
      <div className="h-[250px] w-[80%] sm:w-[80%] md:w-[80%] bg-gray-200 rounded-lg"></div>
      <div className="mt-8 w-[70%] sm:w-[200px] md:w-[250px] h-[20px] bg-gray-200 rounded"></div>
      <div className="mt-4 w-[50%] sm:w-[150px] md:w-[200px] h-[16px] bg-gray-200 rounded"></div>
    </div>
  );
};

export default CampingListSkeleton;
