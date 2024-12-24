'use client';

import { fetchWeather } from '@/app/api/weatherApi';
import { useQuery } from '@tanstack/react-query';
import { Weather } from '@/types/Weather';
import Image from 'next/image';

const WeatherInfo = ({ lat, lon }: { lat: string; lon: string }) => {
  const {
    data: weatherInfo,
    isPending: isWeatherPending,
    isError: isWeatherError,
    error: weatherError,
  } = useQuery<Weather>({
    queryKey: ['weatherInfo', lat, lon],
    queryFn: () => fetchWeather(Number(lat), Number(lon)),
    enabled: !!lat && !!lon,
  });

  if (isWeatherPending) {
    return <p>Loading...</p>;
  }

  if (isWeatherError) {
    return <p>Error:{weatherError.message}</p>;
  }
<<<<<<< HEAD
=======
  const weatherCondition = weatherInfo.weather[0].main;

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
>>>>>>> aa4b85e3f45a9f2e2e4440f92115d21e5a1e43cb

  return (
    <div>
      {' '}
      <div>
        <p>현재 온도: {weatherInfo.main.temp}°C</p>
        <Image
          src={weatherImgSrc(weatherCondition)}
          alt={weatherCondition}
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default WeatherInfo;
