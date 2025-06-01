import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {EmojiIcon} from '../../atoms/icons'; 

const PublicDiaryCard = ({ entry, findEmotion, onPress }) => {
    const { title, date, primaryEmotion, secondaryEmotion } = entry;

    const emotions = [
        findEmotion(primaryEmotion),
        secondaryEmotion ? findEmotion(secondaryEmotion) : null,
    ].filter(Boolean);

    return (
        <TouchableOpacity onPress={() => onPress?.(entry)} style={styles.container} activeOpacity={0.7}>
            <View style={styles.card}>
                <View style={styles.leftSection}>
                    <View style={styles.emotions}>
                        {emotions.map((emotion) => (
                            <View key={emotion.id} style={styles.emojiWrapper}>
                                <EmojiIcon
                                    emoji={emotion.emoji}
                                    color={emotion.color}
                                    isSelected={false}
                                />
                            </View>
                        ))}
                        {emotions.length === 1 && <View style={styles.emptyEmojiSpace} />}
                    </View>
                </View>

                <View style={styles.contentSection}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={styles.date}>{date}</Text>
                </View>

                <View style={styles.rightSection}>
                    <View style={styles.arrow}>
                        <Text style={styles.arrowText}>›</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
    },
    leftSection: {
        marginRight: 16,
    },
    emotions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    emojiWrapper: {
        marginLeft: -4,
        marginRight: -4,
    },
    emptyEmojiSpace: {
        width: 42,
        height: 42,
    },
    contentSection: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        lineHeight: 22,
        marginBottom: 4,
    },
    date: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
    },
    rightSection: {
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(184, 129, 194, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowText: {
        fontSize: 18,
        color: '#b881c2',
        fontWeight: '600',
    },
});

export default PublicDiaryCard;