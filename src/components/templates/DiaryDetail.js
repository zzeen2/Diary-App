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
import { updateDiary, deleteDiary, createComment } from '../../api/diary';
import axios from 'axios';
import { ImageModal } from '../molecules/modals';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

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

const DiaryDetail = ({ route, navigation }) => {
  console.log("=== DiaryDetail 파라미터 확인 ===");
  console.log("route.params:", route.params);
  
  const { diary: initialDiary, isMine, diaryId, shouldRefresh } = route.params || {};
  
  console.log("=== DiaryDetail 화면 진입 ===");
  console.log("받은 diary 데이터:", initialDiary);
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
  const [diary, setDiary] = useState(initialDiary);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingDiary, setLoadingDiary] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

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

  // 일기 상세 정보 가져오기 (댓글 포함)
  const fetchDiaryDetail = async () => {
    try {
      setLoadingDiary(true);
      const id = diary?.id || diaryId;
      console.log("=== 일기 상세 정보 가져오기 ===");
      console.log("일기 ID:", id);
      
      const response = await axios.get(`${EXPO_PUBLIC_API_URL}/detail/${id}`);
      console.log("일기 상세 정보 응답:", response.data);
      
      if (response.data.success && response.data.diary) {
        const diaryData = response.data.diary;
        
        // diary 데이터 업데이트
        setDiary({
          ...diaryData,
          isPublic: diaryData.is_public,
          userEmotion: diaryData.emotionLog?.userEmotionData,
          aiEmotion: diaryData.emotionLog?.aiEmotionData,
        });
        
        // 댓글 데이터 설정
        if (diaryData.comments) {
          console.log("받은 댓글 데이터:", diaryData.comments);
          setComments(diaryData.comments);
        }
      }
    } catch (error) {
      console.error("일기 상세 정보 가져오기 실패:", error);
    } finally {
      setLoadingDiary(false);
    }
  };

  // 페이지 포커스 시 최신 데이터 가져오기
  useFocusEffect(
    React.useCallback(() => {
      console.log("=== DiaryDetail 화면 포커스 ===");
      fetchDiaryDetail();
    }, [diaryId, diary?.id])
  );

  // 댓글 데이터 로드 (diary.comments 사용)
  useEffect(() => {
    if (diary?.comments) {
      console.log("=== 댓글 데이터 설정 ===");
      console.log("diary.comments:", diary.comments);
      setComments(diary.comments);
    }
  }, [diary]);

  if (!diary || loadingDiary) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
          <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
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

  // 댓글 제출 함수
  const handleSubmitComment = async (text) => {
    if (!text.trim()) return;
    
    try {
      setLoadingComments(true);
      console.log("=== 댓글 작성 시도 ===");
      console.log("일기 ID:", diary.id);
      console.log("댓글 내용:", text);
      
      const result = await createComment(diary.id, text);
      
      if (result.success) {
        console.log("댓글 작성 성공:", result.comment);
        
        // 새 댓글을 comments 배열에 추가
        const newComment = {
          id: result.comment.id,
          content: result.comment.content,
          createdAt: result.comment.createdAt,
          writer: {
            uid: result.comment.writer.uid,
            nick_name: result.comment.writer.nick_name,
            profile_image: result.comment.writer.profile_image
          }
        };
        
        setComments(prev => [...prev, newComment]);
        // Alert 제거 - 성공 시 별도 알림 없음
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      Alert.alert('실패', '댓글 작성에 실패했습니다.');
    } finally {
      setLoadingComments(false);
    }
  };

  // 댓글 삭제는 구현하지 않음 (요구사항에 따라)
  const handleDeleteComment = (commentId) => {
    // 삭제 기능 구현 안함
    Alert.alert('알림', '댓글 삭제 기능은 준비중입니다.');
  };

  // 이미지 클릭 핸들러
  const handleImagePress = (imageUrl) => {
    console.log('이미지 클릭:', imageUrl);
    setSelectedImageUrl(imageUrl);
    setShowImageModal(true);
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

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
          <HeaderBar showBackButton onBackPress={() => navigation.goBack()} />
          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
            <DiaryDetailSection
              diary={diary}
              isMine={isMine}
              emotions={emotions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onImagePress={handleImagePress}
              navigation={navigation}
            />

            {/* 댓글 섹션 - 항상 표시 (공개/비공개 상태는 내부에서 처리) */}
            <CommentListSection
              comments={comments}
              currentUserId={currentUserId}
              onSubmitComment={handleSubmitComment}
              onDeleteComment={handleDeleteComment}
              isPublic={diary.isPublic}
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
      
      {/* 이미지 모달 */}
      <ImageModal
        visible={showImageModal}
        imageUrl={selectedImageUrl}
        onClose={() => setShowImageModal(false)}
      />
    </View>
  );
};

export default DiaryDetail;