import React, { useState } from 'react';
import { View,StyleSheet,ScrollView,ImageBackground, SafeAreaView, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFormattedDate from '../../hooks/useFormattedDate';
import { HeaderBar } from '../molecules';
import DiaryImotionSection from '../organisms/DiaryImotionSection';
import DiaryInputBox from '../molecules/DiaryInputBox';
import ImagePickerBox from '../molecules/ImagePickerBox';
import useDiarySubmit from '../../hooks/useDiarySubmit';

const DiaryWriteScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();

  const today = new Date().toISOString();
  const formattedDate = useFormattedDate(today);

  // 메인페이지에서 넘긴 감정 
  const primaryEmotion = route.params?.emotion || null;

  // 입력 상태
const [title, setTitle] = useState('');
const [content, setContent] = useState(''); 
  const [images, setImages] = useState([]);
  const [secondaryEmotion, setSecondaryEmotion] = useState(null);
  const [rawSecondaryEmotion, setRawSecondaryEmotion] = useState(null);
  const [isAiEdited, setIsAiEdited] = useState(false); // ai가 분석한 감정
  const [isPublic, setIsPublic] = useState(true);

  const { submit, loading } = useDiarySubmit(); 

  const handleSubmit = () => {
    if (!text.trim()) { // 내용이 없을 경우 
      // 내용없이 감정만 저장할건지 물어보는 모달 
      return;
    }

    submit({ text, images, primaryEmotion, secondaryEmotion, isPublic, });

    navigation.goBack(); // 성공 시 뒤로
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeContainer}>
          {/* 상단 헤더 */}
          <HeaderBar showBackButton showConfirmButton onBackPress={() => navigation.goBack()} onConfirmPress={handleSubmit}centerContent={<Text style={styles.date}>{formattedDate}</Text>} />

          <View style={styles.divider} />

          {/* 본문 콘텐츠 */}
          <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={2}>
            <ScrollView contentContainerStyle={styles.content}>
              <DiaryImotionSection primaryEmotion={primaryEmotion} secondaryEmotion={secondaryEmotion} setSecondaryEmotion={setSecondaryEmotion} rawSecondaryEmotion={rawSecondaryEmotion} setRawSecondaryEmotion={setRawSecondaryEmotion} isAiEdited={isAiEdited} setIsAiEdited={setIsAiEdited} isPublic={isPublic} setIsPublic={setIsPublic}/>
              <DiaryInputBox title={title} onChangeTitle={setTitle} content={content} onChangeContent = {setContent}  />
              <ImagePickerBox images={images} setImages={setImages} />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
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
});

export default DiaryWriteScreen;
