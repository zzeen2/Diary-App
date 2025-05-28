import React, { useState, useEffect } from 'react';
import {StyleSheet,ScrollView, View, ImageBackground,SafeAreaView,Text} from 'react-native';
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

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

const DiaryDetail = ({ route, navigation }) => {
  const { diary, isMine } = route.params;
// console.log('💡 diary:', diary);
// console.log('🧍 diary.user:', diary.user);
// const refinedDiary = {
//   ...diary,
//   user: {
//     id: diary.userId,
//     nickname: diary.userName,
//     profile_img: require('../../assets/cloud3.png'), // 또는 diary.userProfile 경로 맞게 처리
//   },
  
// };
//console.log("refd", refinedDiary)
  const insets = useSafeAreaInsets();
  const emotions = useSelector((state) => state.emotions);
  const currentUserId = 1; // 추후 로그인 정보에서 가져오기

  const [comments, setComments] = useState([
    {
      id: 1,
      content: '와 너무 공감돼요!',
      created_at: '2025.05.30',
      user: { id: 2, nickname: '민지', profile_img: require('../../assets/IMG_3349.jpg') },
    },
    {
      id: 2,
      content: '멋져요 💜',
      created_at: '2025.05.30',
      user: { id: 1, nickname: '나', profile_img: require('../../assets/IMG_3349.jpg') },
    },
  ]);

  const handleSubmitComment = (text) => {
    const newComment = {
      id: Date.now(),
      content: text,
      created_at: '2025.05.30',
      user: { id: currentUserId, nickname: '나', profile_img: require('../../assets/IMG_3349.jpg') },
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
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
      paddingTop: insets.top,
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
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeContainer}>
          <HeaderBar showBackButton onBackPress={() => navigation.goBack()} />
          <View style={styles.divider} />

          <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
            <DiaryDetailSection
              diary={diary}
              isMine={isMine}
              emotions={emotions}
              onEdit={() => navigation.navigate('EditDiary', { diary })}
              onDelete={() => {
                console.log('삭제');
                navigation.goBack();
              }}
            />

            <CommentListSection
              comments={comments}
              currentUserId={currentUserId}
              onSubmitComment={handleSubmitComment}
              onDeleteComment={handleDeleteComment}
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
    </View>
  );
};

export default DiaryDetail;