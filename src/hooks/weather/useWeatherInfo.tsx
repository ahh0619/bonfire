import { fetchWeather } from '@/app/api/weatherApi';
import { Weather } from '@/types/Weather';
import { useQuery } from '@tanstack/react-query';

const useWeatherInfo = ({ lat, lon }: { lat: string; lon: string }) => {
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

  const weatherCondition = weatherInfo!.weather[0].main;

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
