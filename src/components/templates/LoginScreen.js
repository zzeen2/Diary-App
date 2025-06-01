import React, { useState , useContext} from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EXPO_PUBLIC_API_URL, REST_API_KEY, REDIRECT_URI} from '@env' 
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext); 

  const handleNavigationStateChange = async (navState) => {
    console.log("현재 URL:", navState.url);
    const url = navState.url;

    // ✅ 디버깅 로그 추가
    console.log("=== URL 조건 확인 ===");
    console.log("REDIRECT_URI:", REDIRECT_URI);
    console.log("EXPO_PUBLIC_API_URL:", EXPO_PUBLIC_API_URL);
    console.log("url.startsWith(REDIRECT_URI):", url.startsWith(REDIRECT_URI));
    console.log("url.includes('access_token='):", url.includes('access_token='));
    console.log("url.includes('code='):", url.includes('code='));

    // ✅ access_token 처리 - URL 조건 완화
    if (url.includes('devops1.store') && url.includes('access_token=')) {
      console.log("✅ access_token 조건 만족! 처리 시작...");
      try {
        setIsLoading(true);

        // access_token 추출
        const tokenMatch = url.match(/[?&]access_token=([^&]+)/);
        if (!tokenMatch) {
          console.error("액세스 토큰이 URL에서 발견되지 않았습니다.");
          setIsLoading(false);
          return;
        }
        const accessToken = tokenMatch[1];
        console.log("추출된 액세스 토큰:", accessToken);

        // 2. 카카오 사용자 정보 가져오기
        console.log("=== 카카오 사용자 정보 요청 ===");
        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const kakaoUser = userRes.data;
        console.log("카카오 사용자 정보:", kakaoUser);

        const { id, properties } = kakaoUser;
        const nickname = properties?.nickname ?? '';
        const profileImage = properties?.profile_image ?? '';

        // 3. 백엔드로 사용자 정보 전송
        console.log("=== 백엔드 요청 전 URL 확인 ===");
        console.log("EXPO_PUBLIC_API_URL:", EXPO_PUBLIC_API_URL);
        console.log("완성된 URL:", `${EXPO_PUBLIC_API_URL}/login/kakaoapp`);
        console.log("백엔드로 보내는 데이터:", {
          id: id,
          nickname: nickname,
          properties: { profile_image: profileImage },
          userAccessToken: accessToken
        });

        const backendResponse = await axios.post(`${EXPO_PUBLIC_API_URL}/login/kakaoapp`, {
          id: id,
          nickname: nickname,
          properties: { profile_image: profileImage },
          userAccessToken: accessToken
        });
        
        console.log("=== 백엔드 응답 전체 ===");
        console.log("backendResponse.data:", JSON.stringify(backendResponse.data, null, 2));

        const { token, user: backendUser } = backendResponse.data; 

        console.log("=== 추출된 데이터 ===");
        console.log("token:", token ? "존재함" : "없음");
        console.log("backendUser:", JSON.stringify(backendUser, null, 2));
        console.log("backendUser.nickname:", backendUser?.nickname);
        console.log("backendUser.uid:", backendUser?.uid);

        if (token && backendUser) {
          console.log("=== AsyncStorage 저장 전 데이터 확인 ===");
          const nicknameToSave = backendUser.nickname || nickname || '사용자';
          console.log("저장할 nickname:", nicknameToSave);
          console.log("저장할 uid:", String(backendUser.uid));

          await AsyncStorage.setItem('jwtToken', token);
          await AsyncStorage.setItem('userUid', String(backendUser.uid));
          await AsyncStorage.setItem('userNickname', nicknameToSave);
          
          if (backendUser.profile) {
            await AsyncStorage.setItem('userProfileImage', backendUser.profile);
          }
          if (backendUser.bio) {
            await AsyncStorage.setItem('userBio', backendUser.bio);
          }

          console.log("=== AsyncStorage 저장 후 확인 ===");
          console.log('저장된 JWT 토큰:', await AsyncStorage.getItem('jwtToken') ? "존재함" : "없음");
          console.log('저장된 userUid:', await AsyncStorage.getItem('userUid'));
          console.log('저장된 userNickname:', await AsyncStorage.getItem('userNickname'));
          console.log('저장된 userProfileImage:', await AsyncStorage.getItem('userProfileImage'));
          console.log('저장된 userBio:', await AsyncStorage.getItem('userBio'));

          setIsLoggedIn(true);
          // navigation.navigate('Main'); // App.tsx의 isLoggedIn 상태 변경으로 자동 전환됨
          console.log("로그인 성공 - isLoggedIn: true, App.tsx에서 Main 스크린으로 자동 전환될 것입니다.");
        } else {
          console.error("백엔드 응답에서 JWT 토큰 또는 유저 정보를 찾을 수 없습니다.");
          Alert.alert("로그인 실패", "서버 응답에 필수 정보가 부족합니다.");
        }

      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        console.log("=== 백엔드 요청 오류 상세 ===");
        console.log("오류:", error);
        console.log("요청 URL:", error.config?.url);
        console.log("요청 방법:", error.config?.method);
        console.log("응답 상태:", error.response?.status);
        console.log("응답 데이터:", error.response?.data);
        
        setIsLoading(false);
        Alert.alert("로그인 실패", `로그인 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
      }
    }
    // ✅ code 처리 (기존 방식) - URL 조건 완화
    else if (url.includes('devops1.store') && url.includes('code=')) {
      console.log("✅ code 조건 만족! 처리 시작...");
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

        // 1. 카카오 토큰 교환
        const tokenRes = await axios.post('https://kauth.kakao.com/oauth/token', 
          `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        );

        const accessToken = tokenRes.data.access_token;
        console.log("카카오 액세스 토큰:", accessToken);

        // 2. 카카오 사용자 정보 가져오기
        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const kakaoUser = userRes.data;
        console.log("카카오 사용자 정보:", kakaoUser);

        const { id, properties } = kakaoUser;
        const nickname = properties?.nickname ?? '';
        const profileImage = properties?.profile_image ?? '';

        // 3. 백엔드로 사용자 정보 전송
        console.log("=== 백엔드로 보내는 데이터 ===");
        console.log("카카오 id:", id);
        console.log("카카오 nickname:", nickname);

        const backendResponse = await axios.post(`${EXPO_PUBLIC_API_URL}/login/kakaoapp`, {
          id: id,
          nickname: nickname,
          properties: { profile_image: profileImage },
          userAccessToken: accessToken
        });
        
        console.log("=== 백엔드 응답 전체 ===");
        console.log("backendResponse.data:", JSON.stringify(backendResponse.data, null, 2));

        const { token, user: backendUser } = backendResponse.data; 

        console.log("=== 추출된 데이터 ===");
        console.log("token:", token ? "존재함" : "없음");
        console.log("backendUser:", JSON.stringify(backendUser, null, 2));
        console.log("backendUser.nickname:", backendUser?.nickname);
        console.log("backendUser.uid:", backendUser?.uid);

        if (token && backendUser) {
          console.log("=== AsyncStorage 저장 전 데이터 확인 ===");
          const nicknameToSave = backendUser.nickname || nickname || '사용자';
          console.log("저장할 nickname:", nicknameToSave);
          console.log("저장할 uid:", String(backendUser.uid));

          await AsyncStorage.setItem('jwtToken', token);
          await AsyncStorage.setItem('userUid', String(backendUser.uid));
          await AsyncStorage.setItem('userNickname', nicknameToSave);
          
          if (backendUser.profile) {
            await AsyncStorage.setItem('userProfileImage', backendUser.profile);
          }
          if (backendUser.bio) {
            await AsyncStorage.setItem('userBio', backendUser.bio);
          }

          console.log("=== AsyncStorage 저장 후 확인 ===");
          console.log('저장된 JWT 토큰:', await AsyncStorage.getItem('jwtToken') ? "존재함" : "없음");
          console.log('저장된 userUid:', await AsyncStorage.getItem('userUid'));
          console.log('저장된 userNickname:', await AsyncStorage.getItem('userNickname'));
          console.log('저장된 userProfileImage:', await AsyncStorage.getItem('userProfileImage'));
          console.log('저장된 userBio:', await AsyncStorage.getItem('userBio'));

          setIsLoggedIn(true);
          // navigation.navigate('Main'); // App.tsx의 isLoggedIn 상태 변경으로 자동 전환됨
          console.log("로그인 성공 (code 방식) - isLoggedIn: true, App.tsx에서 Main 스크린으로 자동 전환될 것입니다.");
        } else {
          console.error("백엔드 응답에서 JWT 토큰 또는 유저 정보를 찾을 수 없습니다.");
          Alert.alert("로그인 실패", "서버 응답에 필수 정보가 부족합니다.");
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
        Alert.alert("로그인 실패", `로그인 중 오류가 발생했습니다: ${error.response?.data?.error_description || error.message}`);
      }
    } else {
      console.log("❌ 로그인 처리 조건 불만족");
      console.log("현재 URL이 REDIRECT_URI로 시작하지 않거나, access_token/code 파라미터가 없습니다.");
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