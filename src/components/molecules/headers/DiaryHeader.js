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
      console.log('프로필 이동:', user.nick_name || user.nickname, 'uid:', user.uid);
      navigation.navigate('UserProfile', {
        uid: user.uid,
        nickname: user.nick_name || user.nickname
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* 첫 번째 행: 제목 + 프로필 (내 글이 아닌 경우만) */}
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleUnderline} />
        </View>
        
        {/* 프로필 (본인 글이 아닐 때만 우측에) */}
        {!isMine && user && (
          <TouchableOpacity 
            onPress={handleProfilePress}
            style={styles.profileContainer}
            activeOpacity={0.7}
          >
            {/* ⭐ 임시로 직접 Image 컴포넌트 사용 ⭐ */}
            <View style={styles.profileWrapper}>
              <Image
                source={{
                  uri: user.profile_img || user.profile_image || 'https://via.placeholder.com/40'
                }}
                style={styles.profileImage}
                onError={(e) => console.log('이미지 로드 실패:', e.nativeEvent.error)}
                onLoad={() => console.log('이미지 로드 성공')}
              />
              <Text style={styles.profileName} numberOfLines={1}>
                {user.nick_name || user.nickname || '익명'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* 두 번째 행: 날짜 정보 */}
      <View style={styles.metaRow}>
        {!isMine ? (
          // ⭐ 친구 일기인 경우 간단한 날짜 + 공개 아이콘만 ⭐
          <View style={styles.friendMetaContainer}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.publicIcon}>🌍</Text>
          </View>
        ) : (
          // ⭐ 내 일기인 경우 기존 DiaryMeta 사용 ⭐
          <DiaryMeta 
            date={formatDate(date)}
            isPublic={isPublic} 
          />
        )}
      </View>

      {/* 세 번째 행: 감정 태그들 */}
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
  
  // ⭐ 프로필 관련 스타일 추가 ⭐
  profileContainer: {
    alignItems: 'center',
  },
  profileWrapper: {
    alignItems: 'center',
    minWidth: 60,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 4,
  },
  profileName: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 60,
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
  
  // 두 번째 행: 메타 정보
  metaRow: {
    alignSelf: 'flex-start',
  },
  
  // ⭐ 친구 일기용 메타 스타일 추가 ⭐
  friendMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateIcon: {
    fontSize: 12,
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  separator: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 2,
  },
  publicIcon: {
    fontSize: 14,  // 크기 키움
    color: '#4A90E2',  // 색상 추가
  },
  
  // 세 번째 행: 감정 태그
  emotionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
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