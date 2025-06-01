import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const MAX_LENGTH = 300;

const EditIntroModal = ({ visible, onClose, currentIntro, onSave }) => {
  const [intro, setIntro] = useState(currentIntro || '');
  const [isTooLong, setIsTooLong] = useState(false);

  useEffect(() => {
    setIntro(currentIntro || '');
    setIsTooLong((currentIntro || '').length > MAX_LENGTH);
  }, [currentIntro, visible]);

  const handleSave = () => {
    if (intro.length <= MAX_LENGTH) {
      onSave(intro);
      onClose();
    }
  };

  const handleChange = (text) => {
    setIntro(text);
    setIsTooLong(text.length > MAX_LENGTH);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>자기소개 수정</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, isTooLong && styles.inputError]}
              value={intro}
              onChangeText={handleChange}
              placeholder="자기소개를 입력하세요"
              multiline
              placeholderTextColor="#999"
            />
            <View style={styles.inputFooter}>
              <Text style={[styles.charCount, isTooLong && styles.charCountError]}>
                {intro.length}/{MAX_LENGTH}
              </Text>
            </View>
          </View>

          {isTooLong && (
            <View style={styles.warningContainer}>
              <Feather name="alert-circle" size={16} color="#ff4757" />
              <Text style={styles.warning}>300자 이내로 작성해주세요</Text>
            </View>
          )}

          <View style={styles.buttons}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, isTooLong && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isTooLong}
              activeOpacity={0.8}
            >
              <Feather name="check" size={16} color="#ffffff" />
              <Text style={styles.saveText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeIcon: {
    padding: 8,
    borderRadius: 20,
  },
  inputContainer: {
    padding: 20,
    paddingTop: 14,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e1e8ed',
    borderRadius: 16,
    padding: 13,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    color: '#333',
    backgroundColor: '#f8f9fa',
    lineHeight: 24,
  },
  inputError: {
    borderColor: '#ff4757',
    backgroundColor: 'rgba(255, 71, 87, 0.05)',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  charCount: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  charCountError: {
    color: '#ff4757',
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 71, 87, 0.05)',
    marginHorizontal: 24,
    borderRadius: 12,
    paddingVertical: 12,
  },
  warning: {
    marginLeft: 8,
    fontSize: 14,
    color: '#ff4757',
    fontWeight: '500',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 24,
    paddingTop: 16,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#b881c2',
    borderRadius: 12,
    shadowColor: '#b881c2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 6,
  },
});

export default EditIntroModal;