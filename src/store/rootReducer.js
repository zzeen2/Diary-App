import { combineReducers } from 'redux';
import emotionReducer from '../reducers/emotionReducers';
import streakReducer from '../reducers/streakReducer';
import userReducer from '../reducers/userReducer';
import diaryReducer from '../reducers/diaryReducer';
import friendDiaryReducer from '../reducers/friendDiaryReducer';

const rootReducer = combineReducers({
    emotions: emotionReducer,
    streak: streakReducer,
    user: userReducer,
    myDiaries: diaryReducer,
    friendDiaries : friendDiaryReducer
});

export default rootReducer;