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
  const insets = useSafeAreaInsets();
  const [userEmotionData, setUserEmotionData] = useState([]);
  const [aiEmotionData, setAiEmotionData] = useState([]);
  const [streakData, setStreakData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [emotionStats, streakStats] = await Promise.all([
          getEmotionStats(),
          getStreakStats(),
        ]);
        
        const sortedUserEmotions = (emotionStats?.userEmotions || []).sort((a, b) => (b.count || 0) - (a.count || 0));
        const sortedAiEmotions = (emotionStats?.aiEmotions || []).sort((a, b) => (b.count || 0) - (a.count || 0));
        
        setUserEmotionData(sortedUserEmotions);
        setAiEmotionData(sortedAiEmotions);
        setStreakData(streakStats);
        
      } catch (error) {
        setUserEmotionData([]);
        setAiEmotionData([]);
        setStreakData({});
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
  }, [userEmotionData]);

  useEffect(() => {
  }, [aiEmotionData]);

  useEffect(() => {
  }, [streakData]);

  useEffect(() => {
  }, [loading]);


  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}> 
          <HeaderBar title="통계" onlyTitle={true} />
          <View style={styles.divider} />

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            <EmotionStatsSection 
              title="👤 내 감정 통계" 
              emotionData={userEmotionData} 
            />
            
            <EmotionStatsSection 
              title="🤖 AI 감정 분석" 
              emotionData={aiEmotionData} 
            />
            
            <StreakSection streakData={streakData} />
          </ScrollView>

          <TabBar
            tabs={tabs}
            activeTab="stats"
            onTabPress={(tabId) => {
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
    paddingTop: 20,
    paddingBottom: 80,
    paddingHorizontal: 0,
    gap: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginVertical: 1,
  },
});

export default StatsTemplate;
