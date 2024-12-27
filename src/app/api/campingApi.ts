import { Camping, CampingResponse } from '@/types/Camping';

const API_KEY = process.env.NEXT_PUBLIC_GOCAMPING_API_KEY!;
const baseUrl = 'https://apis.data.go.kr/B551011/GoCamping';

export const fetchRadiusCampList = async (
  lat: number,
  lgn: number,
): Promise<CampingResponse> => {
  try {
    const response = await fetch(
      `${baseUrl}/locationBasedList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&mapX=${lgn}&mapY=${lat}&radius=20000&_type=json`,
    );

    if (!response.ok) {
      throw new Error(
        `반경 20km 내 캠핑 리스트 패치 에러 ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('반경 20km 내 캠핑 리스트 패치 에러 : ', err);
    throw new Error(
      '사용자 위치 기준 20km 내 캠핑 리스트를 가져오지 못했습니다. 다시 시도해 주세요!',
    );
  }
};

// 캠핑 장소 1개만 가져오기 (이름으로 가져옵니다)
// 상세 보기 페이지에서 사용됨
// ISR 렌더링 필요
export const fetchOneCampSite = async (facltNm: string): Promise<Camping> => {
  try {
    const response = await fetch(
      `${baseUrl}/searchList?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&MobileOS=AND&MobileApp=appName&_type=json&keyword=${facltNm}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `캠핑 장소 데이터 패치 에러 : ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data.response.body.items.item[0];
  } catch (err) {
    console.error('캠핑 장소 데이터 패치 에러 : ', err);

    throw new Error(
      '해당 캠핑장의 정보를 불러오는데 실패하였습니다. 다시 시도해 주세요!',
    );
  }
};
