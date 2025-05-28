import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {EmotionTag} from '../../atoms/TextsAndLabel';

const FriendDiaryCard = ({ entry, onPress, primaryEmotion, secondaryEmotion }) => {
    const [lineCount, setLineCount] = useState(0);
    const [measuringText, setMeasuringText] = useState(true);
    
    useEffect(() => {
        // 컴포넌트가 마운트되거나 entry가 변경될 때마다 측정 상태 초기화
        setMeasuringText(true);
    }, [entry.content]);

    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <View style={[ styles.card,lineCount === 1 && !measuringText && { height: 140 } ]}>
                {/* 감정 색상 바 */}
                <View style={styles.emotionBarContainer}>
                    {secondaryEmotion ? (
                        <>
                            <View style={[styles.emotionBar, styles.halfBar, { backgroundColor: primaryEmotion.color }]} />
                            <View style={[styles.emotionBar, styles.halfBar, { backgroundColor: secondaryEmotion.color }]} />
                        </>
                    ) : (
                        <View style={[styles.emotionBar, styles.singleBar, { backgroundColor: primaryEmotion.color }]} />
                    )}
                </View>

                {/* 카드 내용 */}
                <View style={styles.content}>
                    {/* 친구 정보 */}
                    <View style={styles.profileRow}>
                        <View style={styles.profileImageWrapper}>
                            <Image source={require('../../../assets/cloud3.png')} style={styles.profileImage}
                            />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>{entry.userName}</Text>
                            <Text style={styles.date}>{entry.date}</Text>
                        </View>
                    </View>

                    <Text style={styles.title} numberOfLines={1}>{entry.title}</Text>
                    
                    {/* 측정용 숨겨진 텍스트 - numberOfLines 같은 제한이 없어서 정확하게 측정이 가능하다. */}
                    {measuringText && (
                        <Text 
                            style={[styles.preview, styles.hiddenText]} 
                            onTextLayout={(e) => {
                                setLineCount(e.nativeEvent.lines.length);
                                setMeasuringText(false);
                            }}
                        >
                            {entry.content}
                        </Text>
                    )}
                    
                    <Text style={styles.preview} numberOfLines={2}>{entry.content}</Text>

                    <View style={styles.tags}>
                        <EmotionTag
                            emoji={primaryEmotion.emoji}
                            name={primaryEmotion.name}
                            backgroundColor={primaryEmotion.color + '40'}
                        />
                        {secondaryEmotion && (
                            <EmotionTag
                                emoji={secondaryEmotion.emoji}
                                name={secondaryEmotion.name}
                                backgroundColor={secondaryEmotion.color + '40'}
                            />
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
        flex: 1,
    },
    userName: {
        fontSize: 13,
        fontWeight: '500',
        color: '#555',
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
});

export default FriendDiaryCard;