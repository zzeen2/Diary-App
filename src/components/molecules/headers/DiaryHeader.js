import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {EmotionTag, DiaryMeta} from '../../atoms/TextsAndLabel';
import {ProfileThumbnail} from '../../atoms/thumbnail';

const DiaryHeader = ({ title, emotion = [], date, isPublic, user, isMine }) => {
  const emotions = emotion.filter(Boolean); // 배열이므로 그대로 filter만
  console.log(" isMine:", isMine);
  console.log(" user:", user);
  return (
    <View style={styles.container}>
      {/* 첫 번째 행: 프로필 + 감정 아이콘 */}
      <View style={styles.topRow}>
        {/* 프로필 (본인 글이 아닐 때만) */}
        <View style={styles.profileSection}>
          {!isMine && user ? (
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { nickname: user.nickname })}>
              <ProfileThumbnail image={user.profile_img} nickname={user.nickname} />
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyProfile} />
          )}
        </View>

        {/* 감정 아이콘들 */}
        <View style={styles.emotionSection}>
          {emotions.map((e, idx) => (
            <View key={e.id || idx} style={styles.emotionWrapper}>
              <EmotionTag
                emoji={e.emoji}
                name={e.name}
                backgroundColor={e.color || '#eee'}
              />
            </View>
          ))}
        </View>
      </View>

      {/* 두 번째 행: 제목 */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.titleUnderline} />
      </View>

      {/* 세 번째 행: 날짜 정보 */}
      <View style={styles.dateSection}>
        <DiaryMeta date={date} isPublic={isPublic} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 16,
    paddingTop: 4,
  },
  // 첫 번째 행: 프로필 + 감정
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  profileSection: {
    flex: 1,
  },
  emptyProfile: {
    width: 40,
    height: 40,
    // 프로필이 없을 때 공간 확보
  },
  emotionSection: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  emotionWrapper: {
    shadowColor: '#b881c2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  // 두 번째 행: 제목
  titleSection: {
    marginVertical: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c2c2c',
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  titleUnderline: {
    height: 3,
    backgroundColor: '#b881c2',
    width: 40,
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.8,
  },
  dateSection: {
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
});

export default DiaryHeader;