import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const SEARCH_USERS_FAILURE = 'SEARCH_USERS_FAILURE';

export const searchUsersByNickname = (nickname) => async (dispatch) => {
  console.log('[searchUsersByNickname] 검색어:', nickname);
  dispatch({ type: SEARCH_USERS_REQUEST });
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) throw new Error('JWT 토큰이 없습니다.');
    console.log('[searchUsersByNickname] API 요청 URL:', `${EXPO_PUBLIC_API_URL}/login/search/users`);
    const response = await axios.get(
      `${EXPO_PUBLIC_API_URL}/login/search/users`,
      {
        params: { q: nickname },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('[searchUsersByNickname] API 응답:', response.data);
    dispatch({ type: SEARCH_USERS_SUCCESS, payload: response.data.users });
  } catch (error) {
    console.error('[searchUsersByNickname] 에러:', error);
    dispatch({ type: SEARCH_USERS_FAILURE, payload: error.message });
  }
}; 