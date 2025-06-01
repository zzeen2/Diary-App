import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {ProfileThumbnail} from '../../atoms/thumbnail';
import { Feather } from '@expo/vector-icons';

const CommentItemBox = ({ comment, isMyComment = false, onDelete, navigation }) => {
    // 백엔드 데이터 구조에 맞게 수정
    const writer = comment.writer || comment.user; // 하위 호환성을 위해 둘 다 체크
    const content = comment.content;
    const createdAt = comment.createdAt || comment.created_at;
    
    // 프로필 이미지와 닉네임 처리
    const profileImage = writer?.profile_image || writer?.profile_img || writer?.profileImage || writer?.img_url;
    const nickname = writer?.nick_name || writer?.nickname || writer?.name;
    
    // 날짜 포맷팅
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
            return dateString; // 파싱 실패시 원본 반환
        }
    };

    // 프로필 클릭 핸들러
    const handleProfilePress = () => {
        if (writer && navigation) {
            const writerUid = writer.uid || writer.id;
            const writerNickname = writer.nick_name || writer.nickname || writer.name;
            console.log('댓글 프로필 클릭:', writerNickname, 'uid:', writerUid);
            navigation.navigate('UserProfile', {
                uid: writerUid,
                nickname: writerNickname
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* 프로필 썸네일 - 클릭 가능하게 수정 */}
            <TouchableOpacity onPress={handleProfilePress} activeOpacity={0.7}>
                <ProfileThumbnail image={profileImage} small />
            </TouchableOpacity>

            {/* 내용 + 날짜 */}
            <View style={styles.contentBox}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleProfilePress} activeOpacity={0.7}>
                        <Text style={styles.nickname}>{nickname || '익명'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.date}>{formatDate(createdAt)}</Text>
                </View>
                <Text style={styles.content}>{content}</Text>
            </View>

            {/* 내 댓글일 경우만 삭제 버튼 (삭제 기능은 구현하지 않음) */}
            {/* {isMyComment && (
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => onDelete?.(comment.id)}
                >
                    <Feather name="trash-2" size={16} color="#999" />
                </TouchableOpacity>
            )} */}
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