import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EmojiIcon from '../atoms/EmojiIcon';
import EmotionSelectButton from '../atoms/EmotionSelectButton';

const EmotionRow = ({ label, emotion, onSelect, onEdit }) => {
  if (!emotion) return null;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.content}>
        <EmojiIcon emoji={emotion.emoji} color={emotion.color} />
        <Text style={styles.name}>{emotion.name}</Text>

        {onSelect && <EmotionSelectButton onPress={onSelect} />}
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  label: {
    width: 100,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  name: {
    fontSize: 15,
    color: '#444',
  },
  edit: {
    fontSize: 18,
    color: '#888',
    paddingLeft: 4,
  },
});

export default EmotionRow;
