import { combineReducers } from 'redux';
import emotionReducer from '../reducers/emotionReducers';
import streakReducer from '../reducers/streakReducer';
import userReducer from '../reducers/userReducer';
import diaryReducer from '../reducers/diaryReducer';

const rootReducer = combineReducers({
    emotions: emotionReducer,
    streak: streakReducer,
    user: userReducer,
    myDiaries: diaryReducer
});

export default rootReducer;