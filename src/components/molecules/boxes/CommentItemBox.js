import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ProfileThumbnail} from '../../atoms/thumbnail';
import { Feather } from '@expo/vector-icons';

const CommentItemBox = ({ comment, isMyComment = false, onDelete }) => {
    const { user, content, created_at } = comment; // createdAt → created_at

    return (
        <View style={styles.container}>
            {/* 프로필 썸네일 */}
            <ProfileThumbnail image={user.profile_img} small />

            {/* 내용 + 날짜 */}
            <View style={styles.contentBox}>
                <View style={styles.headerRow}>
                    <Text style={styles.nickname}>{user.nickname}</Text>
                    <Text style={styles.date}>{created_at}</Text>
                </View>
                <Text style={styles.content}>{content}</Text>
            </View>

            {/* 내 댓글일 경우만 삭제 버튼 */}
            {isMyComment && (
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => onDelete?.(comment.id)}
                >
                    <Feather name="trash-2" size={16} color="#999" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 4,
        gap: 12,
    },
    contentBox: {
        flex: 1,
        gap: 4,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nickname: {
        fontWeight: '600',
        fontSize: 14,
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    content: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
        marginTop: 2,
    },
    deleteButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        alignSelf: 'flex-start',
    },
});

export default CommentItemBox;