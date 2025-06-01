import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_URL } from '@env';

export const getEmotionStats = async () => {
  console.log('=== getEmotionStats API 호출 시작 ===');
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log('🔐 JWT 토큰:', token ? `${token.substring(0, 20)}...` : 'null');
    
    const url = `${EXPO_PUBLIC_API_URL}/stats/app/emotion`;
    console.log('🌐 요청 URL:', url);
    console.log('📡 API_URL 환경변수:', EXPO_PUBLIC_API_URL);
    
    const headers = { Authorization: `Bearer ${token}` };
    console.log('📋 요청 헤더:', headers);
    
    console.log('🚀 axios 요청 시작...');
    const res = await axios.get(url, {
      headers,
      withCredentials: true,
    });
    
    console.log('✅ 감정 통계 API 응답 성공!');
    console.log('📊 응답 상태:', res.status);
    console.log('📊 응답 헤더:', res.headers);
    console.log('📊 응답 데이터:', JSON.stringify(res.data, null, 2));
    
    return res.data;
  } catch (error) {
    console.error('❌ getEmotionStats 에러:', error);
    console.error('❌ 에러 응답:', error.response?.data);
    console.error('❌ 에러 상태:', error.response?.status);
    console.error('❌ 에러 메시지:', error.message);
    throw error;
  }
};

export const getStreakStats = async () => {
  console.log('=== getStreakStats API 호출 시작 ===');
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log('🔐 JWT 토큰:', token ? `${token.substring(0, 20)}...` : 'null');
    
    const url = `${EXPO_PUBLIC_API_URL}/stats/app/streak`;
    console.log('🌐 요청 URL:', url);
    console.log('📡 API_URL 환경변수:', EXPO_PUBLIC_API_URL);
    
    const headers = { Authorization: `Bearer ${token}` };
    console.log('📋 요청 헤더:', headers);
    
    console.log('🚀 axios 요청 시작...');
    const res = await axios.get(url, {
      headers,
      withCredentials: true,
    });
    
    console.log('✅ 스트릭 통계 API 응답 성공!');
    console.log('🔥 응답 상태:', res.status);
    console.log('🔥 응답 헤더:', res.headers);
    console.log('🔥 응답 데이터:', JSON.stringify(res.data, null, 2));
    
    return res.data;
  } catch (error) {
    console.error('❌ getStreakStats 에러:', error);
    console.error('❌ 에러 응답:', error.response?.data);
    console.error('❌ 에러 상태:', error.response?.status);
    console.error('❌ 에러 메시지:', error.message);
    throw error;
  }
}; 