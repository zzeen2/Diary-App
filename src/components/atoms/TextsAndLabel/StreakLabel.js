// components/atoms/Texts/StreakLabel.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StreakLabel = ({ count = 0 }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔥</Text>
      <Text style={styles.text}>{count}일 연속 작성 중!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5f0',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d35400',
  },
});

export default StreakLabel;
