import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';

export const searchUsersByNickname = (nickname) => async (dispatch) => {
  dispatch({ type: SEARCH_USERS_REQUEST });
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    
    // 헤더 설정 - 토큰이 있을 때만 Authorization 헤더 추가
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.get(
      `${EXPO_PUBLIC_API_URL}/login/search/users`,
      {
        params: { q: nickname },
        headers,
      }
    );
    
    // API 응답에서 users 배열을 가져오거나, 응답 자체가 배열인 경우 처리
    const users = response.data.users || response.data || [];
    dispatch({ type: SEARCH_USERS_SUCCESS, payload: users });
  } catch (error) {
    console.error('사용자 검색 실패:', error);
    const errorMessage = error.response?.data?.message || error.message || '검색 중 오류가 발생했습니다.';
    dispatch({ type: SEARCH_USERS_FAILURE, payload: errorMessage });
  }
}; 