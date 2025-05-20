import React from 'react';
import useFormmatedDate from './useFormattedDate';
import { View, Text, StyleSheet } from 'react-native';

const DateTestScreen = () => {
    const today = new Date().toISOString();
    console.log(today)

    const formatted = useFormmatedDate(today)

    return (
    <View style={styles.container}>
      <Text style={styles.label}>오늘 날짜</Text>
      <Text style={styles.result}>{formatted}</Text>
    </View>
  );
};

export default DateTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',

  },
  label: {
    fontSize: 20,
    color: '#888',
    marginBottom: 8,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});