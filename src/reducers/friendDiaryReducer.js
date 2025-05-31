// src/reducers/friendDiaryReducer.js

import {
  FETCH_FRIEND_DIARIES_REQUEST,
  FETCH_FRIEND_DIARIES_SUCCESS,
  FETCH_FRIEND_DIARIES_FAILURE,
} from '../actions/friendDiaryAction';

const initialState = {
  friendDiaries: [],
  loading: false,
  error: null,
};

const friendDiaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FRIEND_DIARIES_REQUEST:
      console.log('친구 일기 요청 시작');
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FRIEND_DIARIES_SUCCESS:
      console.log('친구 일기 요청 성공:', action.payload);
      return {
        ...state,
        loading: false,
        friendDiaries: action.payload,
        error: null,
      };
    case FETCH_FRIEND_DIARIES_FAILURE:
      console.log('친구 일기 요청 실패:', action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default friendDiaryReducer;