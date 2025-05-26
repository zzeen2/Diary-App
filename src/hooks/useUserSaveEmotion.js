import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { saveEmotionToServer } from '../api/userEmotionSave';

const useUserSaveEmotion = (navigation) => {
    const saveEmotion = async (emotion) => {
        try {
        await saveEmotionToServer(emotion);

        const today = new Date().toISOString().slice(0, 10);
        await AsyncStorage.setItem('emotionSavedDate', today);

        Alert.alert('감정이 저장되었습니다!');
        navigation.navigate('Main');
        } catch (err) {
        Alert.alert('감정 저장 실패', err.message);
        }
    };

    return { saveEmotion };
};

export default useUserSaveEmotion;
