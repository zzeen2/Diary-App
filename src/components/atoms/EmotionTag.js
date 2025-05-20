import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmotionTag = ({ emoji, name, backgroundColor }) => {
    return (
        <View style={[styles.tag, { backgroundColor }]}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    emoji: {
        fontSize: 14,
        marginRight: 4,
    },
    name: {
        fontSize: 12,
        color: '#555',
    },
});

export default EmotionTag;
