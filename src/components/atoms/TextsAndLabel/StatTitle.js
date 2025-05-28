import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatTitle = ({ title, emoji }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {emoji ? `${emoji} ` : ''}
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

export default StatTitle;
