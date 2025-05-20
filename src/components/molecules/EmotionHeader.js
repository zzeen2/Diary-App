import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ToggleSwitch} from '../atoms';

const EmotionHeader = ({ isPublic, onToggle }) => {
    return (
        <View style={styles.header}>
        <Text style={styles.title}>오늘의 감정</Text>
        <ToggleSwitch value={isPublic} onToggle={onToggle} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
    },
});

export default EmotionHeader;
