import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ProfileThumbnail} from '../../atoms/thumbnail';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';

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

    const handleProfilePress = async () => {
        if (writer && navigation) {
            let writerUid = writer.uid || writer.id;
            const writerNickname = writer.nick_name || writer.nickname || writer.name;
            console.log('프로필 클릭: writerUid:', writerUid, 'writer:', writer);
            if (!writerUid && writerNickname) {
                // 닉네임으로 uid 조회
                try {
                    const res = await axios.get(`${EXPO_PUBLIC_API_URL}/login/search/users`, {
                        params: { q: writerNickname }
                    });
                    const users = res.data.users || [];
                    // 완전 일치하는 닉네임 찾기
                    const user = users.find(u => u.nick_name === writerNickname);
                    writerUid = user?.uid;
                } catch (e) {
                    writerUid = undefined;
                }
            }
            if (!writerUid) {
                alert('프로필 정보를 불러올 수 없습니다. (작성자 ID 없음)');
                return;
            }
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