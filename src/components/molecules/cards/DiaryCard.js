import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {EmotionTag} from '../../atoms/TextsAndLabel';

const DiaryCard = ({ entry, onPress, userEmotion, aiEmotion  }) => {
    const [lineCount, setLineCount] = useState(0);
    const [measuringText, setMeasuringText] = useState(true);

    const imageUrl = entry.images && entry.images.length > 0 ? entry.images[0] : null;

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
    
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <View style={[ styles.card, lineCount === 1 && !measuringText && { height: 100 } ]}>
                <View style={styles.emotionBarContainer}>
                    {aiEmotion ? (
                        <>
                            {userEmotion && <View style={[styles.emotionBar, styles.halfBar, { backgroundColor: userEmotion.color }]} />}
                            <View style={[styles.emotionBar, styles.halfBar, { backgroundColor: aiEmotion.color }]} />
                        </>
                    ) : (
                        userEmotion && <View style={[styles.emotionBar, styles.singleBar, { backgroundColor: userEmotion.color }]} />
                    )}
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={2}>{entry.title}</Text>
                        <Text style={styles.date}>
                            {entry.isPublic ? '🌎' : '🔒'}
                            {' '}
                            {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString('ko-KR') : ''}
                        </Text>
                    </View>

                    {measuringText && (
                        <Text  style={[styles.preview, styles.hiddenText]} onTextLayout={(e) => {setLineCount(e.nativeEvent.lines.length); setMeasuringText(false);}}>
                            {cleanContent}
                        </Text>
                    )}

                    <Text style={styles.preview} numberOfLines={2}>
                        {cleanContent}
                    </Text>

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
                        {entry.isPublic && entry.commentCount > 0 && (
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    preview: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        lineHeight: 20,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commentCount: {
        fontSize: 12,
        color: '#888',
    },
});

export default DiaryCard;