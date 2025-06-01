import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const DiaryContentBox = ({ content, images = [], onImagePress }) => {
  const removeMarkdownImages = (text) => {
    if (!text) return '';
    return text.replace(/!\[.*?\]\((.*?)\)/g, '');
  };

  const convertLocalhostUrl = (url) => {
    if (typeof url === 'string' && url.includes('localhost:4000')) {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
      const serverMatch = apiUrl.match(/http:\/\/([^:]+):/);
      const serverIP = serverMatch ? serverMatch[1] : 'localhost';
      const convertedUrl = url.replace('localhost:4000', `${serverIP}:4000`);
      return convertedUrl;
    }
    return url;
  };

  const processedImages = images.map((imageItem, index) => {
    let imageUrl = imageItem;
    if (typeof imageItem === 'object' && imageItem.image_url) {
      imageUrl = imageItem.image_url;
    }
    return convertLocalhostUrl(imageUrl);
  });

  const cleanText = removeMarkdownImages(content);

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.contentText}>{cleanText}</Text>
      </View>

      {processedImages && processedImages.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          {processedImages.map((imageUrl, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onImagePress?.(imageUrl)}
              style={styles.imageWrapper}
            >
              <Image
                source={{ uri: imageUrl }}
                style={styles.thumbnail}
                onError={(e) => {}}
                onLoad={() => {}}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.debugText}>
          
        </Text>
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
  debugText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginVertical: 4,
  },
});

export default DiaryContentBox;
