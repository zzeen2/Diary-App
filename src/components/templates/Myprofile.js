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
import { updateUserBio, getUserStats } from '../../api/user';
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
  const { setIsLoggedIn, setUser: setAuthUser } = useContext(AuthContext);
  
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
    profile_img: require('../../assets/IMG_3349.jpg'), // 기본 이미지
    nickname: '사용자',
    intro: '',
    followerCount: 0, 
    followingCount: 0, 
    publicDiaryCount: 0, 
  });

  // AsyncStorage에서 사용자 정보를 불러와 profile 상태 업데이트
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedNickname = await AsyncStorage.getItem('userNickname');
        const storedProfileImage = await AsyncStorage.getItem('userProfileImage');
        const storedBio = await AsyncStorage.getItem('userBio');
        const storedUserUid = await AsyncStorage.getItem('userUid');

        setProfile(prevProfile => ({
          ...prevProfile,
          nickname: storedNickname || '사용자',
          profile_img: storedProfileImage ? { uri: storedProfileImage } : require('../../assets/IMG_3349.jpg'),
          intro: storedBio || '',
          uid: storedUserUid || null,
        }));

        // 팔로워/팔로잉/공개일기 숫자 최신화
        if (storedUserUid) {
          const statsRes = await getUserStats(storedUserUid);
          if (statsRes.success && statsRes.data) {
            setProfile(prev => ({
              ...prev,
              followerCount: statsRes.data.followerCount,
              followingCount: statsRes.data.followingCount,
              publicDiaryCount: statsRes.data.diaryCount,
            }));
          }
        }
      } catch (error) {
        console.error('프로필 데이터/통계 로딩 실패:', error);
      }
    };
    loadProfileData();
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
              await AsyncStorage.removeItem('jwtToken');
              await AsyncStorage.removeItem('userUid');
              await AsyncStorage.removeItem('userNickname');
              await AsyncStorage.removeItem('userProfileImage');
              await AsyncStorage.removeItem('userBio');

              dispatch(clearUser());

              if (setAuthUser) setAuthUser(null);
              setIsLoggedIn(false);
              
              console.log("로그아웃 완료");

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
    }
  });
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <HeaderBar 
              title={`${profile.nickname}님의 프로필`} 
              rightContent={ 
                <TouchableOpacity onPress={handleLogout} style={{ padding: 8 }}>
                  <Feather name="log-out" size={24} color="#333" />
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
                  const uid = await AsyncStorage.getItem('userUid');
                  await updateUserBio(uid, newIntro);
                  setProfile((prev) => ({ ...prev, intro: newIntro }));
                  await AsyncStorage.setItem('userBio', newIntro);
                  Alert.alert('성공', '자기소개가 저장되었습니다.');
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
              // else if (tabId === 'profile') navigation.navigate('myProfile');
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};


export default MyProfile;

