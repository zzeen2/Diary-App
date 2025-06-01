import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const getUserStreak = async (uid) => {
    const token = await AsyncStorage.getItem('jwtToken');
    try {
        // 앱용 스트릭 API 사용 (일기 + 감정 포함)
        const res = await axios.get(`${EXPO_PUBLIC_API_URL}/main/app/streak`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('스트릭 API 응답:', res.data);
        return res.data.streak || 0; // streak 반환
    } catch (error) {
        console.error('스트릭 API 오류:', error);
        return 0;
    }
};
