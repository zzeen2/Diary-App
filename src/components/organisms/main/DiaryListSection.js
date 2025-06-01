import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SectionTitle from '../../atoms/TextsAndLabel/SectionTitle';
import { DiaryCard, FriendDiaryCard } from '../../molecules/cards';
import { Feather } from '@expo/vector-icons';

const DiaryListSection = ({ 
  title, 
  entries, 
  isFriend = false, 
  findEmotion, 
  onPressSeeMore, 
  onPressCard, 
  maxCount = 4,
  emptyMessage,
  emptySubMessage,
  onEmptyButtonPress,
  emptyButtonText = '친구 찾기'
}) => {
  const limitedEntries = entries.slice(0, maxCount);

  return (
    <View style={styles.container}>
      <SectionTitle title={title} onPressSeeMore={onPressSeeMore} />

      {entries.length === 0 && emptyMessage ? (
        // 친구 일기가 없을 때 표시할 UI
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
          {emptySubMessage && (
            <Text style={styles.emptySubText}>{emptySubMessage}</Text>
          )}
          {onEmptyButtonPress && (
            <TouchableOpacity 
              style={styles.searchButton} 
              onPress={onEmptyButtonPress}
              activeOpacity={0.7}
            >
              <Feather name="search" size={18} color="#fff" />
              <Text style={styles.searchButtonText}>{emptyButtonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        // 일기 카드 목록
        limitedEntries.map((entry) => {
          // ⭐ 디버깅 로그 추가 ⭐
          //console.log(`=== Entry ID: ${entry.id} ===`);
          //console.log('전체 entry 객체:', JSON.stringify(entry, null, 2));
          
          // 감정 데이터 처리
          let userEmotionData = null;
          let aiEmotionData = null;

          // ⭐ 여러 가능한 데이터 구조에 대응 ⭐
          if (entry.userEmotion) {
            // 이미 완전한 감정 객체가 있는 경우
            userEmotionData = entry.userEmotion;
            //console.log('userEmotion 직접 사용:', userEmotionData);
          } else if (entry.primaryEmotion) {
            // primaryEmotion이 ID인 경우 findEmotion으로 찾기
            if (typeof entry.primaryEmotion === 'string' || typeof entry.primaryEmotion === 'number') {
              userEmotionData = findEmotion(entry.primaryEmotion);
              //console.log('primaryEmotion ID로 찾은 결과:', userEmotionData);
            } else {
              // primaryEmotion이 이미 객체인 경우
              userEmotionData = entry.primaryEmotion;
              //console.log('primaryEmotion 객체 직접 사용:', userEmotionData);
            }
          }

          if (entry.aiEmotion) {
            // 이미 완전한 감정 객체가 있는 경우
            aiEmotionData = entry.aiEmotion;
            //console.log('aiEmotion 직접 사용:', aiEmotionData);
          } else if (entry.secondaryEmotion) {
            // secondaryEmotion이 ID인 경우 findEmotion으로 찾기
            if (typeof entry.secondaryEmotion === 'string' || typeof entry.secondaryEmotion === 'number') {
              aiEmotionData = findEmotion(entry.secondaryEmotion);
              console.log('secondaryEmotion ID로 찾은 결과:', aiEmotionData);
            } else {
              // secondaryEmotion이 이미 객체인 경우
              aiEmotionData = entry.secondaryEmotion;
              //console.log('secondaryEmotion 객체 직접 사용:', aiEmotionData);
            }
          }

          //console.log('최종 userEmotionData:', userEmotionData);
          //console.log('최종 aiEmotionData:', aiEmotionData);

          const CardComponent = isFriend ? FriendDiaryCard : DiaryCard;

          return (
            <CardComponent
              key={entry.id}
              entry={entry}
              // ⭐ DiaryCard가 기대하는 prop 이름으로 전달 ⭐
              userEmotion={userEmotionData}
              aiEmotion={aiEmotionData}
              onPress={() => onPressCard?.(entry)}
            />
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 13,
    color: '#999',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#b881c2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#b881c2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 6,
  },
});

export default DiaryListSection;