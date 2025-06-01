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
  isEditMode = false // 수정 모드 플래그 추가
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmotions());
  }, [dispatch]);

  const { emotions: allEmotions, loading: emotionsLoading } = useSelector(state => ({
    emotions: state.emotions.emotions,
    loading: state.loading,   
  }));

  console.log("=== DiaryImotionSection ===");
  console.log("userEmotion:", userEmotion);
  console.log("aiEmotion:", aiEmotion);
  console.log("isEditMode:", isEditMode);

  return (
    <View style={styles.section}>
      <EmotionHeader isPublic={isPublic} onToggle={() => setIsPublic(prev => !prev)} />

      {/* 사용자 감정 표시 */}
      <View style={styles.emotionContainer}>
        <EmotionRow 
          label={isEditMode ? "사용자 감정 (수정 불가)" : "오늘의 감정"} 
          emotion={userEmotion} 
        />
        {isEditMode && (
          <Text style={styles.readOnlyText}>
            🔒 사용자가 선택한 감정은 수정할 수 없습니다
          </Text>
        )}
      </View>

      {/* AI 감정 표시 */}
      <View style={styles.emotionContainer}>
        {aiEmotion ? (
          <EmotionRow 
            label={isEditMode ? "AI 분석 감정 (재분석 가능)" : "AI 분석 감정"} 
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

      {/* 분석 버튼 */}
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
    marginBottom: 16,
  },
  analyzeButton: {
    marginTop: 0,
    paddingVertical: 12,
    backgroundColor: '#b881c2',
    borderRadius: 12,
    alignItems: 'center',
  },
  reAnalyzeButton: {
    backgroundColor: '#9966cc', // 재분석 버튼은 조금 다른 색상
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
