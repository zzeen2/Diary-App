import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HeaderBar } from '../molecules/headers';
import { TabBar } from '../organisms/TabBar';
import EmotionStatsSection from '../organisms/stats/EmotionStatsSection';
import StreakSection from '../organisms/stats/StreakSection';
import { getEmotionStats, getStreakStats } from '../../api/stats';
import { getCalendarEmotions } from '../../api/diary';
import { useSelector } from 'react-redux';

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
  const [calendarEmotions, setCalendarEmotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 전체 감정 기록을 여러 달 반복 호출해서 합치기
  async function fetchAllCalendarEmotions() {
    const now = new Date();
    let allEmotions = [];
    for (let i = 0; i < 12; i++) { // 최근 12개월
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const yearMonth = `${year}-${month}`;
      try {
        const data = await getCalendarEmotions(yearMonth);
        console.log('getCalendarEmotions 응답:', yearMonth, data);
        allEmotions = allEmotions.concat(data);
      } catch (e) {
        console.log('calendarEmotions API 실패:', yearMonth, e);
      }
      now.setMonth(now.getMonth() - 1);
    }
    // 중복 날짜 제거 (가장 최근 기록만 남김)
    const unique = {};
    allEmotions.forEach(e => {
      unique[e.date] = e;
    });
    const result = Object.values(unique);
    console.log('최종 allCalendarEmotions:', result);
    return result;
  }

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const emotionStats = await getEmotionStats();
        const sortedUserEmotions = (emotionStats?.userEmotions || []).sort((a, b) => (b.count || 0) - (a.count || 0));
        const sortedAiEmotions = (emotionStats?.aiEmotions || []).sort((a, b) => (b.count || 0) - (a.count || 0));
        setUserEmotionData(sortedUserEmotions);
        setAiEmotionData(sortedAiEmotions);
        // 전체 감정 기록 합치기
        const allCalendarEmotions = await fetchAllCalendarEmotions();
        setCalendarEmotions(allCalendarEmotions);
      } catch (error) {
        setUserEmotionData([]);
        setAiEmotionData([]);
        setCalendarEmotions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // 감정 기록 기준 streak 계산 함수
  function calculateStreaks(calendarEmotions) {
    console.log('calculateStreaks 호출됨, calendarEmotions:', calendarEmotions);
    if (!Array.isArray(calendarEmotions) || calendarEmotions.length === 0) return { currentStreak: 0, bestStreak: 0, totalDays: 0 };
    const dateSet = new Set(calendarEmotions.map(e => e.date));
    const allDates = Array.from(dateSet).sort();
    // 디버깅용 콘솔
    const now = new Date();
    const KST_OFFSET = 9 * 60 * 60 * 1000;
    const koreaNow = new Date(now.getTime() + KST_OFFSET);
    let day = new Date(koreaNow);
    const todayStr = day.toISOString().split('T')[0];
    console.log('streak 계산용 오늘 날짜:', todayStr);
    console.log('calendarEmotions 날짜들:', Array.from(dateSet));
    let bestStreak = 0;
    let currentStreak = 0;
    let totalDays = dateSet.size;
    while (true) {
      const dateStr = day.toISOString().split('T')[0];
      if (dateSet.has(dateStr)) {
        currentStreak += 1;
        day.setDate(day.getDate() - 1);
      } else {
        break;
      }
    }
    let streak = 0;
    let prevDate = null;
    for (let i = 0; i < allDates.length; i++) {
      const d = allDates[i];
      if (!prevDate) {
        streak = 1;
      } else {
        const prev = new Date(prevDate);
        const curr = new Date(d);
        prev.setDate(prev.getDate() + 1);
        if (prev.toISOString().split('T')[0] === curr.toISOString().split('T')[0]) {
          streak += 1;
        } else {
          streak = 1;
        }
      }
      if (streak > bestStreak) bestStreak = streak;
      prevDate = d;
    }
    return { currentStreak, bestStreak, totalDays };
  }

  const streakData = calculateStreaks(calendarEmotions);

  // calendarEmotions를 감정별로 집계하는 함수
  function aggregateCalendarEmotions(calendarEmotions) {
    if (!Array.isArray(calendarEmotions) || calendarEmotions.length === 0) return [];
    const emotionMap = {};
    calendarEmotions.forEach(e => {
      if (!e.userEmotion) return;
      const key = e.userEmotion.id || e.userEmotion.name;
      if (!emotionMap[key]) {
        emotionMap[key] = {
          id: e.userEmotion.id,
          name: e.userEmotion.name,
          emoji: e.userEmotion.emoji,
          color: e.userEmotion.color,
          count: 0,
        };
      }
      emotionMap[key].count += 1;
    });
    // count 내림차순 정렬
    return Object.values(emotionMap).sort((a, b) => (b.count || 0) - (a.count || 0));
  }

  // calendarEmotions 집계 결과
  const calendarEmotionStats = aggregateCalendarEmotions(calendarEmotions);

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
              title="👤 내 감정 통계 (감정 기록 기준)" 
              emotionData={userEmotionData} 
            />
            
            <EmotionStatsSection 
              title="🤖 AI 감정 분석 (일기 기준)" 
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
