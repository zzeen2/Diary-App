import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DiaryWriteScreen = ({ route, navigation }) => {
  const selectedEmotion = route.params?.emotion || null;
  const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f8e1e7',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#b881c2' },
  date: { fontSize: 12, color: '#888', marginTop: 4 },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  cancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  saveBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#b881c2',
    borderRadius: 20,
  },
  cancelText: { color: '#777' },
  saveText: { color: '#fff', fontWeight: 'bold' },
  content: { padding: 20 },
  titleInput: {
    fontSize: 18,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  bodyInput: {
    fontSize: 16,
    lineHeight: 22,
    height: 200,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  emotionFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  emotionLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  emotionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});


  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>일기 작성</Text>
        <Text style={styles.date}>2025년 5월 19일</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 일기 입력 영역 */}
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력하세요"
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="오늘 하루는 어땠나요?"
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      {/* 하단 감정 표시 (선택된 경우만) */}
      {selectedEmotion && (
        <View style={styles.emotionFooter}>
          <Text style={styles.emotionLabel}>선택한 감정</Text>
          <Text style={styles.emotionValue}>{selectedEmotion.emoji} {selectedEmotion.name}</Text>
        </View>
      )}
    </View>
  );
};

export default DiaryWriteScreen;
