import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const VisibilityToggle = ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{value ? '공개' : '비공개'}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#ccc', true: '#b881c2' }}
        thumbColor={value ? '#fff' : '#fff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default VisibilityToggle;
