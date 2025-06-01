import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { EmotionTag } from '../../atoms/TextsAndLabel';

const FriendDiaryCard = ({ entry, onPress, userEmotion, aiEmotion }) => {
    const [lineCount, setLineCount] = useState(0);
    const [measuringText, setMeasuringText] = useState(true);
    
    const removeMarkdownImages = (text) => {
        if (!text) return '';
        // 마크다운 이미지 태그 제거: ![alt](url)
        let cleanText = text.replace(/!\[.*?\]\((.*?)\)/g, '');
        // HTML img 태그 제거: <img src="..." alt="..."> 형식
        cleanText = cleanText.replace(/<img[^>]*>/gi, '');
        return cleanText;
    };

    const cleanContent = removeMarkdownImages(entry.content);
    
    useEffect(() => {
        setMeasuringText(true);
    }, [entry.content]);

    const writerName = entry.writer?.nick_name;
    const profileImageSource = entry.writer?.profile_image 
                               ? { uri: entry.writer.profile_image } 
                               : require('../../../assets/logo2.png');

    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <View style={[ styles.card, lineCount === 1 && !measuringText && { height: 140 } ]}>
                <View style={styles.emotionBarContainer}>
                    {aiEmotion && userEmotion ? (
                        <>
                            <View style={[styles.emotionBar, styles.halfBar, { backgroundColor: userEmotion.color }]} />
                            <View style={[styles.emotionBar, styles.halfBar, { backgroundColor: aiEmotion.color }]} />
                        </>
                    ) : (
                        (userEmotion || aiEmotion) && (
                            <View style={[styles.emotionBar, styles.singleBar, { backgroundColor: (userEmotion || aiEmotion).color }]} />
                        )
                    )}
                </View>

                <View style={styles.content}>
                    <View style={styles.profileRow}>
                        <View style={styles.profileImageWrapper}>
                            <Image source={profileImageSource} style={styles.profileImage} />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>{writerName || '알 수 없음'}</Text>
                            <View style={styles.dateContainer}>
                                <Text style={styles.globeIcon}>🌍</Text>
                                <Text style={styles.date}>
                                    {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString('ko-KR') : ''}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.title} numberOfLines={1}>{entry.title}</Text>
                    
                    {measuringText && (
                        <Text 
                            style={[styles.preview, styles.hiddenText]} 
                            onTextLayout={(e) => {
                                setLineCount(e.nativeEvent.lines.length);
                                setMeasuringText(false);
                            }}
                        >
                            {cleanContent}
                        </Text>
                    )}
                    
                    {cleanContent && (
                        <Text style={styles.preview} numberOfLines={2}>{cleanContent}</Text>
                    )}

                    <View style={styles.footer}>
                        <View style={styles.tags}>
                            {userEmotion && (
                                <EmotionTag
                                    emoji={userEmotion.emoji}
                                    name={userEmotion.name}
                                    backgroundColor={userEmotion.color + '40'}
                                />
                            )}
                            {aiEmotion && (
                                <EmotionTag
                                    emoji={aiEmotion.emoji}
                                    name={aiEmotion.name}
                                    backgroundColor={aiEmotion.color + '40'}
                                />
                            )}
                        </View>
                        {entry.commentCount > 0 && (
                            <Text style={styles.commentCount}>
                                💬 {entry.commentCount}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 14,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
        maxHeight: 160,
    },
    emotionBarContainer: {
        width: 6,
        height: '100%',
    },
    emotionBar: {
        width: '100%',
    },
    halfBar: {
        height: '50%',
    },
    singleBar: {
        height: '100%',
    },
    content: {
        flex: 1,
        padding: 14,
        justifyContent: 'space-between',
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    profileImageWrapper: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ddd',
        marginRight: 8,
    },
    profileImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    userName: {
        fontSize: 13,
        fontWeight: '500',
        color: '#555',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    globeIcon: {
        fontSize: 12,
        color: '#4A90E2',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    preview: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 10,
    },
    hiddenText: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    commentCount: {
        fontSize: 12,
        color: '#888',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default FriendDiaryCard;