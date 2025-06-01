import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileThumbnail = ({ image, nickname, small = false }) => {
    const getImageSource = () => {
        if (!image) {
            return require('../../../assets/logo2.png');
        }
        
        if (typeof image === 'number') {
            return image; // 로컬 이미지
        }
        
        if (typeof image === 'string' && image.trim().startsWith('http')) {
            return { uri: image };
        }
        
        return require('../../../assets/logo2.png');
    };

    return (
        <View style={styles.container}>
            <Image
                source={getImageSource()}
                style={[styles.avatar, small && styles.smallAvatar]}
                onError={() => {}}
            />
            {nickname && (
                <Text style={[styles.name, small && styles.smallName]} numberOfLines={1}>
                    {nickname}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f0f0',
    },
    smallAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    name: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
        maxWidth: 140,
    },
    smallName: {
        fontSize: 12,
        maxWidth: 120,
    },
});

export default ProfileThumbnail;
