import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {EmojiIcon} from '../../atoms/icons';
import {EmotionSelectButton} from '../../atoms/buttons';

const EmotionRow = ({ label, emotion, onSelect, onEdit }) => {
  if (!emotion) return null;

  const emoji = emotion.emoji || '❓';
  const name = emotion.name || '감정 없음';
  const color = emotion.color || '#ccc';

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.content}>
        <EmojiIcon emoji={emoji} color={color} />
        <Text style={styles.name}>{name}</Text>

        {onSelect && <EmotionSelectButton onPress={onSelect} />}
        {onEdit && ( <TouchableOpacity onPress={onEdit}> <Text style={styles.edit}>✏️</Text> </TouchableOpacity> )}
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
    width: 80,
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
