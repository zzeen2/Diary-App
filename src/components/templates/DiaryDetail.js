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
  const { diary: initialDiary, isMine, diaryId, shouldRefresh } = route.params || {};
  
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  const emotionsState = useSelector((state) => state.emotions);
  const emotions = emotionsState?.emotions || [];
  const emotionsLoading = emotionsState?.loading || false;
  
  useEffect(() => {
    if (!emotions || emotions.length === 0) {
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
        }
      } catch (error) {
      }
    };
    loadCurrentUserId();
  }, []);

  const fetchDiaryDetail = async () => {
    try {
      setLoadingDiary(true);
      const id = diary?.id || diaryId;
      
      const response = await axios.get(`${EXPO_PUBLIC_API_URL}/detail/${id}`);
      
      if (response.data.success && response.data.diary) {
        const diaryData = response.data.diary;
        
        let userInfo = diary?.user;
        
        if (!userInfo && diaryData.writer) {
          userInfo = {
            uid: diaryData.writer.uid,
            id: diaryData.writer.uid,
            nickname: diaryData.writer.nick_name,
            nick_name: diaryData.writer.nick_name,
            profile_img: diaryData.writer.profile_image,
            profile_image: diaryData.writer.profile_image,
          };
        }
        
        setDiary({
          ...diaryData,
          isPublic: diaryData.is_public,
          userEmotion: diaryData.emotionLog?.userEmotionData,
          aiEmotion: diaryData.emotionLog?.aiEmotionData,
          user: userInfo,
        });
        
        if (diaryData.comments) {
          setComments(diaryData.comments);
        }
      }
    } catch (error) {
    } finally {
      setLoadingDiary(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDiaryDetail();
    }, [diaryId, diary?.id])
  );

  useEffect(() => {
    if (diary?.comments) {
      setComments(diary.comments);
    }
  }, [diary]);

  if (!diary || loadingDiary) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
          <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
            <HeaderBar showBackButton onBackPress={() => navigation.navigate('Main')} />
            <View style={styles.divider} />
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>일기를 불러오는 중...</Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }

  const handleSubmitComment = async (text) => {
    if (!text.trim()) return;
    
    try {
      setLoadingComments(true);
      const result = await createComment(diary.id, text);
      
      if (result.success) {
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
      }
    } catch (error) {
      Alert.alert('실패', '댓글 작성에 실패했습니다.');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleDeleteComment = (commentId) => {
    Alert.alert('알림', '댓글 삭제 기능은 준비중입니다.');
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const handleEdit = () => {
    navigation.navigate('DiaryEdit', { 
      diary: diary,
      isEditMode: true
    });
  };

  const handleDelete = async () => {
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
              const result = await deleteDiary(diary.id);
              Alert.alert('삭제 완료', '일기가 성공적으로 삭제되었습니다.', [
                {
                  text: '확인',
                  onPress: () => {
                    navigation.navigate('listDiary');
                  }
                }
              ]);
            } catch (error) {
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
          <HeaderBar showBackButton onBackPress={() => navigation.navigate('Main')} />
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

            <CommentListSection
              comments={comments}
              currentUserId={currentUserId}
              onSubmitComment={handleSubmitComment}
              onDeleteComment={handleDeleteComment}
              isPublic={diary.isPublic}
              navigation={navigation}
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
      
      <ImageModal
        visible={showImageModal}
        imageUrl={selectedImageUrl}
        onClose={() => setShowImageModal(false)}
      />
    </View>
  );
};

export default DiaryDetail;