import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ToggleSwitch} from '../atoms';


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 1,
        marginTop:6,
        marginBottom : 11,
        opacity : 0.7
    },
});
const EmotionHeader = ({ isPublic, onToggle }) => {
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>📝 감정 일기 </Text>
                <ToggleSwitch value={isPublic} onToggle={onToggle} />
            </View>
            <View style={styles.divider} />
        </>
    );
};


export default EmotionHeader;
