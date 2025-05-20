import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, View } from 'react-native';

const TabButton = ({ icon, label, isActive, onPress, bottomInset = 0 }) => {
    return (
        <TouchableOpacity
        onPress={onPress}
        style={[ styles.tabButton, isActive && styles.activeTabButton, Platform.OS === 'ios' && { paddingBottom: bottomInset > 0 ? 0 : 5 }]}>
        <Text style={styles.tabIcon}>{icon}</Text>
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
    },
    activeTabButton: {
        borderTopWidth: 2,
        borderTopColor: '#b881c2',
        backgroundColor: 'rgba(184, 129, 194, 0.05)',
    },
    tabIcon: {
        fontSize: 20,
        marginBottom: 2,
    },
    tabLabel: {
        fontSize: 12,
        color: '#666',
    },
    activeTabLabel: {
        color: '#b881c2',
        fontWeight: '600',
    },
});

export default TabButton;
