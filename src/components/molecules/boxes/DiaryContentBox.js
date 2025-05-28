import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const DiaryContentBox = ({ content, images = [], onImagePress }) => {
    return (
        <View style={styles.container}>
            {/* 일기 본문 */}
            <View style={styles.contentWrapper}>
                <Text style={styles.contentText}>{content}</Text>
            </View>

            {/* 이미지 썸네일 리스트 */}
            {images.length > 0 && (
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.imageScroll}
                >
                    {images.map((uri, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => onImagePress?.(uri)}
                            style={styles.imageWrapper}
                        >
                            <Image source={{ uri }} style={styles.thumbnail} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        marginTop: 16,
    },
    contentWrapper: {
        paddingVertical: 16,
        paddingHorizontal: 4,
    },
    contentText: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    imageScroll: {
        marginTop: 8,
    },
    imageWrapper: {
        marginRight: 12,
    },
    thumbnail: {
        width: 85,
        height: 85,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
});

export default DiaryContentBox;