// import React, { useState, useEffect } from 'react';
// import {View,StyleSheet,ScrollView,ImageBackground,SafeAreaView,Text, Alert, KeyboardAvoidingView,Platform,TouchableOpacity, ActivityIndicator } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import useFormattedDate from '../../hooks/useFormattedDate';
// import { HeaderBar } from '../molecules/headers';
// import {DiaryImotionSection} from '../organisms/write';
// import {DiaryInputBox, ImagePickerBox} from '../molecules/boxes';
// import useDiarySubmit from '../../hooks/useDiarySubmit';
// import { useSelector } from 'react-redux';
// import * as ImagePicker from 'expo-image-picker'; 

// const DiaryWriteScreen = ({ route, navigation }) => {
//   const insets = useSafeAreaInsets();
//   const today = new Date().toISOString();
//   const formattedDate = useFormattedDate(today);

//   const userEmotion = route.params?.emotion || null;
//   const emotionList = useSelector(state => state.emotions.emotions); // 감정리스트

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [selectedImageUris, setSelectedImageUris] = useState([]); // 선택한 이미지
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // 백엔드 전송
//   const [aiEmotion, setAiEmotion] = useState(null); // AI 분석 감정
//   const [isPublic, setIsPublic] = useState(true);

//   const { submit, loading, analyzeEmotion, uploadImage } = useDiarySubmit(); 

//   const handleAnalyzeEmotion = async () => {
//     const analyzedTextEmotion = await analyzeEmotion(content); // analyzeEmotion은 감정 단어(예: "행복")를 반환
//     const matchedEmotion = emotionList.find(emo => emo.name === analyzedTextEmotion);
//     setAiEmotion(matchedEmotion); 
//   };

//   // 이미지 업로드
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false, // 이미지 편집
//       aspect: [4, 3], // 비율
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setSelectedImageUris(prev => [...prev, uri]); // 로컬 URI 저장 
      
//       // 이미지 업로드 실행 및 URL 저장
//       const imageUrl = await uploadImage(uri); 
//       if (imageUrl) {
//         setUploadedImageUrls(prev => [...prev, imageUrl]); 
//       }
//     }
//   };

//   // 이미지 제거 
//   const removeImage = (indexToRemove) => {
//     const updatedSelectedUris = selectedImageUris.filter((_, index) => index !== indexToRemove);
//     setSelectedImageUris(updatedSelectedUris);
//     const updatedUploadedUrls = uploadedImageUrls.filter((_, index) => index !== indexToRemove);
//     setUploadedImageUrls(updatedUploadedUrls);
//   };


//   const handleSubmit = () => {
//     if (loading) return; // 로딩 중에는 중복 제출 방지
//     if (!title.trim()) {
//       Alert.alert('제목을 입력해주세요.');
//       return;
//     }
//     if (!content.trim()) {
//       Alert.alert('내용을 입력해주세요.');
//       return;
//     }
//     if (!aiEmotion) {
//       Alert.alert('감정 분석을 먼저 진행해주세요.');
//       return;
//     }

//     Alert.alert(
//       '일기 저장 확인',
//       `\n오늘의 감정: ${userEmotion?.emoji || ''} ${userEmotion?.name || ''}\nAI 감정: ${aiEmotion?.emoji || ''} ${aiEmotion?.name || ''}\n\n이대로 저장하시겠습니까?`,
//       [
//         { text: '취소', style: 'cancel' },
//         {
//           text: '저장하기',
//           onPress: () => {
//             submit({
//               title,
//               content,
//               images: uploadedImageUrls, // 업로드된 이미지 URL 배열 전달
//               userEmotion, // 사용자 선택 감정 객체 그대로 전달
//               aiEmotion: aiEmotion.id, // AI 감정은 이름만 전달
//               isPublic
//             });
//           }
//         }
//       ]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" backgroundColor="transparent" translucent />
//       <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage} >
//         <SafeAreaView style={styles.safeContainer}>
//           <HeaderBar
//             showBackButton
//             showConfirmButton
//             onBackPress={() => navigation.goBack()}
//             onConfirmPress={handleSubmit}
//             centerContent={<Text style={styles.date}>{formattedDate}</Text>}
//             isLoading={loading} // useDiarySubmit의 loading 상태를 HeaderBar에 전달
//           />

//           <View style={styles.divider} />

//           <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={2} >
//             <ScrollView contentContainerStyle={styles.content}>
//               <DiaryImotionSection
//                 userEmotion={userEmotion}
//                 aiEmotion={aiEmotion}
//                 setAiEmotion={setAiEmotion} 
//                 isPublic={isPublic}
//                 setIsPublic={setIsPublic}
//                 content={content}
//                 emotionList={emotionList}
//                 onAnalyzeEmotion={handleAnalyzeEmotion}
//               />
//               <DiaryInputBox
//                 title={title}
//                 onChangeTitle={setTitle}
//                 content={content}
//                 onChangeContent={setContent}
//               />
//               <ImagePickerBox
//                 images={selectedImageUris} 
//                 onPickImage={pickImage}
//                 onRemoveImage={removeImage} 
//               />
//             </ScrollView>
//           </KeyboardAvoidingView>
//         </SafeAreaView>
//       </ImageBackground>
//       {loading && ( 
//         <View style={styles.overlay}>
//           <ActivityIndicator size="large" color="#b881c2" />
//           <Text style={styles.overlayText}>처리 중...</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//   },
//   safeContainer: {
//     flex: 1,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.6)',
//     marginBottom: 8,
//   },
//   content: {
//     paddingHorizontal: 16,
//     paddingBottom: 100,
//   },
//   date: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#b881c2',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   overlayText: {
//     color: 'white',
//     marginTop: 10,
//     fontSize: 16,
//   }
// });

// export default DiaryWriteScreen;

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

  // 이미지 업로드 로직 (기존과 동일)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, 
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImageUris(prev => [...prev, uri]); 
      
      // 이미지 업로드 실행 및 URL 저장
      // useDiarySubmit 훅에 uploadImage가 있다면 해당 훅의 loading 상태도 공유
      const imageUrl = await uploadImage(uri); 
      if (imageUrl) {
        setUploadedImageUrls(prev => [...prev, imageUrl]); 
      }
    }
  };

  // 이미지 제거 로직 (기존과 동일)
  const removeImage = (indexToRemove) => {
    const updatedSelectedUris = selectedImageUris.filter((_, index) => index !== indexToRemove);
    setSelectedImageUris(updatedSelectedUris);
    const updatedUploadedUrls = uploadedImageUrls.filter((_, index) => index !== indexToRemove);
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
            const success = await submit({
              title,
              content,
              images: uploadedImageUrls,
              // userEmotion은 Emotion.id(영어)를 전달해야 합니다.
              // route.params.emotion이 Emotion 객체라면 .id에 접근합니다.
              userEmotion: userEmotion?.id, 
              // aiEmotion은 이제 Emotion 객체이므로 .id에 접근하여 전달합니다.
              aiEmotion: aiEmotion?.id, 
              isPublic
            });
            if (success) {
                // 일기 저장 성공 후 처리 (예: 이전 화면으로 돌아가기)
                navigation.goBack(); 
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