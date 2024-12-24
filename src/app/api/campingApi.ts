import { CampingResponse } from '@/types/Camping';

const API_KEY = process.env.NEXT_PUBLIC_GOCAMPING_API_KEY!;
const baseUrl = 'https://apis.data.go.kr/B551011/GoCamping';

export const fetchCampingList = async (): Promise<CampingResponse> => {
  const response = await fetch(
    `${baseUrl}/basedList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=AND&MobileApp=appName&_type=json`,
  );
  const data = await response.json();
  return data;
};

export const fetchRadiusCampList = async (): Promise<CampingResponse> => {
  const response = await fetch(
    `${baseUrl}/locationBasedList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&mapX=126.92724947639606&mapY=37.47957091882811&radius=20000&_type=json`,
  );
  const data = await response.json();
  return data;
};
