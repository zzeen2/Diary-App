import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {EmotionTag, DiaryMeta} from '../../atoms/TextsAndLabel';
import {ProfileThumbnail} from '../../atoms/thumbnail';

const DiaryHeader = ({ title, emotion = [], date, isPublic, user, isMine, navigation }) => {
  const emotions = emotion.filter(Boolean);
  console.log("=== DiaryHeader 렌더링 ===");
  console.log("emotions:", emotions);
  console.log("isMine:", isMine);
  console.log("user:", user);
  console.log("date:", date);

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

  // 프로필 클릭 핸들러
  const handleProfilePress = () => {
    if (user && navigation) {
      const userUid = user.uid || user.id;
      const userNickname = user.nick_name || user.nickname || user.name;
      console.log('프로필 이동:', userNickname, 'uid:', userUid);
      navigation.navigate('UserProfile', {
        uid: userUid,
        nickname: userNickname
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* 첫 번째 행: 제목 + 프로필 */}
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleUnderline} />
          
          {/* 감정 태그들 - 제목 디바이더 바로 아래 */}
          {emotions.length > 0 && (
            <View style={styles.emotionRow}>
              {emotions.map((e, idx) => (
                e && (
                  <View key={(e.id ? e.id : 'emotion') + '_' + idx} style={styles.emotionWrapper}>
                    <EmotionTag
                      emoji={e.emoji}
                      name={e.name}
                      backgroundColor={e.color + '40'}
                    />
                  </View>
                )
              ))}
            </View>
          )}
        </View>
        
        {/* 프로필 (본인 글이 아닐 때만 오른쪽 상단에) */}
        {!isMine && user && (
          <TouchableOpacity 
            onPress={handleProfilePress}
            style={styles.profileContainer}
            activeOpacity={0.7}
          >
            <View style={styles.profileWrapper}>
              <Image
                source={{
                  uri: user.profile_img || user.profile_image || user.profileImage || user.img_url || 'https://via.placeholder.com/32'
                }}
                style={styles.profileImage}
                onError={(e) => console.log('이미지 로드 실패:', e.nativeEvent.error)}
                onLoad={() => console.log('이미지 로드 성공')}
              />
              <Text style={styles.profileName} numberOfLines={1}>
                {user.nick_name || user.nickname || user.name || '익명'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: 16,
    paddingTop: 4,
  },
  
  // 첫 번째 행: 제목 + 프로필
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
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
    width: 80,
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.8,
    marginBottom: 12,
  },
  
  // ⭐ 프로필 관련 스타일 - 배경 제거 ⭐
  profileContainer: {
    alignItems: 'center',
  },
  profileWrapper: {
    alignItems: 'center',
    minWidth: 50,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 9,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 50,
  },
  
  // 감정 태그 (제목 디바이더 바로 아래)
  emotionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
});

export default DiaryHeader;