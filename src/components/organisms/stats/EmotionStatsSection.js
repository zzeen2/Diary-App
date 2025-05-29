// components/organisms/stats/EmotionStatsSection.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {EmotionPieChartBox} from '../../molecules/boxes';
import {StatsEmotionLabel} from '../../atoms/TextsAndLabel';
import {EmotionSummaryBox} from '../../molecules/boxes';
import {StatTitle} from '../../atoms/TextsAndLabel';

const EmotionStatsSection = ({ title = '감정 통계', emotionData = [] }) => {
  return (
    <View style={styles.container}>
      <StatTitle text={title} />
      
      <View style={styles.chartRow}>
        <EmotionPieChartBox data={emotionData} />
        <StatsEmotionLabel data={emotionData} />
      </View>

      <EmotionSummaryBox data={emotionData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 20,
  },
});

export default EmotionStatsSection;
