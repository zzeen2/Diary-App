import React, { useState } from 'react';
import {View,StyleSheet,ScrollView,ImageBackground,SafeAreaView,Text, Alert, KeyboardAvoidingView,Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFormattedDate from '../../hooks/useFormattedDate';
import { HeaderBar } from '../molecules/headers';
import {DiaryImotionSection} from '../organisms/write';
import {DiaryInputBox, ImagePickerBox} from '../molecules/boxes';
import useDiarySubmit from '../../hooks/useDiarySubmit';
import { useSelector } from 'react-redux';

console.log(' DiaryImotionSection:', DiaryImotionSection);
console.log(' DiaryInputBox:', DiaryInputBox);
console.log(' ImagePickerBox:', ImagePickerBox);

const DiaryWriteScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const today = new Date().toISOString();
  const formattedDate = useFormattedDate(today);

  // 메인페이지에서 선택된 감정
  const userEmotion = route.params?.emotion || null;
  const emotionList = useSelector(state => ({emotions: state.emotions, loading: state.loading, }));
  //console.log(' emotionList:', emotionList);
  // 입력 상태
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [aiEmotion, setAiEmotion] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  const { submit, loading } = useDiarySubmit();

  const handleSubmit = () => {
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

    Alert.alert(
      '일기 저장 확인',
      `한 번 저장된 감정은 수정할 수 없습니다.\n\n오늘의 감정: ${userEmotion.emoji} ${userEmotion.name}\nAI 감정: ${aiEmotion.emoji} ${aiEmotion.name}\n\n이대로 저장하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '저장하기',
          onPress: () => { submit({ title,content, images, userEmotion,aiEmotion,isPublic});
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
          <HeaderBar showBackButton showConfirmButton onBackPress={() => navigation.goBack()} onConfirmPress={handleSubmit} centerContent={<Text style={styles.date}>{formattedDate}</Text>} />

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
                emotionList={emotionList.emotions}
              />
              <DiaryInputBox
                title={title}
                onChangeTitle={setTitle}
                content={content}
                onChangeContent={setContent}
              />
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
