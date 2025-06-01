import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {EmotionTag, DiaryMeta} from '../../atoms/TextsAndLabel';
import {ProfileThumbnail} from '../../atoms/thumbnail';

const DiaryHeader = ({ title, emotion = [], date, isPublic, user, isMine, navigation }) => {
  const emotions = emotion.filter(Boolean);

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

  const handleProfilePress = () => {
    if (user && navigation) {
      const userUid = user.uid || user.id;
      const userNickname = user.nick_name || user.nickname || user.name;
      navigation.navigate('UserProfile', {
        uid: userUid,
        nickname: userNickname
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleUnderline} />
          
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
                onError={(e) => {}}
                onLoad={() => {}}
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