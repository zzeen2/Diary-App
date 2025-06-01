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
    const url = navState.url;

    if (url.includes('devops1.store') && url.includes('access_token=')) {
      try {
        setIsLoading(true);

        const tokenMatch = url.match(/[?&]access_token=([^&]+)/);
        if (!tokenMatch) {
          setIsLoading(false);
          return;
        }
        const accessToken = tokenMatch[1];

        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const kakaoUser = userRes.data;

        const { id, properties } = kakaoUser;
        const nickname = properties?.nickname ?? '';
        const profileImage = properties?.profile_image ?? '';

        const backendResponse = await axios.post(`${EXPO_PUBLIC_API_URL}/login/kakaoapp`, {
          id: id,
          nickname: nickname,
          properties: { profile_image: profileImage },
          userAccessToken: accessToken
        });
        
        const { token, user: backendUser } = backendResponse.data; 

        if (token && backendUser) {
          const nicknameToSave = backendUser.nickname || nickname || '사용자';

          await AsyncStorage.setItem('jwtToken', token);
          await AsyncStorage.setItem('userUid', String(backendUser.uid));
          await AsyncStorage.setItem('userNickname', nicknameToSave);
          
          if (backendUser.profile) {
            await AsyncStorage.setItem('userProfileImage', backendUser.profile);
          }
          if (backendUser.bio) {
            await AsyncStorage.setItem('userBio', backendUser.bio);
          }

          setIsLoggedIn(true);
        } else {
          Alert.alert("로그인 실패", "서버 응답에 필수 정보가 부족합니다.");
        }

      } catch (error) {
        setIsLoading(false);
        Alert.alert("로그인 실패", `로그인 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
      }
    }
    else if (url.includes('devops1.store') && url.includes('code=')) {
      try {
        setIsLoading(true);

        const codeMatch = url.match(/[?&]code=([^&]+)/);
        if (!codeMatch) {
          setIsLoading(false);
          return;
        }
        const code = codeMatch[1];

        const tokenRes = await axios.post('https://kauth.kakao.com/oauth/token', 
          `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        );

        const accessToken = tokenRes.data.access_token;

        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const kakaoUser = userRes.data;

        const { id, properties } = kakaoUser;
        const nickname = properties?.nickname ?? '';
        const profileImage = properties?.profile_image ?? '';

        const backendResponse = await axios.post(`${EXPO_PUBLIC_API_URL}/login/kakaoapp`, {
          id: id,
          nickname: nickname,
          properties: { profile_image: profileImage },
          userAccessToken: accessToken
        });
        
        const { token, user: backendUser } = backendResponse.data; 

        if (token && backendUser) {
          const nicknameToSave = backendUser.nickname || nickname || '사용자';

          await AsyncStorage.setItem('jwtToken', token);
          await AsyncStorage.setItem('userUid', String(backendUser.uid));
          await AsyncStorage.setItem('userNickname', nicknameToSave);
          
          if (backendUser.profile) {
            await AsyncStorage.setItem('userProfileImage', backendUser.profile);
          }
          if (backendUser.bio) {
            await AsyncStorage.setItem('userBio', backendUser.bio);
          }

          setIsLoggedIn(true);
        } else {
          Alert.alert("로그인 실패", "서버 응답에 필수 정보가 부족합니다.");
        }

      } catch (error) {
        setIsLoading(false);
        Alert.alert("로그인 실패", `로그인 중 오류가 발생했습니다: ${error.response?.data?.error_description || error.message}`);
      }
    } else {
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