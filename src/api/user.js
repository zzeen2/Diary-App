import { EXPO_PUBLIC_API_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async (token) => {
    try {
        console.log("getUserInfo")
        const res = await fetch(`${EXPO_PUBLIC_API_URL}/login/app/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await res.json();

        console.log(" 응답 data:", data);
        if (!res.ok) {
        throw new Error(data.message || '유저 정보 요청 실패');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserBio = async (uid, bio) => {
  const token = await AsyncStorage.getItem('jwtToken');
  const res = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/mypage/app/userBio`,
    {
      params: { uid, bio },
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return res.data;
};

export const getPublicDiaries = async (uid) => {
  const url = `${EXPO_PUBLIC_API_URL}/mypage/public/${uid}`;
  console.log('[getPublicDiaries] 요청 URL:', url);
  console.log('[getPublicDiaries] uid:', uid);
  try {
    const res = await axios.get(url);
    console.log('[getPublicDiaries] 응답:', res.data);
    return res.data;
  } catch (err) {
    console.error('[getPublicDiaries] 에러:', err);
    throw err;
  }
};

export const getUserById = async (uid) => {
  const res = await axios.get(
    `${EXPO_PUBLIC_API_URL}/login/${uid}`
  );
  return res.data;
};

export const getUserStats = async (uid) => {
  const res = await axios.get(`${EXPO_PUBLIC_API_URL}/detail/stats/${uid}`);
  return res.data;
};

export const getUserProfileByUid = async (uid) => {
  if (!uid) {
    console.warn('[getUserProfileByUid] UID가 제공되지 않았습니다.');
    return null; // 또는 적절한 오류 처리
  }
  const token = await AsyncStorage.getItem('jwtToken');
  if (!token) {
    console.warn('[getUserProfileByUid] JWT 토큰이 없습니다.');
    // 로그인 페이지로 리디렉션하거나 오류를 발생시킬 수 있습니다.
    return null;
  }

  try {
    const res = await axios.get(`${EXPO_PUBLIC_API_URL}/mypage/app/profile/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`[getUserProfileByUid] UID (${uid}) 프로필 정보 응답:`, res.data);
    if (res.data && res.data.success) {
      return res.data.data; // 실제 프로필 데이터 반환
    } else {
      // success가 false이거나 data 필드가 없는 경우
      console.warn('[getUserProfileByUid] 프로필 정보 조회 실패:', res.data?.message || '서버 응답 오류');
      return null;
    }
  } catch (error) {
    console.error(`[getUserProfileByUid] UID (${uid}) 프로필 정보 조회 중 에러:`, error);
    if (error.response) {
      console.error('오류 응답 데이터:', error.response.data);
      console.error('오류 응답 상태:', error.response.status);
    }
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
  }
};
