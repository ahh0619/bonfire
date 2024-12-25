export type Comment = {
  id: string;   // 댓글 row 아이디
  content: string;  // 댓글 내용
  created_at: string | null;    // 생성 시각
  user: {
    nickname: string;   // 유저 닉네임
    profile_image: string | null;   // 유저 프로필 이미지
  };
};