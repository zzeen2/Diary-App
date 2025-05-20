import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ModalCloseButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.icon}>×</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 8,
        zIndex: 10,
    },
    icon: {
        fontSize: 22,
        color: '#888',
        fontWeight: '600',
    },
});

export default ModalCloseButton;
