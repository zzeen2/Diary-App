import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, Image, Dimensions, View, Platform, Text, TouchableOpacity,SafeAreaView} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmotionHeader, EmotionRow, HeaderBar, VisibilityToggleRow } from '../molecules';
import useFormmatedDate from '../../hooks/useFormattedDate';
import { EmojiIcon, ToggleSwitch } from '../atoms';
import { DiaryImotionSection } from '../organisms';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    backgroundImage : {
        flex : 1,
        width : '100%',
    },
    safeContainer : {
        flex : 1,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginVertical: 1,
    },
    dateStyle : {
        fontSize : 14,
        fontWeight : '600',
        color : '#b881c2'
    }
})


const DiaryWriteScreen = ({route, navigation}) => {
    const selectedEmotion = route.params.emotion || null
    //console.log("선택된 감정 - 글작성 페이지", selectedEmotion)
    const insets = useSafeAreaInsets();

    const today = new Date().toISOString();
    const formattedDate = useFormmatedDate(today);

    const [isPublic, setIsPublic] = useState(false)
    

    return (
        <View style = {styles.container}>
            <StatusBar style="dark" backgroundColor="transparent" translucent />
            <ImageBackground source={require('../../assets/background.png')} style = {styles.backgroundImage}>
                <SafeAreaView style={styles.safeContainer}> 

                    {/*  헤더 */}
                    <HeaderBar showBackButton showConfirmButton onBackPress={()=>navigation.goBack()} onConfirmPress={()=>console.log("일기 작성 완료") } centerContent ={<Text style={styles.dateStyle}>{formattedDate}</Text>}></HeaderBar>
                    <View style={styles.divider} />

                    {/*  콘텐츠 섹션 1 - 공개 토글, 감정 아이콘 */}
                    <DiaryImotionSection></DiaryImotionSection>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

export default DiaryWriteScreen
