import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../../actions/emotionAction';

import {EmotionHeader} from '../../molecules/headers';
import {EmotionRow} from '../../molecules/Rows';

const DiaryImotionSection = ({ userEmotion, setAiEmotion,aiEmotion, isPublic, setIsPublic, emotionList, content, onAnalyzeEmotion }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmotions());
  }, [dispatch]);

  const { emotions: allEmotions, loading: emotionsLoading } = useSelector(state => ({
    emotions: state.emotions.emotions, // 감정 목록
    loading: state.loading,   
  }));

  return (
    <View style={styles.section}>
      <EmotionHeader isPublic={isPublic} onToggle={() => setIsPublic(prev => !prev)} />

      {/* 사용자 감정 표시 */}
      <EmotionRow label="오늘의 감정" emotion={userEmotion} />

      {/* AI 감정 표시 */}
      {aiEmotion ? (
        <EmotionRow label="AI 분석 감정" emotion={aiEmotion} />
      ) : (
        <Text style={styles.guideText}>일기를 작성한 후 분석 버튼을 눌러주세요!</Text>
      )}

      {/* 분석 버튼 */}
      <TouchableOpacity style={styles.analyzeButton} onPress={() => onAnalyzeEmotion(content)}>
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
