// console.log("Loading useKakaoLogin.js module...");
// import React, { useCallback, useEffect } from 'react';
// import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'; // AuthRequest 임포트 추가
// import * as WebBrowser from 'expo-web-browser'; // WebBrowser 다시 임포트해야 합니다! promptAsync가 이를 사용합니다.
// import axios from 'axios';

// import { KAKAO_CLIENT_ID_DEV, KAKAO_CLIENT_ID_PROD, BACKEND_API_URL,KAKAO_REDIRECT_URI } from '@env';

// //WebBrowser.maybeCompleteAuthSession(); // App.js에 있으므로 여기서는 주석 처리 유지

// const KAKAO_CLIENT_ID = KAKAO_CLIENT_ID_DEV;
// //const REDIRECT_URI ="https://auth.expo.io/@jieunkim1203/MoodCloudApp"

// export const useKakaoLogin = () => {
//     // app.json에 정의된 scheme 값을 여기에 명시적으로 넣어줍r니다.
//     // 당신의 app.json에 scheme이 "moodcloudapp"으로 설정되어 있다고 가정합니다.
//     const redirectUri = KAKAO_REDIRECT_URI
//     //const redirectUri = "https://auth.expo.io/@jieunkim1203/moodcloudapp"

//     // console.log("REDIRECT_URI (useKakaoLogin hook):", redirectUri);
//     // console.log("KAKAO_CLIENT_ID (useKakaoLogin hook):", KAKAO_CLIENT_ID);
//     // console.log("BACKEND_API_URL (useKakaoLogin hook):", BACKEND_API_URL);

//     // useAuthRequest 훅 사용: 인증 요청, 응답, 프롬프트 함수를 얻습니다.
//     const [request, response, promptAsync] = useAuthRequest(
//         {
//             clientId: KAKAO_CLIENT_ID,
//             redirectUri,
//             scopes: [], // 필요한 스코프 추가 (예: 'account_email')
//             responseType: 'code', // 인가 코드 요청
//             // PKCE (Proof Key for Code Exchange)는 useAuthRequest에서 자동으로 처리됩니다.
//             extraParams: {
//                 // auth_type: 'ReAuthenticate', // 사용자에게 재인증을 요청할 경우 (선택 사항)
//             },
//             usePKCE: true, // PKCE 활성화 (Expo SDK 41+ 권장)
//         },
//         {
//             // 카카오 OAuth 엔드포인트 명시
//             authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
//             tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
//             revocationEndpoint: 'https://kapi.kakao.com/v1/user/unlink',
//         }
//     );

//     // 응답(response) 변화 감지 및 처리
    
//     React.useEffect(() => { // React.useEffect 사용
//         //console.log("카카오 로그인 request:", request);
//          //console.log("카카오 로그인 response:", response);
//         if (response?.type === 'success') {
//             const { code } = response.params;
//             console.log("카카오 로그인 성공! 인가 코드:", code);

//             // 인가 코드를 백엔드로 전송
//             const sendCodeToBackend = async () => {
//                 try {
//                     const backendResponse = await axios.post(`${BACKEND_API_URL}/api/auth/kakaoapp`, {
//                         code: code,
//                         redirectUri: redirectUri // 백엔드에 redirectUri도 함께 보내주는 것이 좋습니다.
//                     });
//                     console.log("백엔드 응답:", backendResponse.data);
//                     // 여기에 백엔드 응답에 따른 추가 로직 (예: 로그인 성공 처리)
//                     Alert.alert("로그인 성공", "카카오 로그인 및 백엔드 연동 성공!");
//                 } catch (backendError) {
//                     console.error("백엔드에 인가 코드 전송 중 오류 발생:", backendError.response ? backendError.response.data : backendError.message);
//                     Alert.alert("로그인 실패", "백엔드 통신 오류입니다.");
//                 }
//             };
//             sendCodeToBackend();
//         } else if (response?.type === 'cancel') {
//             console.log("카카오 로그인 취소됨.");
//             Alert.alert("로그인 취소", "카카오 로그인이 취소되었습니다.");
//         } else if (response?.type === 'dismiss') {
//             console.log("브라우저가 닫혔습니다.");
//             Alert.alert("로그인 실패", "로그인 창이 닫혔습니다.");
//         } else if (response?.type === 'error') {
//             console.error("카카오 로그인 오류:", response.error);
//             Alert.alert("로그인 오류", `로그인 중 오류가 발생했습니다: ${response.error?.message || response.error}`);
//         }
//     }, [response, redirectUri, request]); // 의존성 배열에 response와 redirectUri 추가

//     // 카카오 로그인 시작 함수
//     const signInWithKakao = useCallback(async () => {
//         if (!request) {
//             // request 객체가 준비되지 않았을 수 있습니다.
//             console.log("카카오 로그인 요청 객체가 아직 준비되지 않았습니다.");
//             return;
//         }
//         console.log("카카오 로그인 시도...");
//         try {
//             await promptAsync(); // useAuthRequest 훅의 promptAsync 사용
//         } catch (error) {
//             console.error("카카오 로그인 중 오류 발생 (promptAsync):", error);
//             Alert.alert("로그인 오류", error.message || "로그인 중 알 수 없는 오류가 발생했습니다.");
//         }
//     }, [request, promptAsync]);

//     return { signInWithKakao }; // 로그인 함수를 반환하여 컴포넌트에서 사용
// };
// useKakaoLogin.js 파일

// src/hooks/useKakaoLogin.js

// src/hooks/useKakaoLogin.js

import React, { useCallback, useEffect } from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser'; // 'expo-browser'가 아니라 'expo-web-browser'인지 확인
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ⭐ AsyncStorage 임포트 확인 ⭐

import { KAKAO_CLIENT_ID_DEV, BACKEND_API_URL, KAKAO_REDIRECT_URI } from '@env';

const KAKAO_CLIENT_ID = KAKAO_CLIENT_ID_DEV;

export const useKakaoLogin = (onLoginSuccess) => {
    const redirectUri = KAKAO_REDIRECT_URI;

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: KAKAO_CLIENT_ID,
            redirectUri,
            scopes: [],
            responseType: 'code',
            extraParams: {},
            usePKCE: true,
        },
        {
            authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
            tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
            revocationEndpoint: 'https://kapi.kakao.com/v1/user/unlink',
        }
    );
    
    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log("--- useKakaoLogin.js 실행 로그 ---");
            console.log("1. 카카오 로그인 성공! 인가 코드:", code);

            const sendCodeToBackend = async () => {
                try {
                    const backendResponse = await axios.post(`${BACKEND_API_URL}/api/auth/kakaoapp`, {
                        code: code,
                        redirectUri: redirectUri
                    });
                    
                    console.log("2. 백엔드로부터 받은 응답 전체 (backendResponse.data):", backendResponse.data); // ⭐ 이 로그가 중요! 'userId' 필드가 있는지, 그 값이 무엇인지 확인 ⭐

                    // ⭐ 핵심: 백엔드 응답에서 'token'과 'userId'를 정확히 추출 ⭐
                    // 이전에 토큰 디코딩 결과 'userId'로 되어 있었으니, 'userId'로 받습니다.
                    const { token, userId } = backendResponse.data; 

                    console.log("3. 백엔드 응답에서 추출된 토큰:", token ? "존재함" : "없음");
                    console.log("4. 백엔드 응답에서 추출된 userId:", userId); // ⭐ 이 로그가 당신의 카카오 UID(4282976752)여야 합니다 ⭐

                    if (token && userId) { // 토큰과 userId 둘 다 유효한지 확인
                        // ⭐ 핵심: AsyncStorage에 'jwtToken'과 'userUid' 저장 ⭐
                        await AsyncStorage.setItem('jwtToken', token); // 토큰은 'jwtToken' 키로 저장
                        await AsyncStorage.setItem('userUid', String(userId)); // userId를 'userUid'라는 키로 저장, 반드시 문자열로 변환

                        console.log("5. ✅ AsyncStorage에 토큰 (jwtToken) 저장 성공!");
                        console.log("6. ✅ AsyncStorage에 userUid (userId를 변환하여) 저장 성공:",", 저장된 값:", userId); // ⭐ 이 로그가 가장 중요! ⭐

                        Alert.alert("로그인 성공", "카카오 로그인 및 백엔드 연동 성공!");
                        
                        if (onLoginSuccess) {
                            onLoginSuccess(userId);
                        }
                    } else {
                        console.error("7. ❌ 백엔드 응답에 토큰 또는 userId 정보가 부족합니다. 응답 내용:", backendResponse.data);
                        Alert.alert("로그인 실패", "서버 응답에 필수 정보가 부족합니다.");
                    }
                } catch (backendError) {
                    console.error("8. ❌ 백엔드에 인가 코드 전송 중 오류 발생:", backendError.response ? backendError.response.data : backendError.message);
                    Alert.alert("로그인 실패", `백엔드 통신 오류입니다: ${backendError.response?.data?.message || backendError.message}`);
                }
            };
            sendCodeToBackend();
        } else if (response?.type === 'cancel') {
            console.log("카카오 로그인 취소됨.");
            Alert.alert("로그인 취소", "카카오 로그인이 취소되었습니다.");
        } else if (response?.type === 'dismiss') {
            console.log("브라우저가 닫혔습니다.");
            Alert.alert("로그인 실패", "로그인 창이 닫혔습니다.");
        } else if (response?.type === 'error') {
            console.error("카카오 로그인 오류:", response.error);
            Alert.alert("로그인 오류", `로그인 중 오류가 발생했습니다: ${response.error?.message || response.error}`);
        }
    }, [response, redirectUri, request, onLoginSuccess]);

    const signInWithKakao = useCallback(async () => {
        if (!request) {
            console.log("카카오 로그인 요청 객체가 아직 준비되지 않았습니다.");
            return;
        }
        console.log("--- 카카오 로그인 시도 (useKakaoLogin.js) ---");
        try {
            await promptAsync();
        } catch (error) {
            console.error("카카오 로그인 중 오류 발생 (promptAsync):", error);
            Alert.alert("로그인 오류", error.message || "로그인 중 알 수 없는 오류가 발생했습니다.");
        }
    }, [request, promptAsync]);

    return { signInWithKakao };
};