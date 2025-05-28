import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PrivacyFilterButton = ({ value = 'all', onChange }) => {
    const getNext = (current) => {
        if (current === 'all') return 'public';
        if (current === 'public') return 'private';
        return 'all';
    };

    const getIcon = (current) => {
        if (current === 'all') return 'refresh-ccw'; // 전체
        if (current === 'public') return 'unlock';// 전체공개
        return 'lock'; // 비공개
    };

    return (
        <TouchableOpacity onPress={() => onChange(getNext(value))} style={styles.button}>
            <Feather name={getIcon(value)} size={18} color="#444" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 6,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginLeft: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
    },
});

export default PrivacyFilterButton;
