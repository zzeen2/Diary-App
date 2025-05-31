import { FETCH_MY_DIARIES_REQUEST, FETCH_MY_DIARIES_SUCCESS, FETCH_MY_DIARIES_FAILURE, FETCH_TODAY_FOLLOWING_DIARIES_REQUEST, FETCH_TODAY_FOLLOWING_DIARIES_SUCCESS, FETCH_TODAY_FOLLOWING_DIARIES_FAILURE } from '../actions/diaryAction';

const initialState = {
    myDiaries: [],
    loading: false,
    error: null,
    todayFollowingDiaries: [],
};

const diaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MY_DIARIES_REQUEST:
        return {
            ...state,
            loading: true,
            error: null,
        };
        case FETCH_MY_DIARIES_SUCCESS:
        return {
            ...state,
            loading: false,
            myDiaries: action.payload,
        };
        case FETCH_MY_DIARIES_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload,
            myDiaries: [], // 에러 발생 시 목록 초기화
        };
        case FETCH_TODAY_FOLLOWING_DIARIES_REQUEST:
        return { ...state, loading: true, error: null };
        case FETCH_TODAY_FOLLOWING_DIARIES_SUCCESS:
        return { ...state, loading: false, todayFollowingDiaries: action.payload };
        case FETCH_TODAY_FOLLOWING_DIARIES_FAILURE:
        return { ...state, loading: false, error: action.payload };
        default:
        return state;
    }
};

export default diaryReducer;