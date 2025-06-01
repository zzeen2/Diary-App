import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../../actions/emotionAction';

import {EmotionHeader} from '../../molecules/headers';
import {EmotionRow} from '../../molecules/Rows';

const DiaryImotionSection = ({ 
  userEmotion, 
  setAiEmotion,
  aiEmotion, 
  isPublic, 
  setIsPublic, 
  emotionList, 
  content, 
  onAnalyzeEmotion,
  isEditMode = false
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmotions());
  }, [dispatch]);

  const { emotions: allEmotions, loading: emotionsLoading } = useSelector(state => ({
    emotions: state.emotions.emotions,
    loading: state.loading,   
  }));


  return (
    <View style={styles.section}>
      <EmotionHeader isPublic={isPublic} onToggle={() => setIsPublic(prev => !prev)} />

      <View style={styles.emotionContainer}>
        <EmotionRow 
          label={isEditMode ? "오늘의 감정" : "오늘의 감정"} 
          emotion={userEmotion} 
        />
      </View>

      <View style={styles.emotionContainer}>
        {aiEmotion ? (
          <EmotionRow 
            label={isEditMode ? "AI 분석 감정" : "AI 분석 감정"} 
            emotion={aiEmotion} 
          />
        ) : (
          <Text style={styles.guideText}>
            {isEditMode ? 
              "내용 수정 후 다시 감정 분석하기 버튼을 눌러주세요!" :
              "일기를 작성한 후 분석 버튼을 눌러주세요!"
            }
          </Text>
        )}
      </View>

      <TouchableOpacity 
        style={[
          styles.analyzeButton,
          isEditMode && styles.reAnalyzeButton
        ]} 
        onPress={() => onAnalyzeEmotion(content)}
      >
        <Text style={styles.analyzeText}>
          {isEditMode ? "감정 재분석하기" : "감정 분석하기"}
        </Text>
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
  emotionContainer: {
    marginBottom: 4,
  },
  analyzeButton: {
    marginTop: 0,
    paddingVertical: 12,
    backgroundColor: '#b881c2',
    borderRadius: 12,
    alignItems: 'center',
  },
  reAnalyzeButton: {
    backgroundColor: '#b881c2',
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
  readOnlyText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
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
