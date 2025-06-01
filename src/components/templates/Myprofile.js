import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView, FlatList, Text, Button, TouchableOpacity, Alert } from 'react-native';
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
        console.log("UID 없음, 프로필 로딩 중단");
        // 필요시 로그아웃 또는 에러 처리
        setProfile(prev => ({ ...prev, nickname: '사용자 정보 없음', intro: '-'}));
        return;
      }

      console.log(`[loadProfileData] UID (${userUid})로 프로필 정보 요청`);
      const userProfileData = await getUserProfileByUid(userUid);

      if (userProfileData) {
        console.log("[loadProfileData] 받은 프로필 정보:", userProfileData);
        setProfile({
          uid: userProfileData.uid || userUid,
          nickname: userProfileData.nickname || userProfileData.nick_name || '사용자',
          profile_img: userProfileData.profile_image ? { uri: userProfileData.profile_image } : require('../../assets/IMG_3349.jpg'),
          intro: userProfileData.bio || '',
          // API 응답에 통계 정보가 포함되어 있다고 가정 (없다면 아래 getUserStats 호출 유지)
          followerCount: userProfileData.followerCount !== undefined ? userProfileData.followerCount : profile.followerCount,
          followingCount: userProfileData.followingCount !== undefined ? userProfileData.followingCount : profile.followingCount,
          publicDiaryCount: userProfileData.publicDiaryCount !== undefined ? userProfileData.publicDiaryCount : profile.publicDiaryCount,
        });

        // 만약 getUserProfileByUid 응답에 통계 정보(followerCount 등)가 없다면,
        // 기존 getUserStats를 호출하여 통계 정보만 따로 업데이트할 수 있습니다.
        // 예: if (userProfileData.followerCount === undefined) {
        //   const statsRes = await getUserStats(userUid);
        //   if (statsRes.success && statsRes.data) {
        //     setProfile(prev => ({ ...prev, followerCount: statsRes.data.followerCount, ... }));
        //   }
        // }

      } else {
        console.warn("[loadProfileData] 프로필 정보를 가져오지 못했습니다. AsyncStorage 값으로 대체 시도 또는 기본값 유지.");
        // 필요시 AsyncStorage에서 fallback 로직 추가 (선택 사항)
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
        // getUserStats는 uid가 있으므로 호출 가능
        const statsRes = await getUserStats(userUid);
        if (statsRes.success && statsRes.data) {
            setProfile(prev => ({ ...prev, followerCount: statsRes.data.followerCount, followingCount: statsRes.data.followingCount, publicDiaryCount: statsRes.data.diaryCount }));
        }
      }
    } catch (error) {
      console.error('[loadProfileData] 프로필 데이터 로딩 실패:', error);
      setProfile(prev => ({ ...prev, nickname: '정보 로드 실패', intro: '오류 발생'}));
      // 필요시 AsyncStorage fallback 로직 추가
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
              // Redux 스토어 초기화
              dispatch(clearUser());

              // AuthContext의 user 상태 null로 설정
              if (setAuthUser) {
                setAuthUser(null);
                console.log("AuthContext의 user 상태 null로 설정됨");
              }
              
              // AuthContext의 로그인 상태 변경 -> 이로 인해 App.tsx에서 화면 자동 전환
              setIsLoggedIn(false);
              console.log("로그아웃 완료 - isLoggedIn: false, App.tsx에서 WelcomeScreen으로 자동 전환될 것입니다.");

              // navigation.reset 제거 - AuthContext 상태 변경으로 자동 처리
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: 'Welcome' }], 
              // });
              // console.log("WelcomeScreen으로 네비게이션 리셋 완료");

            } catch (error) {
              console.error("로그아웃 처리 중 오류:", error);
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
      // marginLeft : 16,
      // width:'120%'
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
                  onPress={() => {/* 상세보기 등 */}}
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
                  await updateUserBio(profile.uid, newIntro); // DB 업데이트
                  // AsyncStorage의 userBio도 업데이트 (선택적이지만, 다른 곳에서 사용할 경우 대비)
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
              // else if (tabId === 'profile') navigation.navigate('myProfile');
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};


export default MyProfile;

