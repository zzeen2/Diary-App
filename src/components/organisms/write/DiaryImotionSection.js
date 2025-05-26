import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../../actions/emotionAction';

import {EmotionHeader} from '../../molecules/headers';
import {EmotionRow} from '../../molecules/Rows';
import useEmotionAnalyze from '../../../hooks/useEmotionAnalyze';
console.log('🧪 export 확인: DiaryImotionSection 컴포넌트 정상 로드됨');
console.log('🧪 EmotionHeader:', EmotionHeader);
console.log('🧪 EmotionRow:', EmotionRow);
console.log('🧪 useEmotionAnalyze:', useEmotionAnalyze);

const DiaryImotionSection = ({ userEmotion, setAiEmotion,aiEmotion, isPublic, setIsPublic, emotionList, content }) => {
  const dispatch = useDispatch();

  const { emotions, loading } = useSelector(state => ({emotions : state.emotions, loading: state.loading})); // 스토어에서 감정 리스트 가져오기
  // ai가 분석한 감정
  const { analyzeEmotion } = useEmotionAnalyze();

  useEffect(() => {
    dispatch(fetchEmotions());
  }, [dispatch]);

  // const handleAnalyze = () => {
  //   if (emotions.length > 0) {
  //     const randomEmotion = emotions.find((e) => e.type === 'anxious') || emotions[0]; // 예시용
  //     setAiEmotion(randomEmotion);
  //   }
  // };

  return (
    <View style={styles.section}>
      <EmotionHeader isPublic={isPublic} onToggle={() => setIsPublic(prev => !prev)} />

      {/* 사용자 감정 표시 */}
      <EmotionRow label="오늘의 감정" emotion={userEmotion} />

      {/* AI 감정 표시 */}
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#b881c2" />
          <Text style={styles.loadingText}>감정 분석 중입니다...</Text>
        </View>
      ) : aiEmotion ? (
        <EmotionRow label="AI 분석 감정" emotion={aiEmotion} />
      ) : (
        <Text style={styles.guideText}>일기를 작성한 후 분석 버튼을 눌러주세요!</Text>
      )}

      {/* 분석 버튼 */}
      <TouchableOpacity style={styles.analyzeButton} onPress={() => analyzeEmotion(content, emotionList, setAiEmotion)} disabled={loading}>
        <Text style={styles.analyzeText}>감정 분석하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  analyzeButton: {
    marginTop: 0,
    paddingVertical: 12,
    backgroundColor: '#b881c2',
    borderRadius: 12,
    alignItems: 'center',
  },
  analyzeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  guideText: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
    marginBottom: 18,
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#888',
  }

});

export default DiaryImotionSection;
