import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiaryMeta = ({ date, isPublic }) => {
    return (
        <View style={styles.metaContainer}>
        <Text style={styles.metaText}>📅 {date} · {isPublic ? '🌐' : '🔒'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    metaText: {
        fontSize: 12,
        color: '#666',
    },
});

export default DiaryMeta;
