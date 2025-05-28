import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileThumbnail = ({ image, nickname }) => {
    return (
        <View style={styles.container}>
        <Image
            source={typeof image === 'number' ? image : { uri: image }}
            style={styles.avatar}
        />
        <Text style={styles.name} numberOfLines={1}>{nickname}</Text>
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
    },
    name: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
        maxWidth: 140,
    },
});

export default ProfileThumbnail;
