import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const getUserStreak = async (uid) => {
    const token = await AsyncStorage.getItem('jwtToken');
    try {
        const res = await axios.get(`${EXPO_PUBLIC_API_URL}/stats/app/streak`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('스트릭 API 응답:', res.data);
        return res.data.currentStreak || 0; // currentStreak 반환
    } catch (error) {
        console.error('스트릭 API 오류:', error);
        return 0;
    }
};
