import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { HeaderBar } from '../molecules/headers';
import { TabBar } from '../organisms/TabBar';
import EmotionStatsSection from '../organisms/stats/EmotionStatsSection';
import StreakSection from '../organisms/stats/StreakSection';

const tabs = [
  { id: 'home', icon: '🏠', label: '홈' },
  { id: 'diary', icon: '📔', label: '일기장' },
  { id: 'stats', icon: '📊', label: '통계' },
  { id: 'profile', icon: '👤', label: '프로필' },
];

const StatsTemplate = ({ navigation, emotions, statsData, streakData, onTabChange }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <SafeAreaView style={[styles.safeContainer, { paddingTop: insets.top }]}>
          <HeaderBar title="통계" />

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            <EmotionStatsSection emotions={emotions} stats={statsData} />
            <StreakSection data={streakData} />
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
    paddingBottom: 80,
    paddingHorizontal: 16,
    gap: 20,
  },
});

export default StatsTemplate;
