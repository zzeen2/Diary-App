import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const DiaryInputBox = ({ title, onChangeTitle, content, onChangeContent }) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputTitle} placeholder="오늘 이야기의 제목을 써주세요..." value={title} onChangeText={onChangeTitle} textAlignVertical="center" maxLength={40} />
            <View style={styles.divider} />
            <TextInput style={styles.inputContent} placeholder="오늘의 이야기를 자유롭게 써보세요..." multiline value={content} onChangeText={onChangeContent}textAlignVertical="top" />
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
    inputTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        height: 40,
        marginBottom: 8,
    },
    inputContent: {
        fontSize: 16,
        lineHeight: 22,
        minHeight: 160,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 3,
    },
});

export default DiaryInputBox;
