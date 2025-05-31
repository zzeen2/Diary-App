import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HeaderBar } from '../molecules/headers';
import { TabBar } from '../organisms/TabBar';
import EmotionStatsSection from '../organisms/stats/EmotionStatsSection';
import StreakSection from '../organisms/stats/StreakSection';
import { getEmotionStats, getStreakStats } from '../../api/stats';

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

const StatsTemplate = ({ navigation, emotions, onTabChange }) => {
  console.log('=== StatsTemplate 렌더링 시작 ===');
  const insets = useSafeAreaInsets();
  const [statsData, setStatsData] = useState([]);
  const [streakData, setStreakData] = useState({});
  const [loading, setLoading] = useState(true);

  console.log('현재 상태:', {
    statsData,
    streakData,
    loading,
    statsDataLength: Array.isArray(statsData) ? statsData.length : 'not array',
    streakDataKeys: Object.keys(streakData),
  });

  useEffect(() => {
    console.log('=== StatsTemplate useEffect 시작 ===');
    const fetchStats = async () => {
      console.log('📊 통계 데이터 fetch 시작...');
      setLoading(true);
      try {
        console.log('🔄 API 호출 중...');
        const [emotionStats, streakStats] = await Promise.all([
          getEmotionStats(),
          getStreakStats(),
        ]);
        
        console.log('✅ API 응답 성공!');
        console.log('📈 emotionStats:', JSON.stringify(emotionStats, null, 2));
        console.log('🔥 streakStats:', JSON.stringify(streakStats, null, 2));
        
        setStatsData(emotionStats);
        setStreakData(streakStats);
        
        console.log('✅ 상태 업데이트 완료');
      } catch (error) {
        console.error('❌ 통계 API 에러:', error);
        console.error('❌ 에러 메시지:', error.message);
        console.error('❌ 에러 스택:', error.stack);
        setStatsData([]);
        setStreakData({});
      } finally {
        setLoading(false);
        console.log('✅ 통계 데이터 fetch 완료');
      }
    };
    fetchStats();
  }, []);

  // 상태 변화 감지
  useEffect(() => {
    console.log('📊 statsData 변화 감지:', statsData);
  }, [statsData]);

  useEffect(() => {
    console.log('🔥 streakData 변화 감지:', streakData);
  }, [streakData]);

  useEffect(() => {
    console.log('⏳ loading 변화 감지:', loading);
  }, [loading]);

  console.log('=== StatsTemplate 렌더링 준비 완료 ===');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}> 
          <HeaderBar title="통계" />

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            {console.log('🎨 EmotionStatsSection 렌더링, 데이터:', statsData)}
            <EmotionStatsSection emotionData={statsData} />
            
            {console.log('🎨 StreakSection 렌더링, 데이터:', streakData)}
            <StreakSection streakData={streakData} />
          </ScrollView>

          <TabBar
            tabs={tabs}
            activeTab="stats"
            onTabPress={(tabId) => {
              console.log('📱 탭 클릭:', tabId);
              onTabChange?.(tabId);
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: '100%' },
  safeContainer: { flex: 1 },
  scrollView: { flex: 1 },
  content: {
    paddingBottom: 80,
    paddingHorizontal: 16,
    gap: 20,
  },
});

export default StatsTemplate;
