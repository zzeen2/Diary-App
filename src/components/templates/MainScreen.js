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
import { fetchFriendDiaries } from '../../actions/friendDiaryAction'; // ⭐ 친구 일기 액션 추가
import { FriendSearchModal } from '../molecules/modals';
import { checkTodayWritten, getTodayDiary, getRandomDiary, getMonthWrittenDates, saveEmotionOnly } from '../../api/diary';
import { getCalendarEmotions } from '../../api/diary';

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

const MainScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const emotions = useSelector((state) => state.emotions.emotions);
  const loading = useSelector((state) => state.loading);
  const streak = useSelector(state => state.streak.value);
  const { isLoggedIn } = useContext(AuthContext); // AuthContext 추가
  
  // ⭐ Redux user 대신 AsyncStorage에서 직접 관리하는 상태들 ⭐
  const [displayNickname, setDisplayNickname] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null); // 프로필 이미지 추가

  const [isEmotionSaved, setIsEmotionSaved] = useState(false);
  const myDiaries = useSelector(state => state.diary.myDiaries);
  
  // ⭐ 친구 일기 관련 상태들 추가 ⭐
  const friendDiaries = useSelector(state => state.friendDiaries.friendDiaries);
  const friendDiariesLoading = useSelector(state => state.friendDiaries.loading);
  const friendDiariesError = useSelector(state => state.friendDiaries.error);
  
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showFriendModal, setShowFriendModal] = useState(false); // 친구찾기 모달 상태

  // 🆕 새로운 상태들 추가
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

  // ⭐ 메인 useFocusEffect - 사용자 정보 로드 및 초기화 ⭐
  useFocusEffect(
    React.useCallback(() => {
      console.log("=== MainScreen useFocusEffect 시작 ===");
      console.log("현재 로그인 상태:", isLoggedIn);
      
      // 로그인 상태가 아니면 아무것도 하지 않음
      if (isLoggedIn !== true) {
        console.log("로그인되지 않은 상태이므로 데이터 로드 건너뛰기");
        return;
      }
      
      const loadUserData = async () => {
        try {
          // AsyncStorage에서 닉네임과 UID를 직접 불러오기
          const storedNickname = await AsyncStorage.getItem('userNickname');
          const storedUid = await AsyncStorage.getItem('userUid');
          const storedProfileImage = await AsyncStorage.getItem('userProfileImage'); // 프로필 이미지 추가

          console.log("저장된 닉네임:", storedNickname);
          console.log("저장된 UID:", storedUid);
          console.log("저장된 프로필 이미지:", storedProfileImage);

          if (storedNickname && storedNickname.trim() !== '') {
            setDisplayNickname(storedNickname);
            console.log('MainScreen: AsyncStorage에서 닉네임 불러옴:', storedNickname);
          } else {
            setDisplayNickname('친구'); // 기본값
            console.log('MainScreen: AsyncStorage에 닉네임 없음, 기본값 설정.');
          }

          if (storedUid) {
            const parsedUid = Number(storedUid);
            setCurrentUserId(parsedUid);
            console.log('MainScreen: AsyncStorage에서 UID 불러옴:', parsedUid);
            // UID를 불러온 후 streak과 diaries 액션을 디스패치
            dispatch(fetchStreak(parsedUid));
            dispatch(fetchMyDiaries());
          } else {
            setCurrentUserId(null);
            console.log('MainScreen: AsyncStorage에 UID 없음.');
          }

          // 프로필 이미지 설정
          if (storedProfileImage) {
            setUserProfileImage({ uri: storedProfileImage });
            console.log('MainScreen: 프로필 이미지 설정');
          }
        } catch (error) {
          console.error('MainScreen: 사용자 정보 불러오기 오류:', error);
          setDisplayNickname('친구');
          setCurrentUserId(null);
          setUserProfileImage(null);
        }
      };

      loadUserData(); // 사용자 데이터 로드
      
      // 감정 데이터 불러오기
      console.log("감정 데이터 fetch 시작...");
      dispatch(fetchEmotions());

      // ⭐ 친구 일기 데이터 불러오기 추가 ⭐
      console.log("친구 일기 데이터 fetch 시작...");
      dispatch(fetchFriendDiaries());

      // 선택된 감정 초기화
      setSelectedEmotion(null);

      // 🆕 오늘 작성 여부 및 관련 데이터 로드
      loadTodayStatus();
      loadMonthlyRate();
      loadRandomDiary();

    }, [dispatch, isLoggedIn]) // isLoggedIn을 의존성에 추가
  );

  // 🆕 오늘 작성 상태 체크
  const loadTodayStatus = async () => {
    if (isLoggedIn !== true) {
      console.log("로그인되지 않은 상태이므로 오늘 작성 상태 체크 건너뛰기");
      return;
    }
    try {
      const result = await checkTodayWritten();
      setHasWrittenToday(result.hasWritten);
      
      if (result.hasWritten) {
        const todayResult = await getTodayDiary();
        if (todayResult.success) {
          setTodayDiary(todayResult.diary);
        }
      }
    } catch (error) {
      console.error('오늘 작성 상태 확인 실패:', error);
    }
  };

  // 🆕 이번 달 작성률 계산
  const loadMonthlyRate = async () => {
    if (isLoggedIn !== true) {
      console.log("로그인되지 않은 상태이므로 월간 작성률 계산 건너뛰기");
      return;
    }
    try {
      const now = new Date();
      const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const writtenDates = await getMonthWrittenDates(yearMonth);
      
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const rate = Math.round((writtenDates.length / daysInMonth) * 100);
      setMonthlyRate(rate);
    } catch (error) {
      console.error('월간 작성률 계산 실패:', error);
    }
  };

  // 🆕 랜덤 일기 불러오기
  const loadRandomDiary = async () => {
    if (isLoggedIn !== true) {
      console.log("로그인되지 않은 상태이므로 랜덤 일기 불러오기 건너뛰기");
      return;
    }
    try {
      setLoadingRandom(true);
      const result = await getRandomDiary();
      if (result.success) {
        setRandomDiary(result.diary);
      }
    } catch (error) {
      console.error('랜덤 일기 불러오기 실패:', error);
    } finally {
      setLoadingRandom(false);
    }
  };

  // ⭐ 친구 일기 데이터 디버깅 useEffect ⭐
  useEffect(() => {
    console.log("=== 친구 일기 상태 변화 감지 ===");
    console.log("friendDiaries:", friendDiaries);
    console.log("friendDiaries 타입:", typeof friendDiaries);
    console.log("friendDiaries 배열인가?", Array.isArray(friendDiaries));
    console.log("friendDiaries 길이:", friendDiaries?.length);
    console.log("friendDiariesLoading:", friendDiariesLoading);
    console.log("friendDiariesError:", friendDiariesError);
    
    if (friendDiaries && friendDiaries.length > 0) {
      console.log("첫 번째 친구 일기 데이터:", JSON.stringify(friendDiaries[0], null, 2));
    }
  }, [friendDiaries, friendDiariesLoading, friendDiariesError]);

  const findEmotion = (id) => emotions.find(e => e.id === id) || {};

  const goToDetail = (entry) => {
    console.log("=== goToDetail 함수 호출 ===");
    console.log("클릭된 entry:", JSON.stringify(entry, null, 2));
    console.log("currentUserId:", currentUserId);
    
    // ⭐ 실제 데이터 구조에 맞게 수정 ⭐
    console.log("entry.writer:", entry.writer);
    console.log("entry.writer?.uid:", entry.writer?.uid);
    
    // ⭐ writer.uid로 isMine 계산 ⭐
    const isMine = entry.writer?.uid === currentUserId;
    console.log("isMine 계산 결과:", isMine);

    // ⭐ DiaryDetail에서 기대하는 형태로 데이터 구조 변환 ⭐
    const transformedEntry = {
      ...entry,
      user: {
        id: entry.writer?.uid,
        nickname: entry.writer?.nick_name,
        profile_img: entry.writer?.profile_image,
      }
    };

    console.log("변환된 데이터:", transformedEntry);

    try {
      navigation.navigate('DiaryDetail', {
        diary: transformedEntry,
        isMine: isMine,
      });
      console.log("✅ 네비게이션 성공");
    } catch (error) {
      console.error("❌ 네비게이션 오류:", error);
    }
  };

  // 🆕 오늘의 일기 보기
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

  // 날짜 포멧팅
  const today = new Date().toISOString();
  const displayDate = useFormmatedDate(today);

  const writeHandler = () => {
    if (selectedEmotion) {
      navigation.navigate('createDiary', { emotion: selectedEmotion });
    }
  };

  const handleOpenFriendModal = () => {
    console.log('친구찾기 모달 열기');
    setShowFriendModal(true);
  };

  const recordHandler = async () => {
    console.log(`${selectedEmotion.name} 감정만 저장`);

    try {
      // 실제 서버에 감정 저장 API 호출
      await saveEmotionOnly(selectedEmotion.id);

      // 상태 반영 
      setIsEmotionSaved(true);

      // 감정만 기록해도 추억의 일기 세션이 보이도록 상태 갱신
      await loadTodayStatus();
      
      // 캘린더 데이터도 갱신
      const fetchCalendarData = async () => {
        try {
          console.log('달력 감정 데이터 가져오기:', currentMonth);
          const data = await getCalendarEmotions(currentMonth);
          console.log('달력 감정 데이터:', data);
          setCalendarEmotions(data);
        } catch (error) {
          console.error('달력 감정 데이터 가져오기 실패:', error);
        }
      };
      await fetchCalendarData();

      Alert.alert('감정이 저장되었습니다.');
    } catch (err) {
      console.error('감정 저장 실패:', err);
      Alert.alert('감정 저장 실패', err.message || '알 수 없는 오류가 발생했습니다.');
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeContainer}>
          <HeaderBar 
            title="홈" 
            streakText={streak > 0 ? `🔥 ${streak}일 연속 기록 중` : '🌱 다시 기록을 시작해보세요!'} 
            profileImage={userProfileImage} 
          />

          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* 날짜 인사 */}
            <View style={styles.greetingBox}>
              <Text style={styles.dateText}>{displayDate}</Text>
              {/* ⭐ AsyncStorage에서 불러온 displayNickname 사용 ⭐ */}
              <Text style={styles.greetingText}>{`${displayNickname}님! 👋`}</Text>
              <Text style={styles.greetingText}>오늘의 감정은 어떤가요?</Text>
            </View>

            {/* 감정 선택 영역 - 오늘 일기/감정 기록 전만 표시 */}
            {!hasWrittenToday && (
              <EmotionSelector 
                emotionIcons={emotions}
                selectedEmotion={selectedEmotion}
                onSelectEmotion={setSelectedEmotion}
                onWritePress={writeHandler}
                onRecordPress={recordHandler}
              />
            )}

            {/* 🆕 통계 및 랜덤 일기 - 일기/감정 기록 후에만 표시 */}
            {hasWrittenToday && (
              <StatsAndRandom 
                monthlyRate={monthlyRate}
                randomDiary={randomDiary}
                onRandomPress={loadRandomDiary}
                onViewRandom={(diary) => goToDetail(diary)}
                loading={loadingRandom}
              />
            )}
            
            {/* 내 일기 */}
            <DiaryListSection
              title="📓 나의 최근 일기"
              entries={myDiaries}
              findEmotion={findEmotion}
              maxCount={4}
              onPressSeeMore={() => {
                navigation.navigate('listDiary');
                // 일기장 화면으로 이동 (기본이 내 일기 탭)
              }}
              onPressCard={goToDetail}
            />
            
            {/* ⭐ 친구 일기 - 디버깅 정보 포함 ⭐ */}
            <DiaryListSection
              title="👥 친구들의 일기"
              entries={friendDiaries || []} // null 방어
              findEmotion={findEmotion}
              isFriend
              onPressSeeMore={() => {
                navigation.navigate('listDiary', { initialFilter: 'follower' });
                // 일기장 화면의 팔로워 탭으로 이동
              }}
              onPressCard={goToDetail}
              emptyMessage="😔 오늘 작성된 팔로잉 일기가 없어요"
              emptySubMessage="친구들을 찾아서 팔로우해보세요!"
              onEmptyButtonPress={handleOpenFriendModal}
              emptyButtonText="친구 찾기"
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
      
      {/* ✅ 친구찾기 모달 */}
      <FriendSearchModal 
        visible={showFriendModal}
        onClose={() => setShowFriendModal(false)}
      />
    </View>
  );
};

export default MainScreen;