import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const DiaryImageThumbnail = ({ uri, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress?.(uri)}>
        <Image source={{ uri }} style={styles.thumbnail} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#eee',
    },
});

export default DiaryImageThumbnail;
