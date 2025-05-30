// 앱 실행마다 로그인 되어있는지 확읺가ㅣ
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../reducers/userReducer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // 초기 null → 로딩 상태
    //const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            //console.log('토큰 있음?', token);
            if (!token) {
                setIsLoggedIn(false);
                dispatch(clearUser());            
                return;
            }

            const res = await axios.get(`${EXPO_PUBLIC_API_URL}/login/app/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }); 
            //console.log("authcontesxt 응답", res.data)
            const userData = res.data; 
            dispatch(setUser({
                    uid: userData.uid,
                    nickname: userData.nickname,
                    profile: userData.profile,
                    //bio: userData.bio 
                }));
            setIsLoggedIn(true); 
        } catch (err) {
            console.log("자동 로그인 실패:", err.message);
            await AsyncStorage.removeItem('jwtToken');
            setIsLoggedIn(false);
        }
        };

        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,}}>
            {children}
        </AuthContext.Provider>
    );
};
