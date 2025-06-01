import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HeaderBar, ProfileHeader } from '../molecules/headers';
import { TabBar } from '../organisms/TabBar';
import { useNavigation } from '@react-navigation/native';
import { PublicDiaryCard, DiaryCard } from '../molecules/cards';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';
import { getPublicDiaries, getUserById, getUserStats } from '../../api/user';
import { EXPO_PUBLIC_API_URL } from '@env';
import { followUser, unfollowUser, checkFollowStatus } from '../../api/follow';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

const UserProfile = ({ route }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const emotions = useSelector((state) => state.emotions);

  const [activeTab, setActiveTab] = useState('profile');
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const nickname = route?.params?.nickname ?? '유저';

  const uid = route?.params?.uid;
  const [profile, setProfile] = useState(null);
  const [publicDiaries, setPublicDiaries] = useState([]);

  useEffect(() => {
    dispatch(fetchEmotions());
    if (uid) {
      getUserById(uid)
        .then((data) => {
          setProfile((prev) => ({
            ...prev,
            nickname: data.nick_name,
            profile_img: data.profile_image,
            intro: data.bio,
            uid: data.uid,
          }));
        })
        .catch((err) => { setProfile(null); });
      getPublicDiaries(uid)
        .then((data) => {
          setPublicDiaries(data);
        })
        .catch((err) => { setPublicDiaries([]); });
      AsyncStorage.getItem('userUid').then(myUid => {
        if (myUid) {
          checkFollowStatus(myUid, uid).then((res) => {
            setIsFollowing(res);
          }).catch((err) => { setIsFollowing(false); });
        }
      });
      getUserStats(uid).then((res) => {
        if (res.success && res.data) {
          setProfile((prev) => ({
            ...prev,
            followerCount: res.data.followerCount,
            followingCount: res.data.followingCount,
            publicDiaryCount: res.data.diaryCount,
          }));
        }
      }).catch((err) => { });
    }
  }, [dispatch, uid]);

  const findEmotion = (id) => emotions.find((e) => e.id === id) || {};

  const handleFollowToggle = async () => {
    setLoading(true);
    const myUid = await AsyncStorage.getItem('userUid');
    if (!myUid) { setLoading(false); return; }
    try {
      if (isFollowing) {
        const res = await unfollowUser(myUid, uid);
        setIsFollowing(false);
      } else {
        const res = await followUser(myUid, uid);
        setIsFollowing(true);
      }
      const statsRes = await getUserStats(uid);
      if (statsRes.success && statsRes.data) {
        setProfile((prev) => ({
          ...prev,
          followerCount: statsRes.data.followerCount,
          followingCount: statsRes.data.followingCount,
          publicDiaryCount: statsRes.data.diaryCount,
        }));
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
          <HeaderBar title={`${nickname}님의 프로필`} onlyTitle />
          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {profile ? (
              <ProfileHeader
                profile={profile}
                isMine={false}
                rightContent={
                  <TouchableOpacity
                    style={styles.followBtn}
                    onPress={handleFollowToggle}
                    disabled={loading}
                  >
                    <Text style={styles.followBtnText}>
                      {loading
                        ? '처리 중...'
                        : isFollowing
                        ? '팔로우 취소'
                        : '팔로우하기'}
                    </Text>
                  </TouchableOpacity>
                }
              />
            ) : (
              <Text style={{ textAlign: 'center', marginVertical: 40, color: 'red' }}>
                프로필 정보를 불러올 수 없습니다.
              </Text>
            )}

            <Text style={styles.listTitle}>📖 공개된 일기</Text>
            <View style={styles.divider2} />
            {isFollowing ? (
              <FlatList
                style={{ marginTop: 16 }}
                data={publicDiaries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  let userEmotionData = null;
                  let aiEmotionData = null;

                  if (item.userEmotion) {
                    userEmotionData = item.userEmotion;
                  } else if (item.emotion) {
                    userEmotionData = item.emotion;
                  } else if (item.primaryEmotion) {
                    userEmotionData = item.primaryEmotion;
                  }

                  if (item.aiEmotion) {
                    aiEmotionData = item.aiEmotion;
                  } else if (item.secondaryEmotion) {
                    aiEmotionData = item.secondaryEmotion;
                  }

                  return (
                    <DiaryCard
                      entry={item}
                      userEmotion={userEmotionData}
                      aiEmotion={aiEmotionData}
                      onPress={() => {}}
                    />
                  );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.notice}>이 사용자를 팔로우하면 일기를 볼 수 있어요 😊</Text>
            )}
          </ScrollView>

          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={(tabId) => {
              setActiveTab(tabId);
              if (tabId === 'home') navigation.navigate('Main');
              else if (tabId === 'diary') navigation.navigate('listDiary');
              else if (tabId === 'stats') navigation.navigate('stats');
              else if (tabId === 'profile') navigation.navigate('myProfile');
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
    marginTop : 16
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginVertical: 1,
  },
  divider2: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginVertical: 1,
  },
  notice: {
    paddingVertical: 40,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#b881c2',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  followBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default UserProfile;
