export type Likes = {
  id: string; // likes 테이블의 고유 ID
  user_id: string;
  place_id: string;
  place_name: string;
  address_name: string;
  phone_number: string;
  location_x?: number;
  location_y?: number;
};
