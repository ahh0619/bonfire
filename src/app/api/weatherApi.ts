import { Weather } from '@/types/Weather';

const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;

export const fetchWeather = async (
  lat: number,
  lon: number,
): Promise<Weather> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric&lang=kr`,
    );

    if (!response.ok) {
      throw new Error(
        `날씨 데이터 패치 에러 : ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('날씨 데이터 패치 에러 :', err);

    throw new Error(
      '날씨 데이터를 가져오는데 실패하였습니다. 다시 시도해주세요!',
    );
  }
};
