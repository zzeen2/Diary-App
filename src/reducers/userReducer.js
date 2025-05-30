import { getUserInfo } from "../api/user";
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const initialState = {
    uid: null,
    nickname: '',
    profile: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
        return { ...state, ...action.payload };
        case CLEAR_USER:
        return initialState;
        default:
        return state;
    }
};

export default userReducer;

// 액션 생성자
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const clearUser = () => ({ type: CLEAR_USER });
// export const fetchUser = (token) => async (dispatch) => {
//     try {
//         const user = await getUserInfo(token);
//         dispatch(setUser({
//             uid: user.uid,
//             nickname: user.nickname,
//             profile: user.profile,
//         }));
//     } catch (e) {
//         console.error('유저 정보 로딩 실패:', e.message);
//     }
// };
