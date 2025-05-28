import React, { useState, useEffect } from 'react';
import {StyleSheet,ScrollView, View, ImageBackground,SafeAreaView,Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useFormmatedDate from '../../hooks/useFormattedDate';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabBar } from '../organisms/TabBar';
import {EmotionSelector} from '../organisms/main';
import {DiaryListSection} from '../organisms/main';
import  {HeaderBar}  from '../molecules/headers';
// console.log(' EmotionSelector:', EmotionSelector);
// console.log(' DiaryListSection:', DiaryListSection);
// console.log(' TabBar:', TabBar);
// console.log(' HeaderBar:', HeaderBar);
//console.log(EmotionSelector)
//console.log('HeaderBar:', HeaderBar);

const diaryEntries = [
  {
    id: 1,
    title: '봄 날씨와 함께한 산책',
    date: '2025.05.17',
    content: '날씨가 너무 좋아서 한강 공원을 산책했다. 날씨가 너무 좋아서 한강 공원을 산책했다.',
    primaryEmotion: 'happy',
    secondaryEmotion: 'calm',
    isPublic: true,
    user: {
      id: 'user1',
      nickname: '민지',
      profile_img: require('../../assets/cloud3.png'), // 이미지 경로 조정
    },
  },
  {
    id: 2,
    title: '업무에 대한 고민',
    date: '2025.05.16',
    content: '프로젝트 마감이 다가오는데 걱정이다...',
    primaryEmotion: 'happy',
    isPublic: true,
    user: {
      id: 'user2',
      nickname: '지은',
      profile_img: require('../../assets/cloud2.png'),
    },
  },
  {
    id: 3,
    title: '업무에 대한 고민',
    date: '2025.05.16',
    content: '프로젝트 마감이 다가오는데 걱정이다...',
    primaryEmotion: 'anxious',
    secondaryEmotion: 'calm',
    isPublic: false,
    user: {
      id: 'user1',
      nickname: '민지',
      profile_img: require('../../assets/cloud3.png'),
    },
  },
  {
    id: 4,
    title: '봄 날씨와 함께한 산책',
    date: '2025.05.17',
    content: '날씨가 너무 좋아서 한강 공원을 산책했다...',
    primaryEmotion: 'happy',
    secondaryEmotion: 'calm',
    isPublic: false,
    user: {
      id: 'user2',
      nickname: '지은',
      profile_img: require('../../assets/cloud2.png'),
    },
  },
];


const friendDiaryEntries = [
  {
    id: 1,
    title: '집에서 요리해본 날',
    date: '2025.05.18',
    content: '오늘은 파스타를 만들어봤다...',
    primaryEmotion: 'happy',
    isPublic: true,
    user: {
      id: 'user1',
      nickname: '민지',
      profile_img: require('../../assets/cloud3.png'),
    },
  },
  {
    id: 2,
    title: '시험 끝난 후의 해방감',
    date: '2025.05.17',
    content: '드디어 기말고사가 끝났다! 시험 끝난 후의 해방감 시험 끝난 후의 해방감 시험 끝난 후의 해방감',
    primaryEmotion: 'excited',
    secondaryEmotion: 'angry',
    isPublic: true,
    user: {
      id: 'user2',
      nickname: '수진',
      profile_img: require('../../assets/cloud3.png'),
    },
  },
];

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];


const MainScreen = () => {

  
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const emotions = useSelector((state) => state.emotions);
  const loading = useSelector((state) => state.loading);
  const currentUserId = 1; // 추후 로그인 정보에서 가져오기


  const [isEmotionSaved, setIsEmotionSaved] = useState(false);
  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeContainer: {
        flex: 1,
        paddingTop: insets.top
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginVertical: 1,
    },
    scrollContent: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    greetingBox: {
        marginTop: 10,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
  });
  
  useEffect(() => { // 컴포넌트 마운트시에 감정데이터 가져오기 
    dispatch(fetchEmotions()); // 메인화면 첫번째로 켯을때 // 첫번째 :  실행
  }, [dispatch]);
  
  //console.log(emotions)

  useFocusEffect(
    React.useCallback(() => {
      setSelectedEmotion(null); // 메인페이지가 리렌더링 될때마다 초기화
    }, [])
  );
  useEffect(() => { // 감정이 저장되어있는지 확인
    const checkSaved = async () => {
      const saved = await AsyncStorage.getItem('emotionSavedDate');
      const today = new Date().toISOString().slice(0, 10);
      setIsEmotionSaved(saved === today);
    };

    checkSaved();
  }, []);

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const findEmotion = (id) => emotions.find(e => e.id === id) || {};
  //console.log(findEmotion('angry'), "여기야") // 두번째 : 빈객체로 콘솔 찍힘(요청 완료 전) // 세번째 : 리듀서 내부의 요청완료 콘솔 찍힘 // 네번째 : emotion이랑 angry랑 비교해서 콘솔 찍힘
  const goToDetail = (entry) => {
      navigation.navigate('DiaryDetail', {
      diary: entry,
      isMine: entry.user.id === currentUserId,
    })
  };
  // 날짜 포멧팅
  const today = new Date().toISOString();
  const displayDate = useFormmatedDate(today)

  const writeHandler = () => {
    if (selectedEmotion) {
      navigation.navigate('createDiary', { emotion: selectedEmotion });
    }
  };

  const recordHandler = async () => {
    console.log(`${selectedEmotion.name} 감정만 저장`);

    try {
      //감정 저장 API 호출
      await saveEmotionToServer(selectedEmotion);

      // 오늘 날짜 저장
      const today = new Date().toISOString().slice(0, 10);
      await AsyncStorage.setItem('emotionSavedDate', today);

      // 상태 반영 
      setIsEmotionSaved(true);

      Alert.alert('감정이 저장되었습니다.');
    } catch (err) {
      Alert.alert('감정 저장 실패', err.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeContainer}>
          <HeaderBar title="홈" streakText="🔥 3일 연속 기록 중" />

          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}
          >
            {/* 날짜 인사 */}
            <View style={styles.greetingBox}>
              <Text style={styles.dateText}>{displayDate}</Text>
              <Text style={styles.greetingText}>김지은님! 👋</Text>
              <Text style={styles.greetingText}>오늘의 감정은 어떤가요?</Text>
            </View>

            {/* 감정 선택 영역 */}
            <EmotionSelector 
              emotionIcons={emotions}
              selectedEmotion={selectedEmotion}
              onSelectEmotion={setSelectedEmotion}
              onWritePress={writeHandler}
              onRecordPress={recordHandler}
            />
            {/* 내 일기 */}
            <DiaryListSection
              title="📓 나의 최근 일기"
              entries={diaryEntries}
              findEmotion={findEmotion}
              maxCount={4}
              onPressSeeMore={() => console.log('내 일기 더보기')}
              onPressCard={goToDetail}
            />
            
            {/* 친구 일기 */}
            <DiaryListSection
              title="👥 친구들의 일기"
              entries={friendDiaryEntries}
              findEmotion={findEmotion}
              isFriend
              onPressSeeMore={() => console.log('친구 일기 더보기')}
              onPressCard={goToDetail}
            />
          </ScrollView>

          {/* 하단 탭 바 */}
          <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={(tabId) => {
            setActiveTab(tabId);
            if (tabId === 'home') {
              navigation.navigate('Main');
            } else if (tabId === 'diary') {
              navigation.navigate('listDiary');
            } else if (tabId === 'stats') {
              navigation.navigate('stats');
            } else if (tabId === 'profile') {
                navigation.navigate('myProfile');
            }
          }}
        />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MainScreen;
