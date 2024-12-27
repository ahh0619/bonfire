import { fetchWeather } from '@/app/api/weatherApi';
import { Weather } from '@/types/Weather';
import { useQuery } from '@tanstack/react-query';

const useWeatherInfo = ({ lat, lon }: { lat: string; lon: string }) => {
  // 캠핑장 위치 정보를 바탕으로 날씨 데이터를 불러옴
  const {
    data: weatherInfo,
    isPending: isWeatherPending,
    isError: isWeatherError,
    error: weatherError,
    refetch,
  } = useQuery<Weather>({
    queryKey: ['weatherInfo', lat, lon],
    queryFn: () => fetchWeather(Number(lat), Number(lon)),
  });

  // 맑음, 비, 눈 , 번개 상태 저장
  const weatherCondition = weatherInfo?.weather[0]?.main || 'clear';

  return {
    weatherCondition,
    weatherInfo,
    isWeatherPending,
    isWeatherError,
    weatherError,
    refetch,
  };
};

export default useWeatherInfo;
