import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const getTodayFollowingDiaries = async () => {
  const res = await axios.get(`${EXPO_PUBLIC_API_URL}/app/followings/todayDiaries`, {
    withCredentials: true,
  });
  return res.data;
};

// 일기 목록 조회
export const fetchDiaries = async () => {
  // TODO: 실제 API 연동
  return [];
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

// 댓글 작성 API (앱용)
export const createComment = async (diaryId, content) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log('=== 댓글 작성 API 호출 ===');
    console.log('일기 ID:', diaryId);
    console.log('댓글 내용:', content);
    
    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/detail/app/createComment`,
      {
        diary_id: diaryId,
        content: content
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('댓글 작성 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('댓글 작성 API 오류:', error.response?.data || error);
    throw error;
  }
};

// 달력용 감정 데이터 조회
export const getCalendarEmotions = async (month) => {
  try {
    console.log('달력 감정 데이터 조회 중...', month);
    const token = await AsyncStorage.getItem('jwtToken');
    
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/calendar-emotions`, {
      params: { month },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error('감정 데이터 조회 실패');
  } catch (error) {
    console.error('달력 감정 데이터 조회 API 오류:', error);
    throw error;
  }
}; 