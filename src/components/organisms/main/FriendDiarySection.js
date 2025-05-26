import React from 'react';
import { View, StyleSheet } from 'react-native';
import SectionTitle from '../../atoms/Texts/SectionTitle';
import DiaryCard from '../../molecules/cards'
import FriendDiaryCard from '../../molecules/cards';

const DiaryListSection = ({ title,entries,isFriend = false,findEmotion,onPressSeeMore, onPressCard}) => {
    return (
        <View style={styles.container}>
        <SectionTitle title={title} onPressSeeMore={onPressSeeMore} />

        {entries.map((entry) => {
            const primaryEmotion = findEmotion(entry.primaryEmotion);
            const secondaryEmotion = entry.secondaryEmotion ? findEmotion(entry.secondaryEmotion) : null;

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
