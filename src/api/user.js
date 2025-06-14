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
