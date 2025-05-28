import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ProfileThumbnail} from '../../atoms/thumbnail';
import { Feather } from '@expo/vector-icons';

const CommentItemBox = ({ comment, isMyComment = false, onDelete }) => {
    const { user, content, createdAt } = comment;

    return (
        <View style={styles.container}>
        {/* 프로필 썸네일 */}
        <ProfileThumbnail image={user.profile_img} small />
        {/* <ProfileThumbnail image={user.profile_img} nickname={user.nickname} small /> */}

        {/* 내용 + 날짜 */}
        <View style={styles.contentBox}>
            <Text style={styles.nickname}>{user.nickname}</Text>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.date}>{createdAt}</Text>
        </View>

        {/* 내 댓글일 경우만 삭제 버튼 */}
        {isMyComment && (
            <TouchableOpacity onPress={() => onDelete?.(comment.id)}>
            <Feather name="trash-2" size={16} color="#bbb" />
            </TouchableOpacity>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
        gap: 10,
    },
    contentBox: {
        flex: 1,
    },
    nickname: {
        fontWeight: '600',
        fontSize: 13,
        color: '#444',
    },
    content: {
        fontSize: 13,
        color: '#333',
        marginVertical: 2,
    },
    date: {
        fontSize: 11,
        color: '#aaa',
    },
});

export default CommentItemBox;
