// components/organisms/stats/StreakSection.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {StatTitle} from '../../atoms/TextsAndLabel';
import {StreakLabel} from '../../atoms/TextsAndLabel';
import {StreakSummaryBox} from '../../molecules/boxes';

const StreakSection = ({ streakData }) => {
  return (
    <View style={styles.container}>
      <StatTitle text="작성 스트릭" />

      <View style={styles.labelRow}>
        <StreakLabel label="총 작성 일 수" value={streakData.totalDays} />
        <StreakLabel label="최고 연속 일수" value={streakData.bestStreak} />
        <StreakLabel label="현재 연속 일수" value={streakData.currentStreak} />
      </View>

      <StreakSummaryBox
        longestStreak={streakData.bestStreak}
        currentStreak={streakData.currentStreak}
      />
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
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 10,
  },
});

export default StreakSection;
