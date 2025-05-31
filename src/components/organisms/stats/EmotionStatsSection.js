// components/organisms/stats/EmotionStatsSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import {EmotionPieChartBox} from '../../molecules/boxes';
import {StatsEmotionLabel} from '../../atoms/TextsAndLabel';
import {EmotionSummaryBox} from '../../molecules/boxes';
import {StatTitle} from '../../atoms/TextsAndLabel';

const screenWidth = Dimensions.get('window').width;

const EmotionStatsSection = ({ title = '감정 통계', emotionData = [] }) => {
  console.log('=== EmotionStatsSection 렌더링 ===');
  console.log('📊 받은 emotionData:', emotionData);
  console.log('📊 emotionData 타입:', typeof emotionData);
  console.log('📊 emotionData 배열 여부:', Array.isArray(emotionData));
  
  const safeData = Array.isArray(emotionData) ? emotionData : [];

  if (!safeData || safeData.length === 0) {
    console.log('⚠️ emotionData가 비어있음 - 기본 메시지 표시');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>감정 통계</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>아직 작성한 일기가 없어요</Text>
        </View>
      </View>
    );
  }

  console.log('✅ emotionData 유효 - 차트 렌더링');
  console.log('📊 차트 데이터 생성 중...');

  // 차트 데이터 생성
  const chartData = safeData.map((emotion, index) => {
    const dataPoint = {
      name: emotion.name,
      count: Number(emotion.count || 0),
      color: emotion.color || '#000000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
    console.log(`📊 차트 데이터 ${index}:`, dataPoint);
    return dataPoint;
  });

  console.log('📊 최종 차트 데이터:', chartData);

  return (
    <View style={styles.container}>
      <StatTitle text={title} />
      
      <View style={styles.chartRow}>
        <EmotionPieChartBox data={safeData} />
        <StatsEmotionLabel data={safeData} />
      </View>

      <EmotionSummaryBox emotionStats={safeData} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  statItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  emotionEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  emotionName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  emotionCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default EmotionStatsSection;
