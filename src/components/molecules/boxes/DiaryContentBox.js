// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

// const DiaryContentBox = ({ content, images = [], onImagePress }) => {
//     return (
//         <View style={styles.container}>
//             {/* 일기 본문 */}
//             <View style={styles.contentWrapper}>
//                 <Text style={styles.contentText}>{content}</Text>
//             </View>

//             {/* 이미지 썸네일 리스트 */}
//             {images.length > 0 && (
//                 <ScrollView 
//                     horizontal 
//                     showsHorizontalScrollIndicator={false} 
//                     style={styles.imageScroll}
//                 >
//                     {images.map((uri, index) => (
//                         <TouchableOpacity 
//                             key={index} 
//                             onPress={() => onImagePress?.(uri)}
//                             style={styles.imageWrapper}
//                         >
//                             <Image source={{ uri }} style={styles.thumbnail} />
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         gap: 16,
//         marginTop: 16,
//     },
//     contentWrapper: {
//         paddingVertical: 16,
//         paddingHorizontal: 4,
//     },
//     contentText: {
//         fontSize: 15,
//         color: '#333',
//         lineHeight: 22,
//     },
//     imageScroll: {
//         marginTop: 8,
//     },
//     imageWrapper: {
//         marginRight: 12,
//     },
//     thumbnail: {
//         width: 85,
//         height: 85,
//         borderRadius: 12,
//         backgroundColor: '#f5f5f5',
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//     },
// });

// export default DiaryContentBox;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const DiaryContentBox = ({ content, images = [], onImagePress }) => {
    // ⭐ 디버깅 로그 추가 ⭐
    console.log("=== DiaryContentBox 디버깅 ===");
    console.log("content:", content);
    console.log("images 배열:", images);
    console.log("images 길이:", images?.length);
    console.log("images 타입:", typeof images);
    console.log("images는 배열인가?", Array.isArray(images));
    
    if (images && images.length > 0) {
        console.log("첫 번째 이미지:", images[0]);
        console.log("첫 번째 이미지 타입:", typeof images[0]);
    }

    return (
        <View style={styles.container}>
            {/* 일기 본문 */}
            <View style={styles.contentWrapper}>
                <Text style={styles.contentText}>{content}</Text>
            </View>

            {/* 이미지 썸네일 리스트 */}
            {images && images.length > 0 ? (
                <View>
                    <Text style={styles.debugText}>이미지 {images.length}개 발견</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        style={styles.imageScroll}
                    >
                        {images.map((imageUrl, index) => {
                            console.log(`이미지 ${index}:`, imageUrl);
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