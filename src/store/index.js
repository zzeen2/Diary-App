import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import emotionReducer from "../reducers/emotionReducers";

export const store = createStore(emotionReducer, applyMiddleware(thunk));