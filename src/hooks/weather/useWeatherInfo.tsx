'use client';

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
  } = useQuery<Weather>({
    queryKey: ['weatherInfo', lat, lon],
    queryFn: () => fetchWeather(Number(lat), Number(lon)),
  });

  // 맑음, 비, 눈 , 번개 상태 저장
  const weatherCondition = weatherInfo?.weather[0]?.main || 'clear';

  const weatherImgSrc = (condition: string) => {
    switch (condition) {
      case 'thunderstorm':
        return '/images/weather/Thunderstorm.png';
      case 'clouds':
        return '/images/weather/Clouds.png';
      case 'rain':
        return '/images/weather/Rain.png';
      case 'snow':
        return '/images/weather/Snow.png';
      default:
        return '/images/weather/Clear.png';
    }
  };

  return {
    weatherCondition,
    weatherInfo,
    isWeatherPending,
    isWeatherError,
    weatherError,
    weatherImgSrc,
  };
};

export default useWeatherInfo;
