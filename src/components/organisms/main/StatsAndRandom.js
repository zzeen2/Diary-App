import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DiaryCard } from '../../molecules/cards';

const KEY_COLOR = '#b881c2';
const SUB_BG = '#F8F4FF';

const StatsAndRandom = ({ randomDiary, onRandomPress, onViewRandom, loading }) => {
  return (
    <View style={styles.sectionWrap}>
      <View style={styles.card}>
        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>오늘은 이미 일기를 작성했어요!</Text>
          <Text style={styles.noticeSubText}>지난 추억을 돌아볼까요?</Text>
        </View>

        <View style={styles.randomBox}>
          <View style={styles.randomHeader}>
            <Text style={styles.randomTitle}>🎲 추억의 일기</Text>
            <TouchableOpacity onPress={onRandomPress} disabled={loading} style={styles.refreshBtn}>
              <Text style={styles.refreshButton}>🔄</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={KEY_COLOR} />
            </View>
          ) : randomDiary ? (
            <DiaryCard
              entry={randomDiary}
              userEmotion={randomDiary.userEmotion}
              aiEmotion={randomDiary.aiEmotion}
              onPress={() => onViewRandom(randomDiary)}
            />
          ) : (
            <View style={styles.emptyRandom}>
              <Text style={styles.emptyText}>아직 작성한 일기가 없어요</Text>
              <Text style={styles.emptySubText}>첫 일기를 작성해보세요!</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrap: {
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  card: {
    backgroundColor: SUB_BG,
    borderRadius: 22,
    padding: 20,
    shadowColor: KEY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  noticeBox: {
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: SUB_BG,
  },
  noticeText: {
    fontSize: 16,
    color: KEY_COLOR,
    fontWeight: '700',
    marginBottom: 2,
  },
  noticeSubText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  randomBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  randomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  randomTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  refreshBtn: {
    backgroundColor: SUB_BG,
    borderRadius: 16,
    padding: 4,
  },
  refreshButton: {
    fontSize: 18,
  },
  loadingContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyRandom: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  emptySubText: {
    fontSize: 12,
    color: '#999',
  },
});

export default StatsAndRandom; 