import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EmotionTag } from '../../atoms/TextsAndLabel';

const SelectedEmotionTag = ({ emotion }) => {
  if (!emotion) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>선택했던 감정</Text>
      <View style={styles.tagWrapper}>
        <EmotionTag
          emoji={emotion.emoji}
          name={emotion.name}
          backgroundColor={emotion.color || '#eee'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  tagWrapper: {
    flexDirection: 'row',
  },
});

export default SelectedEmotionTag;
