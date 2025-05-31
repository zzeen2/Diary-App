// components/molecules/stats/EmotionSummary.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {StatsEmotionLabel} from '../../atoms/TextsAndLabel';

const EmotionSummaryBox = ({ emotionStats = [] }) => {
  const safeStats = Array.isArray(emotionStats) ? emotionStats : [];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>감정 요약</Text>
      <View style={styles.keyList}>
        {safeStats.map((emotion) => (
          <StatsEmotionLabel
            key={emotion.id}
            emoji={emotion.emoji}
            name={emotion.name}
            color={emotion.color}
            value={emotion.count}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  keyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

export default EmotionSummaryBox;
