import { getUser } from '@/app/login/actions';

const fetchUserProfile = async () => {
  const data = await getUser();
  return data![0]; // 인증된 유저의 프로필 반환
};

export default fetchUserProfile;
