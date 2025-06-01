import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import {DiaryHeader} from '../../molecules/headers';
import {DiaryContentBox} from '../../molecules/boxes';
import { DeleteModal } from '../../molecules/modals';

const DiaryDetailSection = ({ diary, isMine, emotions, onEdit, onDelete, onImagePress, navigation }) => {
  console.log("=== DiaryDetailSection 데이터 확인 ===");
  console.log("diary:", diary);
  console.log("emotions:", emotions);

  const {
    title,
    content,
    createdAt, // ⭐ date 대신 createdAt 사용
    isPublic,
    images,
    userEmotion, // ⭐ primaryEmotion 대신 userEmotion 사용
    aiEmotion,   // ⭐ secondaryEmotion 대신 aiEmotion 사용
    user,
  } = diary;

  // ⭐ 감정 데이터 처리 로직 수정 ⭐
  let emotion1 = null;
  let emotion2 = null;

  // userEmotion 처리
  if (userEmotion) {
    if (typeof userEmotion === 'object' && userEmotion.id) {
      // 이미 완전한 객체인 경우
      emotion1 = userEmotion;
    } else if (typeof userEmotion === 'string') {
      // ID만 있는 경우 emotions 배열에서 찾기
      emotion1 = emotions?.find(e => e.id === userEmotion);
    }
  }

  // aiEmotion 처리
  if (aiEmotion) {
    if (typeof aiEmotion === 'object' && aiEmotion.id) {
      // 이미 완전한 객체인 경우
      emotion2 = aiEmotion;
    } else if (typeof aiEmotion === 'string') {
      // ID만 있는 경우 emotions 배열에서 찾기
      emotion2 = emotions?.find(e => e.id === aiEmotion);
    }
  }

  console.log("처리된 emotion1 (userEmotion):", emotion1);
  console.log("처리된 emotion2 (aiEmotion):", emotion2);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit'
      }).replace(/\. /g, '.').replace(/\.$/, '');
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return dateString;
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 - 날짜 정보 제거 */}
      <DiaryHeader
        title={title}
        emotion={[emotion1, emotion2]} // ⭐ 처리된 감정 데이터 전달
        user={user}
        isMine={isMine}
        navigation={navigation}
      />
      
      {/* 일기 본문 */}
      <DiaryContentBox content={content} images={images} onImagePress={onImagePress} />

      {/* ⭐ 하단 영역: 날짜정보 + 수정/삭제 버튼 ⭐ */}
      <View style={styles.bottomSection}>
        {/* 날짜와 공개범위 정보 */}
        <View style={styles.metaInfo}>
          {!isMine ? (
            // 친구 일기인 경우
            <View style={styles.friendMetaContainer}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.publicIcon}>🌍</Text>
              <Text style={styles.publicText}>공개</Text>
            </View>
          ) : (
            // 내 일기인 경우
            <View style={styles.myMetaContainer}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={isPublic ? styles.publicIcon : styles.privateIcon}>
                {isPublic ? '🌍' : '🔒'}
              </Text>
              <Text style={styles.privacyText}>
                {isPublic ? '공개' : '비공개'}
              </Text>
            </View>
          )}
        </View>

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
      </View>

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
  bottomSection: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
  },
  separator: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
    marginHorizontal: 4,
  },
  publicIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  publicText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
  },
  privateIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  privacyText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#444',
  },
});

export default DiaryDetailSection;