import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ProfileThumbnail} from '../../atoms/thumbnail';
import { Feather } from '@expo/vector-icons';

const CommentItemBox = ({ comment, isMyComment = false, onDelete, navigation }) => {
    const writer = comment.writer || comment.user;
    const content = comment.content;
    const createdAt = comment.createdAt || comment.created_at;
    
    const profileImage = writer?.profile_image || writer?.profile_img || writer?.profileImage || writer?.img_url;
    const nickname = writer?.nick_name || writer?.nickname || writer?.name;
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\. /g, '.').replace(/\.$/, '');
        } catch (error) {
            return dateString;
        }
    };

    const handleProfilePress = () => {
        if (writer && navigation) {
            const writerUid = writer.uid || writer.id;
            const writerNickname = writer.nick_name || writer.nickname || writer.name;
            navigation.navigate('UserProfile', {
                uid: writerUid,
                nickname: writerNickname
            });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleProfilePress} activeOpacity={0.7}>
                <ProfileThumbnail image={profileImage} small />
            </TouchableOpacity>

            <View style={styles.contentBox}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleProfilePress} activeOpacity={0.7}>
                        <Text style={styles.nickname}>{nickname || '익명'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.date}>{formatDate(createdAt)}</Text>
                </View>
                <Text style={styles.content}>{content}</Text>
            </View>

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