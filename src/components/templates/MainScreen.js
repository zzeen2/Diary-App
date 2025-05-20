import React, { useState } from 'react';
import {StyleSheet,ScrollView, View, ImageBackground,SafeAreaView,Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useFormmatedDate from '../../hooks/useFormattedDate';

import  {HeaderBar}  from '../molecules'
import { EmotionSelector, DiaryListSection, TabBar } from '../organisms';
//console.log(EmotionSelector)
console.log('HeaderBar:', HeaderBar);

const emotionIcons = [
  { id: 'happy', emoji: '😊', color: '#FFEAA7', name: '행복' },
  { id: 'sad', emoji: '😢', color: '#A3D8F4', name: '슬픔' },
  { id: 'angry', emoji: '😠', color: '#FFB7B7', name: '분노' },
  { id: 'calm', emoji: '😌', color: '#B5EAD7', name: '평온' },
  { id: 'anxious', emoji: '😰', color: '#C7CEEA', name: '불안' },
  { id: 'tired', emoji: '😴', color: '#E2D8F3', name: '피곤' },
  { id: 'excited', emoji: '🤩', color: '#FFD8BE', name: '신남' },
  { id: 'confused', emoji: '🤔', color: '#D8E2DC', name: '혼란' },
  { id: 'grateful', emoji: '🤗', color: '#F0E6EF', name: '감사' },
];

const diaryEntries = [
  {
    id: 1,
    title: '봄 날씨와 함께한 산책',
    date: '2025.05.17',
    content: '날씨가 너무 좋아서 한강 공원을 산책했다. 날씨가 너무 좋아서 한강 공원을 산책했다. 날씨가 너무 좋아서 한강 공원을 산책했다',
    primaryEmotion: 'happy',
    secondaryEmotion: 'calm',
    isPublic: true,
  },
  {
    id: 2,
    title: '업무에 대한 고민',
    date: '2025.05.16',
    content: '프로젝트 마감이 다가오는데 걱정이다...',
    primaryEmotion: 'happy',
    isPublic: true,
  },
  {
      id: 3,
      title: '업무에 대한 고민',
      date: '2025.05.16',
      content: '프로젝트 마감이 다가오는데 걱정이다...',
      primaryEmotion: 'anxious',
      secondaryEmotion: 'calm',
      isPublic: false,
    },
    {
        id: 4,
        title: '봄 날씨와 함께한 산책',
        date: '2025.05.17',
        content: '날씨가 너무 좋아서 한강 공원을 산책했다...',
        primaryEmotion: 'happy',
        secondaryEmotion: 'calm',
        isPublic: false,
    },
];

const friendDiaryEntries = [
  {
    id: 1,
    userId: 'user1',
    userName: '민지',
    userProfile: '../assets/cloud3.png',
    title: '집에서 요리해본 날',
    date: '2025.05.18',
    content: '오늘은 파스타를 만들어봤다...',
    primaryEmotion: 'happy',
    // secondaryEmotion: 'excited',
    isPublic: true,
  },
  {
    id: 2,
    userId: 'user2',
    userName: '수진',
    userProfile: '../assets/cloud3.png',
    title: '시험 끝난 후의 해방감',
    date: '2025.05.17',
    content: '드디어 기말고사가 끝났다! 시험 끝난 후의 해방감 시험 끝난 후의 해방감 시험 끝난 후의 해방감 시험 끝난 후의 해방감 시험 끝난 후의 해방감',
    primaryEmotion: 'excited',
    secondaryEmotion: 'angry',
    isPublic: true,
  },
];

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
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
    greetingBox: {
        marginTop: 10,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
});


const MainScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const findEmotion = (id) => emotionIcons.find(e => e.id === id);
  
  // 날짜 포멧팅
  const today = new Date().toISOString();
  const displayDate = useFormmatedDate(today)

  const writeHandler = () => {
    if (selectedEmotion) {
      navigation.navigate('createDiary', { emotion: selectedEmotion });
    }
  };

  const recordHandler = () => {
    console.log(`${selectedEmotion.name} 감정만 저장`);
    // 감정 저장 로직
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />

      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeContainer}>
          <HeaderBar title="홈" streakText="🔥 3일 연속 기록 중" />

          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}
          >
            {/* 날짜 인사 */}
            <View style={styles.greetingBox}>
              <Text style={styles.dateText}>{displayDate}</Text>
              <Text style={styles.greetingText}>김지은님! 👋</Text>
              <Text style={styles.greetingText}>오늘의 감정은 어떤가요?</Text>
            </View>

            {/* 감정 선택 영역 */}
            <EmotionSelector 
              emotionIcons={emotionIcons}
              selectedEmotion={selectedEmotion}
              onSelectEmotion={setSelectedEmotion}
              onWritePress={writeHandler}
              onRecordPress={recordHandler}
            />

            {/* 내 일기 */}
            <DiaryListSection
              title="📓 나의 최근 일기"
              entries={diaryEntries}
              findEmotion={findEmotion}
              maxCount={4}
              onPressSeeMore={() => console.log('내 일기 더보기')}
              onPressCard={(entry) => console.log(entry.title)}
            />

            {/* 친구 일기 */}
            <DiaryListSection
              title="👥 친구들의 일기"
              entries={friendDiaryEntries}
              findEmotion={findEmotion}
              isFriend
              onPressSeeMore={() => console.log('친구 일기 더보기')}
              onPressCard={(entry) => console.log(entry.title)}
            />
          </ScrollView>

          {/* 하단 탭 바 */}
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MainScreen;
