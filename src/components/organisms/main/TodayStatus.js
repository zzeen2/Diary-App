import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TodayStatus = ({ todayDiary, onWritePress }) => {
  return (
    <View style={styles.container}>
      {todayDiary ? (
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>✨ 오늘의 일기를 작성했어요!</Text>
          <View style={styles.emotionContainer}>
            {todayDiary.userEmotion && (
              <View style={styles.emotionBox}>
                <Text style={styles.emotionLabel}>나의 감정</Text>
                <Text style={styles.emotionEmoji}>{todayDiary.userEmotion.emoji}</Text>
                <Text style={styles.emotionName}>{todayDiary.userEmotion.name}</Text>
              </View>
            )}
            {todayDiary.aiEmotion && (
              <View style={styles.emotionBox}>
                <Text style={styles.emotionLabel}>AI가 분석한 감정</Text>
                <Text style={styles.emotionEmoji}>{todayDiary.aiEmotion.emoji}</Text>
                <Text style={styles.emotionName}>{todayDiary.aiEmotion.name}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.viewButton} onPress={onWritePress}>
            <Text style={styles.viewButtonText}>일기 보러가기 →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.writePromptContainer} onPress={onWritePress}>
          <Text style={styles.writePromptEmoji}>✏️</Text>
          <Text style={styles.writePromptTitle}>오늘의 일기를 작성해보세요</Text>
          <Text style={styles.writePromptSubtitle}>감정을 기록하고 하루를 돌아보아요</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  completedContainer: {
    alignItems: 'center',
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  emotionContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20,
  },
  emotionBox: {
    alignItems: 'center',
  },
  emotionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  emotionEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  emotionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  viewButton: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  viewButtonText: {
    color: '#4285F4',
    fontWeight: '600',
  },
  writePromptContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  writePromptEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  writePromptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  writePromptSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default TodayStatus; 