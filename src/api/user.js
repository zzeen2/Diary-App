import { EXPO_PUBLIC_API_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserInfo = async (token) => {
    try {
        const res = await fetch(`${EXPO_PUBLIC_API_URL}/login/app/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = await res.json();
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
  
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
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
    
    return null; 
  }
  const token = await AsyncStorage.getItem('jwtToken');
  if (!token) {
    return null;
  }

  try {
    const res = await axios.get(`${EXPO_PUBLIC_API_URL}/mypage/app/profile/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (res.data && res.data.success) {
      return res.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    
    if (error.response) {
      
      
    }
    throw error; 
  }
};
