import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity,SafeAreaView} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const DiaryWriteScreen = ({route, navigation}) => {
    const selectedEmotion = route.params.emotion || null
    console.log("선택된 감정 - 글작성 페이지", selectedEmotion)
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>

        </View>
    )
}

export default DiaryWriteScreen
