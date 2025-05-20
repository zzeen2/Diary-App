import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  TouchableWithoutFeedback,
  Dimensions 
} from 'react-native';

const EmotionSection = () => {
  const [modalVisiㅍ ㅠㅠ  ble, setModalVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState({ name: '행복', emoji: '😊', type: 'happy' });
  const [aiEmotion, setAiEmotion] = useState({ name: '분노', emoji: '😠', type: 'angry' });
  const [tempEmotion, setTempEmotion] = useState(null);
  
  const emotions = [
    { name: '행복', emoji: '😊', type: 'happy' },
    { name: '슬픔', emoji: '😢', type: 'sad' },
    { name: '분노', emoji: '😠', type: 'angry' },
    { name: '평온', emoji: '😌', type: 'calm' },
    { name: '불안', emoji: '😰', type: 'anxious' },
    { name: '피곤', emoji: '😴', type: 'tired' },
    { name: '신남', emoji: '🤩', type: 'excited' },
    { name: '혼란', emoji: '🤔', type: 'confused' },
  ];
  
  const openModal = () => {
    setTempEmotion(selectedEmotion);
    setModalVisible(true);
  };
  
  const confirmEmotion = () => {
    if (tempEmotion) {
      setSelectedEmotion(tempEmotion);
    }
    setModalVisible(false);
  };
  
  const selectAiEmotion = () => {
    setSelectedEmotion(aiEmotion);
  };
  
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>오늘의 감정</Text>
        <View style={styles.visibilityToggle}>
          <TouchableOpacity style={[styles.visibilityOption, styles.visibilityActive]}>
            <Text style={styles.visibilityText}>비공개</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.visibilityOption}>
            <Text style={styles.visibilityText}>공개</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.emotionsContainer}>
        <View style={styles.emotionRow}>
          <Text style={styles.emotionLabel}>선택한 감정:</Text>
          <View style={styles.emotionDisplay}>
            <View style={[styles.emotionIcon, styles[selectedEmotion.type]]}>
              <Text style={styles.emoji}>{selectedEmotion.emoji}</Text>
            </View>
            <Text style={styles.emotionName}>{selectedEmotion.name}</Text>
          </View>
        </View>
        
        <View style={styles.emotionRow}>
          <Text style={styles.emotionLabel}>AI 분석 감정:</Text>
          <View style={styles.emotionDisplay}>
            <View style={[styles.emotionIcon, styles[aiEmotion.type]]}>
              <Text style={styles.emoji}>{aiEmotion.emoji}</Text>
            </View>
            <Text style={styles.emotionName}>{aiEmotion.name}</Text>
            <TouchableOpacity style={styles.selectButton} onPress={selectAiEmotion}>
              <Text style={styles.selectButtonText}>선택</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.changeButton} onPress={openModal}>
            <Text style={styles.changeButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
                
                <Text style={styles.modalTitle}>감정 선택하기</Text>
                
                <View style={styles.emotionGrid}>
                  {emotions.map((emotion, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={[
                        styles.emotionItem,
                        tempEmotion && tempEmotion.type === emotion.type && styles.selectedItem
                      ]}
                      onPress={() => setTempEmotion(emotion)}
                    >
                      <View style={[styles.gridEmotionIcon, styles[emotion.type]]}>
                        <Text style={styles.emoji}>{emotion.emoji}</Text>
                      </View>
                      <Text style={styles.gridEmotionName}>{emotion.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <TouchableOpacity style={styles.confirmButton} onPress={confirmEmotion}>
                  <Text style={styles.confirmButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 100) / 4;

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
    padding: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  visibilityToggle: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  visibilityOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
  },
  visibilityActive: {
    backgroundColor: '#b881c2',
  },
  visibilityText: {
    fontSize: 14,
    color: '#666',
  },
  emotionsContainer: {
    flexDirection: 'column',
    gap: 15,
  },
  emotionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  emotionLabel: {
    width: 120,
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  emotionDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  emotionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionName: {
    fontSize: 16,
    color: '#444',
  },
  emoji: {
    fontSize: 20,
  },
  selectButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  selectButtonText: {
    fontSize: 14,
    color: '#666',
  },
  changeButton: {
    padding: 5,
  },
  changeButtonText: {
    fontSize: 18,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 450,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#888',
  },
  modalTitle: {
    textAlign: 'center',
    color: '#444',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  emotionItem: {
    width: itemWidth,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  selectedItem: {
    backgroundColor: '#f0e6f5',
    borderWidth: 2,
    borderColor: '#b881c2',
  },
  gridEmotionIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridEmotionName: {
    fontSize: 14,
    color: '#555',
  },
  confirmButton: {
    backgroundColor: '#b881c2',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  happy: {
    backgroundColor: '#FFEAA7',
  },
  sad: {
    backgroundColor: '#A3D8F4',
  },
  angry: {
    backgroundColor: '#FFB7B7',
  },
  calm: {
    backgroundColor: '#B5EAD7',
  },
  anxious: {
    backgroundColor: '#C7CEEA',
  },
  tired: {
    backgroundColor: '#E2D8F3',
  },
  excited: {
    backgroundColor: '#FFD8BE',
  },
  confused: {
    backgroundColor: '#D8E2DC',
  },
});

export default EmotionSection;