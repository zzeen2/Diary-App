import React, { useState, useEffect } from 'react';
import {View,StyleSheet,ScrollView,ImageBackground,SafeAreaView,Text, Alert, KeyboardAvoidingView,Platform,TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFormattedDate from '../../hooks/useFormattedDate';
import { HeaderBar } from '../molecules/headers';
import {DiaryImotionSection} from '../organisms/write';
import {DiaryInputBox, ImagePickerBox} from '../molecules/boxes';
import useDiarySubmit from '../../hooks/useDiarySubmit';
import { useSelector } from 'react-redux';
import { pickAndManipulateImageAsync } from '../../utils/imageUtils';

const DiaryWriteScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const today = new Date().toISOString();
  const formattedDate = useFormattedDate(today);

  const userEmotion = route.params?.emotion || null; 
  const emotionList = useSelector(state => state.emotions.emotions);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImageUris, setSelectedImageUris] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [aiEmotion, setAiEmotion] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  const { submit, loading, analyzeEmotion, uploadImage } = useDiarySubmit(); 

  useEffect(() => {
  }, [selectedImageUris, uploadedImageUrls]);

  const handleAnalyzeEmotion = async () => {
    const aiEmotionId = await analyzeEmotion(content); 

    if (aiEmotionId) {
      const matchedEmotion = emotionList.find(emo => emo.id === aiEmotionId); 
      
      if (matchedEmotion) {
        setAiEmotion(matchedEmotion);
        Alert.alert('감정 분석 완료', `AI가 당신의 감정을 '${matchedEmotion.name}'(${matchedEmotion.emoji})로 분석했어요!`);
      } else {
        Alert.alert('알림', `AI가 감정을 분석했지만, 해당 감정 정보를 불러올 수 없습니다.`);
        setAiEmotion(null);
      }
    } else {
      setAiEmotion(null);
      Alert.alert('오류', '감정 분석에 실패했습니다. 내용을 다시 확인해주세요.');
    }
  };

  const pickImage = async () => {
    if (selectedImageUris.length >= 5) {
      Alert.alert('사진 첨부 제한', '최대 5장까지 사진을 첨부할 수 있습니다.');
      return;
    }

    const manipulatedImage = await pickAndManipulateImageAsync({
    });

    if (manipulatedImage && manipulatedImage.uri) {
      const newManipulatedUri = manipulatedImage.uri;
      const updatedSelectedUris = [...selectedImageUris, newManipulatedUri];
      setSelectedImageUris(updatedSelectedUris);

      if (uploadImage) {
        try {
          const uploadedUrl = await uploadImage(newManipulatedUri); 
          if (uploadedUrl) {
            const updatedUploadedUrls = [...uploadedImageUrls, uploadedUrl];
            setUploadedImageUrls(updatedUploadedUrls);
          } else {
            Alert.alert('업로드 실패', '이미지 업로드에 실패했습니다. (서버 응답 없음)');
            setSelectedImageUris(prevUris => prevUris.filter(uri => uri !== newManipulatedUri));
          }
        } catch (error) {
          console.error('Image upload failed after manipulation:', error);
          Alert.alert('업로드 실패', '이미지 업로드 중 오류가 발생했습니다.');
          setSelectedImageUris(prevUris => prevUris.filter(uri => uri !== newManipulatedUri));
        }
      } else {
        console.warn('uploadImage function is not available. Using manipulated URI as placeholder.');
        const updatedUploadedUrls = [...uploadedImageUrls, newManipulatedUri];
        setUploadedImageUrls(updatedUploadedUrls);
      }
    } else {
      console.log('Image picking or manipulation was cancelled or failed.');
    }
  };

  const removeImage = (indexToRemove) => {
    const updatedSelectedUris = selectedImageUris.filter((_, index) => index !== indexToRemove);
    const updatedUploadedUrls = uploadedImageUrls.filter((_, index) => index !== indexToRemove);
    
    setSelectedImageUris(updatedSelectedUris);
    setUploadedImageUrls(updatedUploadedUrls);
  };

  const handleSubmit = () => {
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
      Alert.alert('감정 분석을 먼저 진행해주세요.');
      return;
    }
    if (!userEmotion?.id) {
      Alert.alert('사용자 감정을 선택해주세요.');
      return;
    }

    Alert.alert(
      '일기 저장 확인',
      `\n오늘의 감정: ${userEmotion?.emoji || ''} ${userEmotion?.name || ''}\nAI 감정: ${aiEmotion?.emoji || ''} ${aiEmotion?.name || ''}\n\n이대로 저장하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '저장하기',
          onPress: async () => {
            const submitData = {
              title,
              content,
              images: uploadedImageUrls,
              userEmotion: userEmotion?.id, 
              aiEmotion: aiEmotion?.id, 
              isPublic
            };
            
            const result = await submit(submitData);
            if (result && result.diary_id) {
                navigation.reset({
                  index: 0,
                  routes: [
                    { name: 'DiaryDetail', params: { diaryId: result.diary_id } }
                  ],
                });
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage} >
        <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
          <HeaderBar
            showBackButton
            showConfirmButton
            onBackPress={() => navigation.goBack()}
            onConfirmPress={handleSubmit}
            centerContent={<Text style={styles.date}>{formattedDate}</Text>}
            isLoading={loading} 
          />

          <View style={styles.divider} />

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={2} >
            <ScrollView contentContainerStyle={styles.content}>
              <DiaryImotionSection
                userEmotion={userEmotion}
                aiEmotion={aiEmotion}
                setAiEmotion={setAiEmotion} 
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                content={content}
                emotionList={emotionList}
                onAnalyzeEmotion={handleAnalyzeEmotion}
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

export default DiaryWriteScreen;