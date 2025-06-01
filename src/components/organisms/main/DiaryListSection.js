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
        limitedEntries.map((entry) => {
          let userEmotionData = null;
          let aiEmotionData = null;

          if (entry.userEmotion) {
            userEmotionData = entry.userEmotion;
          } else if (entry.primaryEmotion) {
            if (typeof entry.primaryEmotion === 'string' || typeof entry.primaryEmotion === 'number') {
              userEmotionData = findEmotion(entry.primaryEmotion);
            } else {
              userEmotionData = entry.primaryEmotion;
            }
          }

          if (entry.aiEmotion) {
            aiEmotionData = entry.aiEmotion;
          } else if (entry.secondaryEmotion) {
            if (typeof entry.secondaryEmotion === 'string' || typeof entry.secondaryEmotion === 'number') {
              aiEmotionData = findEmotion(entry.secondaryEmotion);
            } else {
              aiEmotionData = entry.secondaryEmotion;
            }
          }

          const CardComponent = isFriend ? FriendDiaryCard : DiaryCard;

          return (
            <CardComponent
              key={entry.id}
              entry={entry}
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