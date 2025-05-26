import { useState } from 'react';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:4000';

export const useRecordEmotion = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const recordEmotion = async (emotionId) => {
        setLoading(true);
        setSuccess(false);

        try {
        const res = await fetch(`${apiUrl}/main/emotionRecord`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            emotionId,
            }),
        });

        const result = await res.json();
        if (result.success) {
            setSuccess(true);
        }
        } catch (err) {
            console.log("감정 저장 오류" , err)
        }
    };

    return { recordEmotion, loading, success,};
};
