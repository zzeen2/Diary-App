// src/molecules/stats/EmotionLegend.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsEmotionLabel = ({ color = '#ccc', emoji = '', name = '', value = 0 }) => {
  return (
    <View style={styles.row}>
      <View style={[styles.colorDot, { backgroundColor: color }]} />
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.name}>{name}</Text>
      {value !== undefined && (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  emoji: {
    fontSize: 14,
    marginRight: 4,
  },
  name: {
    fontSize: 13,
    color: '#444',
    flex: 1,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
});

export default StatsEmotionLabel;
