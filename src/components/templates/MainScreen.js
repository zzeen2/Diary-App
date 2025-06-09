import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet,ScrollView, View, ImageBackground,SafeAreaView,Text, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useFormmatedDate from '../../hooks/useFormattedDate';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabBar } from '../organisms/TabBar';
import {EmotionSelector, StatsAndRandom} from '../organisms/main';
import {DiaryListSection} from '../organisms/main';
import  {HeaderBar}  from '../molecules/headers';
import { AuthContext } from '../../context/AuthContext';
import { fetchStreak } from '../../reducers/streakReducer';
import { fetchMyDiaries } from '../../actions/diaryAction';
import { fetchFriendDiaries } from '../../actions/friendDiaryAction';
import { FriendSearchModal } from '../molecules/modals';
import { checkTodayWritten, getTodayDiary, getRandomDiary, getMonthWrittenDates, saveEmotionOnly } from '../../api/diary';
import { getCalendarEmotions } from '../../api/diary';

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

const MainScreen = ({ route }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const emotions = useSelector((state) => state.emotions.emotions);
  const loading = useSelector((state) => state.loading);
  const streakRedux = useSelector(state => state.streak.value);
  const { isLoggedIn } = useContext(AuthContext);
  
  const [displayNickname, setDisplayNickname] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null);

  const [isEmotionSaved, setIsEmotionSaved] = useState(false);
  const myDiaries = useSelector(state => state.diary.myDiaries);
  
  const friendDiaries = useSelector(state => state.friendDiaries.friendDiaries);
  const friendDiariesLoading = useSelector(state => state.friendDiaries.loading);
  const friendDiariesError = useSelector(state => state.friendDiaries.error);
  
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showFriendModal, setShowFriendModal] = useState(false);

  const [hasWrittenToday, setHasWrittenToday] = useState(false);
  const [todayDiary, setTodayDiary] = useState(null);
  const [randomDiary, setRandomDiary] = useState(null);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [calendarEmotions, setCalendarEmotions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

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

  useFocusEffect(
    React.useCallback(() => {
      if (isLoggedIn !== true) {
        return;
      }
      
      const loadUserData = async () => {
        try {
          const storedNickname = await AsyncStorage.getItem('userNickname');
          const storedUid = await AsyncStorage.getItem('userUid');
          const storedProfileImage = await AsyncStorage.getItem('userProfileImage');

          if (storedNickname && storedNickname.trim() !== '') {
            setDisplayNickname(storedNickname);
          } else {
            setDisplayNickname('친구');
          }

          if (storedUid) {
            const parsedUid = Number(storedUid);
            setCurrentUserId(parsedUid);
            dispatch(fetchStreak(parsedUid));
            dispatch(fetchMyDiaries());
          } else {
            setCurrentUserId(null);
          }

          if (storedProfileImage) {
            setUserProfileImage({ uri: storedProfileImage });
          }
        } catch (error) {
          setDisplayNickname('친구');
          setCurrentUserId(null);
          setUserProfileImage(null);
        }
      };

      const refreshData = async () => {
        console.log('=== MainScreen useFocusEffect 실행 ===');
        await loadUserData();
        dispatch(fetchEmotions());
        dispatch(fetchFriendDiaries());
        setSelectedEmotion(null);
        
        // 오늘 일기 작성 상태를 확인
        await loadTodayStatus();
        await loadMonthlyRate();
      };

      refreshData();
    }, [dispatch, isLoggedIn])
  );

  const loadTodayStatus = async () => {
    if (isLoggedIn !== true) {
      return;
    }
    try {
      console.log('=== loadTodayStatus 시작 ===');
      const result = await checkTodayWritten();
      console.log('checkTodayWritten 결과:', result);
      
      const hasWritten = result.hasWritten;
      console.log('hasWritten 상태 변경:', hasWrittenToday, '->', hasWritten);
      setHasWrittenToday(hasWritten);
      
      if (hasWritten) {
        console.log('일기 작성됨 - 오늘 일기 조회 시작');
        const todayResult = await getTodayDiary();
        console.log('getTodayDiary 결과:', todayResult);
        
        if (todayResult.success && todayResult.diary) {
          setTodayDiary(todayResult.diary);
          console.log('오늘 일기 설정 완료');
        } else {
          // 일기는 없지만 감정만 저장된 경우
          setTodayDiary(null);
          console.log('감정만 저장된 상태');
        }
        
        // 랜덤 일기도 로드
        console.log('랜덤 일기 로드 시작');
        await loadRandomDiary();
      } else {
        console.log('일기 미작성 상태');
        setTodayDiary(null);
      }
      
      console.log('=== loadTodayStatus 완료 ===');
    } catch (error) {
      console.error('loadTodayStatus 오류:', error);
      setHasWrittenToday(false);
      setTodayDiary(null);
    }
  };

  const loadMonthlyRate = async () => {
    if (isLoggedIn !== true) {
      return;
    }
    try {
      const now = new Date();
      const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const writtenDates = await getMonthWrittenDates(yearMonth);
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const rate = Math.round((writtenDates.length / daysInMonth) * 100);
      setMonthlyRate(rate);

      // 달력 감정 데이터 API 호출 및 콘솔 출력
      const calendarData = await getCalendarEmotions(yearMonth);
      console.log('getCalendarEmotions 응답:', calendarData);
      setCalendarEmotions(calendarData);
    } catch (error) {
    }
  };

  const loadRandomDiary = async () => {
    if (isLoggedIn !== true) {
      return;
    }
    try {
      setLoadingRandom(true);
      const result = await getRandomDiary();
      if (result.success) {
        setRandomDiary(result.diary);
      }
    } catch (error) {
    } finally {
      setLoadingRandom(false);
    }
  };

  // hasWrittenToday 상태 변경 감지
  useEffect(() => {
    console.log('=== hasWrittenToday 상태 변경 ===');
    console.log('hasWrittenToday:', hasWrittenToday);
    console.log('todayDiary:', todayDiary);
    console.log('UI 렌더링 결정:', hasWrittenToday ? 'StatsAndRandom 표시' : 'EmotionSelector 표시');
  }, [hasWrittenToday, todayDiary]);

  useEffect(() => {
  }, [friendDiaries, friendDiariesLoading, friendDiariesError]);

  const findEmotion = (id) => emotions.find(e => e.id === id) || {};

  const goToDetail = (entry) => {
    const isMine = entry.writer?.uid === currentUserId;
    const transformedEntry = {
      ...entry,
      user: {
        id: entry.writer?.uid,
        nickname: entry.writer?.nick_name,
        profile_img: entry.writer?.profile_image,
      }
    };

    try {
      navigation.navigate('DiaryDetail', {
        diary: transformedEntry,
        isMine: isMine,
      });
    } catch (error) {
    }
  };

  const viewTodayDiary = () => {
    if (todayDiary) {
      navigation.navigate('DiaryDetail', {
        diary: {
          id: todayDiary.id,
          title: todayDiary.title,
          user: {
            id: currentUserId,
            nickname: displayNickname,
            profile_img: userProfileImage?.uri
          }
        },
        isMine: true,
      });
    }
  };

  const today = new Date().toISOString();
  const displayDate = useFormmatedDate(today);

  const writeHandler = () => {
    if (selectedEmotion) {
      navigation.navigate('createDiary', { emotion: selectedEmotion });
    }
  };

  const handleOpenFriendModal = () => {
    setShowFriendModal(true);
  };

  const recordHandler = async () => {
    try {
      await saveEmotionOnly(selectedEmotion.id);
      setIsEmotionSaved(true);
      await loadTodayStatus();
      
      const fetchCalendarData = async () => {
        try {
          const data = await getCalendarEmotions(currentMonth);
          setCalendarEmotions(data);
        } catch (error) {
        }
      };
      await fetchCalendarData();

      Alert.alert('감정이 저장되었습니다.');
    } catch (err) {
      Alert.alert('감정 저장 실패', err.message || '알 수 없는 오류가 발생했습니다.');
    }
  };
  
  // route 파라미터로 받은 refresh가 true일 때 데이터 새로고침
  useEffect(() => {
    console.log('=== route refresh useEffect ===');
    console.log('route?.params:', route?.params);
    
    if (route?.params?.refresh || route?.params?.timestamp) {
      console.log('일기 작성 후 새로고침 시작');
      const refreshAfterWrite = async () => {
        // 강제로 상태 초기화
        setHasWrittenToday(false);
        setTodayDiary(null);
        setRandomDiary(null);
        
        // 잠시 대기 후 새로운 상태 로드
        setTimeout(async () => {
          await loadTodayStatus();
          await loadMonthlyRate();
          console.log('일기 작성 후 새로고침 완료');
          // 파라미터 초기화는 여기서!
          if (route?.params?.refresh) {
            navigation.setParams({ refresh: false });
          }
        }, 100);
      };
      refreshAfterWrite();
      
      // 파라미터 초기화 <-- 이 부분을 setTimeout 안으로 옮겼습니다.
      // if (route?.params?.refresh) {
      //   navigation.setParams({ refresh: false });
      // }
    }
  }, [route?.params?.refresh, route?.params?.timestamp]);

  // streak 계산 함수 교체 (중복 제거, KST 기준)
  function calculateStreak(calendarEmotions) {
    if (!Array.isArray(calendarEmotions) || calendarEmotions.length === 0) return 0;
    const dateSet = new Set(calendarEmotions.map(e => e.date));
    const now = new Date();
    const KST_OFFSET = 9 * 60 * 60 * 1000;
    const koreaNow = new Date(now.getTime() + KST_OFFSET);
    let streak = 0;
    let day = new Date(koreaNow);
    while (true) {
      const dateStr = day.toISOString().split('T')[0];
      if (dateSet.has(dateStr)) {
        streak += 1;
        day.setDate(day.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  // streak 계산을 기존 useSelector가 아니라 감정 기록 기준으로 변경
  const streak = calculateStreak(calendarEmotions);

  useEffect(() => {
    console.log('calendarEmotions:', calendarEmotions);
    if (calendarEmotions && calendarEmotions.length > 0) {
      console.log('calendarEmotions 샘플:', calendarEmotions.slice(0, 3));
      calendarEmotions.slice(0, 3).forEach((e, idx) => {
        console.log(`calendarEmotions[${idx}]`, e);
      });
    }
  }, [calendarEmotions]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeContainer}>
          <HeaderBar 
            title="홈" 
            streakText={streak > 0 ? `🔥 ${streak}일 연속 기록 중` : '🌱 기록을 시작해보세요!'} 
            profileImage={userProfileImage} 
          />

          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.greetingBox}>
              <Text style={styles.dateText}>{displayDate}</Text>
              <Text style={styles.greetingText}>{`${displayNickname}님! 👋`}</Text>
              <Text style={styles.greetingText}>오늘의 감정은 어떤가요?</Text>
            </View>

            {!hasWrittenToday && (
              <EmotionSelector 
                emotionIcons={emotions}
                selectedEmotion={selectedEmotion}
                onSelectEmotion={setSelectedEmotion}
                onWritePress={writeHandler}
                onRecordPress={recordHandler}
              />
            )}

            {hasWrittenToday && (
              <StatsAndRandom 
                monthlyRate={monthlyRate}
                randomDiary={randomDiary}
                onRandomPress={loadRandomDiary}
                onViewRandom={(diary) => goToDetail(diary)}
                loading={loadingRandom}
              />
            )}
            
            <DiaryListSection
              title="📓 나의 최근 일기"
              entries={myDiaries}
              findEmotion={findEmotion}
              maxCount={4}
              onPressSeeMore={() => {
                navigation.navigate('listDiary');
              }}
              onPressCard={goToDetail}
            />
            
            <DiaryListSection
              title="👥 친구들의 일기"
              entries={friendDiaries || []}
              findEmotion={findEmotion}
              isFriend
              maxCount={4}
              onPressSeeMore={() => {
                navigation.navigate('listDiary', { initialFilter: 'follower' });
              }}
              onPressCard={goToDetail}
              emptyMessage="😔 오늘 작성된 팔로잉 일기가 없어요"
              emptySubMessage="친구들을 찾아서 팔로우해보세요!"
              onEmptyButtonPress={handleOpenFriendModal}
              emptyButtonText="친구 찾기"
            />
          </ScrollView>

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
      
      <FriendSearchModal 
        visible={showFriendModal}
        onClose={() => setShowFriendModal(false)}
      />
    </View>
  );
};

export default MainScreen;