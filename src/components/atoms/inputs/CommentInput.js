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
        maxLength={200}
      />
      <TouchableOpacity
        style={[styles.button, !text.trim() && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!text.trim()}
      >
        <Text style={[styles.buttonText, !text.trim() && styles.disabledText]}>
          등록
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'flex-end',
    marginTop: 16,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxHeight: 80,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#b881c2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  disabledText: {
    color: '#999',
  },
});

export default CommentInput;