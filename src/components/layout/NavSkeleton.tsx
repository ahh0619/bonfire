const NavSkeleton = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      <div className="w-[70px] h-[20px] bg-gray-300 animate-pulse"></div>
      <div className="w-[70px] h-[20px] bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default NavSkeleton;
