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
import * as ImagePicker from 'expo-image-picker';
import { analyzeEmotion, uploadImageToServer } from '../../api/write';
import { updateDiary } from '../../api/diary';

const DiaryEditScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  // 수정할 일기 데이터
  const { diary, isEditMode } = route.params || {};
  console.log("=== DiaryEdit 진입 ===");
  console.log("수정할 diary:", diary);
  console.log("isEditMode:", isEditMode);

  // 날짜 포맷팅 - 수정시에는 원본 날짜 사용
  const formattedDate = useFormattedDate(diary?.createdAt || new Date().toISOString());

  const emotionList = useSelector(state => state.emotions.emotions);
  console.log("감정 리스트:", emotionList);

  // 🔒 수정 불가능한 항목 (읽기 전용)
  // diary 객체 구조 확인
  console.log("=== DiaryEdit userEmotion 확인 ===");
  console.log("diary 전체:", diary);
  console.log("diary.userEmotion:", diary?.userEmotion);
  console.log("diary.emotionLog:", diary?.emotionLog);
  console.log("diary.emotionLog?.userEmotionData:", diary?.emotionLog?.userEmotionData);
  
  // 다양한 경로에서 userEmotion 찾기
  const originalUserEmotion = diary?.userEmotion || 
                            diary?.emotionLog?.userEmotionData || 
                            diary?.emotionLog?.userEmotion ||
                            null;
  
  console.log("최종 originalUserEmotion:", originalUserEmotion);

  // ✅ 수정 가능한 항목들
  const [title, setTitle] = useState(diary?.title || '');
  const [content, setContent] = useState(diary?.content || '');
  const [selectedImageUris, setSelectedImageUris] = useState([]); // 화면에 표시할 이미지
  const [uploadedImageUrls, setUploadedImageUrls] = useState(diary?.images || []); // 서버 업로드된 이미지
  const [aiEmotion, setAiEmotion] = useState(null); // AI 분석 감정 - 재분석 가능
  const [isPublic, setIsPublic] = useState(diary?.isPublic ?? true); // 공개 범위
  const [loading, setLoading] = useState(false);

  console.log("초기 상태값들:");
  console.log("title:", title);
  console.log("content:", content);
  console.log("originalUserEmotion:", originalUserEmotion);
  console.log("isPublic:", isPublic);
  console.log("기존 이미지들:", uploadedImageUrls);

  // 감정 리스트 로드
  useEffect(() => {
    if (!emotionList || emotionList.length === 0) {
      console.log("감정 리스트가 비어있어서 다시 fetch합니다.");
      dispatch(fetchEmotions());
    }
  }, [dispatch, emotionList]);

  // 기존 AI 감정 설정
  useEffect(() => {
    if (diary?.aiEmotion && emotionList.length > 0) {
      // 기존 AI 감정을 초기값으로 설정
      const existingAiEmotion = emotionList.find(emotion => 
        emotion.id === diary.aiEmotion?.id || emotion.id === diary.aiEmotion
      );
      if (existingAiEmotion) {
        setAiEmotion(existingAiEmotion);
        console.log("기존 AI 감정 설정:", existingAiEmotion);
      }
    }
  }, [diary, emotionList]);

  // 기존 이미지들을 화면에 표시할 형태로 변환
  useEffect(() => {
    console.log("=== DiaryEdit 이미지 초기화 ===");
    console.log("diary?.images:", diary?.images);
    console.log("diary?.images 타입:", typeof diary?.images);
    console.log("diary?.images는 배열:", Array.isArray(diary?.images));
    
    // 새로 추가: diary 전체 구조 확인
    console.log("diary 전체 객체:", JSON.stringify(diary, null, 2));
    
    // diary.images가 비어있어도 다른 곳에 이미지 정보가 있는지 확인
    if (diary) {
      // 다양한 이미지 데이터 소스 확인
      const possibleImageSources = [
        { name: 'diary.images', value: diary.images },
        { name: 'diary.diary_img', value: diary.diary_img },
        { name: 'diary.image_urls', value: diary.image_urls },
      ];
      
      possibleImageSources.forEach(source => {
        console.log(`${source.name}:`, source.value);
      });
    }
    
    // localhost URL을 실제 서버 IP로 변환하는 함수
    const convertLocalhostUrl = (url) => {
      if (typeof url === 'string' && url.includes('localhost:4000')) {
        // 환경변수에서 서버 정보 추출
        const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
        const serverMatch = apiUrl.match(/http:\/\/([^:]+):/);
        const serverIP = serverMatch ? serverMatch[1] : 'localhost';
        
        const convertedUrl = url.replace('localhost:4000', `${serverIP}:4000`);
        console.log(`URL 변환: ${url} → ${convertedUrl}`);
        console.log(`사용된 서버 IP: ${serverIP} (from ${apiUrl})`);
        return convertedUrl;
      }
      return url;
    };
    
    // 이미지 배열이 있는지 확인 (빈 배열이 아닌 경우)
    if (diary?.images && Array.isArray(diary.images) && diary.images.length > 0) {
      console.log("이미지 배열 길이:", diary.images.length);
      console.log("각 이미지 항목들:", diary.images);
      
      // 서버 URL을 로컬 표시용으로도 사용 + localhost 변환
      const imageUris = diary.images.map((img, index) => {
        let imageUrl = img.image_url || img;
        imageUrl = convertLocalhostUrl(imageUrl); // localhost 변환
        console.log(`이미지 ${index}:`, imageUrl);
        return imageUrl;
      });
      
      setSelectedImageUris(imageUris);
      
      // uploadedImageUrls도 변환된 URL로 설정
      const convertedUploadUrls = diary.images.map(img => {
        const originalUrl = img.image_url || img;
        return convertLocalhostUrl(originalUrl);
      });
      
      setUploadedImageUrls(convertedUploadUrls);
      
      console.log("설정된 selectedImageUris:", imageUris);
      console.log("설정된 uploadedImageUrls:", convertedUploadUrls);
    } else {
      console.log("이미지가 없거나 배열이 아니거나 빈 배열입니다");
      console.log("초기화: selectedImageUris = [], uploadedImageUrls = []");
      setSelectedImageUris([]);
      setUploadedImageUrls([]);
    }
  }, [diary]);

  // AI 감정 재분석 함수
  const handleAnalyzeEmotion = async () => {
    console.log("=== AI 감정 재분석 시작 ===");
    console.log("분석할 내용:", content);
    
    if (!content.trim()) {
      Alert.alert('내용 없음', '일기 내용을 입력한 후 감정 분석을 진행해주세요.');
      return;
    }

    try {
      setLoading(true);
      // 분리된 API 함수 사용
      const analyzedEmotionId = await analyzeEmotion(content);
      console.log("AI 분석 결과 (Emotion ID):", analyzedEmotionId);
      
      // ID로 emotionList에서 매칭되는 감정 객체 찾기
      const matchedEmotion = emotionList.find(emo => emo.id === analyzedEmotionId);
      console.log("매칭된 감정 객체:", matchedEmotion);
      
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
      console.error("감정 분석 오류:", error);
      Alert.alert('분석 오류', '감정 분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 이미지 추가
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("=== 새 이미지 선택 ===");
      console.log("선택된 이미지 URI:", uri);
      
      // 화면에 즉시 표시
      setSelectedImageUris(prev => {
        const updated = [...prev, uri];
        console.log("업데이트된 selectedImageUris:", updated);
        return updated;
      });
      
      try {
        console.log("이미지 업로드 시작:", uri);
        const imageUrl = await uploadImageToServer(uri);
        console.log("이미지 업로드 완료:", imageUrl);
        
        if (imageUrl) {
          // 서버 업로드 완료 후 URL 배열 업데이트
          setUploadedImageUrls(prev => {
            const updated = [...prev, imageUrl];
            console.log("업데이트된 uploadedImageUrls:", updated);
            return updated;
          });
        }
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        Alert.alert('업로드 실패', '이미지 업로드에 실패했습니다.');
        
        // 업로드 실패 시 화면에서 제거
        setSelectedImageUris(prev => prev.filter(img => img !== uri));
      }
    }
  };

  // 이미지 제거
  const removeImage = (indexToRemove) => {
    const updatedSelectedUris = selectedImageUris.filter((_, index) => index !== indexToRemove);
    setSelectedImageUris(updatedSelectedUris);
    const updatedUploadedUrls = uploadedImageUrls.filter((_, index) => index !== indexToRemove);
    setUploadedImageUrls(updatedUploadedUrls);
  };

  // 수정 저장
  const handleUpdate = async () => {
    console.log("=== 수정 저장 시작 ===");
    
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
              
              console.log("=== 수정 저장 시 이미지 데이터 확인 ===");
              console.log("selectedImageUris:", selectedImageUris);
              console.log("uploadedImageUrls:", uploadedImageUrls);
              
              // 이미지 데이터를 올바른 형태로 준비
              const processedImages = uploadedImageUrls.map(img => {
                // 이미 객체 형태라면 그대로, 문자열이라면 객체로 변환
                if (typeof img === 'string') {
                  return { image_url: img };
                }
                return img;
              });
              
              console.log("처리된 이미지 데이터:", processedImages);
              
              const updateData = {
                title,
                content,
                userEmotion: originalUserEmotion?.id, // 원본 사용자 감정 유지
                selectEmotion: aiEmotion?.id, // 새로 분석된 AI 감정
                is_public: isPublic,
                diary_img: processedImages // 처리된 이미지 데이터 사용
              };
              
              console.log("수정 API로 전송할 데이터:", updateData);
              
              const result = await updateDiary(diary.id, updateData);
              console.log("수정 성공:", result);
              
              Alert.alert('수정 완료', '일기가 성공적으로 수정되었습니다.', [
                {
                  text: '확인',
                  onPress: () => {
                    // 상세페이지로 돌아가면서 데이터 새로고침을 위해 파라미터 전달
                    navigation.navigate('DiaryDetail', { 
                      diaryId: diary.id, 
                      shouldRefresh: true // 새로고침 플래그
                    });
                  }
                }
              ]);
            } catch (error) {
              console.error("수정 실패:", error);
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
        <SafeAreaView style={styles.safeContainer}>
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
                userEmotion={originalUserEmotion} // 🔒 읽기 전용으로 표시
                aiEmotion={aiEmotion} // ✅ 재분석 가능
                setAiEmotion={setAiEmotion}
                isPublic={isPublic} // ✅ 수정 가능
                setIsPublic={setIsPublic}
                content={content}
                emotionList={emotionList}
                onAnalyzeEmotion={handleAnalyzeEmotion}
                isEditMode={true} // 수정 모드임을 알려줌
              />
              
              <DiaryInputBox
                title={title} // ✅ 수정 가능
                onChangeTitle={setTitle}
                content={content} // ✅ 수정 가능
                onChangeContent={setContent}
              />
              
              <ImagePickerBox
                images={selectedImageUris} // ✅ 수정 가능
                onPickImage={pickImage}
                onRemoveImage={removeImage}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
      
      {/* 로딩 오버레이 */}
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
