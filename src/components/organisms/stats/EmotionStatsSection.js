// components/organisms/stats/EmotionStatsSection.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📊</Text>
          <Text style={styles.emptyText}>아직 작성한 일기가 없어요</Text>
          <Text style={styles.emptySubText}>일기를 작성하면 감정 통계를 볼 수 있어요</Text>
        </View>
      </View>
    );
  }

  console.log('✅ emotionData 유효 - 차트 렌더링');
  console.log('📊 차트 데이터 생성 중...');

  // 차트 데이터 생성
  const chartData = safeData.map((emotion, index) => {
    const dataPoint = {
      name: emotion.name || '알 수 없음',
      population: Number(emotion.count || 0),
      color: emotion.color || `hsl(${index * 60}, 70%, 60%)`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    };
    console.log(`📊 차트 데이터 ${index}:`, dataPoint);
    return dataPoint;
  });

  const totalCount = safeData.reduce((sum, item) => sum + (item.count || 0), 0);
  
  console.log('📊 최종 차트 데이터:', chartData);
  console.log('📊 총 개수:', totalCount);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.totalCount}>총 {totalCount}개</Text>
      </View>
      
      {/* 파이차트 + 감정 리스트 가로 배치 */}
      <View style={styles.contentRow}>
        {/* 왼쪽: 파이 차트 */}
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={170}
            height={150}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 8
              }
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="20"
            paddingRight="20"
            absolute={false}
            hasLegend={false}
          />
        </View>

        {/* 오른쪽: 감정 리스트 */}
        <View style={styles.emotionListContainer}>
          <ScrollView style={styles.emotionList} showsVerticalScrollIndicator={false}>
            {safeData.map((emotion, index) => {
              const percentage = totalCount > 0 ? ((emotion.count || 0) / totalCount * 100).toFixed(1) : 0;
              return (
                <View key={emotion.id || index} style={styles.emotionItem}>
                  <View style={styles.emotionTop}>
                    <View style={styles.emotionInfo}>
                      <View 
                        style={[
                          styles.colorDot, 
                          { backgroundColor: emotion.color || `hsl(${index * 60}, 70%, 60%)` }
                        ]} 
                      />
                      <Text style={styles.emotionEmoji}>{emotion.emoji}</Text>
                      <Text style={styles.emotionName}>{emotion.name}</Text>
                    </View>
                    <Text style={styles.emotionCount}>{emotion.count}회</Text>
                  </View>
                  <Text style={styles.emotionPercentage}>{percentage}%</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* 요약 정보 */}
      {safeData.length > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>💡 분석 결과</Text>
          <Text style={styles.summaryText}>
            가장 많이 느낀 감정은 <Text style={styles.highlight}>
              {safeData[0]?.emoji} {safeData[0]?.name}
            </Text>이에요 ({safeData[0]?.count}회)
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  totalCount: {
    fontSize: 12,
    color: '#718096',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    paddingLeft: 20,
    paddingRight: 20,
  },
  emotionListContainer: {
    flex: 1,
    maxHeight: 150,
    paddingLeft: 5,
  },
  emotionList: {
    flex: 1,
  },
  emotionItem: {
    marginBottom: 12,
    paddingVertical: 4,
  },
  emotionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  emotionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  emotionEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  emotionName: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
    flex: 1,
  },
  emotionCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  emotionPercentage: {
    fontSize: 11,
    color: '#718096',
    textAlign: 'right',
    paddingRight: 4,
  },
  summaryContainer: {
    padding: 12,
    backgroundColor: '#F8F4FF',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#b881c2',
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B5A9B',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 12,
    color: '#8B5A9B',
    lineHeight: 16,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#b881c2',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
});

export default EmotionStatsSection;
