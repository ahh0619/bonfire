'use client';

import { fetchWeather } from '@/app/api/weatherApi';
import { Weather } from '@/types/Weather';
import { useQuery } from '@tanstack/react-query';

const WeatherInfo = ({ lat, lon }: { lat: string; lon: string }) => {
  const {
    data: weatherInfo,
    isPending: isWeatherPending,
    isError: isWeatherError,
    error: weatherError,
  } = useQuery<Weather>({
    queryKey: ['weatherInfo'],
    queryFn: () => fetchWeather(Number(lat), Number(lon)),
  });

  if (isWeatherPending) {
    return <p>Loading...</p>;
  }

  if (isWeatherError) {
    return <p>Error:{weatherError.message}</p>;
  }
  return (
    <div>
      {' '}
      <div>
        <p>현재 온도: {weatherInfo.main.temp}°C</p>
        <p>날씨 상태: {weatherInfo.weather[0].description}</p>
        <p>날씨 상태: {weatherInfo.weather[0].main}</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
