// components/organisms/stats/StreakSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {StatTitle} from '../../atoms/TextsAndLabel';
import {StreakLabel} from '../../atoms/TextsAndLabel';
import {StreakSummaryBox} from '../../molecules/boxes';

const StreakSection = ({ streakData }) => {
  console.log('=== StreakSection 렌더링 ===');
  console.log('🔥 받은 streakData:', streakData);
  console.log('🔥 streakData 타입:', typeof streakData);
  console.log('🔥 streakData 키들:', Object.keys(streakData || {}));
  
  const safeData = streakData || {};
  const { totalDays = 0, bestStreak = 0, currentStreak = 0 } = safeData;
  
  console.log('🔥 추출된 데이터:', { totalDays, bestStreak, currentStreak });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>작성 연속 기록</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalDays}</Text>
          <Text style={styles.statLabel}>총 작성일</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{bestStreak}</Text>
          <Text style={styles.statLabel}>최장 연속</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{currentStreak}</Text>
          <Text style={styles.statLabel}>현재 연속</Text>
        </View>
      </View>
      
      {currentStreak > 0 && (
        <View style={styles.encouragementBox}>
          <Text style={styles.encouragementText}>
            🔥 {currentStreak}일 연속 작성 중! 대단해요!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  encouragementBox: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  encouragementText: {
    fontSize: 16,
    color: '#856404',
    fontWeight: '500',
  },
});

export default StreakSection;
