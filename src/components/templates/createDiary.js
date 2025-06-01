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
import * as ImagePicker from 'expo-image-picker'; 

const DiaryWriteScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const today = new Date().toISOString();
  const formattedDate = useFormattedDate(today);

  // route.params.emotion이 이미 Emotion 객체({id: 'grateful', name: '감사', ...})라고 가정합니다.
  const userEmotion = route.params?.emotion || null; 
  const emotionList = useSelector(state => state.emotions.emotions); // Redux 스토어의 전체 감정 리스트 (Emotion 객체 배열)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImageUris, setSelectedImageUris] = useState([]); // 선택한 이미지 URI (로컬)
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // 서버에 업로드된 이미지 URL
  const [aiEmotion, setAiEmotion] = useState(null); // AI 분석 감정 (Emotion 객체)
  const [isPublic, setIsPublic] = useState(true);

  // useDiarySubmit 훅에서 uploadImage도 사용된다면 여기에 포함
  const { submit, loading, analyzeEmotion, uploadImage } = useDiarySubmit(); 

  // 이미지 상태 변경 감지
  useEffect(() => {
    console.log('=== DiaryWriteScreen 이미지 상태 변경 ===');
    console.log('selectedImageUris:', selectedImageUris);
    console.log('selectedImageUris 길이:', selectedImageUris.length);
    console.log('uploadedImageUrls:', uploadedImageUrls);
    console.log('uploadedImageUrls 길이:', uploadedImageUrls.length);
  }, [selectedImageUris, uploadedImageUrls]);

  const handleAnalyzeEmotion = async () => {
    // analyzeEmotion 훅은 이제 'sad'와 같은 Emotion.id(영어)를 반환합니다.
    const aiEmotionId = await analyzeEmotion(content); 

    if (aiEmotionId) {
      // emotionList (Redux 스토어의 감정 객체 배열)에서 해당 ID를 가진 감정 객체를 찾습니다.
      const matchedEmotion = emotionList.find(emo => emo.id === aiEmotionId); 
      
      if (matchedEmotion) {
        setAiEmotion(matchedEmotion); // 찾은 Emotion 객체 전체를 상태에 저장
        Alert.alert('감정 분석 완료', `AI가 당신의 감정을 '${matchedEmotion.name}'(${matchedEmotion.emoji})로 분석했어요!`);
      } else {
        // Redux 스토어의 emotionList에 AI가 반환한 ID에 해당하는 감정이 없는 경우
        console.warn(`⚠️ 경고: AI 감정 ID '${aiEmotionId}'에 해당하는 감정 객체를 Redux 스토어에서 찾을 수 없습니다. UI에 표시되지 않을 수 있습니다.`);
        Alert.alert('알림', `AI가 감정을 분석했지만, 해당 감정 정보를 불러올 수 없습니다.`);
        setAiEmotion(null); // 찾지 못하면 null로 설정
      }
    } else {
      setAiEmotion(null); // 분석 실패 시 null로 설정
      Alert.alert('오류', '감정 분석에 실패했습니다. 내용을 다시 확인해주세요.');
    }
  };

  // 이미지 선택 로직 (수정됨)
  const pickImage = async () => {
    console.log('=== DiaryWriteScreen pickImage 호출 ===');
    console.log('pickImage 호출 전 selectedImageUris:', selectedImageUris);
    console.log('pickImage 호출 전 uploadedImageUrls:', uploadedImageUrls);
    
    // 이미지 개수 제한 확인
    if (selectedImageUris.length >= 5) {
      Alert.alert('사진 첨부 제한', '최대 5장까지 사진을 첨부할 수 있습니다.');
      return;
    }
    
    // 이미지 선택 로직
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      console.log('선택한 새 이미지 URI:', newUri);
      
      // 로컬 URI 배열에 추가
      const updatedSelectedUris = [...selectedImageUris, newUri];
      console.log('업데이트될 selectedImageUris:', updatedSelectedUris);
      
      setSelectedImageUris(updatedSelectedUris);
      
      // 이미지를 서버에 업로드 (uploadImage 함수가 있다면)
      if (uploadImage) {
        console.log('서버에 이미지 업로드 시작:', newUri);
        try {
          const uploadedUrl = await uploadImage(newUri);
          console.log('서버 업로드 완료:', uploadedUrl);
          
          const updatedUploadedUrls = [...uploadedImageUrls, uploadedUrl];
          console.log('업데이트될 uploadedImageUrls:', updatedUploadedUrls);
          setUploadedImageUrls(updatedUploadedUrls);
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          Alert.alert('업로드 실패', '이미지 업로드에 실패했습니다.');
          // 업로드 실패 시 로컬 URI도 제거
          setSelectedImageUris(selectedImageUris);
        }
      } else {
        // uploadImage 함수가 없으면 로컬 URI를 그대로 사용
        console.log('uploadImage 함수가 없어서 로컬 URI 사용');
        const updatedUploadedUrls = [...uploadedImageUrls, newUri];
        setUploadedImageUrls(updatedUploadedUrls);
      }
      
      // 상태 업데이트 후 확인
      setTimeout(() => {
        console.log('상태 업데이트 후 selectedImageUris:', selectedImageUris);
        console.log('상태 업데이트 후 uploadedImageUrls:', uploadedImageUrls);
      }, 100);
    }
  };

  // 이미지 제거 로직 (수정됨)
  const removeImage = (indexToRemove) => {
    console.log('=== DiaryWriteScreen removeImage 호출 ===');
    console.log('제거할 인덱스:', indexToRemove);
    console.log('제거 전 selectedImageUris:', selectedImageUris);
    console.log('제거 전 uploadedImageUrls:', uploadedImageUrls);
    
    const updatedSelectedUris = selectedImageUris.filter((_, index) => index !== indexToRemove);
    const updatedUploadedUrls = uploadedImageUrls.filter((_, index) => index !== indexToRemove);
    
    console.log('제거 후 selectedImageUris:', updatedSelectedUris);
    console.log('제거 후 uploadedImageUrls:', updatedUploadedUrls);
    
    setSelectedImageUris(updatedSelectedUris);
    setUploadedImageUrls(updatedUploadedUrls);
  };

  const handleSubmit = () => {
    console.log('=== DiaryWriteScreen handleSubmit 호출 ===');
    console.log('submit 시점의 selectedImageUris:', selectedImageUris);
    console.log('submit 시점의 uploadedImageUrls:', uploadedImageUrls);
    console.log('submit 시점의 title:', title);
    console.log('submit 시점의 content:', content);
    console.log('submit 시점의 userEmotion:', userEmotion);
    console.log('submit 시점의 aiEmotion:', aiEmotion);
    
    if (loading) return; 
    if (!title.trim()) {
      Alert.alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('내용을 입력해주세요.');
      return;
    }
    if (!aiEmotion) { // aiEmotion은 이제 Emotion 객체 또는 null
      Alert.alert('감정 분석을 먼저 진행해주세요.');
      return;
    }
    if (!userEmotion?.id) { // userEmotion도 id가 있는지 확인 (필수라면)
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
          onPress: async () => { // async 추가
            console.log('=== submit 함수 호출 직전 ===');
            console.log('전달할 이미지 데이터:', uploadedImageUrls);
            
            const submitData = {
              title,
              content,
              images: uploadedImageUrls, // 서버 업로드된 URL 또는 로컬 URI
              userEmotion: userEmotion?.id, 
              aiEmotion: aiEmotion?.id, 
              isPublic
            };
            
            console.log('submit 함수로 전달할 전체 데이터:', submitData);
            
            const result = await submit(submitData);
            if (result && result.diary_id) {
                // 일기 저장 성공 후 상세 페이지로 이동
                navigation.replace('DiaryDetail', { 
                  diaryId: result.diary_id,
                  isMine: true,
                  shouldRefresh: true // 새로 작성한 일기이므로 최신 데이터 불러오기
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
        <SafeAreaView style={styles.safeContainer}>
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
                userEmotion={userEmotion} // userEmotion 객체 그대로 전달 (UI 표시용)
                aiEmotion={aiEmotion} // aiEmotion 객체 그대로 전달 (UI 표시용)
                setAiEmotion={setAiEmotion} 
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                content={content}
                emotionList={emotionList} // DiaryImotionSection 내부에서 감정 매핑이 필요하다면 전달
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