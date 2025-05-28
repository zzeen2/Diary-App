import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import {DiaryHeader} from '../../molecules/headers';
import {DiaryContentBox} from '../../molecules/boxes';
import { DeleteModal } from '../../molecules/modals';

const DiaryDetailSection = ({ diary, isMine, emotions, onEdit, onDelete }) => {
  const {
    title,
    content,
    date,
    isPublic,
    images,
    primaryEmotion,
    secondaryEmotion,
    user,
  } = diary;

  const emotion1 = emotions.find(e => e.id === primaryEmotion);
  const emotion2 = emotions.find(e => e.id === secondaryEmotion);
  console.log(emotion1, emotion2)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const emotionTags = [emotion1, emotion2].filter(Boolean);
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <DiaryHeader
      title={title}
      date={date}
      isPublic={isPublic}
      emotion={[emotion1, emotion2]}
      user={user}
      isMine={isMine}
    />
      {/* 일기 본문 */}
      <DiaryContentBox content={content} images={images} />

      {/* 본인 글인 경우 수정/삭제 버튼 */}
      {isMine && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Text style={styles.editText}>수정</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={() => setShowDeleteModal(true)}>
            <Text style={styles.deleteText}>삭제</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 삭제 확인 모달 */}
      <DeleteModal
        visible={showDeleteModal}
        onConfirm={() => {
          setShowDeleteModal(false);
          onDelete?.();
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 10,
  },
  editBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  deleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#b881c2',
    borderRadius: 8,
  },
  editText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
  },
  deleteText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
});

export default DiaryDetailSection;