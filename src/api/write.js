import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

// Emotion 테이블의 'id' (영어 이름)와 'name' (한국어 이름) 매핑
// AI 분석 결과(한국어)를 Emotion.id(영어)로 변환하기 위해 사용됩니다.
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
      `${EXPO_PUBLIC_API_URL}/write/analyze`,
      { content },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // AI 분석 API가 한국어 감정 이름만 반환한다고 가정합니다.
    const aiEmotionNameKorean = response.data.emotion;

    // 한국어 감정 이름을 Emotion.id (영어 이름)로 변환
    const aiEmotionId = EMOTION_NAME_TO_ID_MAP[aiEmotionNameKorean] || null;

    if (!aiEmotionId) {
      console.warn(`⚠️ 경고: AI 감정 분석 결과 '${aiEmotionNameKorean}'에 대한 Emotion ID 매핑을 찾을 수 없습니다.`);
    }

    console.log(`✅ AI 감정 분석 결과: ${aiEmotionNameKorean} (Emotion.id: ${aiEmotionId})`);
    return aiEmotionId; // Emotion.id (영어 이름)를 반환합니다.

  } catch (error) {
    console.error('❌ AI 감정 분석 실패:', error.response?.data || error.message || error);
    Alert.alert('오류', error.response?.data?.message || '감정 분석에 실패했습니다.');
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

    // FormData 생성
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    console.log("이미지 업로드 API 호출 시작:", imageUri);

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

    console.log("이미지 업로드 성공:", response.data.url);
    return response.data.url;

  } catch (error) {
    console.error('❌ 이미지 업로드 실패:', error.response?.data || error.message || error);
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

    console.log('✅ 프론트엔드에서 백엔드로 보내는 diaryData:', diaryData);

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
    return response.data; // 전체 응답 데이터 반환 (diary_id 포함)

  } catch (error) {
    console.error('❌ 일기 저장 실패:', error.response?.data || error.message || error);
    Alert.alert('저장 실패', error.response?.data?.message || '일기 저장에 실패했습니다.');
    return null;
  }
}; 