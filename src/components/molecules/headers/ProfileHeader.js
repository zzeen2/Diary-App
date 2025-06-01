import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileHeader = ({
  profile,
  isMine = false,
  onEditIntro,
  onPressFollowers,
  onPressFollowings,
  rightContent, 
}) => {
  const {
    profile_img,
    nickname,
    intro,
    followerCount = 0,
    followingCount = 0,
    publicDiaryCount = 0,
  } = profile || {};

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image 
          source={
            profile_img
              ? (typeof profile_img === 'string'
                  ? { uri: profile_img }
                  : profile_img)
              : require('../../../assets/logo2.png')
          }
          style={styles.avatar} 
        />
        <View style={styles.avatarBorder} />
      </View>

      <View style={styles.infoSection}>
        <View style={styles.nameRow}>
          <Text style={styles.nickname}>{nickname}</Text>
          {!isMine && rightContent && <View style={styles.rightBox}>{rightContent}</View>}
        </View>

        <View style={styles.introRow}>
          <Text style={styles.intro} numberOfLines={2}>{intro}</Text>
          {isMine && (
            <TouchableOpacity onPress={onEditIntro} style={styles.editButton}>
              <Feather name="edit-2" size={14} color="#b881c2" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.statsRow}>
          <TouchableOpacity onPress={onPressFollowers} style={styles.statCard} activeOpacity={0.8}>
            <Text style={styles.statNumber}>{(followerCount ?? 0).toLocaleString()}</Text>
            <Text style={styles.statLabel}>팔로워</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressFollowings} style={styles.statCard} activeOpacity={0.8}>
            <Text style={styles.statNumber}>{(followingCount ?? 0).toLocaleString()}</Text>
            <Text style={styles.statLabel}>팔로잉</Text>
          </TouchableOpacity>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{(publicDiaryCount ?? 0).toLocaleString()}</Text>
            <Text style={styles.statLabel}>공개일기</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginHorizontal: 4,
    marginVertical: 4,
    marginTop : 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarBorder: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#b881c2',
    opacity: 0.3,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  nickname: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightBox: {
    marginLeft: 10,
  },
  introRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  intro: {
    fontSize: 14,
    color: '#666',
    flexShrink: 1,
    lineHeight: 18,
  },
  editButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(184, 129, 194, 0.1)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
});

export default ProfileHeader;
