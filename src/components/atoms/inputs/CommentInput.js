import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CommentInput = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit?.(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="댓글을 입력하세요"
        placeholderTextColor="#aaa"
        value={text}
        onChangeText={setText}
        multiline
      />
      <TouchableOpacity
        style={[styles.button, !text.trim() && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!text.trim()}
      >
        <Text style={styles.buttonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'flex-end',
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 8,
    maxHeight: 100,
  },
  button: {
    backgroundColor: '#b881c2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default CommentInput;
