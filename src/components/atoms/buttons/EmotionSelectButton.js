import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const EmotionSelectButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>선택</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 50,
        marginLeft: 10,
    },
    text: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
});

export default EmotionSelectButton;
