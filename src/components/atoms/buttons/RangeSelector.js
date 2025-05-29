// components/molecules/filters/RangeSelector.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const options = [
  { label: '전체', value: 'all' },
  { label: '1개월', value: '1month' },
  { label: '3개월', value: '3months' },
  { label: '6개월', value: '6months' },
];

const RangeSelector = ({ selected = 'all', onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          style={[
            styles.option,
            selected === opt.value && styles.selectedOption,
          ]}
          onPress={() => onSelect?.(opt.value)}
        >
          <Text
            style={[
              styles.label,
              selected === opt.value && styles.selectedLabel,
            ]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 16,
  },
  selectedOption: {
    backgroundColor: '#b881c2',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default RangeSelector;
