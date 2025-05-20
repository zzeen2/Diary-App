import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelectedEmotionBox = ({ emotion, onRecordPress, onWritePress }) => {
    return (
        <View style={[styles.container, { backgroundColor: emotion.color + '66' }]}>
        <Text style={styles.text}>
            {emotion.emoji} {emotion.name}한 기분이시군요!
        </Text>

        <View style={styles.buttons}>
            <TouchableOpacity style={styles.recordBtn} onPress={onRecordPress}>
            <Text style={styles.buttonText}>감정만 기록하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.writeBtn} onPress={onWritePress}>
            <Text style={styles.buttonText}>일기 작성하기</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    text: {
        fontSize: 15,
        color: '#333',
        fontWeight: '600',
        marginBottom: 12,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    recordBtn: {
        backgroundColor: '#ddd',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    writeBtn: {
        backgroundColor: '#b881c2',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
});

export default SelectedEmotionBox;
