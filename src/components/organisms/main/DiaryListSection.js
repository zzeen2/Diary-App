import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionTitle from '../../atoms/TextsAndLabel/SectionTitle';
import { DiaryCard, FriendDiaryCard } from '../../molecules/cards';

const DiaryListSection = ({ title, entries, isFriend = false, findEmotion, onPressSeeMore, onPressCard, maxCount = 4, }) => {
  const limitedEntries = entries.slice(0, maxCount);

  return (
    <View style={styles.container}>
      <SectionTitle title={title} onPressSeeMore={onPressSeeMore} />

      {limitedEntries.map((entry) => {
        // 백엔드에서 받은 emotion 객체를 직접 사용
        // primaryEmotion: entry.emotion 객체 자체가 EmotionTag에서 필요한 속성(id, name, emoji, color)을 가지고 있어야 함
        const primaryEmotion = entry.emotion || {}; 
        const secondaryEmotion = null; 

        const CardComponent = isFriend ? FriendDiaryCard : DiaryCard;

        return (
          <CardComponent
            key={entry.id}
            entry={entry}
            primaryEmotion={primaryEmotion}
            secondaryEmotion={secondaryEmotion}
            onPress={() => onPressCard?.(entry)}
          />
        );
      })}
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
});

export default DiaryListSection;