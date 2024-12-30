import Loading from '@/components/common/Loading';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-center">
        <Loading />
        <p className="mt-4 text-gray-600">
          상세보기 페이지를 불러오고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
