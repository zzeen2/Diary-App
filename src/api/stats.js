import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_URL } from '@env';

export const getEmotionStats = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const url = `${EXPO_PUBLIC_API_URL}/stats/app/emotion`;
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get(url, {
      headers,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getStreakStats = async () => {
  
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const url = `${EXPO_PUBLIC_API_URL}/stats/app/streak`;
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get(url, {
      headers,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}; 