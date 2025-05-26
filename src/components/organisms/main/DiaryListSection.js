import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionTitle from '../../atoms/Texts/SectionTitle';
import {DiaryCard, FriendDiaryCard} from '../../molecules/cards';

const DiaryListSection = ({ title, entries, isFriend = false,findEmotion,onPressSeeMore, onPressCard,maxCount = 4,}) => {
  const limitedEntries = entries.slice(0, maxCount); // 

  return (
    <View style={styles.container}>
      <SectionTitle title={title} onPressSeeMore={onPressSeeMore} />

      {limitedEntries.map((entry) => {
        const primaryEmotion = findEmotion(entry.primaryEmotion);
        const secondaryEmotion = entry.secondaryEmotion ? findEmotion(entry.secondaryEmotion) : null;
            //console.log(' entry.id:', entry.id);
            //console.log('  entry.primaryEmotion:', entry.primaryEmotion);
            //console.log('  matched:', primaryEmotion);

        const CardComponent = isFriend ? FriendDiaryCard : DiaryCard;
          //console.log(' entry.primaryEmotion:', entry.primaryEmotion);
            //console.log(' matched primary:', primaryEmotion);
            //console.log('secondary emotion : ', entries)
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
