// components/molecules/DiaryInputBox.js
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const DiaryInputBox = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="오늘의 이야기를 자유롭게 써보세요..."
            multiline
            value={value}
            onChangeText={onChange}
            textAlignVertical="top"
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    input: {
        fontSize: 16,
        lineHeight: 22,
        minHeight: 120,
        color: '#333',
    },
});

export default DiaryInputBox;
