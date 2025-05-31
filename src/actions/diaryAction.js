import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FETCH_MY_DIARIES_REQUEST = 'FETCH_MY_DIARIES_REQUEST';
export const FETCH_MY_DIARIES_SUCCESS = 'FETCH_MY_DIARIES_SUCCESS';
export const FETCH_MY_DIARIES_FAILURE = 'FETCH_MY_DIARIES_FAILURE';

export const fetchMyDiaries = () => async (dispatch) => {
    dispatch({ type: FETCH_MY_DIARIES_REQUEST });
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('No JWT token found');
        }

        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/mydiary`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        //console.log('fetchMyDiaries API 응답:', response.data); 

        dispatch({
            type: FETCH_MY_DIARIES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('나의 일기 목록 불러오기 실패:', error);
            dispatch({type: FETCH_MY_DIARIES_FAILURE, payload: error.message,
        });
    }
};