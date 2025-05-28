import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HeaderBar, ProfileHeader } from '../molecules/headers';
import { TabBar } from '../organisms/TabBar';
import { useNavigation } from '@react-navigation/native';
import { PublicDiaryCard } from '../molecules/cards';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';

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
  const [isFollowing, setIsFollowing] = useState(route?.params?.isFollowing ?? false);
  const [loading, setLoading] = useState(false);

  const nickname = route?.params?.nickname ?? '유저';

  const [profile, setProfile] = useState({
    profile_img: require('../../assets/IMG_3349.jpg'),
    nickname: '민지',
    intro: '하루하루 열심히 살기!',
    followerCount: 234,
    followingCount: 145,
    publicDiaryCount: isFollowing ? 5 : 0,
    });

  const publicDiaries = isFollowing
    ? [
        {
          id: 1,
          title: '벚꽃 아래 산책',
          date: '2025.05.12',
          content: '날씨가 좋아서 기분이 좋았다',
          primaryEmotion: 'happy',
          isPublic: true,
        },
      ]
    : [];

  useEffect(() => {
    dispatch(fetchEmotions());
  }, [dispatch]);

  const findEmotion = (id) => emotions.find((e) => e.id === id) || {};

  const handleFollowToggle = () => {
    setLoading(true);
    setTimeout(() => {
        setIsFollowing((prev) => {
        const newFollowState = !prev;

        setProfile((prevProfile) => ({
            ...prevProfile,
            followerCount: prevProfile.followerCount + (newFollowState ? 1 : -1),
        }));

        return newFollowState;
        });

        setLoading(false);
    }, 600);
    };


  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
          <HeaderBar title={`${nickname}님의 프로필`} onlyTitle />
          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

            <Text style={styles.listTitle}>📖 공개된 일기</Text>
            <View style={styles.divider2} />

            {isFollowing ? (
              <FlatList
                data={publicDiaries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <PublicDiaryCard entry={item} findEmotion={findEmotion} onPress={(entry) => console.log(entry.title)} />
                )}
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
