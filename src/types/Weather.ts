export type Weather = {
  // 캠핑장의 좌표 정보
  coord: {
    lon: number; // 경도
    lat: number; // 위도
  };

  // 날씨 정보 배열
  weather: Array<{
    id: number; // 날씨 상태 코드
    main: string; // 주요 날씨 상태
    description: string; // 상세 날씨 설명
    icon: string; // 날씨 아이콘 코드
  }>;

  // 주요 기상 데이터
  main: {
    temp: number; // 현재 온도 (섭씨)
    feels_like: number; // 체감 온도 (섭씨)
    temp_min: number; // 최저 온도 (섭씨)
    temp_max: number; // 최고 온도 (섭씨)
    pressure: number; // 대기압 (헥토파스칼, hPa)
    humidity: number; // 습도 (%)
    sea_level?: number; // 해수면 기준 대기압
    grnd_level?: number; // 지표면 기준 대기압
  };

  // 가시거리 (미터 단위)
  visibility: number;

  // 바람 정보
  wind: {
    speed: number; // 풍속 (m/s)
    deg: number; // 풍향 (도)
  };

  // 구름 정보
  clouds: {
    all: number; // 구름 덮임 비율 (%)
  };

  // 시간대
  timezone: number;

  // 지역 고유 ID
  id: number;

  // 지역 이름
  name: string;
};
