import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView, FlatList, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HeaderBar, ProfileHeader } from '../molecules/headers';
import { DiaryListSection } from '../organisms/main';
import { TabBar } from '../organisms/TabBar';
import { useNavigation } from '@react-navigation/native';
import profileImg from '../../assets/IMG_3349.jpg';
import { EditIntroModal, FollowListModal } from '../molecules/modals';
import { PublicDiaryCard } from '../molecules/cards';
import {PublicDiaryListSection} from '../atoms/thumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { clearUser } from '../../reducers/userReducer';
import { Feather } from '@expo/vector-icons';
import { updateUserBio, getUserStats, getUserProfileByUid } from '../../api/user';
import { DiaryCard } from '../molecules/cards';
import { fetchMyDiaries } from '../../actions/diaryAction';

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
  const [modalType, setModalType] = useState('followers');
  const dispatch = useDispatch();
  const emotions = useSelector((state) => state.emotions.emotions);
  const { setIsLoggedIn, setAuthUser, isLoggedIn } = useContext(AuthContext);
  
  // Redux 스토어에서 로그인한 사용자 정보 가져오기 (이제 직접 사용하지 않음, 또는 보조적으로 사용)
  // const loggedInUser = useSelector((state) => state.user); 

  // 감정 데이터 가져오기
  useEffect(() => {
    dispatch(fetchEmotions());
    dispatch(fetchMyDiaries()); // 내 일기 불러오기
  }, [dispatch]);

  const findEmotion = (id) => emotions.find(e => e.id === id) || {};
  
  // 프로필 정보 상태
  const [profile, setProfile] = useState({
    profile_img: require('../../assets/IMG_3349.jpg'),
    nickname: '로딩 중...',
    intro: '로딩 중...',
    followerCount: 0,
    followingCount: 0,
    publicDiaryCount: 0,
    uid: null,
  });

  // DB에서 사용자 프로필 정보를 불러와 profile 상태 업데이트
  const loadProfileData = async () => {
    try {
      const userUid = await AsyncStorage.getItem('userUid');
      if (!userUid) {
        setProfile(prev => ({ ...prev, nickname: '사용자 정보 없음', intro: '-'}));
        return;
      }

      const userProfileData = await getUserProfileByUid(userUid);

      if (userProfileData) {
        setProfile({
          uid: userProfileData.uid || userUid,
          nickname: userProfileData.nickname || userProfileData.nick_name || '사용자',
          profile_img: userProfileData.profile_image ? { uri: userProfileData.profile_image } : require('../../assets/IMG_3349.jpg'),
          intro: userProfileData.bio || '',
          followerCount: userProfileData.followerCount !== undefined ? userProfileData.followerCount : profile.followerCount,
          followingCount: userProfileData.followingCount !== undefined ? userProfileData.followingCount : profile.followingCount,
          publicDiaryCount: userProfileData.publicDiaryCount !== undefined ? userProfileData.publicDiaryCount : profile.publicDiaryCount,
        });

      } else {
        const storedNickname = await AsyncStorage.getItem('userNickname');
        const storedProfileImage = await AsyncStorage.getItem('userProfileImage');
        const storedBio = await AsyncStorage.getItem('userBio');
        setProfile(prev => ({
            ...prev,
            uid: userUid,
            nickname: storedNickname || '사용자(오류)',
            profile_img: storedProfileImage ? { uri: storedProfileImage } : require('../../assets/IMG_3349.jpg'),
            intro: storedBio || '자기소개 로드 실패',
        }));
        const statsRes = await getUserStats(userUid);
        if (statsRes.success && statsRes.data) {
            setProfile(prev => ({ ...prev, followerCount: statsRes.data.followerCount, followingCount: statsRes.data.followingCount, publicDiaryCount: statsRes.data.diaryCount }));
        }
      }
    } catch (error) {
      setProfile(prev => ({ ...prev, nickname: '정보 로드 실패', intro: '오류 발생'}));
    }
  };

  useEffect(() => {
    loadProfileData(); // 마운트 시 프로필 정보 로드
  }, []);

  const myDiaries = useSelector((state) => state.diary.myDiaries || []);
  const publicDiaries = myDiaries.filter((d) => d.isPublic);
  
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

  // 로그아웃 처리 함수
  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말로 로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "로그아웃",
          onPress: async () => {
            try {
              dispatch(clearUser());
              if (setAuthUser) {
                setAuthUser(null);
              }
              setIsLoggedIn(false);
            } catch (error) {
              Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
            }
          },
          style: "destructive"
        }
      ]
    );
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
    },
    logoutButton: {
      padding: 5,
    },
  });
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <HeaderBar 
              title="내 프로필"
              onlyTitle={true}
              rightContent={
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                  <Feather name="log-out" size={20} color="#b881c2" />
                </TouchableOpacity>
              }
            />
            <View style={styles.divider} />
          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}
                    >

            <ProfileHeader
              profile={profile}
              isMine={true}
              onEditIntro={() => setShowEditModal(true)}
              onPressFollowers={() => { setModalType('followers'); setShowFollowerModal(true); }}
              onPressFollowings={() => { setModalType('followings'); setShowFollowingModal(true); }}
            />

            <Text style={styles.listTitle}>📖 공개된 일기</Text>
            <View style={styles.divider2} />
            <FlatList
              style={{ marginTop: 16 }}
              data={publicDiaries}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <DiaryCard
                  entry={item}
                  userEmotion={item.userEmotion}
                  aiEmotion={item.aiEmotion}
                  onPress={() => {}}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              scrollEnabled={false}
            />

            {/* 모달들 */}
            <EditIntroModal
              visible={showEditModal}
              currentIntro={profile.intro}
              onClose={() => setShowEditModal(false)}
              onSave={async (newIntro) => {
                try {
                  if (!profile.uid) {
                    Alert.alert('오류', '사용자 ID를 찾을 수 없습니다.');
                    return;
                  }
                  await updateUserBio(profile.uid, newIntro);
                  await AsyncStorage.setItem('userBio', newIntro); 
                  Alert.alert('성공', '자기소개가 저장되었습니다.');
                  loadProfileData(); // 수정 후 전체 프로필 정보 다시 로드하여 화면 갱신
                } catch (e) {
                  Alert.alert('오류', '자기소개 저장에 실패했습니다.');
                }
              }}
            />
            <FollowListModal
              visible={showFollowerModal || showFollowingModal}
              onClose={() => { setShowFollowerModal(false); setShowFollowingModal(false); }}
              uid={profile?.uid}
              type={modalType}
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
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MyProfile;

