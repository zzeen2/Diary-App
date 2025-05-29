// components/molecules/stats/StreakSummaryBox.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const StreakSummaryBox = ({ currentStreak, longestStreak }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 나의 스트릭</Text>
      <View style={styles.row}>
        <Feather name="activity" size={20} color="#FF7A00" />
        <Text style={styles.label}>현재 연속 작성일</Text>
        <Text style={styles.value}>{currentStreak}일</Text>
      </View>
      <View style={styles.row}>
        <Feather name="award" size={20} color="#b881c2" />
        <Text style={styles.label}>최장 스트릭</Text>
        <Text style={styles.value}>{longestStreak}일</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF5E6',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

export default StreakSummaryBox;
