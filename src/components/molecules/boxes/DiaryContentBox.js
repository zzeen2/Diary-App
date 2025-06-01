import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const DiaryContentBox = ({ content, images = [], onImagePress }) => {
    // localhost URL을 실제 서버 IP로 변환하는 함수
    const convertLocalhostUrl = (url) => {
      if (typeof url === 'string' && url.includes('localhost:4000')) {
        // 환경변수에서 서버 정보 추출
        const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
        const serverMatch = apiUrl.match(/http:\/\/([^:]+):/);
        const serverIP = serverMatch ? serverMatch[1] : 'localhost';
        
        const convertedUrl = url.replace('localhost:4000', `${serverIP}:4000`);
        console.log(`DiaryContentBox URL 변환: ${url} → ${convertedUrl}`);
        return convertedUrl;
      }
      return url;
    };

    // ⭐ 디버깅 로그 추가 ⭐
    console.log("=== DiaryContentBox 디버깅 ===");
    console.log("content:", content);
    console.log("images 배열:", images);
    console.log("images 길이:", images?.length);
    console.log("images 타입:", typeof images);
    console.log("images는 배열인가?", Array.isArray(images));
    
    // 이미지 URL들을 변환 처리
    const processedImages = images.map((imageItem, index) => {
      let imageUrl = imageItem;
      
      // 이미지가 객체인 경우 image_url 속성에서 추출
      if (typeof imageItem === 'object' && imageItem.image_url) {
        imageUrl = imageItem.image_url;
      }
      
      // localhost URL 변환
      const convertedUrl = convertLocalhostUrl(imageUrl);
      console.log(`이미지 ${index}: ${imageUrl} → ${convertedUrl}`);
      
      return convertedUrl;
    });
    
    console.log("처리된 이미지들:", processedImages);

    return (
        <View style={styles.container}>
            {/* 일기 본문 */}
            <View style={styles.contentWrapper}>
                <Text style={styles.contentText}>{content}</Text>
            </View>

            {/* 이미지 썸네일 리스트 */}
            {processedImages && processedImages.length > 0 ? (
                <View>
                    <Text style={styles.debugText}>이미지 {processedImages.length}개 발견</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        style={styles.imageScroll}
                    >
                        {processedImages.map((imageUrl, index) => {
                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    onPress={() => onImagePress?.(imageUrl)}
                                    style={styles.imageWrapper}
                                >
                                    <Image 
                                        source={{ uri: imageUrl }} 
                                        style={styles.thumbnail}
                                        onError={(e) => {
                                            console.log(`이미지 ${index} 로드 실패:`, e.nativeEvent.error);
                                            console.log(`실패한 URL:`, imageUrl);
                                        }}
                                        onLoad={() => {
                                            console.log(`이미지 ${index} 로드 성공:`, imageUrl);
                                        }}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            ) : (
                <Text style={styles.debugText}>이미지 없음 (images: {JSON.stringify(images)})</Text>
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
    // ⭐ 디버깅용 스타일 ⭐
    debugText: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
        marginVertical: 4,
    },
});

export default DiaryContentBox;