import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigationStateChange = async (navState) => {
    const url = navState.url;
    if (url.includes('https://devops1.store/?access_token')) {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        const redirectUrl = response.request.responseURL;
        
        const tokenMatch = redirectUrl.match(/[?&]access_token=([^&]+)/);
        if (tokenMatch) {
          const accessToken = tokenMatch[1];
          
          const userResponse = await axios.get(`https://devops1.store/?access_token=${accessToken}`);
          const { id, nickname, properties } = userResponse.data;
          // 사용자 정보 저장
          const USER_DATA = {
            id, nickname, properties
          };
          console.log(id, nickname, properties);

          
          navigation.navigate('Main');
        }
      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
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
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}`,
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