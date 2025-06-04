import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_URL } from '@env';

export const getUserStreak = async (uid) => {
    const token = await AsyncStorage.getItem('jwtToken');
    const res = await axios.get(`${EXPO_PUBLIC_API_URL}/main/streak`, {
        params: { uid },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.streak;
};
