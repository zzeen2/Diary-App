import React, { useState } from 'react';
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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useFormattedDate from '../../hooks/useFormattedDate';
import { HeaderBar } from '../molecules/headers';
import { DiaryInputBox, ImagePickerBox } from '../molecules/boxes';
import SelectedEmotionTag from '../molecules/SelectedEmotionTag';

const EditDiaryScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { diary } = route.params;
  const formattedDate = useFormattedDate(diary.date);
  const userEmotion = diary.primaryEmotionData; // 감정 객체 (emoji, name, color 포함)

  const [title, setTitle] = useState(diary.title || '');
  const [content, setContent] = useState(diary.content || '');
  const [images, setImages] = useState(diary.images || []);
  const isPublic = diary.isPublic;

  const handleUpdate = () => {
    if (!title.trim()) {
      Alert.alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    Alert.alert('수정 확인', '일기를 수정하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '수정하기',
        onPress: () => {
          // TODO: 수정 API 호출
          console.log('수정된 데이터:', { title, content, images });
          navigation.goBack();
        },
      },
    ]);
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
          />
          <View style={styles.divider} />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={2}
          >
            <ScrollView contentContainerStyle={styles.content}>
              <SelectedEmotionTag emotion={userEmotion} />
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

export default EditDiaryScreen;
