import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SectionTitle = ({ title, onPressSeeMore }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {onPressSeeMore && (
            <TouchableOpacity onPress={onPressSeeMore}>
            <Text style={styles.seeMore}>더보기</Text>
            </TouchableOpacity>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    seeMore: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
    },
});

export default SectionTitle;
