const API_URL = 'https://your-api.com'; // 실제 API 주소로 변경

export const saveUserEmotionToServer = async (emotion) => {
    const today = new Date().toISOString().slice(0, 10);

    const res = await fetch(`${API_URL}/api/emotion/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        emotionType: emotion.type,
        emotionName: emotion.name,
        date: today,
        }),
    });

    if (!res.ok) throw new Error('감정 저장 실패');
};
