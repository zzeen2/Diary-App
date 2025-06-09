// components/organisms/stats/StreakSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StreakSection = ({ streakData }) => {
  const safeData = streakData || {};
  const { totalDays = 0, bestStreak = 0, currentStreak = 0 } = safeData;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>✍️ 감정 연속 기록</Text>
        <Text style={styles.subtitle}>꾸준히 기록하고 있는 감정 습관을 확인해보세요</Text>
      </View>
      
      <View style={styles.statsGrid}>
        {/* 총 작성일 */}
        <View style={[styles.statCard, styles.totalCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>📝</Text>
            <Text style={styles.cardTitle}>총 기록일</Text>
          </View>
          <Text style={[styles.statNumber, styles.totalNumber]}>{totalDays}</Text>
          <Text style={styles.cardSubtitle}>일</Text>
        </View>
        
        {/* 최장 연속 */}
        <View style={[styles.statCard, styles.bestCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🏆</Text>
            <Text style={styles.cardTitle}>최장 연속</Text>
          </View>
          <Text style={[styles.statNumber, styles.bestNumber]}>{bestStreak}</Text>
          <Text style={styles.cardSubtitle}>일</Text>
        </View>
      </View>

      {/* 현재 연속 - 큰 카드 */}
      <View style={[styles.currentCard, currentStreak > 0 ? styles.activeCard : styles.inactiveCard]}>
        <View style={styles.currentContent}>
          {/* 라인1 - 현재 연속기록 제목 */}
          <Text style={styles.currentTitle}>현재 연속 기록</Text>
          
          {/* 라인2 - 이모티콘 + 작성일 */}
          <View style={styles.currentStatusRow}>
            <Text style={styles.currentIcon}>{currentStreak > 0 ? '🔥' : '💤'}</Text>
            <Text style={styles.currentNumber}>{currentStreak}일</Text>
          </View>
        
          {/* 라인3-4 - 격려 메시지 */}
          <View style={styles.encouragementContainer}>
            {currentStreak > 0 ? (
              <>
                <Text style={styles.encouragementText}>
                  🎉 {currentStreak}일 연속 작성 중!
                </Text>
                <Text style={styles.encouragementSubText}>
                  멋진 습관이에요. 계속해서 기록해보세요!
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.restartText}>
                  새로운 일기를 작성해보세요
                </Text>
                <Text style={styles.restartSubText}>
                  오늘부터 다시 연속 기록을 시작할 수 있어요
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* 진행률 표시 */}
      {bestStreak > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>최고 기록 달성률</Text>
            <Text style={styles.progressPercentage}>
              {Math.round((currentStreak / bestStreak) * 100)}%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min((currentStreak / bestStreak) * 100, 100)}%` }
              ]} 
            />
          </View>
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
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  totalCard: {
    backgroundColor: '#F8F4FF',
    borderColor: '#b881c2',
    borderWidth: 1,
  },
  bestCard: {
    backgroundColor: '#F8F4FF',
    borderColor: '#b881c2',
    borderWidth: 1,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A5568',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  totalNumber: {
    color: '#b881c2',
  },
  bestNumber: {
    color: '#b881c2',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#718096',
  },
  currentCard: {
    borderRadius: 16,
    marginBottom: 20,
    padding: 20,
  },
  activeCard: {
    backgroundColor: '#F8F4FF',
    borderColor: '#b881c2',
    borderWidth: 2,
  },
  inactiveCard: {
    backgroundColor: '#F7FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  currentContent: {
    flex: 1,
  },
  currentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  currentStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  currentIcon: {
    fontSize: 32,
    marginRight: 12,
    marginTop: 0,
  },
  currentNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b881c2',
    lineHeight: 36,
  },
  encouragementContainer: {
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 0,
  },
  encouragementText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5A9B',
    textAlign: 'center',
    marginBottom: 8,
  },
  encouragementSubText: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 20,
  },
  restartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 8,
  },
  restartSubText: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 20,
  },
  progressContainer: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b881c2',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#b881c2',
    borderRadius: 4,
  },
});

export default StreakSection;
