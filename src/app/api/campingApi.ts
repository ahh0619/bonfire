import { Camping, CampingResponse } from '@/types/Camping';

const API_KEY = process.env.NEXT_PUBLIC_GOCAMPING_API_KEY!;
const baseUrl = 'https://apis.data.go.kr/B551011/GoCamping';

export const fetchCampingList = async (): Promise<CampingResponse> => {
  const response = await fetch(
    `${baseUrl}/basedList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=AND&MobileApp=appName&_type=json`,
  );
  const data = await response.json();
  return data;
};

export const fetchRadiusCampList = async (
  lat: number,
  lgn: number,
): Promise<CampingResponse> => {
  const response = await fetch(
    `${baseUrl}/locationBasedList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&mapX=${lgn}&mapY=${lat}&radius=20000&_type=json`,
  );
  const data = await response.json();
  return data;
};

// 캠핑 장소 1개만 가져오기 (이름으로 가져옵니다)
// 상세 보기 페이지에서 사용됨
// ISR 렌더링 필요
export const fetchOneCampSite = async (facltNm: string): Promise<Camping> => {
  const response = await fetch(
    `${baseUrl}/searchList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=AND&MobileApp=appName&_type=json&keyword=${facltNm}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  const data = await response.json();
  return data.response.body.items.item[0];
};
