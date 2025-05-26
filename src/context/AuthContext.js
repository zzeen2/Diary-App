// 앱 실행마다 로그인 되어있는지 확인하기
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = 로딩중

    useEffect(() => {
        const loadToken = async () => {
        const token = await AsyncStorage.getItem('user_token');
        setIsLoggedIn(!!token);
        };
        loadToken();
    }, []);

    const login = async (token) => {
        await AsyncStorage.setItem('user_token', token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user_token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
