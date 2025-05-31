// src/actions/friendDiaryAction.js

import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 액션 타입 정의
export const FETCH_FRIEND_DIARIES_REQUEST = 'FETCH_FRIEND_DIARIES_REQUEST';
export const FETCH_FRIEND_DIARIES_SUCCESS = 'FETCH_FRIEND_DIARIES_SUCCESS';
export const FETCH_FRIEND_DIARIES_FAILURE = 'FETCH_FRIEND_DIARIES_FAILURE';

// 친구 일기 목록 가져오기
export const fetchFriendDiaries = () => async (dispatch) => {
  dispatch({ type: FETCH_FRIEND_DIARIES_REQUEST });
  
  try {
    console.log('친구 일기 API 호출 시작...');
    
    const token = await AsyncStorage.getItem('jwtToken');
    
    console.log('=== 토큰 디버깅 ===');
    console.log('저장된 토큰 존재 여부:', !!token);
    console.log('토큰 길이:', token?.length);
    console.log('토큰 시작 부분:', token?.substring(0, 20) + '...');
    
    if (!token) {
      throw new Error('저장된 JWT 토큰이 없습니다.');
    }

    const requestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    
    console.log('API 요청 설정:', requestConfig);
    console.log('요청 URL:', `${EXPO_PUBLIC_API_URL}/main/app/diary/followed`); // ⭐ 앱용 경로

    const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/diary/followed`, requestConfig); // ⭐ 앱용 경로

    console.log('친구 일기 API 응답 성공!');
    console.log('응답 데이터:', response.data);

    dispatch({
      type: FETCH_FRIEND_DIARIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('친구 일기 조회 실패:', error);
    
    // ⭐ 상세한 에러 정보 로깅 ⭐
    if (error.response) {
      console.error('에러 응답 상태:', error.response.status);
      console.error('에러 응답 데이터:', error.response.data);
      console.error('에러 응답 헤더:', error.response.headers);
    } else if (error.request) {
      console.error('요청 오류 (응답 없음):', error.request);
    } else {
      console.error('기타 오류:', error.message);
    }
    
    let errorMessage = '친구 일기 조회 실패';
    
    if (error.response?.status === 401) {
      errorMessage = '로그인이 필요합니다. (토큰 만료 또는 무효)';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = error.message;
    }

    dispatch({
      type: FETCH_FRIEND_DIARIES_FAILURE,
      payload: errorMessage,
    });
  }
};