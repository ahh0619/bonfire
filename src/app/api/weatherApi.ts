const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;

export const fetchWeather = async (lat:number, lon:number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=metric&lang=kr`,
  );

  const data = await response.json();
  return data;
};
