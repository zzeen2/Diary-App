import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EmotionTag from '../atoms/EmotionTag';

const DiaryCard = ({ entry, onPress, primaryEmotion, secondaryEmotion }) => {
    const [lineCount, setLineCount] = useState(0);
    
    // 텍스트가 변경될 때마다 줄 수를 다시 측정
    const [measuringText, setMeasuringText] = useState(true);
    
    useEffect(() => {
        // 컴포넌트가 마운트되거나 entry가 변경될 때마다 측정 상태 초기화
        setMeasuringText(true);
    }, [entry.content]);
    
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <View style={[ styles.card, lineCount === 1 && !measuringText && { height: 100 } ]}>
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
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={2}>{entry.title}</Text>
                        <Text style={styles.date}>{entry.isPublic ? '🌎' : '🔒'} {entry.date}</Text>
                    </View>

                    {/* 측정용 숨겨진 텍스트 */}
                    {measuringText && (
                        <Text  style={[styles.preview, styles.hiddenText]} onTextLayout={(e) => {setLineCount(e.nativeEvent.lines.length); setMeasuringText(false);}}>
                            {entry.content}
                        </Text>
                    )}

                    {/* 실제 보여지는 텍스트 */}
                    <Text style={styles.preview} numberOfLines={2}>
                        {entry.content}
                    </Text>

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
        maxHeight: 130,
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
});

export default DiaryCard;