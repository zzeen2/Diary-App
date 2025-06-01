// src/hooks/useDiarySubmit.js

import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { analyzeEmotion, uploadImageToServer, saveDiary } from '../api/write';

const useDiarySubmit = () => {
  const [loading, setLoading] = useState(false);

  // AI 감정 분석 (API에서 import)
  const handleAnalyzeEmotion = async (content) => {
    setLoading(true);
    try {
      const result = await analyzeEmotion(content);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // 이미지 업로드 (API에서 import)
  const handleUploadImage = async (imageUri) => {
    try {
      const result = await uploadImageToServer(imageUri);
      return result;
    } catch (error) {
      Alert.alert('업로드 실패', '이미지 업로드에 실패했습니다.');
      return null;
    }
  };

  // 일기 저장
  const submit = async ({ title, content, images, userEmotion, aiEmotion, isPublic }) => {
    setLoading(true);
    try {
      const userUid = await AsyncStorage.getItem('userUid');
      
      if (!userUid) {
        Alert.alert('오류', '사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
        return null;
      }

      // userEmotion이 객체라면 id 추출, 문자열이면 그대로 사용
      const transformedUserEmotion = 
        typeof userEmotion === 'object' && userEmotion?.id 
          ? userEmotion.id 
          : userEmotion;

      const diaryData = {
        title,
        content,
        diary_img: images,
        user_id: userUid,
        userEmotion: transformedUserEmotion,
        selectEmotion: aiEmotion,
        is_public: isPublic ? 1 : 0,
      };

      console.log('✅ 프론트엔드에서 백엔드로 보내는 diaryData:', diaryData);

      const result = await saveDiary(diaryData);
      return result; // { success: true, diary_id: ... } 또는 null

    } catch (error) {
      console.error('❌ 일기 저장 실패:', error);
      Alert.alert('저장 실패', '일기 저장에 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { 
    analyzeEmotion: handleAnalyzeEmotion, 
    uploadImage: handleUploadImage, 
    submit, 
    loading 
  };
};

export default useDiarySubmit;