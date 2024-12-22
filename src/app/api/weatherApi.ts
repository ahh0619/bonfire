const WEATHER_API = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;

export const fetchWeather = async () => {
  const response = await fetch(
    // `https://api.openweathermap.org/data/3.0/onecall?lat=37.47957091882811&lon=126.92724947639606&exclude=hourly,daily&appid=${WEATHER_API}`,
    `https://api.openweathermap.org/data/2.5/weather?lat=37.47957091882811&lon=126.92724947639606&appid=${WEATHER_API}&units=metric&lang=kr`,
  );

  const data = await response.json();
  return data;
};
