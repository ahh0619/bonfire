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
  return <div>WeatherInfo</div>;
};

export default WeatherInfo;
