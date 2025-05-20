import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import EmotionHeader from '../molecules/EmotionHeader';
import EmotionRow from '../molecules/EmotionRow';
import EmotionModal from '../molecules/EmotionModal';

const emotionList = [
  { name: '행복', emoji: '😊', type: 'happy', color: '#FFEAA7' },
  { name: '슬픔', emoji: '😢', type: 'sad', color: '#A3D8F4' },
  { name: '분노', emoji: '😠', type: 'angry', color: '#FFB7B7' },
  { name: '평온', emoji: '😌', type: 'calm', color: '#B5EAD7' },
  { name: '불안', emoji: '😰', type: 'anxious', color: '#C7CEEA' },
  { name: '피곤', emoji: '😴', type: 'tired', color: '#E2D8F3' },
  { name: '신남', emoji: '🤩', type: 'excited', color: '#FFD8BE' },
  { name: '혼란', emoji: '🤔', type: 'confused', color: '#D8E2DC' },
];

const DiaryImotionSection = ({ primaryEmotion = emotionList[0] }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [secondaryEmotion, setSecondaryEmotion] = useState(null); // AI or 수정된 감정
  const [rawSecondaryEmotion, setRawSecondaryEmotion] = useState(null); // 분석 원본
  const [isEdited, setIsEdited] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [tempEmotion, setTempEmotion] = useState(null);

  const handleAnalyze = () => {
    const aiResult = emotionList[4]; // 예: '불안'
    setRawSecondaryEmotion(aiResult);
    setSecondaryEmotion(aiResult);
    setIsEdited(false);
  };

  const confirmEmotion = () => {
    if (tempEmotion) {
      setSecondaryEmotion(tempEmotion);
      setIsEdited(true);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.section}>
      <EmotionHeader isPublic={isPublic} onToggle={() => setIsPublic(prev => !prev)} />

      {/* 선택한 감정 (primary) */}
      <EmotionRow label="오늘의 감정" emotion={primaryEmotion} />

      {/* 분석 or 수정 감정 (secondary) */}
      {secondaryEmotion ? (
        <EmotionRow
          label={isEdited ? '수정한 감정' : 'AI 분석 감정'}
          emotion={secondaryEmotion}
          onEdit={() => {
            setTempEmotion(secondaryEmotion);
            setModalVisible(true);
          }}
        />
      ) : (
        <Text style={styles.guideText}>일기를 작성한 후 분석 버튼을 눌러주세요!</Text>
      )}

      {/* 분석하기 버튼 */}
      <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
        <Text style={styles.analyzeText}>감정 분석하기</Text>
      </TouchableOpacity>

      {/* 감정 선택 모달 */}
      <EmotionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={confirmEmotion}
        tempEmotion={tempEmotion}
        setTempEmotion={setTempEmotion}
        emotions={emotionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  analyzeButton: {
    marginTop: 16,
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
    marginTop: 12,
  },
});

export default DiaryImotionSection;
