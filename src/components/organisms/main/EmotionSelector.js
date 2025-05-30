import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {EmojiIcon} from '../../atoms/icons';
import {SelectedEmotionBox} from '../../molecules/boxes';

const EmotionSelector = ({ emotionIcons =[], selectedEmotion, onSelectEmotion, onWritePress, onRecordPress }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.sectionText}>
            오늘의 감정을 선택하고 자유롭게 이야기를 들려주세요!
        </Text>

        <View style={styles.grid}>
            {emotionIcons.map((emotion) => (
            <EmojiIcon
                key={emotion.id}
                emoji={emotion.emoji}
                color={emotion.color}
                isSelected={selectedEmotion?.id === emotion.id}
                onPress={() => onSelectEmotion(emotion)}
            />
            ))}
        </View>

        {selectedEmotion && (
            <SelectedEmotionBox
            emotion={selectedEmotion}
            onRecordPress={onRecordPress}
            onWritePress={onWritePress}
            />
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
});

export default EmotionSelector;
