import { getUserStreak } from '../api/streak';

const SET_STREAK = 'SET_STREAK';
const SET_STREAK_ERROR = 'SET_STREAK_ERROR';

// 초기 상태
const initialState = {
    value: 0,
    error: null,
};

const streakReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STREAK:
        return { ...state, value: action.payload, error: null };
        case SET_STREAK_ERROR:
        return { ...state, error: action.payload };
        default:
        return state;
    }
};

export default streakReducer;

// 액션 
export const setStreak = (value) => ({ type: SET_STREAK, payload: value });
export const setStreakError = (error) => ({ type: SET_STREAK_ERROR, payload: error });

export const fetchStreak = (uid) => {
    return async (dispatch) => {
        try {
            const streak = await getUserStreak(uid); 
            console.log(streak, "스트릭 불러오기 !!")
            dispatch(setStreak(streak));
        } catch (error) {
            dispatch(setStreakError(error.message || '스트릭 불러오기 실패'));
        }
    };
};