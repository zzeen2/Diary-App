import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFormattedDate from '../../hooks/useFormattedDate';
import { HeaderBar } from '../molecules/headers';
import { DiaryImotionSection } from '../organisms/write';
import { DiaryInputBox, ImagePickerBox } from '../molecules/boxes';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmotions } from '../../actions/emotionAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickAndManipulateImageAsync } from '../../utils/imageUtils';
import { analyzeEmotion, uploadImageToServer } from '../../api/write';
import { updateDiary } from '../../api/diary';

const DiaryEditScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  const { diary, isEditMode } = route.params || {};

  const formattedDate = useFormattedDate(diary?.createdAt || new Date().toISOString());

  const emotionList = useSelector(state => state.emotions.emotions);
  
  const originalUserEmotion = diary?.userEmotion || 
                            diary?.emotionLog?.userEmotionData || 
                            diary?.emotionLog?.userEmotion ||
                            null;
  
  const [title, setTitle] = useState(diary?.title || '');
  const [content, setContent] = useState(diary?.content || '');
  const [selectedImageUris, setSelectedImageUris] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(diary?.images || []);
  const [aiEmotion, setAiEmotion] = useState(null);
  const [isPublic, setIsPublic] = useState(diary?.isPublic ?? true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!emotionList || emotionList.length === 0) {
      dispatch(fetchEmotions());
    }
  }, [dispatch, emotionList]);

  useEffect(() => {
    if (diary?.aiEmotion && emotionList.length > 0) {
      const existingAiEmotion = emotionList.find(emotion => 
        emotion.id === diary.aiEmotion?.id || emotion.id === diary.aiEmotion
      );
      if (existingAiEmotion) {
        setAiEmotion(existingAiEmotion);
      }
    }
  }, [diary, emotionList]);

  useEffect(() => {
    const convertLocalhostUrl = (url) => {
      if (typeof url === 'string' && url.includes('localhost:4000')) {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
        const serverMatch = apiUrl.match(/http:\/\/([^:]+):/);
        const serverIP = serverMatch ? serverMatch[1] : 'localhost';
        
        const convertedUrl = url.replace('localhost:4000', `${serverIP}:4000`);
        return convertedUrl;
      }
      return url;
    };
    
    if (diary?.images && Array.isArray(diary.images) && diary.images.length > 0) {
      const imageUris = diary.images.map((img, index) => {
        let imageUrl = img.image_url || img;
        imageUrl = convertLocalhostUrl(imageUrl);
        return imageUrl;
      });
      
      setSelectedImageUris(imageUris);
      
      const convertedUploadUrls = diary.images.map(img => {
        const originalUrl = img.image_url || img;
        return convertLocalhostUrl(originalUrl);
      });
      
      setUploadedImageUrls(convertedUploadUrls);
      
    } else {
      setSelectedImageUris([]);
      setUploadedImageUrls([]);
    }
  }, [diary]);

  const handleAnalyzeEmotion = async () => {
    if (!content.trim()) {
      Alert.alert('내용 없음', '일기 내용을 입력한 후 감정 분석을 진행해주세요.');
      return;
    }

    try {
      setLoading(true);
      const analyzedEmotionId = await analyzeEmotion(content);
      const matchedEmotion = emotionList.find(emo => emo.id === analyzedEmotionId);
      
      if (matchedEmotion) {
        setAiEmotion(matchedEmotion);
        Alert.alert(
          'AI 감정 분석 완료!', 
          `새로운 AI 감정 분석 결과: ${matchedEmotion.emoji} ${matchedEmotion.name}`
        );
      } else {
        Alert.alert('분석 실패', 'AI가 감정을 정확히 분석하지 못했어요. 다시 시도해보세요.');
      }
    } catch (error) {
      Alert.alert('분석 오류', '감정 분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    if (selectedImageUris.length >= 5) {
      Alert.alert('사진 첨부 제한', '최대 5장까지 사진을 첨부할 수 있습니다.');
      return;
    }

    const manipulatedImage = await pickAndManipulateImageAsync({
      // 필요하다면 여기에 조작 옵션을 전달합니다.
    });

    if (manipulatedImage && manipulatedImage.uri) {
      const newManipulatedUri = manipulatedImage.uri;
      setSelectedImageUris(prev => [...prev, newManipulatedUri]);

      try {
        const uploadedUrl = await uploadImageToServer(newManipulatedUri);
        if (uploadedUrl) {
          setUploadedImageUrls(prev => [...prev, uploadedUrl]);
        } else {
          Alert.alert('업로드 실패', '이미지 업로드에 실패했습니다. (서버 응답 없음)');
          setSelectedImageUris(prev => prev.filter(uri => uri !== newManipulatedUri));
        }
      } catch (error) {
        console.error('Image upload failed after manipulation:', error);
        Alert.alert('업로드 실패', '이미지 업로드 중 오류가 발생했습니다.');
        setSelectedImageUris(prev => prev.filter(uri => uri !== newManipulatedUri));
      }
    } else {
      console.log('Image picking or manipulation was cancelled or failed.');
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedSelectedUris = selectedImageUris.filter((_, index) => index !== indexToRemove);
    setSelectedImageUris(updatedSelectedUris);
    const updatedUploadedUrls = uploadedImageUrls.filter((_, index) => index !== indexToRemove);
    setUploadedImageUrls(updatedUploadedUrls);
  };

  const handleUpdate = async () => {
    if (loading) return;
    
    if (!title.trim()) {
      Alert.alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('내용을 입력해주세요.');
      return;
    }
    if (!aiEmotion) {
      Alert.alert('AI 감정 분석을 먼저 진행해주세요.');
      return;
    }

    Alert.alert(
      '수정 확인',
      `일기를 수정하시겠습니까?\n\n수정불가: ${originalUserEmotion ? `${originalUserEmotion.emoji} ${originalUserEmotion.name}` : '감정 없음'}\n새 AI감정: ${aiEmotion?.emoji} ${aiEmotion?.name}`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '수정하기',
          onPress: async () => {
            try {
              setLoading(true);
              
              const processedImages = uploadedImageUrls.map(img => {
                if (typeof img === 'string') {
                  return { image_url: img };
                }
                return img;
              });
              
              const updateData = {
                title,
                content,
                userEmotion: originalUserEmotion?.id,
                selectEmotion: aiEmotion?.id,
                is_public: isPublic,
                diary_img: processedImages
              };
              
              const result = await updateDiary(diary.id, updateData);
              
              Alert.alert('수정 완료', '일기가 성공적으로 수정되었습니다.', [
                {
                  text: '확인',
                  onPress: () => {
                    navigation.navigate('DiaryDetail', { 
                      diaryId: diary.id, 
                      shouldRefresh: true
                    });
                  }
                }
              ]);
            } catch (error) {
              Alert.alert('수정 실패', '일기 수정 중 오류가 발생했습니다.');
            } finally {
              setLoading(false);
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
          <HeaderBar
            showBackButton
            showConfirmButton
            onBackPress={() => navigation.goBack()}
            onConfirmPress={handleUpdate}
            centerContent={<Text style={styles.date}>{formattedDate}</Text>}
            isLoading={loading}
          />

          <View style={styles.divider} />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={2}
          >
            <ScrollView contentContainerStyle={styles.content}>
              <DiaryImotionSection
                userEmotion={originalUserEmotion}
                aiEmotion={aiEmotion}
                setAiEmotion={setAiEmotion}
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                content={content}
                emotionList={emotionList}
                onAnalyzeEmotion={handleAnalyzeEmotion}
                isEditMode={true}
              />
              
              <DiaryInputBox
                title={title}
                onChangeTitle={setTitle}
                content={content}
                onChangeContent={setContent}
              />
              
              <ImagePickerBox
                images={selectedImageUris}
                onPickImage={pickImage}
                onRemoveImage={removeImage}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
      
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#b881c2" />
          <Text style={styles.overlayText}>처리 중...</Text>
        </View>
      )}
    </View>
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
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#b881c2',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlayText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  }
});

export default DiaryEditScreen;
