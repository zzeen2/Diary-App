import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {EmojiIcon} from '../../atoms/icons'

const EmotionFilterGroup = ({ emotions, selectedEmotion, onSelectEmotion }) => {
    //console.log(emotions) // emotion 배열 잘 가져옴

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {emotions.map((emotion) => (
            <EmojiIcon key={emotion.id} emoji={emotion.emoji} color={emotion.color} isSelected={selectedEmotion === emotion.id} onPress={() => onSelectEmotion(selectedEmotion === emotion.id ? null : emotion.id)} />
        ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 8,
        // width: '100%'
    },
});

export default EmotionFilterGroup;
