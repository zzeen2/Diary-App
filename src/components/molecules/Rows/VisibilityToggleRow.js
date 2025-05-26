import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const VisibilityToggleRow = ({ value, onToggle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.label}>공개 설정</Text>
        <Text style={styles.emoji}>{value ? '🌍' : '🔒'}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#ccc', true: '#b881c2' }}
        thumbColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  emoji: {
    fontSize: 18,
  },
});

export default VisibilityToggleRow;
