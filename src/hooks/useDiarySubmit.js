// src/hooks/useDiarySubmit.js

import { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const useDiarySubmit = () => {
  const [loading, setLoading] = useState(false);

  const analyzeEmotion = async (content) => {
    if (!content.trim()) {
      Alert.alert('내용을 입력해주세요.', '감정 분석을 위해서는 일기 내용이 필요합니다.');
      return null;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      console.log("토근토근", token)
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
        console.warn(`⚠️ 경고: AI 감정 분석 결과 '${aiEmotionNameKorean}'에 대한 Emotion ID 매핑을 찾을 수 없습니다. Emotion.id는 NULL로 저장될 수 있습니다.`);
      }

      console.log(`✅ AI 감정 분석 결과: ${aiEmotionNameKorean} (Emotion.id: ${aiEmotionId})`);
      return aiEmotionId; // Emotion.id (영어 이름)를 반환합니다.

    } catch (error) {
      console.error('❌ AI 감정 분석 실패:', error.response?.data || error.message || error);
      Alert.alert('오류', error.response?.data?.message || '감정 분석에 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submit = async ({ title, content, images, userEmotion, aiEmotion, isPublic }) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userUidString = await AsyncStorage.getItem('userUid');
      const userUid = Number(userUidString);
      console.log("1. AsyncStorage에서 불러온 토큰:", token ? "존재함" : "없음");
      console.log("2. AsyncStorage에서 불러온 userUidString (문자열):", userUidString); // ⭐ 이 로그 확인 ⭐
      console.log("3. 숫자로 변환된 userUid:", userUid); // ⭐ 이 로그가 4282976752여야 합니다 ⭐
      if (!token) {
        Alert.alert('오류', '로그인이 필요합니다.');
        return false;
      }

      // userUid가 유효한 숫자인지, 0이 아닌지 확인합니다.
      if (isNaN(userUid) || userUid === 0) {
        console.error('❌ submit: 유효하지 않은 userUid 감지됨:', userUidString);
        Alert.alert('오류', '사용자 정보를 불러올 수 없습니다. 다시 로그인해주세요.');
        return false;
      }

      // userEmotion도 Emotion.id를 참조하는 외래 키이므로,
      // userEmotion이 현재 '감사'처럼 한국어 이름으로 전달된다면,
      // 마찬가지로 Emotion.id(영어 이름)로 변환해야 합니다.
      // 현재 DB에 'grateful'이 잘 저장된 것으로 보아,
      // userEmotion은 이미 영어 ID를 보내고 있거나,
      // 또는 userEmotion에 대한 외래키 설정이 selectEmotion과 다를 수 있습니다.
      // 만약 userEmotion도 한국어 이름을 보낸다면 아래와 같이 변환이 필요합니다.
      const transformedUserEmotion = typeof userEmotion === 'string' && EMOTION_NAME_TO_ID_MAP[userEmotion]
                                     ? EMOTION_NAME_TO_ID_MAP[userEmotion]
                                     : userEmotion; // 객체이거나 이미 영어 ID라면 그대로 사용

      const diaryData = {
        title,
        content,
        diary_img: images, // 백엔드에서 'diary_img'로 받으므로 필드명 일치
        user_id: userUid,
        userEmotion: transformedUserEmotion,
        selectEmotion: aiEmotion, // analyzeEmotion에서 이미 Emotion.id(영어 이름)를 반환하므로 그대로 사용
        is_public: isPublic ? 1 : 0, // 백엔드에서 1은 true, 0은 false로 처리되므로 숫자로 변환
      };

      console.log('✅ 프론트엔드에서 백엔드로 보내는 diaryData:', diaryData);

      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/write/app`, diaryData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Alert.alert('저장 완료', '일기가 성공적으로 저장되었습니다!');
      return true;
    } catch (error) {
      console.error('❌ 일기 저장 실패:', error.response?.data || error.message || error);
      Alert.alert('저장 실패', error.response?.data?.message || '일기 저장에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { analyzeEmotion, submit, loading };
};

export default useDiarySubmit;