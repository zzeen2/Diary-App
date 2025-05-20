import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const ToggleSwitch = ({ value, onToggle }) => {
    return (
        <View style={styles.container}>
        <Switch
            value={value}
            onValueChange={onToggle}
            trackColor={{ false: '#ccc', true: '#b881c2' }}
            thumbColor="#fff"
        />
        <Text style={styles.emoji}>{value ? '🌍' : '🔒'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    emoji: {
        fontSize: 18,
    },
});

export default ToggleSwitch;
