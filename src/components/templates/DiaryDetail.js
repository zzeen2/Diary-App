import React, { useState, useEffect } from 'react';
import {StyleSheet,ScrollView, View, ImageBackground,SafeAreaView,Text, Alert} from 'react-native';
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
import  {DiaryHeader, HeaderBar}  from '../molecules/headers';
import { DiaryMeta } from '../atoms/TextsAndLabel';
import { DiaryContentBox } from '../molecules/boxes';
import {DiaryDetailSection, CommentListSection} from '../organisms/Detail';
import { updateDiary, deleteDiary } from '../../api/diary';

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

const DiaryDetail = ({ route, navigation }) => {
  console.log("=== DiaryDetail 파라미터 확인 ===");
  console.log("route.params:", route.params);
  
  const { diary, isMine, diaryId, shouldRefresh } = route.params || {};
  
  console.log("=== DiaryDetail 화면 진입 ===");
  console.log("받은 diary 데이터:", diary);
  console.log("isMine:", isMine);
  console.log("diaryId:", diaryId);
  console.log("shouldRefresh:", shouldRefresh);

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  const emotionsState = useSelector((state) => state.emotions);
  const emotions = emotionsState?.emotions || [];
  const emotionsLoading = emotionsState?.loading || false;
  
  console.log("DiaryDetail emotionsState:", emotionsState);
  console.log("DiaryDetail emotions:", emotions);
  console.log("emotions type:", typeof emotions);
  console.log("emotions is array:", Array.isArray(emotions));
  console.log("emotions length:", emotions.length);
  
  useEffect(() => {
    if (!emotions || emotions.length === 0) {
      console.log("emotions가 비어있어서 다시 fetch합니다.");
      dispatch(fetchEmotions());
    }
  }, [dispatch, emotions]);
  
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const loadCurrentUserId = async () => {
      try {
        const storedUid = await AsyncStorage.getItem('userUid');
        if (storedUid) {
          setCurrentUserId(Number(storedUid));
          console.log("DiaryDetail에서 불러온 currentUserId:", Number(storedUid));
        }
      } catch (error) {
        console.error("currentUserId 로드 실패:", error);
      }
    };
    loadCurrentUserId();
  }, []);

  if (!diary) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
          <SafeAreaView style={styles.safeContainer}>
            <HeaderBar showBackButton onBackPress={() => navigation.goBack()} />
            <View style={styles.divider} />
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>일기를 불러오는 중...</Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }

  const [comments, setComments] = useState([
    {
      id: 1,
      content: '와 너무 공감돼요!',
      created_at: '2025.05.30',
      user: { id: 2, nickname: '민지', profile_img: require('../../assets/IMG_3349.jpg') },
    },
    {
      id: 2,
      content: '멋져요 💜',
      created_at: '2025.05.30',
      user: { id: 1, nickname: '나', profile_img: require('../../assets/IMG_3349.jpg') },
    },
  ]);

  const handleSubmitComment = (text) => {
    const newComment = {
      id: Date.now(),
      content: text,
      created_at: '2025.05.30',
      user: { id: currentUserId, nickname: '나', profile_img: require('../../assets/IMG_3349.jpg') },
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const handleEdit = () => {
    console.log("=== 수정 버튼 클릭 ===");
    console.log("전달할 diary 데이터:", diary);
    console.log("diary.images:", diary.images);
    console.log("diary.images 길이:", diary.images?.length);
    console.log("diary.images 타입:", typeof diary.images);
    
    navigation.navigate('DiaryEdit', { 
      diary: diary,
      isEditMode: true
    });
  };

  const handleDelete = async () => {
    console.log("=== 삭제 버튼 클릭 ===");
    
    Alert.alert(
      '일기 삭제',
      '정말로 이 일기를 삭제하시겠습니까?\n삭제된 일기는 복구할 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log("일기 삭제 API 호출 중...");
              const result = await deleteDiary(diary.id);
              console.log("삭제 성공:", result);
              
              Alert.alert('삭제 완료', '일기가 성공적으로 삭제되었습니다.', [
                {
                  text: '확인',
                  onPress: () => {
                    navigation.navigate('listDiary');
                  }
                }
              ]);
            } catch (error) {
              console.error("삭제 실패:", error);
              Alert.alert('삭제 실패', '일기 삭제 중 오류가 발생했습니다.');
            }
          }
        }
      ]
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
    safeContainer: {
      flex: 1,
      paddingTop: insets.top,
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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 16,
      color: '#666',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeContainer}>
          <HeaderBar showBackButton onBackPress={() => navigation.goBack()} />
          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
            <DiaryDetailSection
              diary={diary}
              isMine={isMine}
              emotions={emotions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <CommentListSection
              comments={comments}
              currentUserId={currentUserId}
              onSubmitComment={handleSubmitComment}
              onDeleteComment={handleDeleteComment}
            />
          </ScrollView>

          <TabBar
            tabs={tabs}
            activeTab={'diary'}
            onTabPress={(tabId) => {
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

export default DiaryDetail;