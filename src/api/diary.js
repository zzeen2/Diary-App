import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

// 헬퍼 함수: 인증 헤더 생성
const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// 오늘 작성 여부 확인
export const checkTodayWritten = async (excludeId = '') => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/checkTodayWritten?excludeId=${excludeId}`, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('오늘 작성 여부 확인 실패:', error);
    throw error;
  }
};

// 오늘 작성한 일기 정보
export const getTodayDiary = async () => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/todayDiary`, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('오늘 일기 조회 실패:', error);
    throw error;
  }
};

// 랜덤 일기
export const getRandomDiary = async () => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/randomDiary`, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('랜덤 일기 조회 실패:', error);
    throw error;
  }
};

// 월간 작성일 조회
export const getMonthWrittenDates = async (month) => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/written-dates?month=${month}`, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('월간 작성일 조회 실패:', error);
    throw error;
  }
};

export const getTodayFollowingDiaries = async () => {
  const res = await axios.get(`${EXPO_PUBLIC_API_URL}/app/followings/todayDiaries`, {
    headers: await getAuthHeaders()
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
    const response = await axios.put(`${EXPO_PUBLIC_API_URL}/edit/app/${diaryId}`, data, {
      headers: await getAuthHeaders()
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
    const response = await axios.delete(`${EXPO_PUBLIC_API_URL}/detail/delete/${diaryId}`, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('일기 삭제 API 오류:', error);
    throw error;
  }
};

// 댓글 작성 API (앱용)
export const createComment = async (diaryId, content) => {
  try {
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
        headers: await getAuthHeaders()
      }
    );
    
    console.log('댓글 작성 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('댓글 작성 API 오류:', error.response?.data || error);
    throw error;
  }
};

// 캘린더 감정 데이터 조회
export const getCalendarEmotions = async (month) => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/calendar-emotions`, {
      params: { month },
      headers: await getAuthHeaders()
    });
    return response.data.data || [];
  } catch (error) {
    console.error('캘린더 감정 데이터 조회 실패:', error);
    throw error;
  }
};

// 감정만 저장하기
export const saveEmotionOnly = async (emotionId) => {
  try {
    const response = await axios.post(`${EXPO_PUBLIC_API_URL}/main/app/emotionOnly`, {
      userEmotion: emotionId,
      selectEmotion: null
    }, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('감정 저장 실패:', error);
    throw error;
  }
};

// 앱용 스트릭 조회 (일기 + 감정 포함)
export const getStreakApp = async () => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/streak`, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('스트릭 조회 실패:', error);
    throw error;
  }
};

// 팔로잉의 오늘 일기 조회
export const getFollowingsTodayDiaries = async () => {
  try {
    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/follow/app/followings/todayDiaries`, {
      headers: await getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('팔로잉 오늘 일기 조회 실패:', error);
    throw error;
  }
}; 