import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton, ConfirmButton,SearchButton } from '../../atoms/buttons';


const HeaderBar = ({ 
    title = '홈',
    streakText = '', 
    profileImage,
    showBackButton = false,
    showConfirmButton = false, 
    onBackPress,
    onConfirmPress, 
    onlyTitle= false,
    centerContent,
    rightContent,
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
        <View style={styles.side}>
            {showBackButton ? (
            <BackButton onPress={onBackPress} />
            ) : onlyTitle ? (
            <Text style={styles.title}>{title}</Text>
            ) : (
            <View style={styles.leftGroup}>
                <View style={styles.profileWrapper}>
                <Image 
                    source={profileImage || require('../../../assets/logo2.png')} 
                    style={styles.profileImage} 
                />
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            )}
        </View>

        <View style={styles.center}>
            {centerContent ? (centerContent) : (null)}
        </View>

            <View style={styles.side}>
            {showConfirmButton ? (
                <ConfirmButton onPress={onConfirmPress} />
            ) : rightContent ? (
                rightContent
            ) : streakText !== '' ? (
                <Text style={styles.streak}>{streakText}</Text>
            ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    side: {
        alignItems : 'space-between',
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#b881c2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    streak: {
        fontSize: 13,
        color: '#b881c2',
        fontWeight: '800',
    },
});

export default HeaderBar;
