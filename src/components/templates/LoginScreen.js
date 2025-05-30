// import React, { useState , useContext} from 'react';
// import { View, StyleSheet, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {EXPO_PUBLIC_API_URL} from '@env'
// import { AuthContext } from '../../context/AuthContext'; 

// export default function LoginScreen() {
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);
//   const { setIsLoggedIn, setUser } = useContext(AuthContext);

//   const handleNavigationStateChange = async (navState) => {
//     console.log("여기")
//     const url = navState.url;
//     console.log("url", url)
//     if (url.includes('https://devops1.store/?access_token')) {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(url);
//         const redirectUrl = response.request.responseURL;
        
//         const tokenMatch = redirectUrl.match(/[?&]access_token=([^&]+)/);
//         if (tokenMatch) {
//           const accessToken = tokenMatch[1];
          
//           const userResponse = await axios.get(`https://devops1.store/?access_token=${accessToken}`);
//           const { id, nickname, properties } = userResponse.data;
//           const userAccessToken = accessToken;

//           // 사용자 정보 저장
//           const USER_DATA = {
//             id, nickname, properties, userAccessToken
//           };
//           // await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login/kakaoapp`, USER_DATA);

//           //console.log(id, nickname, properties, userAccessToken);
//           //console.log("EXPO_PUBLIC_API_URL", EXPO_PUBLIC_API_URL)

//           // 로그인 성공 시
//           const response = await axios.post(`${EXPO_PUBLIC_API_URL}/login/kakaoapp`, USER_DATA)
//             .then(async res => {
//               const { token, user } = res.data;

//               // JWT 토큰 저장
//               await AsyncStorage.setItem('jwtToken', token);
//               setIsLoggedIn(true); // 로그인 유지
//               setUser(user); // 유저정보 업데이트

//               console.log("로그인 성공:", user);
//               console.log('저장된 토큰:', await AsyncStorage.getItem('jwtToken'));
//               navigation.navigate('Main');
//             });
//             //console.log("로그인 response", response)
//           navigation.navigate('Main');
//         }
//       } catch (error) {
//         console.error('로그인 처리 중 오류:', error);
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       ) : (
//         <WebView
//           style={styles.webview}
//           source={{
//             uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}`,
//           }}
//           onNavigationStateChange={handleNavigationStateChange}
//           javaScriptEnabled
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webview: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// }); 

import React, { useState , useContext} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EXPO_PUBLIC_API_URL, REST_API_KEY, REDIRECT_URI} from '@env' // @env 변수명 직접 임포트
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux'; // Redux의 dispatch 임포트
import { setUser } from '../../reducers/userReducer'; // Redux의 setUser 액션 임포트

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleNavigationStateChange = async (navState) => {
    console.log("여기")
    const url = navState.url;
    console.log("url", url)

    // WebView가 REDIRECT_URI로 리다이렉트되었고 'code' 파라미터가 포함되어 있는지 확인
    // process.env.REDIRECT_URI는 .env에서 가져온 REDIRECT_URI여야 합니다.
    if (url.startsWith(REDIRECT_URI) && url.includes('code=')) { // REDIRECT_URI는 'https://devops1.store/oauth'
      try {
        setIsLoading(true);

        const codeMatch = url.match(/[?&]code=([^&]+)/);
        if (!codeMatch) {
          console.error("인가 코드(code)가 URL에서 발견되지 않았습니다.");
          setIsLoading(false);
          return;
        }
        const code = codeMatch[1];
        console.log("추출된 인가 코드:", code);

        // **여기서 카카오 액세스 토큰 및 사용자 정보 가져오기 (앱에서 직접)**
        // 이 단계는 백엔드 `/kakaoapp` 라우트의 로직과는 별개로, 앱이 직접 카카오 API와 통신하는 부분입니다.
        // 이전에 `https://devops1.store/?access_token=${accessToken}`으로 호출했던 부분이
        // 이 카카오 OAuth 2.0 흐름의 2단계 (토큰 교환) + 3단계 (사용자 정보 조회)에 해당합니다.

        // 1. 카카오 토큰 교환 (인가 코드로 Access Token 받기)
        const tokenRes = await axios.post('https://kauth.kakao.com/oauth/token', null, {
          params: {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY, // @env에서 임포트한 변수 사용
            redirect_uri: REDIRECT_URI, // @env에서 임포트한 변수 사용
            code: code,
            // client_secret: process.env.KAKAO_CLIENT_SECRET_KEY, // 필요시 .env에서 임포트하여 사용
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const accessToken = tokenRes.data.access_token;
        console.log("카카오 액세스 토큰:", accessToken);

        // 2. 카카오 사용자 정보 가져오기 (Access Token으로 사용자 프로필 받기)
        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const kakaoUser = userRes.data;
        console.log("카카오 사용자 정보:", kakaoUser);

        const { id, properties, kakao_account } = kakaoUser;
        const nickname = properties?.nickname ?? '';
        const profileImage = properties?.profile_image ?? ''; // 백엔드로 보낼 프로필 이미지

        // **2단계: 백엔드 `/login/kakaoapp`으로 사용자 정보 전송**
        const USER_DATA = {
          id: id,
          nickname: nickname,
          properties: { profile_image: profileImage }, // 백엔드 kakaoapp 라우트에서 properties?.profile_image 사용
          userAccessToken: accessToken // 카카오 access_token
        };

        const response = await axios.post(`${EXPO_PUBLIC_API_URL}/login/kakaoapp`, USER_DATA);
        
        const { token, user } = response.data; // 백엔드에서 발급한 JWT 토큰과 유저 정보

        if (token && user) {
            await AsyncStorage.setItem('jwtToken', token);
            setIsLoggedIn(true);
            setUser(user);

            console.log("로그인 성공 (백엔드 처리 완료):", user);
            console.log('저장된 JWT 토큰:', await AsyncStorage.getItem('jwtToken'));
            navigation.navigate('Main');
        } else {
            console.error("백엔드 응답에서 JWT 토큰 또는 유저 정보를 찾을 수 없습니다.");
        }

      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        if (error.response) {
          console.error('오류 응답 데이터:', error.response.data);
          console.error('오류 응답 상태:', error.response.status);
        } else if (error.request) {
          console.error('오류 요청 (네트워크/서버 무응답):', error.request);
        } else {
          console.error('오류 메시지:', error.message);
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <WebView
          style={styles.webview}
          source={{
            // @env에서 임포트한 변수를 사용
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});