import { getUserInfo } from "../api/user";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { SEARCH_USERS_SUCCESS } from '../actions/userAction';

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const initialState = {
    uid: null,
    nickname: '',
    profile: '',
    bio: '',
    searchResults: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
        return { ...state, ...action.payload };
        case CLEAR_USER:
        return initialState;
        case SEARCH_USERS_SUCCESS:
        return { ...state, searchResults: action.payload };
        default:
        return state;
    }
};

export default userReducer;

// 액션 생성자
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const clearUser = () => ({ type: CLEAR_USER });
// export const fetchUser = () => async (dispatch) => { // token을 인자로 받지 않고 AsyncStorage에서 직접 가져옴
//     try {
//         const token = await AsyncStorage.getItem('jwtToken'); // AsyncStorage 임포트 필요 (아래 MainScreen에 추가)
//         const userUid = await AsyncStorage.getItem('userUid'); // userUid도 가져옴

//         if (!token || !userUid) {
//             console.log('fetchUser: JWT 토큰 또는 userUid가 없어 사용자 정보를 불러오지 않습니다.');
//             // 필요하다면 여기서 clearUser를 dispatch 할 수 있습니다.
//             // dispatch(clearUser());
//             return;
//         }

//         const userInfo = await getUserInfo(token); // 백엔드 API에서 사용자 상세 정보 가져오기
        
//         console.log('✅ fetchUser: getUserInfo로 불러온 사용자 정보:', userInfo);

//         dispatch(setUser({
//             uid: Number(userUid), // AsyncStorage에서 가져온 uid는 문자열이므로 숫자로 변환
//             nickname: userInfo.nickname || '', // 백엔드 응답에서 nickname을 가져옴
//             profile: userInfo.profile || '', // 백엔드 응답에서 profile을 가져옴
//             // bio: userInfo.bio || '', // bio도 있다면 추가
//         }));
//         console.log('✅ fetchUser: Redux 스토어에 사용자 정보 업데이트 완료!');

//     } catch (e) {
//         console.error('❌ fetchUser: 유저 정보 로딩 실패:', e.response?.data || e.message);
//         // 사용자 정보 로딩 실패 시 로그아웃 처리 등을 고려할 수 있습니다.
//         dispatch(clearUser()); // 실패 시 사용자 정보 초기화
//     }
// };
