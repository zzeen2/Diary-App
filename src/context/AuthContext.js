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
    const [user, setAuthUser] = useState(null); // AuthContext에서 user 상태 관리
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            if (!token) {
                setIsLoggedIn(false);
                setAuthUser(null); // 사용자 정보도 null로 설정
                dispatch(clearUser());            
                return;
            }

            const res = await axios.get(`${EXPO_PUBLIC_API_URL}/login/app/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }); 
            const userData = res.data; 
            const storedBio = await AsyncStorage.getItem('userBio'); // AsyncStorage에서 bio 로드
            const fullUserData = {
                uid: userData.uid,
                nickname: userData.nickname,
                profile: userData.profile,
                bio: userData.bio || storedBio || '' // 서버 응답 우선, 없으면 AsyncStorage, 그것도 없으면 빈 문자열
            };
            setAuthUser(fullUserData); // AuthContext의 user 상태 업데이트
            dispatch(setUser(fullUserData)); // Redux 스토어에도 저장
            setIsLoggedIn(true); 
        } catch (err) {
            console.log("자동 로그인 실패:", err.message);
            await AsyncStorage.removeItem('jwtToken');
            await AsyncStorage.removeItem('userUid');
            await AsyncStorage.removeItem('userNickname');
            await AsyncStorage.removeItem('userProfileImage');
            await AsyncStorage.removeItem('userBio');
            setAuthUser(null); // 사용자 정보 null로 설정
            dispatch(clearUser());
            setIsLoggedIn(false);
        }
        };

        checkToken();
    }, [dispatch]);

    // isLoggedIn이 false로 변경되면 추가 정리 작업
    useEffect(() => {
        if (isLoggedIn === false) {
            console.log("로그아웃 상태로 변경됨 - 데이터 정리");
            setAuthUser(null); // AuthContext의 user도 null로
            dispatch(clearUser());
            // AsyncStorage 모든 항목 삭제 (로그아웃 시 확실하게)
            const clearAsyncStorage = async () => {
                await AsyncStorage.removeItem('jwtToken');
                await AsyncStorage.removeItem('userUid');
                await AsyncStorage.removeItem('userNickname');
                await AsyncStorage.removeItem('userProfileImage');
                await AsyncStorage.removeItem('userBio');
                // 필요한 경우 다른 AsyncStorage 항목도 여기에 추가
            };
            clearAsyncStorage();
        }
    }, [isLoggedIn, dispatch]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
