import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

const EMOTION_NAME_TO_ID_MAP = {
  "행복": "happy",
  "슬픔": "sad",
  "분노": "angry",
  "평온": "calm",
  "불안": "anxious",
  "피곤": "tired",
  "신남": "excited",
  "혼란": "confused",
  "감사": "grateful",
};

// AI 감정 분석 API
export const analyzeEmotion = async (content) => {
  if (!content.trim()) {
    Alert.alert('내용을 입력해주세요.', '감정 분석을 위해서는 일기 내용이 필요합니다.');
    return null;
  }

  try {
    const token = await AsyncStorage.getItem('jwtToken');
    console.log("감정 분석 API 호출 - 토큰:", token);
    
    if (!token) {
      Alert.alert('오류', 'AI 감정 분석을 위해 로그인이 필요합니다.');
      return null;
    }

    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/write/app/analyze`,
      { content },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );


    const aiEmotionNameKorean = response.data.emotion;
    const aiEmotionId = EMOTION_NAME_TO_ID_MAP[aiEmotionNameKorean] || null;

    if (!aiEmotionId) {
      console.warn(`Emotion ID 매핑을 찾을 수 없습니다.`);
    }

    return aiEmotionId; 

  } catch (error) {
    console.error('AI 감정 분석 실패:', error.response?.data || error.message || error);
    return null;
  }
};

// 이미지 업로드 API
export const uploadImageToServer = async (imageUri) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/write/upload`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.url;

  } catch (error) {
    console.error('이미지 업로드 실패:', error.response?.data || error.message || error);
    throw error;
  }
};

// 일기 저장 API
export const saveDiary = async (diaryData) => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    
    if (!token) {
      throw new Error('로그인이 필요합니다.');
    }

    const response = await axios.post(
      `${EXPO_PUBLIC_API_URL}/write/app`, 
      diaryData, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    Alert.alert('저장 완료', '일기가 성공적으로 저장되었습니다!');
    return response.data; 

  } catch (error) {
    Alert.alert('저장 실패', error.response?.data?.message || '일기 저장에 실패했습니다.');
    return null;
  }
}; 