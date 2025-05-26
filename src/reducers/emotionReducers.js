import { FETCH_EMOTIONS_LOADING,FETCH_EMOTIONS_SUCCESS} from "../actions/emotionAction";

// 초기 상태
const initState = {
    loading: false,
    emotions: [], 
};

// 리듀서
const emotionReducer = (state = initState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case FETCH_EMOTIONS_LOADING: // 로딩중일때
        return { ...state, loading: true};
        
        // 데이터 가져오기 성공
        case FETCH_EMOTIONS_SUCCESS:
        console.log('데이터 가져오기 성공');
        return {...state, loading: false, emotions: payload.data,};
        
        default:
        return state;
    }
};

export default emotionReducer;