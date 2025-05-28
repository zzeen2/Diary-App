import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView, FlatList, Text, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HeaderBar, ProfileHeader } from '../molecules/headers';
import { DiaryListSection } from '../organisms/main';
import { TabBar } from '../organisms/TabBar';
import { useNavigation } from '@react-navigation/native';
import profileImg from '../../assets/IMG_3349.jpg' // 테스트용
import { EditIntroModal, FollowListModal } from '../molecules/modals';
import { PublicDiaryCard } from '../molecules/cards';
import {PublicDiaryListSection} from '../atoms/thumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';

// 탭 구성
const tabs = [
    { id: 'home', icon: '🏠', label: '홈' },
    { id: 'diary', icon: '📔', label: '일기장' },
    { id: 'stats', icon: '📊', label: '통계' },
    { id: 'profile', icon: '👤', label: '프로필' },
];



const MyProfile = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const dispatch = useDispatch();
  const emotions = useSelector((state) => state.emotions);

  // 감정 데이터 가져오기
  useEffect(() => {
    dispatch(fetchEmotions());
  }, [dispatch]);

const findEmotion = (id) => emotions.find(e => e.id === id) || {};
  // 샘플 프로필 정보
  const [profile, setProfile] = useState({
    profile_img: require('../../assets/IMG_3349.jpg'),
    nickname: '지은',
    intro: '감정을 기록하는 중 🐾',
    followerCount: 128,
    followingCount: 99,
    publicDiaryCount: 23,
  });
  
  // 샘플 공개 일기 목록
  const publicDiaries = [
    {
      id: 1,
      title: '벚꽃 아래 산책',
      date: '2025.05.12',
      content: '날씨가 좋아서 기분이 좋았다',
      primaryEmotion: 'happy',
      secondaryEmotion: 'sad',
      isPublic: true,
    },
    {
      id: 2,
      title: '벚꽃 아래 산책',
      date: '2025.05.12',
      content: '날씨가 좋아서 기분이 좋았다',
      primaryEmotion: 'happy',
      isPublic: true,
    },
    {
      id: 3,
      title: '벚꽃 아래 산책',
      date: '2025.05.12',
      content: '날씨가 좋아서 기분이 좋았다',
      primaryEmotion: 'happy',
      isPublic: true,
    },
    {
      id: 4,
      title: '벚꽃 아래 산책',
      date: '2025.05.12',
      content: '날씨가 좋아서 기분이 좋았다',
      primaryEmotion: 'happy',
      isPublic: true,
    },
    {
      id: 5,
      title: '벚꽃 아래 산책',
      date: '2025.05.12',
      content: '날씨가 좋아서 기분이 좋았다',
      primaryEmotion: 'happy',
      isPublic: true,
    },
    {
      id: 6,
      title: '벚꽃 아래 산책',
      date: '2025.05.12',
      content: '날씨가 좋아서 기분이 좋았다',
      primaryEmotion: 'happy',
      isPublic: true,
    },
  ];
  
  const [followers, setFollowers] = useState([
    {
      id: 1,
      nickname: '꼬막이',
      profile_img: require('../../assets/IMG_3349.jpg'),
    },
    {
      id: 2,
      nickname: '레오',
      profile_img: require('../../assets/IMG_3349.jpg'),
    },
  ]);
  
  const [followings, setFollowings] = useState([
    {
      id: 3,
      nickname: '지은',
      profile_img: require('../../assets/IMG_3349.jpg'),
    },
  ]);

  const handleRemoveFollowing = (id) => {

    setFollowings(prev => prev.filter(user => user.id !== id));
  };

  const handleRemoveFollower = (id) => {
  setFollowers(prev => prev.filter(user => user.id !== id));
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
    },
    safeArea: {
      flex: 1,
      backgroundColor: 'transparent',
      paddingTop: insets.top
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
    divider2 : {
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.7)',
      marginVertical: 1,
      // marginLeft : 16,
      // width:'120%'
    }
  });
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <HeaderBar title={`${profile.nickname}님의 프로필`} onlyTitle />
            <View style={styles.divider} />
          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}
                    >

            <ProfileHeader
              profile={profile}
              isMine={true}
              onEditIntro={() => setShowEditModal(true)}
              onPressFollowers={() => setShowFollowerModal(true)}
              onPressFollowings={() => setShowFollowingModal(true)}
            />

            <Text style={styles.listTitle}>📖 공개된 일기</Text>
            <View style={styles.divider2} />
            <FlatList
              data={publicDiaries}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <PublicDiaryCard entry={item} findEmotion={findEmotion} onPress={(entry) => console.log(entry.title)} />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              scrollEnabled={false}
            />

            {/* 모달들 */}
            <EditIntroModal
              visible={showEditModal}
              currentIntro={profile.intro}
              onClose={() => setShowEditModal(false)}
              onSave={(newIntro) => setProfile((prev) => ({ ...prev, intro: newIntro }))}
            />
            <FollowListModal
              visible={showFollowerModal || showFollowingModal}
              onClose={() => {
                setShowFollowerModal(false);
                setShowFollowingModal(false);
              }}
              followers={followers}
              followings={followings}
              isMine={true}
              onRemoveFollower={handleRemoveFollower}
              onRemoveFollowing={handleRemoveFollowing}
            />
          <Button
          title="친구 프로필 테스트"
          onPress={() => navigation.navigate('UserProfile', {
            isFollowing: true, // 또는 false로 바꿔 테스트
            nickname: '민지',
          })}
        />
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


export default MyProfile;

