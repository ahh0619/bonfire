const WeatherInfoSkeleton = () => {
  return (
    <div className="flex flex-row items-center justify-start space-x-2 w-full animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      <div className="w-32 h-6 bg-gray-200 rounded"></div>
    </div>
  );
};

export default WeatherInfoSkeleton;
