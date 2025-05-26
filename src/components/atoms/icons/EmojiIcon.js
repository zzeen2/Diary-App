import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EmojiIcon = ({ emoji, color, isSelected = false, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
        <View style={[styles.icon,{ backgroundColor: color },isSelected && styles.selected]}>
            <Text style={styles.emoji}>{emoji}</Text>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        margin: 4,
    },
    icon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
    },
    emoji: {
        fontSize: 20,
    },
    selected: {
        borderWidth: 2,
        borderColor: '#b881c2',
    },
});

export default EmojiIcon;
