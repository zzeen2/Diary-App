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
    if (!token) throw new Error('JWT 토큰이 없습니다.');
    const response = await axios.get(
      `${EXPO_PUBLIC_API_URL}/login/search/users`,
      {
        params: { q: nickname },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: SEARCH_USERS_SUCCESS, payload: response.data.users });
  } catch (error) {
    dispatch({ type: SEARCH_USERS_FAILURE, payload: error.message });
  }
}; 