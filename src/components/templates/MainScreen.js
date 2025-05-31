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
import {EmotionSelector} from '../organisms/main';
import {DiaryListSection} from '../organisms/main';
import  {HeaderBar}  from '../molecules/headers';
import { AuthContext } from '../../context/AuthContext';
import { fetchStreak } from '../../reducers/streakReducer';
import { fetchMyDiaries } from '../../actions/diaryAction';
import { fetchFriendDiaries } from '../../actions/friendDiaryAction'; // ⭐ 친구 일기 액션 추가

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
  
  // ⭐ Redux user 대신 AsyncStorage에서 직접 관리하는 상태들 ⭐
  const [displayNickname, setDisplayNickname] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  const [isEmotionSaved, setIsEmotionSaved] = useState(false);
  const myDiaries = useSelector(state => state.diary.myDiaries);
  
  // ⭐ 친구 일기 관련 상태들 추가 ⭐
  const friendDiaries = useSelector(state => state.friendDiaries.friendDiaries);
  const friendDiariesLoading = useSelector(state => state.friendDiaries.loading);
  const friendDiariesError = useSelector(state => state.friendDiaries.error);
  
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

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
      
      const loadUserData = async () => {
        try {
          // AsyncStorage에서 닉네임과 UID를 직접 불러오기
          const storedNickname = await AsyncStorage.getItem('userNickname');
          const storedUid = await AsyncStorage.getItem('userUid');

          console.log("저장된 닉네임:", storedNickname);
          console.log("저장된 UID:", storedUid);

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
        } catch (error) {
          console.error('MainScreen: 사용자 정보 불러오기 오류:', error);
          setDisplayNickname('친구');
          setCurrentUserId(null);
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

      // 오늘의 감정 저장 여부 확인
      const checkSaved = async () => {
        const saved = await AsyncStorage.getItem('emotionSavedDate');
        const today = new Date().toISOString().slice(0, 10);
        setIsEmotionSaved(saved === today);
      };
      checkSaved();

    }, [dispatch])
  );

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

  // 날짜 포멧팅
  const today = new Date().toISOString();
  const displayDate = useFormmatedDate(today);

  const writeHandler = () => {
    if (selectedEmotion) {
      navigation.navigate('createDiary', { emotion: selectedEmotion });
    }
  };

  const recordHandler = async () => {
    console.log(`${selectedEmotion.name} 감정만 저장`);

    try {
      // 감정 저장 API 호출 (구현되어 있다고 가정)
      // await saveEmotionToServer(selectedEmotion);

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
          <HeaderBar title="홈" streakText={`🔥 ${streak}일 연속 기록 중`} />

          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* 날짜 인사 */}
            <View style={styles.greetingBox}>
              <Text style={styles.dateText}>{displayDate}</Text>
              {/* ⭐ AsyncStorage에서 불러온 displayNickname 사용 ⭐ */}
              <Text style={styles.greetingText}>{`${displayNickname}님! 👋`}</Text>
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
              entries={myDiaries}
              findEmotion={findEmotion}
              maxCount={4}
              onPressSeeMore={() => console.log('내 일기 더보기')}
              onPressCard={goToDetail}
            />
            
            {/* ⭐ 친구 일기 - 디버깅 정보 포함 ⭐ */}
            <DiaryListSection
              title={`👥 친구들의 일기 ${friendDiariesLoading ? '(로딩중...)' : friendDiariesError ? '(오류 발생)' : `(${friendDiaries?.length || 0}개)`}`}
              entries={friendDiaries || []} // null 방어
              findEmotion={findEmotion}
              isFriend
              onPressSeeMore={() => console.log('친구 일기 더보기')}
              onPressCard={goToDetail}
            />
            
            {/* ⭐ 디버깅용 친구 일기 상태 표시 ⭐ */}
            {friendDiariesError && (
              <View style={{ padding: 16, backgroundColor: '#ffebee', margin: 16, borderRadius: 8 }}>
                <Text style={{ color: '#c62828', fontSize: 14 }}>
                  친구 일기 오류: {friendDiariesError}
                </Text>
              </View>
            )}
            
            {!friendDiariesLoading && (!friendDiaries || friendDiaries.length === 0) && (
              <View style={{ padding: 16, backgroundColor: '#f5f5f5', margin: 16, borderRadius: 8 }}>
                <Text style={{ color: '#666', fontSize: 14, textAlign: 'center' }}>
                  친구들의 일기가 없습니다. 친구를 팔로우해보세요! 👥
                </Text>
              </View>
            )}
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