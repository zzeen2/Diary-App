import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import {DiaryHeader} from '../../molecules/headers';
import {DiaryContentBox} from '../../molecules/boxes';
import { DeleteModal } from '../../molecules/modals';

const DiaryDetailSection = ({ diary, isMine, emotions, onEdit, onDelete, onImagePress, navigation }) => {

  const {
    title,
    content,
    createdAt,
    isPublic,
    images,
    userEmotion,
    aiEmotion,
    user,
  } = diary;

  let emotion1 = null;
  let emotion2 = null;

  if (userEmotion) {
    if (typeof userEmotion === 'object' && userEmotion.id) {
      emotion1 = userEmotion;
    } else if (typeof userEmotion === 'string') {
      emotion1 = emotions?.find(e => e.id === userEmotion);
    }
  }

  if (aiEmotion) {
    if (typeof aiEmotion === 'object' && aiEmotion.id) {
      emotion2 = aiEmotion;
    } else if (typeof aiEmotion === 'string') {
      emotion2 = emotions?.find(e => e.id === aiEmotion);
    }
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit'
      }).replace(/\. /g, '.').replace(/\.$/, '');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <View style={styles.container}>
      <DiaryHeader
        title={title}
        emotion={[emotion1, emotion2]}
        user={user}
        isMine={isMine}
        navigation={navigation}
      />
      
      <DiaryContentBox content={content} images={images} onImagePress={onImagePress} />

      <View style={styles.bottomSection}>
        <View style={styles.metaInfo}>
          {!isMine ? (
            <View style={styles.friendMetaContainer}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.publicIcon}>🌍</Text>
              <Text style={styles.publicText}>공개</Text>
            </View>
          ) : (
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