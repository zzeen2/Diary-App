import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const getTodayFollowingDiaries = async () => {
  const res = await axios.get(`${EXPO_PUBLIC_API_URL}/app/followings/todayDiaries`, {
    withCredentials: true,
  });
  return res.data;
};

// 수정 API (앱용)
export const updateDiary = async (diaryId, data) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    
    const response = await axios.put(`${EXPO_PUBLIC_API_URL}/edit/app/${diaryId}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('일기 수정 API 오류:', error);
    throw error;
  }
};

// 삭제 API
export const deleteDiary = async (diaryId) => {
  try {
    const response = await axios.delete(`${EXPO_PUBLIC_API_URL}/detail/delete/${diaryId}`);
    return response.data;
  } catch (error) {
    console.error('일기 삭제 API 오류:', error);
    throw error;
  }
}; 